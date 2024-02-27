import { Container, Sprite } from 'pixi.js';

/**
 * @type alignVerticalOptions
 */
const defaultOptions = {
	space: 5,
	offset: 0,
	anchor: 0.5,
	fixedHeight: null,
};

/**
 * @description Aligns the children inside container vertically by provided options
 * @function alignVertical
 *
 * @param {Container} container The container for align
 * @param {alignVerticalOptions} [options] The options for horizontal align util
 *
 * @example
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
 * alignVertical(container);
 *
 * alignVertical(container, {
 *     space: 0, // If we want to have spaces between objects
 *     offset: sprite1.height / 2, // If we want to move container by provided offset
 *     anchor: 0.5, // If we want to make container be anchored of total height
 *     fixedHeight: null, // If we want to have particular width for all objects
 * });
 */
export function alignVertical(
	container: Container,
	options: Partial<typeof defaultOptions> = defaultOptions
) {
	const { children, pivot } = container;
	const { space, offset, anchor, fixedHeight } = Object.assign(
		{},
		defaultOptions,
		options
	);

	let posY = 0;

	for (let i = 0; i < children.length; i++) {
		const child = children[i];

		child.position.set(0, posY);

		posY +=
			(fixedHeight === null ? (child as Sprite).height : fixedHeight) +
			space;
	}

	// Remove last space from total width
	posY -= space;

	pivot.set(0, posY * anchor - offset);
}

/**
 * @description The options for vertical align util
 *
 * @typedef {Object} alignVerticalOptions
 * @property {number} [space=5] Space value between objects. Default: 5.
 * @property {number} [offset=0] Offset for all objects. Useful when need to centralize the container when children have own anchors. Default: 0.
 * @property {number} [anchor=0.5] The anchor value for container. Default: 0.5.
 * @property {number|null} [fixedHeight=null] The value of fixed width for all objects. If null, the own width of object will be used. Default: null.
 */
