// pages/product/[productId].tsx
import { useRouter } from 'next/router';
import Dashboard from '@/components/dashboard/dashboard';

const ProductDetailPage = () => {
  const router = useRouter();
  const { productId } = router.query;

  // Fetch product details based on productId (you can fetch from an API or use mock data)

  return (
    <Dashboard>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Product Details</h2>
      </div>
      <div className="mt-4">
        <p>Product ID: {productId}</p>
        {/* Display product details here */}
      </div>
    </Dashboard>
  );
};

export default ProductDetailPage;
