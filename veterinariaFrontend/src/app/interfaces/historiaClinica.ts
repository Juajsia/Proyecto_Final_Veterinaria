export interface HistoriaClinica{
    IdHistoria_Clinica?: number,
    Fecha?: string,
    Motivo: number,
    Sintomatologia: string,
    Diagnostico: number,
    Procedimiento: string,
    MedicamentosAlergia: string,
    IdMascota?: string,
    NombreMascota: string,
    CedulaDueño: number,
    IdOrden?: string,
    CedulaVeterinario: string
}