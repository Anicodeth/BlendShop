import { useState } from 'react';
import { getStorage, ref, uploadBytesResumable } from '@firebase/storage';
import { getDatabase, set} from '@firebase/database';

const UploadForm: React.FC = () => {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelDescription, setModelDescription] = useState<string>('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [modelPrice, setModelPrice] = useState<number | null>(null);

  const storage = getStorage();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModelImage(e.target.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setModelFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Upload image and model file to Firebase Storage
    const imageRef = ref(storage, 'modelImages/' + modelImage?.name);
    const imageUploadTask = uploadBytesResumable(imageRef, modelImage);

    const fileRef = ref(storage, 'modelFiles/' + modelFile?.name);
    const fileUploadTask = uploadBytesResumable(fileRef, modelFile);

    // Wait for both uploads to complete
    await Promise.all([imageUploadTask, fileUploadTask]);

    // Get download URLs for uploaded files
    const imageUrl = await getDownloadURL(imageRef);
    const fileUrl = await getDownloadURL(fileRef);

    // Create a model object with the collected data
    const modelData = {
      imageUrl,
      description: modelDescription,
      fileUrl,
      price: modelPrice,
    };

    const db = getDatabase();
    const modelRef = ref(db, 'models/');


  
    set(modelRef, modelData)
      .then(() => {
        console.log('Model data saved to Realtime Database');
      })
      .catch((error:any) => {
        console.error('Error saving model data:', error);
      });
    // Clear form fields or show a success message
    setModelImage(null);
    setModelDescription('');
    setModelFile(null);
    setModelPrice(null);

    alert('Model uploaded successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="modelImage">Model Image:</label>
        <input type="file" id="modelImage" accept="image/*" onChange={handleImageChange} />
      </div>
      <div>
        <label htmlFor="modelDescription">Description:</label>
        <input type="text" id="modelDescription" value={modelDescription} onChange={(e) => setModelDescription(e.target.value)} />
      </div>
      <div>
        <label htmlFor="modelFile">3D Model File:</label>
        <input type="file" id="modelFile" accept=".obj,.stl,.gltf" onChange={handleFileChange} />
      </div>
      <div>
        <label htmlFor="modelPrice">Price:</label>
        <input type="number" id="modelPrice" value={modelPrice || ''} onChange={(e) => setModelPrice(Number(e.target.value))} />
      </div>
      <button type="submit">Upload Model</button>
    </form>
  );
};

export default UploadForm;
function getDownloadURL(imageRef: any) {
    throw new Error('Function not implemented.');
}

