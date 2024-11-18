

const admin = (req, res) => {
  // res.send('Mis propiedades')
  res.render('propiedades/admin', {
    pagina: 'Mis Propiedades',
  })
}


export {  // es un export nombrado, hay q usar llaves y el mimso nombre cuando lo importas => import { formularioLogin } from '../../'
  admin
}