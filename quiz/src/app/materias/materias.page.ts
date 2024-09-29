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
  IonInput,
  IonList

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
    ReactiveFormsModule,
    IonList
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

      this.router.navigate(['/materias-aceptar']);
    } else {
      console.log('Formulario inválido');
    }
  }
  ListaMaterias(){
    this.router.navigate(['/materias-aceptar']);
  }
}
