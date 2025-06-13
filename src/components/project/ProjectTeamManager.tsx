
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Settings, UserMinus, MessageSquare } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  role: 'PM' | 'Lead' | 'Developer' | 'DevOps' | 'QA';
  skills: string[];
  startDate: string;
  isShadow: boolean;
}

interface ProjectTeamManagerProps {
  projectId: string;
  projectName: string;
  teamMembers: TeamMember[];
  userRole: 'PM' | 'Lead' | 'Developer' | 'DevOps' | 'QA';
}

const ProjectTeamManager = ({ projectId, projectName, teamMembers, userRole }: ProjectTeamManagerProps) => {
  const [members, setMembers] = useState<TeamMember[]>(teamMembers);
  const [showAddMember, setShowAddMember] = useState(false);

  const canManageTeam = userRole === 'PM' || userRole === 'Lead';

  const handleRemoveMember = (memberId: string) => {
    setMembers(members.filter(m => m.id !== memberId));
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'PM': return 'bg-purple-100 text-purple-800';
      case 'Lead': return 'bg-blue-100 text-blue-800';
      case 'Developer': return 'bg-green-100 text-green-800';
      case 'DevOps': return 'bg-orange-100 text-orange-800';
      case 'QA': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Team Management - {projectName}</CardTitle>
          {canManageTeam && (
            <div className="flex gap-2">
              <Button size="sm" onClick={() => setShowAddMember(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Member
              </Button>
              <Button size="sm" variant="outline">
                <MessageSquare className="h-4 w-4 mr-2" />
                Request Engineers
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">{member.name}</h4>
                    <Badge className={getRoleBadgeColor(member.role)}>
                      {member.role}
                    </Badge>
                    {member.isShadow && (
                      <Badge variant="outline">Shadow</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Started: {new Date(member.startDate).toLocaleDateString()}
                  </p>
                  <div className="flex gap-1 mt-1">
                    {member.skills.slice(0, 3).map((skill) => (
                      <span key={skill} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded text-xs">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              {canManageTeam && (
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Settings className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleRemoveMember(member.id)}
                  >
                    <UserMinus className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectTeamManager;
