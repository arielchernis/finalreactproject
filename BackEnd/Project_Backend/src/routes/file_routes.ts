import express from 'express'
const router = express.Router()
import authenticate from '../common/auth_middleware'

import multer from 'multer'

const base = "192.168.1.179:3000/"
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

// router.post('/:id',function (req, res, next) {
//     console.log("router.post id")
//     upload.single(req.params.id)
//     // req.file is the name of your file in the form above, here 'uploaded_file'
//     // req.body will hold the text fields, if there were any 
//     console.log(req.file, req.body)
// });

export = router
