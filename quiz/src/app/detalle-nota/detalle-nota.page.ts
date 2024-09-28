import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonButton
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota';

@Component({
  selector: 'app-detalle-nota',
  templateUrl: './detalle-nota.page.html',
  styleUrls: ['./detalle-nota.page.scss'],
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
    RouterModule
  ],
})
export class DetalleNotaPage implements OnInit {
  notas: Nota[] = []; // Inicializar como un array de notas

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const materiaNombre = this.route.snapshot.paramMap.get('materiaNombre'); // Obtener el nombre de la materia
    const notasGuardadas = JSON.parse(localStorage.getItem('notas') || '[]');

    if (notasGuardadas.length > 0 && materiaNombre) {
      // this.notas = notasGuardadas.filter((nota: Nota) => nota.materiaNombre === materiaNombre.toLowerCase()); // Filtrar por nombre de materia
    } else {
      console.error('No se encontraron notas guardadas para esta materia');
    }
  }

  modificarMateria(nota: Nota) {
    localStorage.setItem('materiaAModificar', JSON.stringify(nota));
    this.router.navigate(['/modificar-nota']);
  }
}
