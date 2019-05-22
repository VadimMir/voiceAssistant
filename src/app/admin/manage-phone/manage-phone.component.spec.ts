import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePhoneComponent } from './manage-phone.component';

describe('ManagePhoneComponent', () => {
  let component: ManagePhoneComponent;
  let fixture: ComponentFixture<ManagePhoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePhoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePhoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
