export interface HistoriaClinica{
    IdHistoria_Clinica?: number,
    Fecha?: string,
    Motivo: number,
    Sintomatologia: string,
    Diagnostico: number,
    Procedimiento: string,
    MedicamentosAlergia: string,
    IdMascota?: number,
    NombreMascota: string,
    IdOrden?: string,
    CedulaVeterinario: string
}