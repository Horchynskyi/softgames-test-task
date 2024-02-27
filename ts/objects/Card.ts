import { Assets, Sprite } from 'pixi.js';
import { CARD_RANK_VALUES, CARD_SUIT_VALUES } from '../types';

export class Card extends Sprite {
	constructor(
		readonly suit: CARD_SUIT_VALUES,
		readonly rank: CARD_RANK_VALUES
	) {
		super(Assets.get(`${suit}_${rank}.png`));

		this.anchor.set(0.5);
	}
}
