import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'materias',
    loadComponent: () => import('./materias/materias.page').then( m => m.MateriasPage)
  },

  {
    path: 'materias-aceptar',
    loadComponent: () => import('./materias-aceptar/materias-aceptar.page').then( m => m.MateriasAceptarPage)
  },
  {
    path: 'notas-aceptar',
    loadComponent: () => import('./notas-aceptar/notas-aceptar.page').then( m => m.NotasAceptarPage)
  },
  {
    path: 'detalle-materia',
    loadComponent: () => import('./detalle-materia/detalle-materia.page').then( m => m.DetalleMateriaPage)
  },
  {
    path: 'modificar-materia',
    loadComponent: () => import('./modificar-materia/modificar-materia.page').then( m => m.ModificarMateriaPage)
  },
  {
    path: 'segundo-veinte',
    loadComponent: () => import('./segundo-veinte/segundo-veinte.page').then( m => m.SegundoVeintePage)
  },
  {
    path: 'detalle-nota',
    loadComponent: () => import('./detalle-nota/detalle-nota.page').then( m => m.DetalleNotaPage)
  },
  {
    path: 'modificar-nota',
    loadComponent: () => import('./modificar-nota/modificar-nota.page').then( m => m.ModificarNotaPage)
  },
];
