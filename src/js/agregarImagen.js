// 104. agregando dropzone
import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.imagen = {
  dictDefaultMessage: 'Sube tus imágenes aquí',
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: false,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Archivo',
  dictMaxFilesExceeded: 'El Limite es 1 Archivo',
  headers: {
    'CSRF-Token': token,
  },
  paramName: 'imagen',
  init: function () { // funciones para modificar dropzone; reescribimos en el objeto de eventos de dropzone
    const dropzone = this;
    const btnPublicar = document.querySelector('#publicar');

    btnPublicar.addEventListener('click', function () {
      // cuando hacemos click en publicar propiedad que cambie autoProcessQueue a true para guardar la imagen
      dropzone.processQueue();
    });

    dropzone.on('queuecomplete', function () { // cuando finaliza que redireccione a /mis-propiedades
      if (dropzone.getActiveFiles().length == 0) {
        window.location.href = '/mis-propiedades';
      }
    });
  },
};