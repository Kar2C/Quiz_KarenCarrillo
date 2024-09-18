import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MateriasAceptarPage } from './materias-aceptar.page';

describe('MateriasAceptarPage', () => {
  let component: MateriasAceptarPage;
  let fixture: ComponentFixture<MateriasAceptarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MateriasAceptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
