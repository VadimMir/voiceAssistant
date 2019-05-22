import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputVoiceComponent } from './input-voice.component';

describe('InputVoiceComponent', () => {
  let component: InputVoiceComponent;
  let fixture: ComponentFixture<InputVoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputVoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputVoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
