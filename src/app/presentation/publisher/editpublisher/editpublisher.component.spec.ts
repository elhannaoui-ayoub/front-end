import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditpublisherComponent } from './editpublisher.component';

describe('EditpublisherComponent', () => {
  let component: EditpublisherComponent;
  let fixture: ComponentFixture<EditpublisherComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditpublisherComponent]
    });
    fixture = TestBed.createComponent(EditpublisherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
