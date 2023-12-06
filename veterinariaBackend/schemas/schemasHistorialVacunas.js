import z from 'zod'

const historialVacunaSchema = z.object({
  Fecha: z.string().refine((value) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(value), 'Fecha no valida').optional(),
  nombreVacuna: z.string(),
  IdVacuna: z.number().positive().int().optional(),
  IdMascota: z.string().refine((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value), 'id Mascota no es válida')
})

export function validateHistorialVacunas (object) {
  return historialVacunaSchema.safeParse(object)
}

export function validateParcialHistorialVacunas (object) {
  return historialVacunaSchema.partial().safeParse(object)
}
