import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlotCasinoMultiPlayerOneFramePresentationComponent } from './slot-casino-multi-player-one-frame-presentation.component';

describe('GameFrameComponent', () => {
  let component: SlotCasinoMultiPlayerOneFramePresentationComponent;
  let fixture: ComponentFixture<SlotCasinoMultiPlayerOneFramePresentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SlotCasinoMultiPlayerOneFramePresentationComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(
      SlotCasinoMultiPlayerOneFramePresentationComponent
    );
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
