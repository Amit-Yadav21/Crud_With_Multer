import express from 'express';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { uploadImage, getAllImages, updateImage, deleteImage } from '../controller/imageController.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = 'uploads/';
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Filter for image files only
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/jpeg' ||
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/gif' ||
    file.mimetype === 'image/webp'
  ) {
    cb(null, true);
  } else {
    cb(new Error('Unsupported file type! Only images are allowed.'), false);
  }
};

const upload = multer({ storage, fileFilter });

// Routes
router.post('/upload', upload.single('image'), uploadImage);
router.get('/', getAllImages);
router.put('/update/:id', updateImage);
router.delete('/delete/:id', deleteImage);

export default router;
