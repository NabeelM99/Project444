import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PasswordValidatorPage } from './password-validator.page';

describe('PasswordValidatorPage', () => {
  let component: PasswordValidatorPage;
  let fixture: ComponentFixture<PasswordValidatorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(PasswordValidatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
