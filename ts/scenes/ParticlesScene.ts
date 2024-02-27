import { ExampleScene } from './ExampleScene';
import { Emitter } from '@pixi/particle-emitter';
import { Assets, Container, IDestroyOptions } from 'pixi.js';

export class ParticlesScene extends ExampleScene {
	emitter1: Emitter;
	particlesContainer: Container;
	emitter2: Emitter;

	public create(): void {
		super.create();

		this.particlesContainer = new Container();

		this.emitter1 = new Emitter(this.particlesContainer, {
			lifetime: {
				min: 0.2,
				max: 0.3,
			},
			frequency: 0.01,
			spawnChance: 1,
			maxParticles: 9,
			pos: {
				x: 0,
				y: 0,
			},
			addAtBack: true,
			behaviors: [
				{
					type: 'alpha',
					config: {
						alpha: {
							list: [
								{
									value: 1,
									time: 0,
								},
								{
									value: 0,
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'scale',
					config: {
						scale: {
							list: [
								{
									value: 0.5,
									time: 0.1,
								},
								{
									value: 0.1,
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'color',
					config: {
						color: {
							list: [
								{
									value: 'ffb915',
									time: 0,
								},
								{
									value: 'ff770a',
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'moveSpeed',
					config: {
						speed: {
							list: [
								{
									value: 500,
									time: 0,
								},
								{
									value: 100,
									time: 1,
								},
							],
							isStepped: false,
						},
						minMult: 1.5,
					},
				},
				{
					type: 'rotationStatic',
					config: {
						min: 250,
						max: 290,
					},
				},
				{
					type: 'blendMode',
					config: {
						blendMode: 'screen',
					},
				},
				{
					type: 'spawnShape',
					config: {
						type: 'rect',
						data: {
							w: 1,
							h: 1,
							x: 0,
							y: 0,
						},
					},
				},
				{
					type: 'textureRandom',
					config: {
						textures: [
							Assets.get('fire_01.png'),
							Assets.get('fire_02.png'),
						],
					},
				},
			],
		});

		this.emitter2 = new Emitter(this.particlesContainer, {
			lifetime: {
				min: 0.2,
				max: 0.3,
			},
			frequency: 0.001,
			spawnChance: 1,
			maxParticles: 2,
			pos: {
				x: 0,
				y: 0,
			},
			addAtBack: true,
			behaviors: [
				{
					type: 'alpha',
					config: {
						alpha: {
							list: [
								{
									value: 1,
									time: 0,
								},
								{
									value: 0,
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'scale',
					config: {
						scale: {
							list: [
								{
									value: 0.2,
									time: 0,
								},
								{
									value: 0,
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'color',
					config: {
						color: {
							list: [
								{
									value: 'ffb915',
									time: 0,
								},
								{
									value: 'ff770a',
									time: 1,
								},
							],
						},
					},
				},
				{
					type: 'moveSpeed',
					config: {
						speed: {
							list: [
								{
									value: 1500,
									time: 0,
								},
								{
									value: 50,
									time: 1,
								},
							],
							isStepped: false,
						},
					},
				},
				{
					type: 'rotation',
					config: {
						minStart: 250,
						maxStart: 280,
						minSpeed: -1,
						maxSpeed: 1,
						accel: 1000,
					},
				},
				{
					type: 'blendMode',
					config: {
						blendMode: 'screen',
					},
				},
				{
					type: 'spawnShape',
					config: {
						type: 'rect',
						data: {
							w: 1,
							h: 1,
							x: 0,
							y: 0,
						},
					},
				},
				{
					type: 'textureRandom',
					config: {
						textures: [
							Assets.get('flare_01.png'),
							Assets.get('circle_05.png'),
						],
					},
				},
			],
		});

		const { emitter1, emitter2, particlesContainer } = this;

		this.addChild(particlesContainer);

		emitter1.emit = true;
		emitter2.emit = true;

		this.app.ticker.add(this.onUpdate, this);

		this.onResize();
	}

	destroy(options?: boolean | IDestroyOptions | undefined): void {
		super.destroy(options);

		this.app.ticker.remove(this.onUpdate, this);
	}

	private onUpdate(dt: number) {
		const { emitter1, emitter2 } = this;

		emitter1.update(dt * 0.01);
		emitter2.update(dt * 0.01);
	}

	protected onResize() {
		super.onResize();

		const { app, particlesContainer } = this;

		particlesContainer.position.set(app.centerX, app.centerY);
	}
}
