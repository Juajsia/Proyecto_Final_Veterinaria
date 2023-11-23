import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFloppyDisk, faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pet } from '../../interfaces/pet';
import { MascotaService } from '../../services/mascota.service';

@Component({
  selector: 'app-formulario-mascota',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule, ReactiveFormsModule],
  templateUrl: './formulario-mascota.component.html',
  styleUrl: './formulario-mascota.component.css'
})
export class FormularioMascotaComponent {
  //iconos
  guardar = faFloppyDisk
  cancelar = faArrowLeft
  textRegex = /^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ\s]+$/
  numberRegex = /^\d+(\.\d{1,2})?$/
  cedRegex = /^[0-9]\d{7,9}$/
  //formulario
  form =  new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    edad: new FormControl('', [Validators.required, Validators.pattern(this.numberRegex)]),
    especie: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    raza: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    color: new FormControl('', [Validators.required, Validators.pattern(this.textRegex)]),
    tamaño: new FormControl('', [Validators.required, Validators.pattern(this.numberRegex)]),
    peso: new FormControl('', [Validators.required, Validators.pattern(this.numberRegex)]),
    cedulaDueño: new FormControl('', [Validators.required, Validators.pattern(this.cedRegex)])
  })
  
  id: string
  operacion: string = 'Agregar '


  constructor(private _mascotaService: MascotaService, private aRouter: ActivatedRoute){
    this.id = aRouter.snapshot.paramMap.get('id')!
    // console.log(this.id)
  }

  ngOnInit(): void {
    if (this.id != '0'){
      this.operacion = 'Editar '
      this.getMascota(this.id)
    }
  }

  agregarMascota(){
    // console.log(this.form)

    const mascota: Pet = {
      Nombre: this.form.value.nombre!,
      Edad: Number(this.form.value.edad!),
      Especie: this.form.value.especie!,
      Raza: this.form.value.raza!,
      Color: this.form.value.color!,
      Tamanio: Number(this.form.value.tamaño!),
      Peso: Number(this.form.value.peso!),
      IdDuenio: Number(this.form.value.cedulaDueño!)
    }

    if(this.id != '0'){ //editar
      mascota.IDMascota = this.id
      this._mascotaService.updateMascota(this.id, mascota).subscribe(() => {
        console.log('Mascota agregada')
        this.volver()
      })
    } else {  //crear
      this._mascotaService.agregar(mascota).subscribe( () => {
        console.log('Mascota agregada')
        this.volver()
      })
    }
  }

  getMascota(id: string){
    this._mascotaService.getById(id).subscribe((res: Pet[]) => {
      const data = res[0]
      console.log(data)
      this.form.setValue({
        nombre: data.Nombre,
        edad: String(data.Edad),
        especie: data.Especie,
        raza: data.Raza,
        color: data.Color,
        tamaño: String(data.Tamanio),
        peso: String(data.Peso),
        cedulaDueño: String(data.IdDuenio)
      })
    })
  }

  actualizarMascota(){
    
  }

  private router: Router = inject(Router)
  volver(){
    this.router.navigate(['mascota'])
  }
    
}
