import { Container, Sprite } from 'pixi.js';

/**
 * @type alignHorizontalOptions
 */
const defaultOptions = {
	space: 5,
	offset: 0,
	anchor: 0.5,
	fixedWidth: null,
};

/**
 * @description Aligns the children inside container horizontally by provided options
 * @function alignHorizontal
 *
 * @param {Container} container The container for align
 * @param {alignHorizontalOptions} [options] The options for horizontal align util
 *
 * const container = new Container();
 *
 * const sprite1 = new Sprite('coin');
 * const sprite2 = new Sprite('coin');
 *
 * sprite1.anchor.set(0.5);
 * sprite2.anchor.set(0.5);
 *
 * container.addChild(sprite1);
 * container.addChild(sprite2);
 *
 * alignHorizontal(container);
 *
 * alignHorizontal(container, {
 *     space: 0, // If we want to have spaces between objects
 *     offset: sprite1.width / 2, // If we want to move container by provided offset
 *     anchor: 0.5, // If we want to make container be anchored of total width
 *     fixedWidth: null, // If we want to have particular width for all objects
 * });
 */

export function alignHorizontal(
	container: Container,
	options: Partial<typeof defaultOptions> = defaultOptions
) {
	const { children, pivot } = container;
	const { space, offset, anchor, fixedWidth } = Object.assign(
		{},
		defaultOptions,
		options
	);

	let posX = 0;

	for (let i = 0; i < children.length; i++) {
		const child = children[i];

		child.position.set(posX, 0);

		posX +=
			(fixedWidth === null ? (child as Sprite).width || 0 : fixedWidth) +
			space;
	}

	// Remove last space from total width
	posX -= space;

	pivot.set(posX * anchor - offset, 0);
}

/**
 * @description The options for horizontal align util
 *
 * @typedef {Object} alignHorizontalOptions
 * @property {number} [space=5] Space value between objects. Default: 5.
 * @property {number} [offset=0] Offset for all objects. Useful when need to centralize the container when children have own anchors. Default: 0.
 * @property {number} [anchor=0.5] The anchor value for container. Default: 0.5.
 * @property {number|null} [fixedWidth=null] The value of fixed width for all objects. If null, the own width of object will be used. Default: null.
 */
