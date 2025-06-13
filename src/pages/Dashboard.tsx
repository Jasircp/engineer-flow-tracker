
import React from 'react';
import { Users, FolderOpen, Clock, TrendingUp } from 'lucide-react';
import ProjectCard from '../components/dashboard/ProjectCard';
import EngineerCard from '../components/dashboard/EngineerCard';

const Dashboard = () => {
  // Mock data - in real app this would come from API
  const stats = {
    totalProjects: 12,
    activeProjects: 8,
    totalEngineers: 24,
    availableEngineers: 6
  };

  const recentProjects = [
    {
      id: '1',
      name: 'E-Commerce Platform',
      status: 'IN_PROGRESS' as const,
      duration: '3 months',
      startDate: '2024-01-15',
      endDate: '2024-04-15',
      requiredEngineers: 5,
      assignedEngineers: 4,
      techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      isOverStaffed: false,
      isUnderStaffed: true,
      nearingCompletion: false
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      status: 'NEW' as const,
      duration: '4 months',
      requiredEngineers: 6,
      assignedEngineers: 0,
      techStack: ['Flutter', 'Firebase', 'Node.js'],
      isOverStaffed: false,
      isUnderStaffed: false,
      nearingCompletion: false
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      status: 'IN_PROGRESS' as const,
      duration: '2 months',
      startDate: '2024-03-01',
      endDate: '2024-05-01',
      requiredEngineers: 3,
      assignedEngineers: 4,
      techStack: ['React', 'D3.js', 'Python', 'MongoDB'],
      isOverStaffed: true,
      isUnderStaffed: false,
      nearingCompletion: true
    }
  ];

  const availableEngineers = [
    {
      id: '1',
      name: 'Sarah Johnson',
      email: 'sarah.johnson@keyvalue.com',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      experience: '5 years',
      currentProjects: 0,
      maxProjects: 2,
      isAvailable: true,
      strengths: ['Frontend Architecture', 'Team Leadership']
    },
    {
      id: '2',
      name: 'Mike Chen',
      email: 'mike.chen@keyvalue.com',
      skills: ['Flutter', 'Dart', 'Firebase', 'iOS'],
      experience: '3 years',
      currentProjects: 1,
      maxProjects: 2,
      isAvailable: true,
      strengths: ['Mobile Development', 'UI/UX']
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Overview of projects and engineer allocation</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Projects</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalProjects}</p>
            </div>
            <FolderOpen className="h-8 w-8 text-primary" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
              <p className="text-2xl font-bold text-foreground">{stats.activeProjects}</p>
            </div>
            <Clock className="h-8 w-8 text-green-600" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Engineers</p>
              <p className="text-2xl font-bold text-foreground">{stats.totalEngineers}</p>
            </div>
            <Users className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Available Engineers</p>
              <p className="text-2xl font-bold text-foreground">{stats.availableEngineers}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-amber-600" />
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Recent Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              onClick={() => console.log('View project:', project.id)}
            />
          ))}
        </div>
      </div>

      {/* Available Engineers */}
      <div>
        <h2 className="text-lg font-semibold text-foreground mb-4">Available Engineers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableEngineers.map((engineer) => (
            <EngineerCard 
              key={engineer.id} 
              engineer={engineer} 
              onClick={() => console.log('View engineer:', engineer.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
