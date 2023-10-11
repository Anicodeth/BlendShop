// pages/buy.tsx
import Link from 'next/link';
import Dashboard from '@/components/dashboard/dashboard';
import CardComponent from '@/components/card';
import {getDatabase, ref, get, set, push} from "@firebase/database";
import firebaseApp  from "../auth/firebase";
import { useEffect, useState } from 'react';
import { useAuth } from '../auth/authContext';



const BuyPage: React.FC = () => {
  
  const { currentUser } = useAuth();
  const db = getDatabase(firebaseApp);

  const modelRef = ref(db, 'models/');
  const [cardData, setCardData] = useState([]);
  var temp:any = []
  useEffect(() => {
    get(modelRef).
    then((snapshot:any) => {
      if (snapshot.exists()) {
        
         snapshot.forEach((childSnapshot:any) => {
          console.log(childSnapshot.val())
           
           const id = childSnapshot.key;
           const childData = childSnapshot.val();
           const price = childData.price;
           const imageUrl = childData.imageUrl;
           const title = childData.title;
           const fileUrl = childData.fileUrl;
           const description = childData.description;
          temp.push({productId: id, title:title, description: description, price: price, imageUrl: imageUrl})

         });

   
       } else {
         console.log("No data available"); 
       }
       setCardData(temp);
      })
   ;
  
  }, [])
  
  return (
    <Dashboard>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Buy 3D Models</h2>
      </div>

      {/* Render the CardComponents in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          // <Link key={index} href={`/product/${card.productId}`}>
              <CardComponent
                title={card.title}
                price={card.price}
                imageUrl={card.imageUrl}
                productId={card.productId}
                currentUser={currentUser.uid}
              >
              </CardComponent>
          
        ))}
      </div>
    </Dashboard>
  );
};

export default BuyPage;
