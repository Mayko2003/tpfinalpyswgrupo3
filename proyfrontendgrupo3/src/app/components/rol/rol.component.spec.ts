import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolComponent } from './rol.component';

describe('RolComponent', () => {
  let component: RolComponent;
  let fixture: ComponentFixture<RolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
