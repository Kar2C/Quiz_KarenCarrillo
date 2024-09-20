import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
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
  IonInput

} from '@ionic/angular/standalone';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-materias',
  templateUrl: './materias.page.html',
  styleUrls: ['./materias.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonMenu,
    IonButton,
    RouterModule,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput,
    ReactiveFormsModule
  ],
})

export class MateriasPage implements OnInit {

  materiasForm!: FormGroup;
  materiasArray: Materia[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.materiasForm = this.fb.group({
      nombre: ['', Validators.required],
      semestre: ['', Validators.required],
      codigo: ['', Validators.required],
      horario: ['', Validators.required],
      observaciones: ['']
    });

    // Cargar materias previamente guardadas del localStorage
    const materiasGuardadas = localStorage.getItem('materias');
    if (materiasGuardadas) {
      this.materiasArray = JSON.parse(materiasGuardadas);
    }
  }

  agregarMateria() {
    if (this.materiasForm.valid) {
      const nuevaMateria: Materia = this.materiasForm.value;
      this.materiasArray.push(nuevaMateria);

      // Guardar el array actualizado en localStorage
      localStorage.setItem('materias', JSON.stringify(this.materiasArray));

      // Guardar la nueva materia en localStorage para ser seleccionada automáticamente
      localStorage.setItem('materiaSeleccionada', JSON.stringify(nuevaMateria));

      // Navegar automáticamente a la página de aceptación de materias
      this.router.navigate(['/materias-aceptar']);
    } else {
      console.log('Formulario inválido');
    }
  }
}
