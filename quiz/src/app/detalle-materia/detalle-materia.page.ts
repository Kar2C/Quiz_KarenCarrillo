import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonMenu,
  IonButton,
  IonButtons,
  IonMenuButton,
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-detalle-materia',
  templateUrl: './detalle-materia.page.html',
  styleUrls: ['./detalle-materia.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonMenu,
    IonButton,
    RouterModule,
    IonButtons,
    IonMenuButton,
  ],
})
export class DetalleMateriaPage implements OnInit {
  materiaSeleccionada!: Materia;

  constructor(private router: Router) {}

  ngOnInit() {
    const materiaGuardada = localStorage.getItem('materiaSeleccionada');
    if (materiaGuardada) {
      this.materiaSeleccionada = JSON.parse(materiaGuardada);
    } else {
      console.error('No se encontró materia seleccionada en el localStorage');
    }
  }

  modificarMateria() {
    if (this.materiaSeleccionada) {
      localStorage.setItem('materiaAModificar', JSON.stringify(this.materiaSeleccionada));
      this.router.navigate(['/modificar-materia']);
    } else {
      console.error('Materia seleccionada no disponible para modificar');
    }
  }
}
