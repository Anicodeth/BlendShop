// components/CardComponent.tsx
import React, { useState } from 'react';

interface CardProps {
  title: string;
  price: string;
  imageUrl: string;
  children: React.ReactNode;
  productId: string;
  currentUser: string;
}

const CardComponent: React.FC<CardProps> = ({ title, price, imageUrl, children, productId, currentUser }) => {
  const [paymentResult, setPaymentResult] = useState<string | null>(null);

  
  const handlePayment = async () => {
    const randomid = Math.floor(Math.random() * 1000000000);
    console.log(`http://localhost:3000/payment?currentUser=${currentUser}&price=${price}&productId=${productId}`);
    try {
      const response = await fetch('/api/chapa', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: price, // Assuming price is the amount you want to pay
          email: 'abebech_bekele@gmail.com', // Add the email here or get it from the user
          phone_number: '0912345678', // Add the phone number here or get it from the user
          tx_ref: `${randomid}`, // You can generate a unique reference for each payment
          callback_url: `http://localhost:3000/${currentUser}/${price}/${productId}`, // Your callback URL
        }),
      });

      if (response.ok) {
        const main = await response.json();
 
        console.log(main.result);
        // redirect to the payment page
        const url = JSON.parse(main.result).data.checkout_url;
       
        window.location.replace(url);



    
        setPaymentResult(main.result);
      } else {
        throw new Error('Failed to initialize payment');
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-md overflow-hidden h-80 justify-between flex flex-col">
      <img src={imageUrl} alt={title} className="w-full h-40 object-cover mb-4" />
      <h2 className="text-xl font-semibold mb-2 h-20 overflow-hidden">{title}</h2>
      <p className="text-gray-600">{price}ETB</p>
      {children}
      {paymentResult ? (
        <p>Payment Result: {paymentResult}</p>
      ) : (
        <button
          onClick={handlePayment}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Pay
        </button>
      )}
    </div>
  );
};

export default CardComponent;
