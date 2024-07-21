import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorslistComponent } from './authorslist.component';

describe('AuthorslistComponent', () => {
  let component: AuthorslistComponent;
  let fixture: ComponentFixture<AuthorslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AuthorslistComponent]
    });
    fixture = TestBed.createComponent(AuthorslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
