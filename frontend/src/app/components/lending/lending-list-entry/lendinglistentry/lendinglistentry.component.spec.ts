import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LendinglistentryComponent } from './lendinglistentry.component';

describe('LendinglistentryComponent', () => {
  let component: LendinglistentryComponent;
  let fixture: ComponentFixture<LendinglistentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LendinglistentryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LendinglistentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
