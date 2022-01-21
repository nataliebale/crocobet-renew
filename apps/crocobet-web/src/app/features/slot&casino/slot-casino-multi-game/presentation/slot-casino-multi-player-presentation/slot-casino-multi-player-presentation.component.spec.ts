import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotCasinoMultiPlayerPresentationComponent } from './slot-casino-multi-player-presentation.component';

describe('GameFrameSplitComponent', () => {
  let component: SlotCasinoMultiPlayerPresentationComponent;
  let fixture: ComponentFixture<SlotCasinoMultiPlayerPresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlotCasinoMultiPlayerPresentationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SlotCasinoMultiPlayerPresentationComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
