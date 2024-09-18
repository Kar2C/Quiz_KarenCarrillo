/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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
    FormsModule,
    ReactiveFormsModule, // Importar ReactiveFormsModule
    IonMenu,
    IonButton,
    RouterModule,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput
  ],
})
export class MateriasPage implements OnInit {
  materiaForm: FormGroup;
  materias: any[] = []; // Array para almacenar las materias

  constructor() {
    // Inicializar FormGroup y FormControl con validadores
    this.materiaForm = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      semestre: new FormControl('', [Validators.required]),
      codigo: new FormControl('', [Validators.required]),
      horario: new FormControl('', [Validators.required]),
      observaciones: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {}

  agregarMateria() {
    if (this.materiaForm.valid) {
      this.materias.push(this.materiaForm.value);
      console.log(this.materias); // Verificar el array en la consola
      this.materiaForm.reset(); // Limpiar el formulario después de agregar
    }
  }
}
