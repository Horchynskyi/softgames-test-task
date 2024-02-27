import {
	Application,
	Assets,
	Container,
	Sprite,
	Spritesheet,
	Texture,
	utils,
} from 'pixi.js';
import { ResizeManager } from './ResizeManager';
import { resources } from './resources';
import { SceneKeyT } from './types';
import { ScenesClasses } from './constants';
import { Scene } from './scenes/Scene';

export class App extends Application<HTMLCanvasElement> {
	readonly events: utils.EventEmitter;
	readonly resizeManager: ResizeManager;

	private currentScene: Scene;
	private bg: Sprite;

	constructor() {
		super({
			width: 640,
			height: 960,
			antialias: true,
			resolution: 1,
		});

		//@ts-ignore
		const stats = new Stats();

		this.events = new utils.EventEmitter();
		this.resizeManager = new ResizeManager(this);

		const { view } = this;

		document.body.appendChild(stats.dom);
		document.body.appendChild(view);

		this.load().then(() => {
			this.create();
		});

		this.ticker.add(() => {
			stats.update();
		});
	}

	public async load() {
		await Assets.load<Spritesheet>(resources.texture.json);
	}

	public create() {
		this.bg = new Sprite(Assets.get('bg.png'));

		const { bg } = this;

		this.stage.addChild(bg);

		this.resizeManager.on('resize', this.onResize, this);

		this.resizeManager.onResize();

		this.runScene('menu');
	}

	public runScene(key: SceneKeyT) {
		this.currentScene?.destroy({
			children: true,
		});

		this.currentScene = new ScenesClasses[key](this);

		this.currentScene.create();

		this.stage.addChild(this.currentScene);
	}

	private onResize() {
		const { bg } = this;

		bg.width = this.width;
		bg.height = this.height;
	}

	get width() {
		return this.screen.width / this.renderer.resolution;
	}

	get height() {
		return this.screen.height / this.renderer.resolution;
	}

	get centerX() {
		return this.width * 0.5;
	}

	get centerY() {
		return this.height * 0.5;
	}
}
