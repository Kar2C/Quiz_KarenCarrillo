import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
  IonMenuButton,
  IonCard,
  IonCardContent,
  IonInput,
  IonMenu,
  IonCardHeader,
  IonCardTitle,
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-materias-aceptar',
  templateUrl: './materias-aceptar.page.html',
  styleUrls: ['./materias-aceptar.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonMenu,
    RouterModule,
    IonCardHeader,
    IonCardTitle,
    IonList,
    IonItem,
    IonLabel,
  ],
})

export class MateriasAceptarPage implements OnInit {
  materiasArray: Materia[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    // Recuperar las materias del localStorage
    const materiasGuardadas = localStorage.getItem('materias');
    this.materiasArray = materiasGuardadas ? JSON.parse(materiasGuardadas) : [];
  }

  verDetalle(materia: Materia) {
    // Guardar la materia seleccionada en localStorage para mostrar los detalles
    localStorage.setItem('materiaSeleccionada', JSON.stringify(materia));
    // Navegar a la página de detalle de la materia
    this.router.navigate(['/detalle-materia']);
  }
}