import z from 'zod'

const personSchema = z.object({
  cedula: z.number().int().positive(),
  Primer_nombre: z.string(),
  Segundo_nombre: z.string().nullable(),
  Primer_Apellido: z.string(),
  Segundo_Apellido: z.string(),
  edad: z.number().int().positive(),
  IdRol: z.number().int().min(1).max(4)
})

export function validatePerson (object) {
  return personSchema.safeParse(object)
}

export function validateParcialPerson (object) {
  return personSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
