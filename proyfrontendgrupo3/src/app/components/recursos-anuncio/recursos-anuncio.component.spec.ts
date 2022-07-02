import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosAnuncioComponent } from './recursos-anuncio.component';

describe('RecursosAnuncioComponent', () => {
  let component: RecursosAnuncioComponent;
  let fixture: ComponentFixture<RecursosAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursosAnuncioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
