import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegundoVeintePage } from './segundo-veinte.page';

describe('SegundoVeintePage', () => {
  let component: SegundoVeintePage;
  let fixture: ComponentFixture<SegundoVeintePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SegundoVeintePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
