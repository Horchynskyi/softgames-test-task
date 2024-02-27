import { Container } from 'pixi.js';
import { Card } from './Card';

export class CardsDeck extends Container<Card> {
	constructor(readonly offset: number) {
		super();
	}

	public getTopCard(): Card {
		return this.children[this.children.length - 1];
	}

	public getCardOffset() {
		return this.children.length * this.offset;
	}
}
