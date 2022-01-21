import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FilterItemView } from './entity/types';

@Component({
  selector: 'crc-shared-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  @ViewChild('dropdown') private dropdownContent: ElementRef;

  @Input() filterItems: FilterItemView[] = [];
  @Input() extendable = false;
  @Output() selectedChange = new EventEmitter<string>();

  public showDropdown: boolean;
  private ddHeight: string;

  onSelect(item: FilterItemView) {
    if (!item.active) {
      this.selectedChange.emit(item.filter);
    }
  }

  onSeeMoreBtnClick() {
    this.ddHeight = this.dropdownContent.nativeElement.offsetHeight;
    this.showDropdown = !this.showDropdown;
  }

  getDropdownHeight(): string {
    if (!this.extendable) {
      return 'auto';
    }
    return this.showDropdown ? `${this.ddHeight}px` : '52px';
  }

  get title(): string {
    return this.showDropdown ? 'See Less' : 'See More';
  }
}
