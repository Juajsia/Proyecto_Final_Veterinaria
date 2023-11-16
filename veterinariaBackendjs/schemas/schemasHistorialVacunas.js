import z from 'zod'

const historialVacunaSchema = z.object({
  Fecha: z.date(),
  IdVacuna: z.number().int().positive(),
  IdMascota: z.string().refine((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value), 'La contraseña no es válida')
})

export function validateHistorialVacunas (object) {
  return historialVacunaSchema.safeParse(object)
}

export function validateParcialHistorialVacunas (object) {
  return historialVacunaSchema.partial().safeParse(object)
}
