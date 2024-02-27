import { Container } from 'pixi.js';
import type { App } from '../app';

/**
 * The basic class for scenes.
 *
 * @export
 * @class Scene
 * @extends {Container}
 */
export class Scene extends Container {
	constructor(protected app: App) {
		super();

		app.resizeManager.on('resize', this.onResize, this);
	}

	destroy(options): void {
		super.destroy(options);

		this.app.resizeManager.off('resize', this.onResize, this);
	}

	public create() {}

	protected onResize() {}
}
