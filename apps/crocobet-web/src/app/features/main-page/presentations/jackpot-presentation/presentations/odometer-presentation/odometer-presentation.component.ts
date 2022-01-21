import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
} from '@angular/core';
import { OdometerData, OdometerDigit, SlotsFiltersFacade } from '@crc/facade';
import { Router } from '@angular/router';

@Component({
  selector: 'crc-odometer-presentation',
  templateUrl: './odometer-presentation.component.html',
  styleUrls: ['./odometer-presentation.component.scss']
})
export class OdometerPresentationComponent implements AfterViewInit, OnDestroy {
  @ViewChild('odometer') odometerRef: ElementRef;
  @Input() drawSeparator = true;
  @Output() animationFinished: EventEmitter<null> = new EventEmitter();
  digits: Array<OdometerDigit> = [];
  dataRefreshRate: number;
  digitCount: number;
  _startNumber: string;
  _endNumber: string;
  rotationDuration: number;
  firstDigitInterval: number;

  dataIsChanged: boolean;
  prevDataWasEmpty: boolean;
  odometerDataChanges: any;

  constructor(
    private readonly renderer: Renderer2,
    private readonly router: Router,
    private readonly slotsFiltersFacade: SlotsFiltersFacade
  ) {}

  @Input() set data(odometerData: OdometerData) {
    this.odometerDataChanges = odometerData;
    this.dataIsChanged =
      this._endNumber !==
      this.formatNumber(odometerData.endNumber, odometerData.digitCount);
    this.prevDataWasEmpty =
      this._startNumber && this._endNumber === this._startNumber;
    if ((this.dataIsChanged || this.prevDataWasEmpty) && this.odometerRef) {
      this.initVariables(odometerData);
      this.cleanUp();
      this.start();
    }
  }

  ngAfterViewInit() {
    if ((this.dataIsChanged || this.prevDataWasEmpty) && this.odometerRef) {
      this.initVariables(this.odometerDataChanges);
      this.cleanUp();
      this.start();
    }
  }

  ngOnDestroy(): void {
    if (this.firstDigitInterval) {
      window.clearInterval(this.firstDigitInterval);
    }
  }

  isDigitEmpty(number: string, index: number): boolean {
    // If every digit in first index + 1 chars are 0's then they
    // shouldn't be rendered as 0, instead, they should be empty
    const prefix: string = number.substr(0, index + 1);
    return !prefix.split('').find((char) => char !== '0');
  }

  requestData(): void {
    this.animationFinished.emit();
  }

  getNextNumber(number: number): number {
    return (number + 1) % 10;
  }

  getRotationCount(
    startNumber: string,
    endNumber: string,
    index: number
  ): number {
    const startNumberSubstr: string = startNumber.substr(0, index + 1);
    const endNumberSubstr: string = endNumber.substr(0, index + 1);

    return Number(endNumberSubstr) - Number(startNumberSubstr);
  }

  private initVariables(odometerData: OdometerData): void {
    this.digitCount = odometerData.digitCount;
    this._startNumber = this.formatNumber(
      odometerData.startNumber,
      this.digitCount
    );
    this._endNumber = this.formatNumber(
      odometerData.endNumber,
      this.digitCount
    );
    this.dataRefreshRate = odometerData.dataRefreshRate;
  }

  private cleanUp(): void {
    const shouldCleanUp: boolean =
      this.odometerRef &&
      this.odometerRef.nativeElement &&
      this.digits.length > 0;
    if (shouldCleanUp) {
      this.digits.forEach((digit) => this.removeDigit(digit.div));
    }
    if (this.firstDigitInterval) {
      window.clearInterval(this.firstDigitInterval);
    }
  }

  private start(): void {
    const rotationCount: number = this.getRotationCount(
      this._startNumber,
      this._endNumber,
      this.digitCount - 1
    );
    this.rotationDuration = this.dataRefreshRate / rotationCount;
    this.digits = this.getDigits(
      this.digitCount,
      this._startNumber,
      this._endNumber,
      this.dataRefreshRate
    );
    this.initialRender(this.digits);

    if (rotationCount > 0) {
      this.firstDigitInterval = window.setInterval(
        () => this.updateFirstDigit(),
        this.rotationDuration
      );
    } else {
      window.setTimeout(() => this.requestData(), this.dataRefreshRate);
    }
  }

  private formatNumber(n: number, digitCount: number): string {
    let result: string = '' + n;

    while (result.length < digitCount) {
      result = '0' + result;
    }

    return result;
  }

  private getDigits(
    digitCount: number,
    startNumber: string,
    endNumber: string,
    rotationDuration: number
  ): Array<OdometerDigit> {
    const digits: Array<OdometerDigit> = [];

    for (let i = 0; i < digitCount; i++) {
      const curr = Number(startNumber[i]);
      const next: number = this.getNextNumber(Number(startNumber[i]));
      const totalRotationCount: number = this.getRotationCount(
        startNumber,
        endNumber,
        i
      );
      const currRotationIndex = 0;

      const isDivEmpty: boolean = this.isDigitEmpty(startNumber, i);
      const div = isDivEmpty
        ? this.getEmptyDigit()
        : this.digitToElement(curr, next, rotationDuration, false);

      const digit: OdometerDigit = {
        curr,
        next,
        totalRotationCount,
        currRotationIndex,
        div
      };

      digits.push(digit);
    }
    return digits;
  }

