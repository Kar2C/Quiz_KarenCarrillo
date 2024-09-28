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
  AlertController,
} from '@ionic/angular/standalone';
import { Materia } from '../models/materia';
import { Nota } from '../models/nota';

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
  notas: Nota[] = [];
  promedio: number = 0;
  mensaje: string = '';
  colorMensaje: string = '';

  constructor(private router: Router, private alertController: AlertController) {} //muestra las alertas al usuario

  ngOnInit() {
    const materiaGuardada = localStorage.getItem('materiaSeleccionada');
    if (materiaGuardada) {
      this.materiaSeleccionada = JSON.parse(materiaGuardada);
      this.cargarNotas();
      this.calcularPromedio();
    } else {
      console.error('No se encontró materia seleccionada en el localStorage');
    }
  }

  cargarNotas() {
    const notasGuardadas = localStorage.getItem(`notas_${this.materiaSeleccionada.codigo}`);
    if (notasGuardadas) {
      this.notas = JSON.parse(notasGuardadas);
    }
  }

  calcularPromedio() {
    if (this.notas.length === 0) {
      this.promedio = 0;
      this.mensaje = 'No hay notas registradas';
      this.colorMensaje = 'black';
      return;
    }

    const sumaNotas = this.notas.reduce((total, nota) => total + nota.nota, 0);
    this.promedio = sumaNotas / this.notas.length;

    if (this.promedio < 3.0) {
      this.mensaje = 'MATERIA PERDIDA';
      this.colorMensaje = 'red';
    } else {
      this.mensaje = 'Materia Aprobada';
      this.colorMensaje = 'green';
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

  agregarNotas() {
    this.router.navigate(['/notas-aceptar']);
  }

  async confirmarEliminacion() {
    if (this.notas.length > 0) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'No puede eliminar esta materia porque tiene notas registradas.',
        buttons: ['Aceptar'],
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Confirmar Eliminación',
        message: `¿Estás seguro de que deseas eliminar la materia "${this.materiaSeleccionada.nombre}"?`,
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
              // Llama al método de eliminar en MateriasAceptarPage
              this.eliminarMateria(this.materiaSeleccionada.codigo);
            },
          },
        ],
      });

      await alert.present();
    }
  }

  eliminarMateria(codigo: string) {
    const materiasGuardadas = localStorage.getItem('materias');
    if (materiasGuardadas) {
      const materias: Materia[] = JSON.parse(materiasGuardadas);
      const materiasActualizadas = materias.filter(materia => materia.codigo !== codigo);
      localStorage.setItem('materias', JSON.stringify(materiasActualizadas));

      console.log(`Materia "${this.materiaSeleccionada.nombre}" eliminada.`);
      this.router.navigate(['/materias-aceptar']); 
    }
  }
  ListaMaterias(){
    this.router.navigate(['/materias-aceptar']); 

  }
  ListaNotas(){
    this.router.navigate(['/segundo-veinte']); 
  }
}