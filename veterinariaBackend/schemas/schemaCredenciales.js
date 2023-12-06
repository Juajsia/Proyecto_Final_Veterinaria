import z from 'zod'

const credSchema = z.object({
  Usuario: z.string(),
  Contrasenia: z.string().refine((value) => /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value), 'La contraseña no es válida'),
  idPersona: z.number().int().positive()
})

export function validateCred (object) {
  return credSchema.safeParse(object)
}

export function validateParcialCred (object) {
  return credSchema.partial().safeParse(object) // partial() vuelve todos los campos opcionales
}
