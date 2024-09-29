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
import { Nota } from '../models/nota';

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

  ionViewWillEnter(){
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

  obtenerEstadoMateria(materia: Materia): string {
    const notasGuardadas = localStorage.getItem(`notas_${materia.codigo}`);
    const notas: Nota[] = notasGuardadas ? JSON.parse(notasGuardadas) : [];

    if (notas.length === 0) {
      return 'No hay notas registradas';
    }

    const promedio = notas.reduce((total, nota) => total + nota.nota, 0) / notas.length;

    return promedio < 3.0 ? 'Materia Desaprobada' : 'Materia Aprobada';
  }

  obtenerColorMensaje(materia: Materia): string {
    const estado = this.obtenerEstadoMateria(materia);
    return estado === 'Materia Desaprobada' ? 'red' : estado === 'Materia Aprobada' ? 'green' : 'black';
  }

  eliminarMateria(codigo: string) {
    const materiasGuardadas = localStorage.getItem('materias');
    if (materiasGuardadas) {
      const materias: Materia[] = JSON.parse(materiasGuardadas);
      const materiasActualizadas = materias.filter(materia => materia.codigo !== codigo);
      localStorage.setItem('materias', JSON.stringify(materiasActualizadas));
      console.log(`Materia con código "${codigo}" eliminada.`);
    }
  }

  AgregarMateria() {
    this.router.navigate(['/materias']);
  }
}