/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';


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
  IonMenu
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
    FormsModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonMenu,
    RouterModule
  ],
})

export class MateriasAceptarPage implements OnInit {
  materias: Materia[] = []; // Usa la interfaz Materia

  constructor(private materiasService: MateriasService) {}

  ngOnInit() {
    this.materias = this.materiasService.getMaterias();
  }
}