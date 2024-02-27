import { Assets, Container, Sprite, Text } from 'pixi.js';

export class Button extends Container {
	constructor(string: string, readonly id: string) {
		super();

		const bg = new Sprite(Assets.get('button-play-blue.png'));
		bg.anchor.set(0.5);
		bg.scale.set(1.75);

		const text = new Text(string, {
			fontSize: 50,
			fontWeight: 'bold',
			fill: '#ffffff',
		});

		text.anchor.set(0.5);

		this.addChild(bg);
		this.addChild(text);

		this.eventMode = 'static';
		this.cursor = 'pointer';
	}
}
