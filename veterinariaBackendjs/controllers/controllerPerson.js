export class personController {
    static getAll (req , res ) {
      const persona = {
        cedula: 123,
        Primer_nombre: 'string',
        Segundo_nombre: '',
        Primer_Apellido: '',
        Segundo_Apellido: '',
        edad: 2,
        IdRol: 1
      }
      return res.json(persona)
    }
  }