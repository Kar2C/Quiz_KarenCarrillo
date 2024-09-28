import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetalleNotaPage } from './detalle-nota.page';

describe('DetalleNotaPage', () => {
  let component: DetalleNotaPage;
  let fixture: ComponentFixture<DetalleNotaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleNotaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
