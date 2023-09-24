// components/Dashboard.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './dashboard.module.css'

const Dashboard = ({ children }:any) => {
  const router = useRouter();

  return (
    <div className={`flex min-h-screen  ${style.sidebarContainer}`}>
      {/* Sidebar */}
      <aside className={`w-60 p-4`}></aside>
      <aside className={`w-60 p-4 ${style.sidebar}`}>
        <h4>BlendShop</h4>
          <ul className={`mb-4 ${style.sidebarItems}`}>
            <li className={`mb-4 ${style.sidebarItem}`}>
              <Link href="/buy">Buy</Link>
            </li>
            <li className={`mb-4 ${style.sidebarItem}`} >
              <Link href="/sell">Sell</Link>
            </li>
          </ul>
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
