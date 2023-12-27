import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHallPage } from './view-hall.page';

describe('ViewHallPage', () => {
  let component: ViewHallPage;
  let fixture: ComponentFixture<ViewHallPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewHallPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
