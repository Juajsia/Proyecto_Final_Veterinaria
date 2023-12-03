import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioHistorialClinicoComponent } from './formulario-historial-clinico.component';

describe('FormularioHistorialClinicoComponent', () => {
  let component: FormularioHistorialClinicoComponent;
  let fixture: ComponentFixture<FormularioHistorialClinicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioHistorialClinicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioHistorialClinicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
