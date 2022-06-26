import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncargadoAnunciosComponent } from './encargado-anuncios.component';

describe('EncargadoAnunciosComponent', () => {
  let component: EncargadoAnunciosComponent;
  let fixture: ComponentFixture<EncargadoAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncargadoAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EncargadoAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
