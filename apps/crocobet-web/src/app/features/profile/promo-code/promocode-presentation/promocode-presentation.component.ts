import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { EnteredCaptchaModel, PersonalData } from '@crc/facade';

@Component({
  selector: 'crc-w-promocode-presentation',
  templateUrl: './promocode-presentation.component.html',
  styleUrls: ['./promocode-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromocodePresentationComponent {
  @Input() promoCode: FormControl;
  @Input() personalData: PersonalData;

  @Input() captchaCode: string;
  @Input() enteredCaptchaValid: boolean;
  @Output() getCaptcha: EventEmitter<string> = new EventEmitter<string>();
  @Output() captchaClose$: EventEmitter<void> = new EventEmitter();
  @Output() captchaUpdated$: EventEmitter<string> = new EventEmitter();
  @Output() checkCaptchaValidity$: EventEmitter<EnteredCaptchaModel> =
    new EventEmitter();
  @Output() submitCaptcha: EventEmitter<Event> = new EventEmitter<Event>();

  showCaptcha: boolean;

  onGetCaptcha() {
    this.showCaptcha = true;
    this.getCaptcha.emit(this.personalData.loginName);
  }

  onCaptchaClose() {
    this.showCaptcha = false;
    this.captchaClose$.emit();
  }

  onCaptchaUpdated(loginName: string) {
    this.captchaUpdated$.emit(loginName);
  }

  onCheckCaptchaValidity(captcha: string) {
    this.checkCaptchaValidity$.emit({
      login: this.personalData.loginName,
      captcha
    });
  }

  onEnterCaptchaValidValue(event) {
    this.showCaptcha = false;
    this.submitCaptcha.emit(event);
  }

  onCaptchaClosed() {
    this.captchaClose$.emit();
  }
}
