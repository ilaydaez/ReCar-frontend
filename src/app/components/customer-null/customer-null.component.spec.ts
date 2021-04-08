import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNullComponent } from './customer-null.component';

describe('CustomerNullComponent', () => {
  let component: CustomerNullComponent;
  let fixture: ComponentFixture<CustomerNullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomerNullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
