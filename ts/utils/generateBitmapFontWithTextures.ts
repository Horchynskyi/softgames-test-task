import { BitmapFontData, Texture, BitmapFont } from 'pixi.js';

/**
 * @type {Object}
 * @property bitmapFontFace - the font face name for this bitmap font
 * @property fontSize - the font size for this bitmap font
 * @property lineHeight - the line height for this bitmap font
 * @property charactersString - the string for all letter chaarcters
 * @property charactersTextures - the list of all character textures
 * @property width - the with of spritesheet
 * @property width - the height of spritesheet
 * @property fontFamily - the font family to use
 * @property margin - the margin between characters, to avoid any overlaps
 *
 * */
const defaultParameters = {
	bitmapFontFace: 'Bitmap With Images',
	fontSize: 50,
	lineHeight: 50,
	charactersString: 'abcdefghijklmnopqrstuvwxyz ',
	charactersTextures: {},
	width: 512,
	height: 512,
	fontFamily: 'Arial',
	margin: 5,
};

/**
 * @description Generates bitmap font for provided characters and textueres allow to mixin text with images.
 *
 * @example
 * const charactersString = 'abcdefghijklmnopqrstuvwxyz ';
 *
 * const charactersTextures = {
 *	 '\u{000000}': Assets.get<Texture>('Roasted Sweet Potato Emoji.png'),
 *	 '\u{000001}': Assets.get<Texture>('Umbrella Emoji.png'),
 *	 '\u{000002}': Assets.get<Texture>(
 *		 'Slightly Smiling Face Emoji.png'
 *	 ),
 * };
 *
 * generateBitmapFontWithTextures({
 *	 bitmapFontFace: 'Font With Emojies',
 *	 charactersString,
 *	 charactersTextures,
 *	 fontSize: 50,
 *	 margin: 2,
 * });
 *
 * const bitmapText = new BitmapText('joker \u{000000} \u{000001}', {
 *	 fontName: 'Font With Emojies',
 * });
 *
 * bitmapText.anchor.set(0.5);
 *
 * this.addChild(bitmapText);
 *
 * @param {Partial<typeof defaultParameters>} [parameters=defaultParameters]
 */
export const generateBitmapFontWithTextures = function (
	parameters: Partial<typeof defaultParameters> = defaultParameters
) {
	const data = new BitmapFontData();

	const {
		fontFamily,
		lineHeight,
		charactersString,
		charactersTextures,
		fontSize,
		width,
		height,
		bitmapFontFace,
		margin,
	} = Object.assign({}, defaultParameters, parameters);

	data.info = [
		{
			face: bitmapFontFace,
			size: fontSize,
		},
	];

	data.page = [
		{
			id: 0,
			file: '',
		},
	];

	data.common = [
		{
			lineHeight,
		},
	];

	const canvas = document.createElement('canvas');
	const ctx = canvas.getContext('2d');

	canvas.width = width;
	canvas.height = height;

	if (ctx) {
		ctx.font = `${fontSize}px ${fontFamily}`;
		ctx.fillStyle = '#ffffff';

		let lastX = 0;
		let lastY = 0;
		let maxHeight = 0;
		let maxDescent = 0;

		for (let i = 0; i < charactersString.length; i++) {
			const char = charactersString[i];
			const metrix = ctx.measureText(char);
			const height =
				metrix.actualBoundingBoxAscent +
				metrix.actualBoundingBoxDescent;

			maxHeight = Math.max(maxHeight, height);

			maxDescent = Math.max(metrix.actualBoundingBoxDescent, maxDescent);
		}

		for (let i = 0; i < charactersString.length; i++) {
			const char = charactersString[i];
			const metrix = ctx.measureText(char);

			if (lastX + metrix.width > canvas.width) {
				lastX = 0;
				lastY += maxHeight + margin;
			}

			ctx.fillText(char, lastX, maxHeight + lastY);

			data.char.push({
				id: charactersString.charCodeAt(i),
				page: 0,
				x: lastX,
				y: maxDescent + lastY,
				width: metrix.width,
				height: maxHeight,
				xoffset: 0,
				yoffset: 0,
				xadvance: metrix.width,
			});

			lastX += metrix.width + margin;
		}

		for (const key in charactersTextures) {
			const texture = charactersTextures[key];

			const scale = texture.frame.height / maxHeight;

			const w = texture.frame.width / scale;
			const h = texture.frame.height / scale;

			if (lastX + texture.frame.width > canvas.width) {
				lastX = 0;
				lastY += maxHeight + margin;
			}

			data.char.push({
				id: key.charCodeAt(0),
				page: 0,
				x: lastX,
				y: maxDescent + lastY,
				width: w,
				height: h,
				xoffset: 0,
				yoffset: 0,
				xadvance: w,
			});

			ctx.drawImage(
				//@ts-ignore
				texture.baseTexture.resource.source,
				texture.frame.x,
				texture.frame.y,
				texture.frame.width,
				texture.frame.height,
				lastX,
				maxDescent + lastY,
				w,
				h
			);

			lastX += w + margin;
		}
	}

	const texture = Texture.from(canvas);

	BitmapFont.install(data, texture);
};
