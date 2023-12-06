import z from 'zod'

const petSchema = z.object({
  Nombre: z.string(),
  Edad: z.number().int().positive(),
  Especie: z.string(),
  Raza: z.string(),
  Color: z.string(),
  Tamanio: z.number().positive(),
  Peso: z.number().positive(),
  IdDuenio: z.number().int().positive()
})

export function validatePet (object) {
  return petSchema.safeParse(object)
}

export function validateParcialPet (object) {
  return petSchema.partial().safeParse(object)
}
