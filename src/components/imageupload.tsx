import { useState } from 'react';
import { uploadImageAction } from '@/features/exam/api/uploadimage';

const ImageUploadForm = () => {
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    const handleUpload = async () => {
        if (!selectedImage) {
            setMessage('Please select an image to upload.');
            return;
        }

        setUploading(true);
        setMessage('');

        try {
            const { success, url } = await uploadImageAction(selectedImage);
            if (success) {
                setMessage(`Image uploaded successfully! URL: ${url}`);
            } else {
                setMessage('Failed to upload image.');
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            setMessage('An error occurred while uploading the image.');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="image-upload-form">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            <button onClick={handleUpload} disabled={uploading}>
                {uploading ? 'Uploading...' : 'Upload Image'}
            </button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ImageUploadForm;