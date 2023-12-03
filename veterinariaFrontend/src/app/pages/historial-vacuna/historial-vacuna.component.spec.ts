import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVacunaComponent } from './historial-vacuna.component';

describe('HistorialVacunaComponent', () => {
  let component: HistorialVacunaComponent;
  let fixture: ComponentFixture<HistorialVacunaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialVacunaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HistorialVacunaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
