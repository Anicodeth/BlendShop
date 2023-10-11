import { useState } from 'react';
import { getStorage, ref , uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { getDatabase, ref as refdb, set, push, get} from '@firebase/database';
import firebaseApp from '../../auth/firebase'; // Import your Firebase configuration here
import { useAuth } from '../../auth/authContext';


const UploadForm: React.FC = () => {
  const [modelImage, setModelImage] = useState<File | null>(null);
  const [modelDescription, setModelDescription] = useState<string>('');
  const [modelFile, setModelFile] = useState<File | null>(null);
  const [modelPrice, setModelPrice] = useState<number | null>(null);
  const { currentUser } = useAuth();
  const [modelTitle, setModelTitle] = useState<string>('');
 
  const storage = getStorage(firebaseApp);

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
    const imageRef = await ref(storage, 'modelImages/' + modelImage?.name);
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
      title: modelTitle,
      description: modelDescription,
      fileUrl,
      price: modelPrice,
    };
    const user = currentUser;
    
    const db = getDatabase(firebaseApp);
    const modelRef = refdb(db, 'models/');
  
    const newModelRef = push(modelRef, modelData)
    const modelId = newModelRef.key;

    if (user) {
      const userRef = refdb(db, 'users/' + user.uid  );


      get(userRef)
        .then((snapshot:any) => {
          if (snapshot.exists()) {
            // User data found, set it to the state
            const userData = snapshot.val();
            const uploadedModels = userData.uploadedModels || [];
            uploadedModels.push(modelId);
            set(userRef, { ...userData, uploadedModels })
              .then(() => {
                console.log('User Update saved to Realtime Database');  
              })
              .catch((error:any) => {
                console.error('Error saving user data to Realtime Database:', error.message);
              });
   
          } else {
            // User data not found
            console.log('User data not found');
          }
        })
        .catch((error:any) => {
          console.error('Error retrieving user data:', error.message);
        });

    }

    // Clear form fields or show a success message
    setModelImage(null);
    setModelDescription('');
    setModelFile(null);
    setModelPrice(null);
    setModelTitle('');

    alert('Model uploaded successfully!');
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
    <div className="mb-4">
      <label htmlFor="modelImage" className="form-label">
        Model Image:
      </label><br/>
      <input
        type="file"
        id="modelImage"
        accept="image/*"
        onChange={handleImageChange}
        className="form-input"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="modelTitle" className="form-label">
        Title:
      </label><br/>
      <input
        type="text"
        id="modelTitle"
        value={modelTitle}
        onChange={(e) => setModelTitle(e.target.value)}
        className="form-input"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="modelDescription" className="form-label">
        Description:
      </label><br/>
      <input
        type="text"
        id="modelDescription"
        value={modelDescription}
        onChange={(e) => setModelDescription(e.target.value)}
        className="form-input"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="modelFile" className="form-label">
        3D Model File:
      </label><br/>
      <input
        type="file"
        id="modelFile"
        accept=".obj,.stl,.gltf"
        onChange={handleFileChange}
        className="form-input"
      />
    </div>
    <div className="mb-4">
      <label htmlFor="modelPrice" className="form-label">
        Price:
      </label><br/>
      <input
        type="number"
        id="modelPrice"
        value={modelPrice || ''}
        onChange={(e) => setModelPrice(Number(e.target.value))}
        className="form-input"
      />
    </div>
    <button type="submit" className="form-button">
      Upload Model
    </button>
  </form>
  );
};

export default UploadForm;


