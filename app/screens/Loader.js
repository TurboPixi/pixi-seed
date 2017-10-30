import { Container, loader, Graphics } from 'pixi.js';
import Store from '../stores/Store';

/**
 * Loading Screen
 *
 * @exports LoaderScreen
 * @extends ScaledContainer
 */

export default class LoaderScreen extends Container {

  constructor() {
    const { canvasWidth, canvasHeight } = Store.getState().Renderer;

    super();

    this.loader = loader;
    this.done = ()=>{};

    // set up a bar
    this.bar = new Graphics().beginFill(0xFF0000).drawRect(0,-2.5,100,5);
    this.bar.x = (canvasWidth / 2) - 50;
    this.bar.y = canvasHeight / 2;
    this.bar.scale.x = 0;
    this.progress = 0;

    this.addChild(this.bar);
  }

  start(assets = []) {
    loader.add(assets);
    loader.load();
    loader.onProgress.add(this.onUpdate.bind(this));
    loader.onComplete.add(this.onComplete.bind(this));
  }

  onUpdate(ldr) {
    this.progress = ldr.progress;
    this.bar.scale.x = ldr.progress / 100;
  }

  onComplete() {
    this.done();
  }

  onLoaded(callback = ()=>{}) {
    this.done = callback;
  }

}
