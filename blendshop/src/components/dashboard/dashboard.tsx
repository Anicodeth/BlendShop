// components/Dashboard.tsx
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './dashboard.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCircleUp } from '@fortawesome/free-solid-svg-icons';

const Dashboard = ({ children }:any) => {
  const router = useRouter();
  // Get the current route path
  const currentRoute = router.asPath;
  // Split the route path by '/' to get an array of segments
  const routeSegments = currentRoute.split('/');
  // Get the last segment (the last part of the route)
  console.log(routeSegments)
  const lastRoutePart = routeSegments[routeSegments.length - 1];


  return (
    <div className={`flex min-h-screen  ${style.sidebarContainer}`}>
      {/* Sidebar */}
      <aside className={`w-60 p-4`}></aside>
      <aside className={`w-60 p-4 ${style.sidebar}`}>
        <h4 className={`${style.sidebarHeader}`}>BlendShop</h4>
          <ul className={`mb-4 ${style.sidebarItems}`}>
            <li className={`mb-4 ${style.sidebarItem} ${lastRoutePart == 'buy'?style.highlight:''}`}>
            <FontAwesomeIcon icon={faSearch} />
              <Link href="/buy" >
                Buy
                </Link>
            </li>
            <li className={`mb-4 ${style.sidebarItem} ${lastRoutePart == 'sell'?style.highlight:''}`} >
            <FontAwesomeIcon icon={faCircleUp} />
              <Link href="/sell">

                Sell</Link>
            </li>
          </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4" style = {{backgroundColor:'#EFF3F4'}}>


        {children}

        {/* {router.pathname === '/sell' && <SellComponent />} */}
      </main>
    </div>
  );
};

export default Dashboard;
