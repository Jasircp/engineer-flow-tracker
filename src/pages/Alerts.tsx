
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Clock, User, Calendar, CheckCircle, X, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface EngineerRequest {
  id: string;
  projectId: string;
  projectName: string;
  requestedBy: {
    id: string;
    name: string;
    role: string;
  };
  role: string;
  quantity: number;
  skills: string[];
  priority: 'Low' | 'Medium' | 'High';
  justification: string;
  timeline: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  isNew: boolean;
}

const mockRequests: EngineerRequest[] = [
  {
    id: '1',
    projectId: '1',
    projectName: 'E-Commerce Platform',
    requestedBy: {
      id: '1',
      name: 'John Doe',
      role: 'Project Lead'
    },
    role: 'Frontend Developer',
    quantity: 2,
    skills: ['React', 'TypeScript', 'CSS'],
    priority: 'High',
    justification: 'Need additional frontend developers to meet the deadline for the mobile-responsive design implementation.',
    timeline: '2024-07-01',
    requestDate: '2024-06-15',
    status: 'pending',
    isNew: true
  },
  {
    id: '2',
    projectId: '2',
    projectName: 'Data Analytics Dashboard',
    requestedBy: {
      id: '2',
      name: 'Sarah Wilson',
      role: 'Project Manager'
    },
    role: 'DevOps Engineer',
    quantity: 1,
    skills: ['AWS', 'Docker', 'Kubernetes'],
    priority: 'Medium',
    justification: 'Infrastructure scaling requirements have increased beyond current capacity.',
    timeline: '2024-07-15',
    requestDate: '2024-06-14',
    status: 'pending',
    isNew: true
  },
  {
    id: '3',
    projectId: '3',
    projectName: 'Mobile App Backend',
    requestedBy: {
      id: '3',
      name: 'Mike Johnson',
      role: 'Technical Lead'
    },
    role: 'Backend Developer',
    quantity: 1,
    skills: ['Node.js', 'MongoDB', 'API Design'],
    priority: 'Low',
    justification: 'Additional API endpoints needed for new feature requirements.',
    timeline: '2024-08-01',
    requestDate: '2024-06-10',
    status: 'approved',
    isNew: false
  }
];

const Alerts = () => {
  const [requests, setRequests] = useState<EngineerRequest[]>(mockRequests);
  const { toast } = useToast();

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleApprove = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'approved' as const, isNew: false }
        : req
    ));
    toast({
      title: "Request Approved",
      description: "The engineer request has been approved successfully.",
    });
  };

  const handleReject = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, status: 'rejected' as const, isNew: false }
        : req
    ));
    toast({
      title: "Request Rejected",
      description: "The engineer request has been rejected.",
      variant: "destructive",
    });
  };

  const markAsRead = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId 
        ? { ...req, isNew: false }
        : req
    ));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const pendingRequests = requests.filter(req => req.status === 'pending');
  const processedRequests = requests.filter(req => req.status !== 'pending');
  const newRequestsCount = requests.filter(req => req.isNew).length;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Alerts</h1>
          <p className="text-muted-foreground">Manage engineer requests from project leads</p>
        </div>
        {newRequestsCount > 0 && (
          <Badge variant="destructive" className="text-lg px-3 py-1">
            <AlertTriangle className="h-4 w-4 mr-1" />
            {newRequestsCount} New
          </Badge>
        )}
      </div>

      {/* Pending Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            Pending Requests
            {pendingRequests.length > 0 && (
              <Badge variant="secondary">{pendingRequests.length}</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pendingRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <CheckCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No pending requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="border border-border rounded-lg p-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {request.isNew && (
                        <Badge variant="destructive" className="text-xs">New</Badge>
                      )}
                      <div>
                        <h3 className="font-semibold text-lg">{request.projectName}</h3>
                        <p className="text-sm text-muted-foreground">
                          Requested by {request.requestedBy.name} ({request.requestedBy.role})
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={getPriorityColor(request.priority)}>
                        {request.priority} Priority
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">
                        {request.quantity}x {request.role}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Required by {formatDate(request.timeline)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Requested {formatDate(request.requestDate)}</span>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Required Skills:</h4>
                    <div className="flex flex-wrap gap-1">
                      {request.skills.map((skill) => (
                        <span key={skill} className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Justification:</h4>
                    <p className="text-sm text-muted-foreground">{request.justification}</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button 
                      size="sm" 
                      onClick={() => handleApprove(request.id)}
                      className="flex items-center gap-2"
                    >
                      <CheckCircle className="h-4 w-4" />
                      Approve
                    </Button>
                    <Button 
                      size="sm" 
                      variant="destructive" 
                      onClick={() => handleReject(request.id)}
                      className="flex items-center gap-2"
                    >
                      <X className="h-4 w-4" />
                      Reject
                    </Button>
                    {request.isNew && (
                      <Button 
                        size="sm" 
                        variant="outline" 
                        onClick={() => markAsRead(request.id)}
                      >
                        Mark as Read
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Processed Requests */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Processed Requests</CardTitle>
        </CardHeader>
        <CardContent>
          {processedRequests.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No processed requests</p>
            </div>
          ) : (
            <div className="space-y-4">
              {processedRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {request.requestedBy.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{request.projectName}</p>
                      <p className="text-xs text-muted-foreground">
                        {request.quantity}x {request.role} - {request.requestedBy.name}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(request.requestDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Alerts;
