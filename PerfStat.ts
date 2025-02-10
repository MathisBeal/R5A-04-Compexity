export class PerfStat {

  static dStart: DOMHighResTimeStamp;
  static dEnd: DOMHighResTimeStamp;
  private start: DOMHighResTimeStamp;
  private end: DOMHighResTimeStamp;

  static creatingData() {
    console.log('Creating data...');
    this.dStart = performance.now();
  }

  static dataCreated() {
    this.dEnd = performance.now();
    console.log(`Data created in ${PerfStat.formatTime(this.dEnd - this.dStart)} !`);
  }

  constructor() {
    this.start = performance.now();
  }

  begin() {
    this.start = performance.now();
  }

  finish(str: string) {
    this.end = performance.now();
    if (str) {
      console.log(`${str}: elapsed time ${PerfStat.formatTime(this.end - this.start)}`);
    } else {
      console.log(`Elapsed time ${PerfStat.formatTime(this.end - this.start)}`);
    }
  }

  static formatTime(timeMS) {
    let ms;
    let s;
    let min;

    if (timeMS >= 60000) {
      min = Math.floor(timeMS / 60000);
      timeMS = timeMS % 60000;
    }
    if (timeMS >= 1000) {
      s = Math.floor(timeMS / 1000);
      timeMS = timeMS % 1000;
    }
    ms = timeMS;

    return (min ? min + 'min ' : '') + (s ? s + 's ' : '') + ms + 'ms';
  }

  static testPassed(bool) {
    console.log(bool ? '✅  Test passed' : '❌  Test failed');
  }
}