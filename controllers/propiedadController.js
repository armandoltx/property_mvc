

const admin = (req, res) => {
  // res.send('Mis propiedades')
  res.render('propiedades/admin', {
    pagina: 'Mis Propiedades',
    barra: true
  })
}

// Formulario para crear una nueva propiedad
const crear = (req, res) => {
  // console.log('desde crear')
  res.render('propiedades/crear', {
    pagina: 'Crear Propiedad',
    barra: true
  })
}


export {  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin,
  crear
}