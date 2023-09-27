// pages/sell.tsx
import Dashboard from "@/components/dashboard/dashboard";
import UploadForm from "@/components/dashboard/uploadForm";
const SellPage: React.FC = () => {
  return (
    <Dashboard>
      <div className="bg-white p-4 rounded shadow-md">
        <h2 className="text-xl font-semibold">Sell Models</h2>
        <UploadForm />
      </div>
    </Dashboard>
  );
};

export default SellPage;
