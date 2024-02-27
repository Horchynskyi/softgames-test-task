import { utils } from 'pixi.js';
import type { App } from './app';

/**
 * The resize manager class to adapt application for all resolutions
 *
 * @export
 * @class ResizeManager
 * @extends {utils.EventEmitter}
 */
export class ResizeManager extends utils.EventEmitter {
	isPortrait = false;
	aspectRatio = 1;

	/**
	 * Creates an instance of ResizeManager.
	 * @param {App} app
	 * @param {number} [gameWidth=640] desired game width
	 * @param {number} [gameHeight=960] desired game height
	 * @memberof ResizeManager
	 */
	constructor(
		private app: App,
		private gameWidth = 640,
		private gameHeight = 960
	) {
		super();

		window.addEventListener('resize', () => {
			this.onResize();
		});

		this.onResize();
	}

	/**
	 * Called on window "resize" event.
	 *
	 * @memberof ResizeManager
	 */
	public onResize() {
		const { app, gameWidth, gameHeight } = this;

		const windowWidth = window.innerWidth;
		const windowHeight = window.innerHeight;

		this.aspectRatio = windowWidth / windowHeight;

		const isPortrait = (this.isPortrait = windowHeight > windowWidth);

		const mw = !isPortrait
			? (windowWidth * gameHeight) / windowHeight
			: (windowWidth * gameWidth) / windowHeight;
		const mh = !isPortrait
			? (windowHeight * gameWidth) / windowWidth
			: (windowHeight * gameHeight) / windowWidth;

		const scaleFactor =
			Math.max(mw / windowWidth, mh / windowHeight) *
			app.renderer.resolution;

		app.renderer.resize(
			windowWidth * scaleFactor,
			windowHeight * scaleFactor
		);

		if (app.view.style) {
			app.view.style.width = windowWidth + 'px';
			app.view.style.height = windowHeight + 'px';
		}

		app.view.width = windowWidth * scaleFactor;
		app.view.height = windowHeight * scaleFactor;

		this.emit('resize', scaleFactor);
	}

	/**
	 * Returns the a or b value depend on current orientation (portait or landscaoe).
	 *
	 * @param {*} a
	 * @param {*} [b]
	 * @return {*}
	 * @memberof ResizeManager
	 */
	public PL<A, B>(a: A, b: B): A | B {
		return this.app.width < this.app.height ? a : b;
	}
}
