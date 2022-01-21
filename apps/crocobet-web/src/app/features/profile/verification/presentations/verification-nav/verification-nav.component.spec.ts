import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerificationNavComponent } from './verification-nav.component';

describe('VerificationNavComponent', () => {
  let component: VerificationNavComponent;
  let fixture: ComponentFixture<VerificationNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerificationNavComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerificationNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