  private initialRender(digits: Array<OdometerDigit>): void {
    digits.forEach((digit) =>
      this.renderer.appendChild(this.odometerRef.nativeElement, digit.div)
    );
  }

  private getEmptyDigit(): HTMLDivElement {
    const digitWrapper: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(digitWrapper, 'digit__wrapper');
    this.renderer.addClass(digitWrapper, 'digit__wrapper--position');
    this.renderer.addClass(digitWrapper, 'digit__wrapper--empty-d');

    const digits: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(digits, 'digits');
    this.renderer.addClass(digits, 'digits--position');

    this.renderer.appendChild(digitWrapper, digits);

    return digitWrapper;
  }

  private digitToElement(
    currNumber: number,
    nextNumber: number,
    rotationDuration: number,
    shouldRotate: boolean
  ): HTMLDivElement {
    const digitWrapper: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(digitWrapper, 'digit__wrapper');
    this.renderer.addClass(digitWrapper, 'digit__wrapper--position');

    const digitWrapperInner: HTMLDivElement =
      this.renderer.createElement('div');
    this.renderer.addClass(digitWrapperInner, 'digit__wrapper--inner');
    this.renderer.addClass(digitWrapperInner, 'overflow-hidden');
    if (this.drawSeparator) {
      this.renderer.addClass(digitWrapperInner, 'digit__separator');
    }

    const digits: HTMLDivElement = this.renderer.createElement('div');
    this.renderer.addClass(digits, 'digits');
    this.renderer.addClass(digits, 'od-digits-d');
    this.renderer.addClass(digits, 'digits--position');

    if (shouldRotate) {
      this.renderer.addClass(digits, 'digitAnimation');
      this.renderer.setStyle(
        digits,
        'animation-duration',
        rotationDuration + 'ms'
      );
    }

    const curr: HTMLSpanElement = this.renderer.createElement('span');
    this.renderer.addClass(curr, 'digit');
    this.renderer.addClass(curr, 'digit--position');
    const currNumberText = this.renderer.createText('' + currNumber);
    this.renderer.appendChild(curr, currNumberText);

    const next: HTMLSpanElement = this.renderer.createElement('span');
    this.renderer.addClass(next, 'digit');
    this.renderer.addClass(next, 'digit--position');
    const nextNumberText = this.renderer.createText('' + nextNumber);
    this.renderer.appendChild(next, nextNumberText);

    this.renderer.appendChild(digits, curr);
    this.renderer.appendChild(digits, next);

    this.renderer.appendChild(digitWrapperInner, digits);
    this.renderer.appendChild(digitWrapper, digitWrapperInner);

    return digitWrapper;
  }

  private updateFirstDigit(): void {
    const firstDigitIndex: number = this.digitCount - 1;
    const prevDigit: OdometerDigit = this.digits[firstDigitIndex];
    const shouldRotate: boolean =
      prevDigit.currRotationIndex < prevDigit.totalRotationCount;

    if (shouldRotate) {
      this.updateDigit(firstDigitIndex);
    } else {
      window.clearInterval(this.firstDigitInterval);
      this.requestData();
    }
  }

  private updateDigit(index: number): void {
    const prevDigit: OdometerDigit = this.digits[index];

    const shouldRotate: boolean =
      prevDigit.currRotationIndex < prevDigit.totalRotationCount;
    if (shouldRotate) {
      const curr: number = prevDigit.next;
      const next: number = this.getNextNumber(curr);

      const totalRotationCount: number = prevDigit.totalRotationCount;
      const currRotationIndex = prevDigit.currRotationIndex + 1;

      const div = this.digitToElement(
        prevDigit.curr,
        prevDigit.next,
        this.rotationDuration,
        true
      );

      const newDigit: OdometerDigit = {
        curr,
        next,
        totalRotationCount,
        currRotationIndex,
        div
      };

      this.digits[index] = newDigit;

      this.removeDigit(prevDigit.div);
      this.insertDigit(index, newDigit.div);

      const hasNextDigit: boolean = this.digitCount > 0;
      const nextDigitShouldRotate: boolean = curr === 0;
      if (hasNextDigit && nextDigitShouldRotate) {
        this.updateDigit(index - 1);
      }
    }
  }

  private removeDigit(digitElement: HTMLDivElement): void {
    this.renderer.removeChild(this.odometerRef.nativeElement, digitElement);
  }

  private insertDigit(index: number, digitElement: HTMLDivElement): void {
    if (index === this.digitCount - 1) {
      this.renderer.appendChild(this.odometerRef.nativeElement, digitElement);
    } else {
      this.renderer.insertBefore(
        this.odometerRef.nativeElement,
        digitElement,
        this.digits[index + 1].div
      );
    }
  }
}
