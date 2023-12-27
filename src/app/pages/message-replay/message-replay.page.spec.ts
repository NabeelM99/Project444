import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageReplayPage } from './message-replay.page';

describe('MessageReplayPage', () => {
  let component: MessageReplayPage;
  let fixture: ComponentFixture<MessageReplayPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(MessageReplayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
