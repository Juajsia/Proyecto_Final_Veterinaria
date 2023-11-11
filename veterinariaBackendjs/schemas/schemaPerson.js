import z from 'zod'

const personSchema = z.object({
  cedula: z.number().int().positive(),
  primerNombre: z.string(),
  segundoNombre: z.string().nullable(),
  primerApellido: z.string(),
  segundoApellido: z.string(),
  edad: z.number().int().positive(),
  idRol: z.number().int().min(1).max(4)
})

export function validatePerson (object) {
  return personSchema.safeParse(object)
}

export function validateParcialPerson (object) {
  return personSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
