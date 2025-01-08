import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import imageRoutes from './router/imageRouter.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const corsOptions = {
  origin:true,
  optionsSuccessStatus: 200,
  credentials:true
}
app.use(cors(corsOptions))

app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://amit21:SLb3cF41HdHgsdfL@cluster0.lvclbz1.mongodb.net/imageUpload?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Use routes
app.use('/api/images', imageRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));