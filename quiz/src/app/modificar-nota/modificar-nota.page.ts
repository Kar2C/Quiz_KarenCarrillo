import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardContent,
  IonItem,
  IonLabel,
  IonButton, 
  IonInput, 
  IonList,
  IonDatetime,
  IonButtons,
  IonMenuButton,
  IonMenu
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota';

@Component({
  selector: 'app-modificar-nota',
  templateUrl: './modificar-nota.page.html',
  styleUrls: ['./modificar-nota.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonCard,
    IonCardContent,
    IonItem,
    IonLabel,
    IonButton,
    RouterModule,
    IonInput,
    IonList,
    IonDatetime,
    IonButtons,
    IonMenuButton,
    IonMenu
  ],
})

export class ModificarNotaPage implements OnInit {
  modificarNotaForm!: FormGroup;
  notaActual!: Nota;
  cortes: string[] = ['-Primer Corte', '-Segundo Corte', '-Tercer Corte', '-Cuarto Corte'];
  filteredCortes: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Cargar la nota a modificar desde el localStorage
    const notaStr = localStorage.getItem('notaAModificar');
    if (notaStr) {
      this.notaActual = JSON.parse(notaStr);
    }

    // Inicializar el formulario con los datos de la nota actual
    this.modificarNotaForm = this.fb.group({
      fechaEntrega: [this.notaActual?.fechaEntrega, Validators.required],
      descripcion: [this.notaActual?.descripcion, Validators.required],
      nota: [this.notaActual?.nota, [Validators.required, Validators.min(0), Validators.max(5)]],
      observaciones: [this.notaActual?.observaciones || ''],
      corte: [this.notaActual?.corte, Validators.required],
    });

    // Inicializar la lista de cortes filtrados
    this.filteredCortes = this.cortes;
  }

  // Lógica de cambio de fecha de entrega
  onFechaEntregaChange(event: CustomEvent) {
    const fecha = event.detail.value as string; // Aseguramos que el valor es de tipo string
    this.modificarNotaForm.get('fechaEntrega')?.setValue(fecha);
  }

  // Filtrar las opciones de corte
  filterOptions(event: CustomEvent) {
    const query = event.detail.value.toLowerCase();
    this.filteredCortes = this.cortes.filter(corte => corte.toLowerCase().includes(query));
  }

  // Seleccionar un corte de la lista
  selectCorte(corte: string) {
    this.modificarNotaForm.get('corte')?.setValue(corte);
    this.filteredCortes = []; // Limpiar la lista después de seleccionar
  }

  // Guardar los cambios en la nota
  guardarCambios() {
    if (this.modificarNotaForm.valid) {
      const materiaSeleccionada = JSON.parse(localStorage.getItem('materiaSeleccionada') || '{}');

      if (materiaSeleccionada) {
        // Cargar las notas guardadas de la materia seleccionada
        const notasGuardadas = JSON.parse(localStorage.getItem(`notas_${materiaSeleccionada.codigo}`) || '[]');
        const indice = notasGuardadas.findIndex((nota: Nota) => nota.descripcion === this.notaActual.descripcion);

        if (indice > -1) {
          // Actualizar la nota en el array de notas guardadas
          notasGuardadas[indice] = this.modificarNotaForm.value;
          localStorage.setItem(`notas_${materiaSeleccionada.codigo}`, JSON.stringify(notasGuardadas));
        }
      }

      this.router.navigate(['/segundo-veinte']);
    }
  }
  notasRegistradas(){
    this.router.navigate(['/segundo-veinte']);

  }
}