import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateMarkerComponent } from './update-marker.component';

describe('UpdateMarkerComponent', () => {
  let component: UpdateMarkerComponent;
  let fixture: ComponentFixture<UpdateMarkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateMarkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateMarkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
