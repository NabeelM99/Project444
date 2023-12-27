import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateHallPage } from './update-hall.page';

describe('UpdateHallPage', () => {
  let component: UpdateHallPage;
  let fixture: ComponentFixture<UpdateHallPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(UpdateHallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
