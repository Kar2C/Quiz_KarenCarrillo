import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton,
  IonInput,
  IonCardHeader,
  IonCardTitle,
  IonAlert,
  AlertController,
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota';
import { Materia } from '../models/materia';
import { Router } from '@angular/router';

@Component({
  selector: 'app-segundo-veinte',
  templateUrl: './segundo-veinte.page.html',
  styleUrls: ['./segundo-veinte.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    IonCard,
    IonCardContent,
    IonButton,
    IonInput,
    IonCardHeader,
    IonCardTitle,
    RouterModule,
    IonAlert,
  ],
})
export class SegundoVeintePage implements OnInit {
  notas: Nota[] = [];
  materiaSeleccionada!: Materia;

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarNotas();
  }

  ionViewWillEnter() {
    this.cargarNotas();
  }

  cargarNotas() {
    const materiaGuardada = localStorage.getItem('materiaSeleccionada');
    if (materiaGuardada) {
      this.materiaSeleccionada = JSON.parse(materiaGuardada);
      const notasGuardadas = localStorage.getItem(
        `notas_${this.materiaSeleccionada.codigo}`
      );
      if (notasGuardadas) {
        this.notas = JSON.parse(notasGuardadas);
      }
    }
  }

  async confirmarEliminacion(nota: Nota) {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar la nota "${nota.descripcion}"?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          },
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.eliminarNota(nota);
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarNota(notaAEliminar: Nota) {
    // Filtra las notas para eliminar la seleccionada
    this.notas = this.notas.filter((nota) => nota !== notaAEliminar);
    // Actualiza el localStorage
    localStorage.setItem(
      `notas_${this.materiaSeleccionada.codigo}`,
      JSON.stringify(this.notas)
    );

    console.log(`Nota "${notaAEliminar.descripcion}" eliminada.`);
  }

  modificarNota(nota: Nota) {
    localStorage.setItem('notaAModificar', JSON.stringify(nota));
    this.router.navigate(['/modificar-nota']);
  }

  VolverANota() {
    this.router.navigate(['/detalle-materia']);
  }

  irAPrimerVeinte() {
    this.router.navigate(['/uno']);
  }

  irASegundoVeinte(){
    this.router.navigate(['/dos']);
  }

  irATercerVeinte(){
    this.router.navigate(['/tres']);
  }

  irACuarenta(){
    this.router.navigate(['/cuatro']);

  }
}
