const esVendedor = (usuarioId, propiedadUsuarioId) => {
  return usuarioId === propiedadUsuarioId // retorna si el usuario autenticado es el mismo q el propietario
}

const formatearFecha = (fecha) => {
  const nuevaFecha = new Date(fecha).toISOString().slice(0, 10);

  const opciones = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return new Date(nuevaFecha).toLocaleDateString('es-ES', opciones);
};

export { esVendedor, formatearFecha };