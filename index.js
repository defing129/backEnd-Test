import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';

import {postCreateValidation} from "./validations.js";
import {handleValidationErrors} from "./utils/index.js";


import {PostController} from "./controllers/index.js";


mongoose.connect(
    'mongodb+srv://defing129:Puckan159753@cluster0.oekhsbn.mongodb.net/heroes?retryWrites=true&w=majority',
).then(() => {
    console.log('DB ok')
}).catch((err) => {
    console.log('DB error', err)
})


const app = express();
app.use(cors());

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname);
    },
});

const upload = multer({storage});

app.use(express.json());

app.use('/uploads', express.static('uploads'));


app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

app.get('/posts', PostController.getAll);
app.get('/posts/:id', PostController.getOne);
app.post('/posts', postCreateValidation, handleValidationErrors, PostController.create);
app.delete('/posts/:id', PostController.remove);
app.patch('/posts/:id', postCreateValidation, handleValidationErrors, PostController.update);


app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }
    console.log('Server OK');
});