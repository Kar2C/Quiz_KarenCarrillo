import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NotasAceptarPage } from './notas-aceptar.page';

describe('NotasAceptarPage', () => {
  let component: NotasAceptarPage;
  let fixture: ComponentFixture<NotasAceptarPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(NotasAceptarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
