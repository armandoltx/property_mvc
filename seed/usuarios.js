import bcrypt from 'bcrypt';

const usuarios = [
  {
    nombre: 'Armando',
    email: 'a@2.com',
    confirmado: 1,
    password: bcrypt.hashSync('password', 10),
  },
];

export default usuarios;
