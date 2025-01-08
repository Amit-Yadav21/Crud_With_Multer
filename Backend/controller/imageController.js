import Image from '../model/imageModel.js';

// Upload a single image
export const uploadImage = async (req, res) => {
    try {
        // console.log('File received:', req.file);
        const { filename, mimetype, size } = req.file;

        const newImage = new Image({
            name: filename,
            filePath: `uploads/${filename}`,
            fileType: mimetype,
            size,
        });

        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (error) {
        console.error('Error in uploadImage:', error.message);
        res.status(500).json({ error: error.message });
    }
};

// Get all images
export const getAllImages = async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update image details
export const updateImage = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const updatedImage = await Image.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json(updatedImage);
    } catch (err) {
        res.status(500).send(err);
    }
};

// Delete image
export const deleteImage = async (req, res) => {
    try {
        const { id } = req.params;
        await Image.findByIdAndDelete(id);
        res.status(200).json({ message: 'Image deleted successfully' });
    } catch (err) {
        res.status(500).send(err);
    }
};
