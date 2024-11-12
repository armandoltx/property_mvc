import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
dotenv.config({path: '.env'})

const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // console.log(datos)
  const { email, nombre, token } = datos

  // Enviar el email
  await transport.sendMail({
    from: 'Property',
    to: email,
    subject: 'Confirma tu Cuenta en Property.com',
    text: 'Confirma tu Cuenta en Property.com',
    html: `
      <p>Hola ${nombre}, comprueba tu cuenta en Property.com</p>

      <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
      <a href="">Confirmar Cuenta</a> </p>

      <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
    `
  })
}

export {
  emailRegistro
}