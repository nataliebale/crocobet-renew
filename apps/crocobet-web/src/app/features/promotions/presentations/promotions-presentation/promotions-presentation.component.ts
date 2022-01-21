import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { FilterItemView } from '@crc/components';
import { BannerWithCountDown } from '../../containers/promotions-container/bannerWithCountDown';

@Component({
  selector: 'crc-promotions-presentation',
  templateUrl: './promotions-presentation.component.html',
  styleUrls: ['./promotions-presentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromotionsPresentationComponent {
  @Input() promotions: BannerWithCountDown[];
  @Input() filterItems: FilterItemView[];
  @Output() selectedChange = new EventEmitter<string>();

  onSelectChange($event: string) {
    this.selectedChange.emit($event);
  }
}
