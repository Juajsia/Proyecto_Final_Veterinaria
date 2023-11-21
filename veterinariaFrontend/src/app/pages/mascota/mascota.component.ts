import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { FooterComponent } from '../../components/footer/footer.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPenToSquare, faPlus, faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mascota',
  standalone: true,
  imports: [CommonModule, NavbarComponent, FooterComponent, FontAwesomeModule],
  templateUrl: './mascota.component.html',
  styleUrl: './mascota.component.css'
})
export class MascotaComponent {
  faTrash = faTrash
  faPenToSquare = faPenToSquare
  faPlus = faPlus
  lupa = faMagnifyingGlass
  buscar = false
  private router: Router = inject(Router)

  Buscar(){
    this.buscar = true
  }

  mostrarForm(){
    this.router.navigate(['mascota/formulario'])
  }
}
