import { generateBitmapFontWithTextures } from '../utils/generateBitmapFontWithTextures';
import { getRandomFromArray } from '../utils/getRandomFromArray';
import { ExampleScene } from './ExampleScene';
import { Assets, BitmapText, Texture } from 'pixi.js';

export class TextScene extends ExampleScene {
	private bitmapText: BitmapText;

	private passedTime: number = 0;
	private moveTime: number = 1000;

	private charactersString = 'abcdefghijklmnopqrstuvwxyz ';
	private charactersTextures: Record<string, Texture>;
	private allCharacters: string[];

	public create(): void {
		super.create();

		this.charactersTextures = {
			'\u{000000}': Assets.get<Texture>('Roasted Sweet Potato Emoji.png'),
			'\u{000001}': Assets.get<Texture>('Umbrella Emoji.png'),
			'\u{000002}': Assets.get<Texture>(
				'Slightly Smiling Face Emoji.png'
			),
		};

		generateBitmapFontWithTextures({
			bitmapFontFace: 'Font With Emojies',
			charactersString: this.charactersString,
			charactersTextures: this.charactersTextures,
			fontSize: 50,
			margin: 5,
		});

		this.bitmapText = new BitmapText('joker \u{000000} \u{000001}', {
			fontName: 'Font With Emojies',
		});

		this.app.ticker.add(this.onUpdate, this);

		const { bitmapText } = this;

		bitmapText.anchor.set(0.5);

		this.addChild(bitmapText);

		this.allCharacters = (
			this.charactersString +
			Object.keys(this.charactersTextures).join('') +
			'\n'
		).split('');

		this.onResize();
	}

	public destroy(options): void {
		super.destroy(options);

		this.app.ticker.remove(this.onUpdate, this);
	}

	private changeText() {
		const { bitmapText } = this;

		const randomFontSize = 20 + Math.random() * 50;

		bitmapText.fontSize = randomFontSize;

		bitmapText.text = this.generateRandomString();
	}

	private generateRandomString() {
		const { allCharacters } = this;

		const length = 5 + Math.ceil(Math.random() * 10);

		let str = '';

		for (let i = 0; i < length; i++) {
			str += getRandomFromArray(allCharacters);
		}

		return str;
	}

	private onUpdate() {
		this.passedTime += this.app.ticker.elapsedMS;

		if (this.passedTime >= this.moveTime) {
			this.changeText();

			this.passedTime = 0;
		}
	}

	protected onResize() {
		super.onResize();

		const { app, bitmapText } = this;

		bitmapText.position.set(app.centerX, app.centerY - 100);
	}
}
