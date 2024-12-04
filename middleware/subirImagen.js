import multer from 'multer'
import path from 'path'
import { generarId } from '../helpers/token.js'

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, generarId() + path.extname(file.originalname) ) // cambiamos el nombre a algo unico, un id y le agregamos la extension q tenis, ".jpg..."
    }
})

const upload = multer({ storage })

export default upload
