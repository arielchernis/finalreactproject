import express from 'express'
const router = express.Router()
import authenticate from '../common/auth_middleware'

import multer from 'multer'


const base = "http://10.0.2.2:3000/"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.jpg') //Appending .jpg
    }
})
const upload = multer({ storage: storage });

router.post('/file', upload.single("file"), function (req, res, next) {    
    console.log("router.post(/file: " + base + req.file.path)
    res.status(200).send({url: base + req.file.path})
   });


export = router
