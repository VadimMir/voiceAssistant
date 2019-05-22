import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhonesComponent } from './manage-phones.component';

describe('ManagePhonesComponent', () => {
  let component: ManagePhonesComponent;
  let fixture: ComponentFixture<ManagePhonesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePhonesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhonesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
