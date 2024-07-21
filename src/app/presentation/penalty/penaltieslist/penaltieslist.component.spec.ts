import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenaltieslistComponent } from './penaltieslist.component';

describe('PenaltieslistComponent', () => {
  let component: PenaltieslistComponent;
  let fixture: ComponentFixture<PenaltieslistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PenaltieslistComponent]
    });
    fixture = TestBed.createComponent(PenaltieslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
