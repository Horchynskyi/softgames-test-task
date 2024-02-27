import { Card } from '../objects/Card';
import { ALL_CARD_RANKS, ALL_CARD_SUITS } from '../constants';
import { getRandomFromArray } from '../utils/getRandomFromArray';
import { CardsDeck } from '../objects/CardsDeck';
import anime from 'animejs';
import { ExampleScene } from './ExampleScene';

export class CardsScene extends ExampleScene {
	private leftDeck: CardsDeck = new CardsDeck(-0.5);
	private rightDeck: CardsDeck = new CardsDeck(0.5);

	private passedTime: number = 0;
	private moveTime: number = 1000;

	private animes: anime.AnimeInstance[] = [];

	public create(): void {
		super.create();

		const { leftDeck, rightDeck } = this;

		for (let i = 0; i < 144; i++) {
			const card = new Card(
				getRandomFromArray(ALL_CARD_SUITS),
				getRandomFromArray(ALL_CARD_RANKS)
			);

			const offset = leftDeck.getCardOffset();

			card.position.set(offset, 0);

			leftDeck.addChild(card);
		}

		this.addChild(leftDeck, rightDeck);

		this.onResize();

		this.app.ticker.add(this.onUpdate, this);
	}

	private doCardMove() {
		const { leftDeck, rightDeck } = this;

		const leftTop = leftDeck.getTopCard();

		const rightLocal = rightDeck.toLocal(leftTop, leftTop.parent);

		rightDeck.addChild(leftTop);

		leftTop.position.copyFrom(rightLocal);

		this.animes.push(
			anime({
				targets: leftTop,
				x: rightDeck.getCardOffset(),
				duration: 2000,
				easing: 'easeOutSine',
				complete: () => {
					this.animes.shift();
				},
			})
		);
	}

	public destroy(optiions): void {
		super.destroy(optiions);

		// Pause all tweens on destory.
		for (let i = 0; i < this.animes.length; i++) {
			const anime = this.animes[i];

			anime.pause();
		}

		this.app.ticker.remove(this.onUpdate, this);
	}

	private onUpdate() {
		if (this.leftDeck.children.length) {
			this.passedTime += this.app.ticker.elapsedMS;

			if (this.passedTime >= this.moveTime) {
				this.doCardMove();

				this.passedTime = 0;
			}
		}
	}

	protected onResize() {
		super.onResize();

		const { app, leftDeck, rightDeck } = this;

		leftDeck.position.set(app.centerX - 150, app.centerY - 200);
		rightDeck.position.set(app.centerX + 150, app.centerY - 200);
	}
}
