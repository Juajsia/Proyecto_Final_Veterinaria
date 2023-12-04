export interface HistoriaClinica{
    IdHistoria_Clinica?: number,
    Fecha?: string,
    Motivo: string,
    Sintomatologia: string,
    Diagnostico: string,
    Procedimiento: string,
    MedicamentosAlergia: string,
    IdMascota?: string,
    NombreMascota: string,
    CedulaDueño: number,
    IdOrden?: string,
    IdVeterinario: number,
    NombreVacunas: string[]   
}