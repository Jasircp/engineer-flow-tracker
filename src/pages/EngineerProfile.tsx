
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Star, Calendar, Edit } from 'lucide-react';

interface EngineerProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  experience: string;
  skills: string[];
  strengths: string[];
  currentProjects: Array<{
    id: string;
    name: string;
    role: 'PM' | 'Lead' | 'Developer' | 'DevOps' | 'QA';
    startDate: string;
    status: 'NEW' | 'IN_PROGRESS' | 'CLOSED';
  }>;
  areasOfInterest: string[];
}

const EngineerProfile = () => {
  const [profile] = useState<EngineerProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@keyvalue.com',
    role: 'Senior Developer',
    experience: '5 years',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    strengths: ['Problem Solving', 'Team Leadership', 'Code Review'],
    currentProjects: [
      {
        id: '1',
        name: 'E-Commerce Platform',
        role: 'Lead',
        startDate: '2024-01-15',
        status: 'IN_PROGRESS'
      },
      {
        id: '2',
        name: 'Mobile App Backend',
        role: 'Developer',
        startDate: '2024-02-01',
        status: 'IN_PROGRESS'
      }
    ],
    areasOfInterest: ['Machine Learning', 'Cloud Architecture', 'Mobile Development']
  });

  const canManageProjects = profile.currentProjects.some(
    project => project.role === 'PM' || project.role === 'Lead'
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
          <p className="text-muted-foreground">Manage your professional information</p>
        </div>
        <Button>
          <Edit className="h-4 w-4 mr-2" />
          Edit Profile
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Profile Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl font-bold text-primary-foreground">
                  {profile.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h3 className="text-lg font-semibold">{profile.name}</h3>
              <p className="text-sm text-muted-foreground">{profile.email}</p>
              <p className="text-sm text-muted-foreground">{profile.role}</p>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.experience} experience</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{profile.currentProjects.length}/2 Projects</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skills & Strengths */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Skills & Expertise</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Technical Skills</h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-2 flex items-center gap-2">
                <Star className="h-4 w-4" />
                Strengths
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.strengths.map((strength) => (
                  <Badge key={strength} variant="outline">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Areas of Interest</h4>
              <div className="flex flex-wrap gap-2">
                {profile.areasOfInterest.map((interest) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Current Projects */}
      <Card>
        <CardHeader>
          <CardTitle>Current Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {profile.currentProjects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                <div>
                  <h4 className="font-medium">{project.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    Role: {project.role} • Started: {new Date(project.startDate).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={project.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
                    {project.status.replace('_', ' ')}
                  </Badge>
                  {(project.role === 'PM' || project.role === 'Lead') && (
                    <Button size="sm" variant="outline">
                      Manage Project
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      {canManageProjects && (
        <Card>
          <CardHeader>
            <CardTitle>Project Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Button>Request Additional Engineers</Button>
              <Button variant="outline">View Team Members</Button>
              <Button variant="outline">Add Project Notes</Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EngineerProfile;
