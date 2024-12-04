// 104. agregando dropzone
import { Dropzone } from 'dropzone'

const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

Dropzone.options.imagen = {
  dictDefaultMessage: "Sube tus imágenes aquí",
  acceptedFiles: '.png,.jpg,.jpeg',
  maxFilesize: 5,
  maxFiles: 1,
  parallelUploads: 1,
  autoProcessQueue: true,
  addRemoveLinks: true,
  dictRemoveFile: 'Borrar Archivo',
  dictMaxFilesExceeded: 'El Limite es 1 Archivo',
  headers: {
    'CSRF-Token': token,
  },
  paramName: 'imagen'
};