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
  IonMenu,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-notas-aceptar',
  templateUrl: './notas-aceptar.page.html',
  styleUrls: ['./notas-aceptar.page.scss'],
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
export class NotasAceptarPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
