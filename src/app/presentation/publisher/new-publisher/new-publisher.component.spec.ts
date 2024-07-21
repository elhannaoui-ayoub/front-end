import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPublisherComponent } from './new-publisher.component';

describe('NewPublisherComponent', () => {
  let component: NewPublisherComponent;
  let fixture: ComponentFixture<NewPublisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPublisherComponent]
    });
    fixture = TestBed.createComponent(NewPublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
