
import React from 'react';
import { Users, FolderOpen, Plus, BarChart3, Calendar, Settings, User, Bell, History } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

interface SidebarProps {
  userRole: 'hr' | 'lead' | 'engineer';
}

const Sidebar = ({ userRole }: SidebarProps) => {
  const location = useLocation();
  
  // Mock data for new alerts count - in real app this would come from state/API
  const newAlertsCount = 2;
  
  const menuItems = [
    { path: '/', icon: BarChart3, label: 'Dashboard', roles: ['hr', 'lead', 'engineer'] },
    { path: '/projects', icon: FolderOpen, label: 'Projects', roles: ['hr', 'lead', 'engineer'] },
    { path: '/engineers', icon: Users, label: 'Engineers', roles: ['hr', 'lead'] },
    { path: '/create-project', icon: Plus, label: 'Create Project', roles: ['hr'] },
    { path: '/assignments', icon: Calendar, label: 'Assignments', roles: ['hr', 'lead'] },
    { path: '/alerts', icon: Bell, label: 'Alerts', roles: ['hr'], hasNotification: newAlertsCount > 0, notificationCount: newAlertsCount },
    { path: '/history', icon: History, label: 'History', roles: ['hr'] },
    { path: '/profile', icon: User, label: 'My Profile', roles: ['engineer', 'lead'] },
    { path: '/settings', icon: Settings, label: 'Settings', roles: ['hr', 'lead', 'engineer'] },
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <div className="bg-card border-r border-border h-screen w-64 flex flex-col">
      <div className="p-6 border-b border-border">
        <h1 className="text-xl font-bold text-foreground">KeyValue</h1>
        <p className="text-sm text-muted-foreground">Engineer Allocation</p>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {filteredItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center justify-between space-x-3 px-3 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-primary text-primary-foreground' 
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                  {item.hasNotification && (
                    <Badge variant="destructive" className="text-xs min-w-5 h-5 flex items-center justify-center p-1">
                      {item.notificationCount}
                    </Badge>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground text-sm font-medium">
              {userRole === 'hr' ? 'HR' : userRole === 'lead' ? 'L' : 'E'}
            </span>
          </div>
          <div>
            <p className="text-sm font-medium text-foreground capitalize">{userRole}</p>
            <p className="text-xs text-muted-foreground">User Role</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
