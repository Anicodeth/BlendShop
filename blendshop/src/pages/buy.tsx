// pages/buy.tsx
import Link from 'next/link';
import Dashboard from '@/components/dashboard/dashboard';
import CardComponent from '@/components/card';

// Dummy data for cards
const cardData = [
  {
    title: 'Product 1',
    price: '$19.99',
    imageUrl: 'https://example.com/product1.jpg',
    productId: '1', // Add a productId property
  },
  {
    title: 'Product 2',
    price: '$24.99',
    imageUrl: 'https://example.com/product2.jpg',
    productId: '2', // Add a productId property
  },
  {
    title: 'Product 3',
    price: '$29.99',
    imageUrl: 'https://example.com/product3.jpg',
    productId: '3', // Add a productId property
  },
];

const BuyPage: React.FC = () => {
  return (
    <Dashboard>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Buy 3D Models</h2>
      </div>

      {/* Render the CardComponents in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cardData.map((card, index) => (
          <Link key={index} href={`/product/${card.productId}`}>
              <CardComponent
                title={card.title}
                price={card.price}
                imageUrl={card.imageUrl}
              >
                {/* Content specific to the card */}
                <p>Description for {card.title}</p>
              </CardComponent>
          </Link>
        ))}
      </div>
    </Dashboard>
  );
};

export default BuyPage;
