/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
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
  IonItem,
  IonLabel,
  IonSelectOption,
  IonDatetime,
  IonList,
} from '@ionic/angular/standalone';
import { Nota } from '../models/nota';
import { Materia } from '../models/materia';

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
    ReactiveFormsModule,
    RouterModule,
    IonButton,
    IonButtons,
    IonMenuButton,
    IonCard,
    IonCardContent,
    IonInput,
    IonMenu,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonDatetime,
    IonList,
    
  ],
})
export class NotasAceptarPage implements OnInit {
  notaForm!: FormGroup;
  materiaSeleccionada!: Materia;
  notas: Nota[] = [];
  cortes: string[] = ['- Primer Corte', '- Segundo Corte', '- Tercer Corte', '- Cuarto Corte'];
  filteredCortes: string[] = [];

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    // Inicializar el formulario con validaciones
    this.notaForm = this.fb.group({
      fechaEntrega: ['', Validators.required],
      descripcion: ['', Validators.required],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(5)]],
      observaciones: [''],
      corte: ['', Validators.required],
    });

    // Cargar la materia seleccionada y las notas guardadas de esa materia
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

    // Inicializar la lista filtrada
    this.filteredCortes = this.cortes;
  }

  onFechaEntregaChange(event: CustomEvent) {
    const fecha = event.detail.value as string; // Aseguramos que el valor es de tipo string
    this.notaForm.get('fechaEntrega')?.setValue(fecha);
  }

  // Filtrar opciones de corte basadas en la entrada del usuario
  filterOptions(event: CustomEvent) {
    const query = event.detail.value.toLowerCase();
    this.filteredCortes = this.cortes.filter(corte => corte.toLowerCase().includes(query));
  }

  // Seleccionar un corte de la lista filtrada
  selectCorte(corte: string) {
    this.notaForm.get('corte')?.setValue(corte);
    this.filteredCortes = []; // Limpiar opciones después de seleccionar
  }

  // Guardar la nota y agregarla al array de notas
  guardarNota() {
    if (this.notaForm.valid) {
      const nuevaNota: Nota = {
        fechaEntrega: this.notaForm.value.fechaEntrega,
        descripcion: this.notaForm.value.descripcion,
        nota: this.notaForm.value.nota || 0, // Si no se ingresa nota, guardar como 0
        observaciones: this.notaForm.value.observaciones,
        corte: this.notaForm.value.corte,
      };

      this.notas.push(nuevaNota);

      // Guardar las notas en localStorage asociadas a la materia
      localStorage.setItem(
        `notas_${this.materiaSeleccionada.codigo}`,
        JSON.stringify(this.notas)
      );
      alert('Nota guardada con éxito');
    } else {
      alert('Por favor, complete todos los campos obligatorios');
    }
  }

  verNotas() {
    this.router.navigate(['/segundo-veinte']);
  }

  DetalleMateria(){
    this.router.navigate(['/detalle-materia']);

  }

}
