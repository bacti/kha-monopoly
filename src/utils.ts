import { AES, enc, format } from 'crypto-js';

export namespace Util {
  export const trace = (message: any) => {
    const logdiv = document.getElementById('log') as HTMLDivElement;
    const log = `${(window.performance.now() / 1000).toFixed(3)}: ${String(message)}\n`;
    console.warn(log);
    // logdiv.innerText = log + logdiv.innerText;
  };

  export const log = (message?: any, ...optionalParams: any[]) =>
    process.env.DEBUG && console.log(message, ...optionalParams);

  export const fixscreen = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  };

  export const requestFullscreen = (element: any) => {
    const request =
      element.requestFullscreen ||
      element.webkitRequestFullscreen ||
      element.mozRequestFullScreen ||
      element.msRequestFullscreen;
    request && request.apply(element);
  };

  export const random = (min: number, max: number) => ~~(Math.random() * (max - min)) + min;

  export function* shuffleGenerator(size: number) {
    const pool = [...Array(size)].map((_, i) => i);
    let poolRandom: number[] = [];
    while (true) {
      if (poolRandom.length === 0) {
        poolRandom = [...pool].sort(() => Math.random() - 0.5);
      }
      yield poolRandom.pop();
    }
  }

  export const encrypt = (message: string, key: string = String(AES.encrypt)) => {
    return AES.encrypt(message, key).toString(format.OpenSSL);
  };

  export const decrypt = (message: string, key: string = String(AES.encrypt)) => {
    return AES.decrypt(message, key).toString(enc.Utf8);
  };
}
