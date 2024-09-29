import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonCardTitle,
  IonButton,
  AlertController,
  IonButtons,
  IonMenuButton,
  IonList,
  IonMenu,
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { Nota } from '../models/nota';
import { Materia } from '../models/materia';

@Component({
  selector: 'app-uno',
  templateUrl: './uno.page.html',
  styleUrls: ['./uno.page.scss'],
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
    IonCardContent,
    IonCardTitle,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonList,
    IonMenu,
  ],
})
export class UnoPage implements OnInit {
  notas: Nota[] = [];
  notasPrimerCorte: Nota[] = [];
  promedioSinMultiplicar: number = 0;
  promedioConMultiplicacion: number = 0;
  colorPromedio: string = '';

  constructor(
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.cargarNotas();
    this.calcularPromedios();
  }

  cargarNotas() {
    const materiaGuardada = localStorage.getItem('materiaSeleccionada');
    if (materiaGuardada) {
      const materia: Materia = JSON.parse(materiaGuardada);
      const notasGuardadas = localStorage.getItem(`notas_${materia.codigo}`);
      if (notasGuardadas) {
        this.notas = JSON.parse(notasGuardadas);
        this.notasPrimerCorte = this.notas.filter(
          (nota) => nota.corte === '- Primer Corte'
        );
      }
    }
  }

  calcularPromedios() {
    if (this.notasPrimerCorte.length === 0) {
      this.promedioSinMultiplicar = 0;
      this.promedioConMultiplicacion = 0;
      this.colorPromedio = 'black';
      return;
    }

    const sumaNotas = this.notasPrimerCorte.reduce(
      (total, nota) => total + nota.nota,
      0
    );
    this.promedioSinMultiplicar = sumaNotas / this.notasPrimerCorte.length;
    this.promedioConMultiplicacion = this.promedioSinMultiplicar * 0.2;

    this.colorPromedio = this.promedioSinMultiplicar >= 3.0 ? 'green' : 'red';
  }

  async confirmarEliminacionTodas() {
    const alert = await this.alertController.create({
      header: 'Confirmar Eliminación',
      message: `¿Estás seguro de que deseas eliminar todas las notas de este corte?`,
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
            this.eliminarNotas();
          },
        },
      ],
    });

    await alert.present();
  }

  eliminarNotas() {
    this.notas = this.notas.filter((nota) => nota.corte !== '- Primer Corte');
    this.notasPrimerCorte = []; // Actualizar la lista de notas del primer corte
    localStorage.setItem(
      `notas_${
        JSON.parse(localStorage.getItem('materiaSeleccionada')!).codigo
      }`,
      JSON.stringify(this.notas)
    ); // Guardar cambios en localStorage
    this.calcularPromedios(); // Recalcular promedios después de eliminar
    console.log('Todas las notas del primer corte han sido eliminadas.');
  }

  VolverANota() {
    this.router.navigate(['/segundo-veinte']);
  }
}
