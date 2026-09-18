
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { useAuth } from '@/hooks/use-auth';
import { cn } from '@/lib/utils';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar setSidebarOpen={setSidebarOpen} />
      
      {isAuthenticated && (
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      )}
      
      <main className={cn(
        "flex-1 transition-all duration-300 ease-in-out",
        isAuthenticated && "md:ml-16",
        isAuthenticated && sidebarOpen && "md:ml-64"
      )}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
