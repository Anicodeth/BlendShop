// pages/product/[productId].tsx
import { useRouter } from 'next/router';
import Dashboard from '@/components/dashboard/dashboard';
import firebaseApp from "../../auth/firebase";
import { useEffect, useState } from 'react';
import { getDatabase, ref, get, set, push } from  "@firebase/database";

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;
  const [modelData, setModelData] = useState({});
  const db = getDatabase(firebaseApp);
  // Fetch product details based on productId (you can fetch from an API or use mock data)
  const modelref = ref(db, 'models/' + productId);
  useEffect(() => {
    get(modelref).
    then((snapshot: any) => {
      if (snapshot.exists()) {
        const childData = snapshot.val();
        const price = childData.price;
        const imageUrl = childData.imageUrl;
        const title = childData.title;
        const description = childData.description;
        setModelData({  title: title, description: description, price: price, imageUrl: imageUrl })}}
    );
  }, []);
 
  return (
    <Dashboard>
      <div className = "">
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Model Details</h2>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">{modelData.title}</h2>
        <img src={modelData.imageUrl} className="w-full h-60 object-cover mb-4" />
        <p>{modelData.description}</p>
        <p>Price: {modelData.price}</p>
      </div>
      </div>
    </Dashboard>
  );
};

export default ProductDetailPage;
