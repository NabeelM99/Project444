import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewHallHistoryPage } from './view-hall-history.page';

describe('ViewHallHistoryPage', () => {
  let component: ViewHallHistoryPage;
  let fixture: ComponentFixture<ViewHallHistoryPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ViewHallHistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
