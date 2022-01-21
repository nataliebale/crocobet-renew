import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotCasinoMultiPlayerContainerComponent } from './slot-casino-multi-player-container.component';

describe('GameSplitScreenComponent', () => {
  let component: SlotCasinoMultiPlayerContainerComponent;
  let fixture: ComponentFixture<SlotCasinoMultiPlayerContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlotCasinoMultiPlayerContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlotCasinoMultiPlayerContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
