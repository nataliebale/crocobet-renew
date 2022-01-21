import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  TemplateRef
} from '@angular/core';
import { sizeSettings } from './entity/popup-types';
import { scaleInAndOut } from '@crc/shared';

@Component({
  selector: 'crc-shared-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  animations: [scaleInAndOut(100)],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PopupComponent implements OnInit, OnDestroy {
  @Input() title?: string;
  @Input() size?: sizeSettings;
  @Input() content?: TemplateRef<any>;
  @Input() headerIcon?: string;

  @Output() closed: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
    document.body.classList.add('overflow-hidden');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('overflow-hidden');
  }

  closeModal() {
    this.closed.emit();
  }
}
