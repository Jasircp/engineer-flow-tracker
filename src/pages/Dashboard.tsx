import React from 'react';
import ProjectCard from '@/components/dashboard/ProjectCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderOpen, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  name: string;
  status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  duration: string;
  startDate?: string;
  endDate?: string;
  requiredEngineers: number;
  assignedEngineers: number;
  techStack: string[];
  isOverStaffed: boolean;
  isUnderStaffed: boolean;
  nearingCompletion: boolean;
}

interface Engineer {
  id: string;
  name: string;
  role: string;
  skills: string[];
  availability: 'available' | 'busy';
}

const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Project Phoenix',
    status: 'IN_PROGRESS',
    duration: '3 months',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    requiredEngineers: 5,
    assignedEngineers: 3,
    techStack: ['React', 'Node.js', 'PostgreSQL'],
    isOverStaffed: false,
    isUnderStaffed: true,
    nearingCompletion: false,
  },
  {
    id: '2',
    name: 'Project Atlas',
    status: 'NEW',
    duration: '6 months',
    startDate: '2024-02-15',
    endDate: '2024-08-15',
    requiredEngineers: 8,
    assignedEngineers: 0,
    techStack: ['Angular', 'Java', 'MongoDB'],
    isOverStaffed: false,
    isUnderStaffed: true,
    nearingCompletion: false,
  },
  {
    id: '3',
    name: 'Project Nebula',
    status: 'IN_PROGRESS',
    duration: '4 months',
    startDate: '2023-11-01',
    endDate: '2024-03-01',
    requiredEngineers: 4,
    assignedEngineers: 4,
    techStack: ['Vue.js', 'Python', 'MySQL'],
    isOverStaffed: false,
    isUnderStaffed: false,
    nearingCompletion: true,
  },
  {
    id: '4',
    name: 'Project Titan',
    status: 'CLOSED',
    duration: '12 months',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    requiredEngineers: 10,
    assignedEngineers: 10,
    techStack: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    isOverStaffed: false,
    isUnderStaffed: false,
    nearingCompletion: false,
  },
];

const mockEngineers: Engineer[] = [
  {
    id: '101',
    name: 'Alice Johnson',
    role: 'Frontend Engineer',
    skills: ['React', 'JavaScript', 'HTML', 'CSS'],
    availability: 'available',
  },
  {
    id: '102',
    name: 'Bob Smith',
    role: 'Backend Engineer',
    skills: ['Node.js', 'Python', 'SQL', 'AWS'],
    availability: 'busy',
  },
  {
    id: '103',
    name: 'Charlie Brown',
    role: 'DevOps Engineer',
    skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
    availability: 'available',
  },
  {
    id: '104',
    name: 'Diana Miller',
    role: 'Project Manager',
    skills: ['Agile', 'Scrum', 'Communication', 'Leadership'],
    availability: 'available',
  },
];

const Dashboard = () => {

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to the Engineer Allocation Platform</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockProjects.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockProjects.filter(p => p.status === 'IN_PROGRESS').length} active
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Engineers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockEngineers.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockEngineers.filter(e => e.availability === 'available').length} available
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under-staffed</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProjects.filter(p => p.isUnderStaffed).length}
            </div>
            <p className="text-xs text-muted-foreground">Projects need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nearing Completion</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockProjects.filter(p => p.nearingCompletion).length}
            </div>
            <p className="text-xs text-muted-foreground">Projects finishing soon</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>Latest project updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjects.slice(0, 3).map((project) => (
                <ProjectCard 
                  key={project.id} 
                  project={project}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Available Engineers */}
        <Card>
          <CardHeader>
            <CardTitle>Available Engineers</CardTitle>
            <CardDescription>Engineers ready for assignment</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockEngineers
                .filter(engineer => engineer.availability === 'available')
                .slice(0, 3)
                .map((engineer) => (
                  <div key={engineer.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium text-foreground">{engineer.name}</h4>
                      <p className="text-sm text-muted-foreground">{engineer.role}</p>
                      <div className="flex gap-1 mt-1">
                        {engineer.skills.slice(0, 2).map((skill) => (
                          <span key={skill} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Assign
                    </Button>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
