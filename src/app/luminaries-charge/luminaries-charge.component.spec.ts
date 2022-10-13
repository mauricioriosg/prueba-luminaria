import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuminariesChargeComponent } from './luminaries-charge.component';

describe('LuminariesChargeComponent', () => {
  let component: LuminariesChargeComponent;
  let fixture: ComponentFixture<LuminariesChargeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuminariesChargeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuminariesChargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
