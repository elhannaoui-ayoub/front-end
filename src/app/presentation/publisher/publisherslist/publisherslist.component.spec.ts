import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublisherslistComponent } from './publisherslist.component';

describe('PublisherslistComponent', () => {
  let component: PublisherslistComponent;
  let fixture: ComponentFixture<PublisherslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PublisherslistComponent]
    });
    fixture = TestBed.createComponent(PublisherslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
