import { Container } from 'pixi.js';
import { Scene } from './Scene';
import { Button } from '../objects/Button';
import { alignHorizontal } from '../utils/alignHorizontal';
import { alignVertical } from '../utils/alignVertical';
import { SceneKeyT } from '../types';

export class MenuScene extends Scene {
	private buttonsContainer = new Container<Button>();

	public create(): void {
		super.create();

		const { buttonsContainer } = this;

		const buttonsConfig: { id: SceneKeyT; string: string }[] = [
			{
				id: 'cards',
				string: 'CARDS',
			},
			{
				id: 'particles',
				string: 'PARTICLES',
			},
			{
				id: 'text',
				string: 'TEXT',
			},
		];

		for (let index = 0; index < buttonsConfig.length; index++) {
			const buttonConfig = buttonsConfig[index];

			const button = new Button(buttonConfig.string, buttonConfig.id);

			button.once('pointerdown', () => {
				this.app.runScene(buttonConfig.id);
			});

			buttonsContainer.addChild(button);
		}

		this.addChild(buttonsContainer);

		this.onResize();
	}

	protected onResize() {
		const { app, buttonsContainer } = this;

		buttonsContainer.position.set(app.centerX, app.centerY);

		app.resizeManager.PL(
			() => {
				alignVertical(buttonsContainer, {
					offset: buttonsContainer.children[0].height / 2,
					space: 100,
				});
			},
			() => {
				alignHorizontal(buttonsContainer, {
					offset: buttonsContainer.children[0].width / 2,
					space: 100,
				});
			}
		)();
	}
}
