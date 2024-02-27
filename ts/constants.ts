import { MenuScene } from './scenes/MenuScene';
import { CardsScene } from './scenes/CardsScene';
import { ParticlesScene } from './scenes/ParticlesScene';
import { TextScene } from './scenes/TextScene';

export const ScenesClasses = {
	menu: MenuScene,
	cards: CardsScene,
	particles: ParticlesScene,
	text: TextScene,
};

export const CARD_SUIT = {
	c: 'c',
	d: 'd',
	h: 'h',
	s: 's',
} as const;

export const CARD_RANK = {
	2: 2,
	3: 3,
	4: 4,
	5: 5,
	6: 6,
	7: 7,
	8: 8,
	9: 9,
	10: 10,
	j: 'J',
	q: 'Q',
	k: 'K',
	a: 'A',
} as const;

export const ALL_CARD_SUITS = Object.values(CARD_SUIT);
export const ALL_CARD_RANKS = Object.values(CARD_RANK);
