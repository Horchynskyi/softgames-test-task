import type { App } from '../app';
import { Button } from '../objects/Button';
import { Scene } from './Scene';

/**
 * The scene class for exmaple preview.
 *
 * @export
 * @class ExampleScene
 * @extends {Scene}
 */
export class ExampleScene extends Scene {
	protected menuButton: Button;

	constructor(app: App) {
		super(app);
	}

	public create() {
		this.menuButton = new Button('MENU', 'menu');

		const { menuButton, app } = this;

		menuButton.once('pointerdown', () => {
			app.runScene('menu');
		});

		this.addChild(menuButton);
	}

	protected onResize() {
		const { app, menuButton } = this;

		menuButton.position.set(app.centerX, app.height - 150);
	}
}
