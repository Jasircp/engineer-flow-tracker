import React, { useState } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import ProjectCard from '../components/dashboard/ProjectCard';

const Projects = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const projects = [
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
    },
    {
      id: '4',
      name: 'Customer Portal',
      status: 'CLOSED' as const,
      duration: '2 months',
      startDate: '2023-11-01',
      endDate: '2024-01-01',
      requiredEngineers: 4,
      assignedEngineers: 4,
      techStack: ['Vue.js', 'Laravel', 'MySQL'],
      isOverStaffed: false,
      isUnderStaffed: false,
      nearingCompletion: false
    }
  ];

  const filteredProjects = projects.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || project.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Projects</h1>
          <p className="text-muted-foreground">Manage all projects and their allocations</p>
        </div>
        <button 
          onClick={() => navigate('/create-project')}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="ALL">All Status</option>
            <option value="NEW">New</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Projects</p>
          <p className="text-2xl font-bold text-foreground">{projects.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Active</p>
          <p className="text-2xl font-bold text-green-600">
            {projects.filter(p => p.status === 'IN_PROGRESS').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">New</p>
          <p className="text-2xl font-bold text-blue-600">
            {projects.filter(p => p.status === 'NEW').length}
          </p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-bold text-gray-600">
            {projects.filter(p => p.status === 'CLOSED').length}
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Projects;
