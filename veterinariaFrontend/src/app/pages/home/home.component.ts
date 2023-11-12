import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarruselComponent } from '../../components/carrusel/carrusel.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CarruselComponent, NavbarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
