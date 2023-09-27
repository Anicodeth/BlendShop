// pages/sell.tsx
import Dashboard from 'dashboard';
import UploadForm from './uploadForm';

const SellPage: React.FC = () => {
  return (
    <Dashboard>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Sell Model</h2>
        <UploadForm />
      </div>    
    </Dashboard>
  );
};

export default SellPage;
