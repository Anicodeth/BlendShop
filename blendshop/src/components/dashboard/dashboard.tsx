// components/Dashboard.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Dashboard = ({ children }:any) => {
  const router = useRouter();

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-1/5 p-4 bg-blue-500 text-white">
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/buy">Buy</Link>
            </li>
            <li>
              <Link href="/sell">Sell</Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4">
        <header className="bg-blue-500 p-4 text-white">
          <h1 className="text-2xl">3D Model Dashboard</h1>
        </header>

        {children}

        {/* {router.pathname === '/sell' && <SellComponent />} */}
      </main>
    </div>
  );
};

export default Dashboard;
