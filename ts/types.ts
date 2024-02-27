import { CARD_RANK, CARD_SUIT, ScenesClasses } from './constants';

export type SceneKeyT = keyof typeof ScenesClasses;

export type CARD_SUIT_KEYS = keyof typeof CARD_SUIT;
export type CARD_SUIT_VALUES = (typeof CARD_SUIT)[CARD_SUIT_KEYS];

export type CARD_RANK_KEYS = keyof typeof CARD_RANK;
export type CARD_RANK_VALUES = (typeof CARD_RANK)[CARD_RANK_KEYS];
