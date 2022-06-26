import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormAnunciosComponent } from './form-anuncios.component';

describe('FormAnunciosComponent', () => {
  let component: FormAnunciosComponent;
  let fixture: ComponentFixture<FormAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
