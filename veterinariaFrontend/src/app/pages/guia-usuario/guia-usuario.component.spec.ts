import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaUsuarioComponent } from './guia-usuario.component';

describe('GuiaUsuarioComponent', () => {
  let component: GuiaUsuarioComponent;
  let fixture: ComponentFixture<GuiaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuiaUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuiaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
