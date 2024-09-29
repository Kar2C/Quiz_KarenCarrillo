import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonMenu,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonRouterOutlet,
  IonApp
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonMenu,
    IonList,
    IonItem,
    IonLabel,
    IonButton,
    RouterModule,
    IonRouterOutlet,
    IonApp
  ],
})

export class MenuPage implements OnInit {
  materiasArray: Materia[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarMaterias();
  }

  cargarMaterias() {
    const materiasGuardadas = localStorage.getItem('materias');
    this.materiasArray = materiasGuardadas ? JSON.parse(materiasGuardadas) : [];
  }

  verDetalle(materia: Materia) {
    localStorage.setItem('materiaSeleccionada', JSON.stringify(materia));
    this.router.navigate(['/detalle-materia']);
  }
}