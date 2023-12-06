import z from 'zod'

const ordenSchema = z.object({
  IdMascota: z.string().refine((value) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value), 'id Mascota no es válida'),
  Medicamentos: z.array(z.object({
    nombre: z.string(),
    Dosis: z.string()
  })),
  Anulada: z.boolean().optional()
})

export function validateOrden (object) {
  return ordenSchema.safeParse(object)
}

export function validateParcialOrden (object) {
  return ordenSchema.partial().safeParse(object)
}
