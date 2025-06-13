
import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  userRole?: 'hr' | 'lead' | 'engineer';
}

const Layout = ({ children, userRole = 'hr' }: LayoutProps) => {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar userRole={userRole} />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
