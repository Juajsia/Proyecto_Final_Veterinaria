import z from 'zod'

const medicalHistorySchema = z.object({
  Fecha: z.string().refine((value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value), 'Fecha no valida').optional(),
  Motivo: z.string(),
  Sintomatologia: z.string(),
  Diagnostico: z.string(),
  Procedimiento: z.string(),
  MedicamentosAlergia: z.string(),
  NombreMascota: z.string(),
  CedulaDueño: z.number().int().positive(),
  IdOrden: z.number().int().positive().optional(),
  IdVeterinario: z.number().int().positive(),
  NombreVacunas: z.array(z.string()).optional(),
  IdMascota: z.string().refine((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value), 'id Mascota no es válida').optional()
})

export function validateMedicalHistory (object) {
  return medicalHistorySchema.safeParse(object)
}

export function validateParcialMedicalHistory (object) {
  return medicalHistorySchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
