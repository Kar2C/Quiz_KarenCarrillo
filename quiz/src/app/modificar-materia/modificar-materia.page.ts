import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonLabel,
  IonItem,
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-modificar-materia',
  templateUrl: './modificar-materia.page.html',
  styleUrls: ['./modificar-materia.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenu,
    IonButton,
    IonButtons,
    IonMenuButton,
    RouterModule,
    IonCard,
    IonCardContent,
    ReactiveFormsModule,
    IonInput,
    IonLabel,
    IonItem,
  ],
})
export class ModificarMateriaPage implements OnInit {
  modificarMateriaForm!: FormGroup;
  materiaActual!: Materia;

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    const materiaStr = localStorage.getItem('materiaAModificar');
    if (materiaStr) {
      this.materiaActual = JSON.parse(materiaStr);
    }

    this.modificarMateriaForm = this.fb.group({
      nombre: [this.materiaActual?.nombre, Validators.required],
      semestre: [this.materiaActual?.semestre, Validators.required],
      codigo: [this.materiaActual?.codigo, Validators.required],
      horario: [this.materiaActual?.horario, Validators.required],
      observaciones: [this.materiaActual?.observaciones || ''],
    });
  }

  guardarCambios() {
    if (this.modificarMateriaForm.valid) {
      const materiasGuardadas = JSON.parse(localStorage.getItem('materias') || '[]');
      const indice = materiasGuardadas.findIndex((materia: Materia) => materia.codigo === this.materiaActual.codigo);
      if (indice > -1) {
        materiasGuardadas[indice] = this.modificarMateriaForm.value;
        localStorage.setItem('materias', JSON.stringify(materiasGuardadas));
      }

      this.router.navigate(['/materias-aceptar']);
    }
  }
}
