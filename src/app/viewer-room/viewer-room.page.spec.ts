import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewerRoomPage } from './viewer-room.page';

describe('ViewerRoomPage', () => {
  let component: ViewerRoomPage;
  let fixture: ComponentFixture<ViewerRoomPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewerRoomPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewerRoomPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
