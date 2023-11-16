import z from 'zod'

const medicalHistorySchema = z.object({
  Motivo: z.string(),
  Sintomatologia: z.string(),
  Diagnostico: z.string(),
  Procedimiento: z.string(),
  MedicamentosAlergia: z.array(z.string()),
  NombreMascota: z.string(),
  CedulaDueño: z.string(),
  IdOrden: z.number().int().positive(),
  IdVeterinario: z.number().int().positive(),
  NombreVacunas: z.array(z.string())
})

export function validateMedicalHistory (object) {
  return medicalHistorySchema.safeParse(object)
}

export function validateParcialMedicalHistory (object) {
  return medicalHistorySchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
