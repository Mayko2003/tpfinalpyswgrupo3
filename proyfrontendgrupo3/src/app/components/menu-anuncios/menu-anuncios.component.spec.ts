import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAnunciosComponent } from './menu-anuncios.component';

describe('MenuAnunciosComponent', () => {
  let component: MenuAnunciosComponent;
  let fixture: ComponentFixture<MenuAnunciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuAnunciosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuAnunciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
