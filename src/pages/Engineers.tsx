
import React, { useState } from 'react';
import { Search, Filter, Plus, UserPlus } from 'lucide-react';
import EngineerCard from '../components/dashboard/EngineerCard';

const Engineers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('ALL');

  const engineers = [
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
    },
    {
      id: '3',
      name: 'Alex Rodriguez',
      email: 'alex.rodriguez@keyvalue.com',
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      experience: '4 years',
      currentProjects: 2,
      maxProjects: 2,
      isAvailable: false,
      strengths: ['Backend Architecture', 'Database Optimization']
    },
    {
      id: '4',
      name: 'Emily Davis',
      email: 'emily.davis@keyvalue.com',
      skills: ['React', 'Vue.js', 'CSS', 'Design Systems'],
      experience: '3 years',
      currentProjects: 1,
      maxProjects: 2,
      isAvailable: true,
      strengths: ['UI Development', 'Design Implementation']
    }
  ];

  const filteredEngineers = engineers.filter(engineer => {
    const matchesSearch = engineer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         engineer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesAvailability = availabilityFilter === 'ALL' ||
                               (availabilityFilter === 'AVAILABLE' && engineer.currentProjects < engineer.maxProjects) ||
                               (availabilityFilter === 'FULLY_ALLOCATED' && engineer.currentProjects >= engineer.maxProjects);
    
    return matchesSearch && matchesAvailability;
  });

  const availableCount = engineers.filter(e => e.currentProjects < e.maxProjects).length;
  const fullyAllocatedCount = engineers.filter(e => e.currentProjects >= e.maxProjects).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Engineers</h1>
          <p className="text-muted-foreground">Manage engineer profiles and availability</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
          <UserPlus className="h-4 w-4 mr-2" />
          Add Engineer
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search engineers by name or skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
            className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
          >
            <option value="ALL">All Engineers</option>
            <option value="AVAILABLE">Available</option>
            <option value="FULLY_ALLOCATED">Fully Allocated</option>
          </select>
        </div>
      </div>

      {/* Engineer Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Engineers</p>
          <p className="text-2xl font-bold text-foreground">{engineers.length}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Available</p>
          <p className="text-2xl font-bold text-green-600">{availableCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Fully Allocated</p>
          <p className="text-2xl font-bold text-red-600">{fullyAllocatedCount}</p>
        </div>
        <div className="bg-card border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Avg Projects</p>
          <p className="text-2xl font-bold text-blue-600">
            {(engineers.reduce((sum, e) => sum + e.currentProjects, 0) / engineers.length).toFixed(1)}
          </p>
        </div>
      </div>

      {/* Engineers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEngineers.map((engineer) => (
          <EngineerCard 
            key={engineer.id} 
            engineer={engineer} 
            onClick={() => console.log('View engineer:', engineer.id)}
          />
        ))}
      </div>

      {filteredEngineers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No engineers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
};

export default Engineers;
