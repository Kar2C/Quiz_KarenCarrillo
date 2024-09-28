import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ModificarMateriaPage } from './modificar-materia.page';

describe('ModificarMateriaPage', () => {
  let component: ModificarMateriaPage;
  let fixture: ComponentFixture<ModificarMateriaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ModificarMateriaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
