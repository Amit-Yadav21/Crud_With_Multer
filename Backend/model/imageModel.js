import mongoose from 'mongoose';

const imageSchema = new mongoose.Schema({
  name: String,
  filePath: String,
  fileType: String,
  size: Number,
});

export default mongoose.model('Image', imageSchema);