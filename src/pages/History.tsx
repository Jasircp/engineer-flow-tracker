
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  History as HistoryIcon, 
  User, 
  FolderOpen, 
  UserPlus, 
  UserMinus, 
  Calendar,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  action: 'project_created' | 'employee_assigned' | 'employee_removed' | 'project_updated' | 'request_approved' | 'request_rejected';
  performedBy: {
    id: string;
    name: string;
    role: string;
  };
  target: {
    type: 'project' | 'employee' | 'request';
    id: string;
    name: string;
  };
  details: string;
  metadata?: {
    projectName?: string;
    employeeName?: string;
    role?: string;
    previousValue?: string;
    newValue?: string;
  };
}

const mockAuditLog: AuditLogEntry[] = [
  {
    id: '1',
    timestamp: '2024-06-16T10:30:00Z',
    action: 'project_created',
    performedBy: {
      id: '1',
      name: 'Alice Johnson',
      role: 'HR'
    },
    target: {
      type: 'project',
      id: '1',
      name: 'E-Commerce Platform'
    },
    details: 'Created new project "E-Commerce Platform"',
    metadata: {
      projectName: 'E-Commerce Platform'
    }
  },
  {
    id: '2',
    timestamp: '2024-06-16T09:15:00Z',
    action: 'employee_assigned',
    performedBy: {
      id: '2',
      name: 'Bob Smith',
      role: 'Project Lead'
    },
    target: {
      type: 'employee',
      id: '3',
      name: 'Charlie Brown'
    },
    details: 'Assigned Charlie Brown as Frontend Developer to E-Commerce Platform',
    metadata: {
      projectName: 'E-Commerce Platform',
      employeeName: 'Charlie Brown',
      role: 'Frontend Developer'
    }
  },
  {
    id: '3',
    timestamp: '2024-06-16T08:45:00Z',
    action: 'request_approved',
    performedBy: {
      id: '1',
      name: 'Alice Johnson',
      role: 'HR'
    },
    target: {
      type: 'request',
      id: '1',
      name: 'Additional Frontend Developer Request'
    },
    details: 'Approved request for 2 additional Frontend Developers for E-Commerce Platform',
    metadata: {
      projectName: 'E-Commerce Platform',
      role: 'Frontend Developer'
    }
  },
  {
    id: '4',
    timestamp: '2024-06-15T16:20:00Z',
    action: 'employee_removed',
    performedBy: {
      id: '2',
      name: 'Bob Smith',
      role: 'Project Lead'
    },
    target: {
      type: 'employee',
      id: '4',
      name: 'Diana Wilson'
    },
    details: 'Removed Diana Wilson from Data Analytics Dashboard project',
    metadata: {
      projectName: 'Data Analytics Dashboard',
      employeeName: 'Diana Wilson',
      role: 'Backend Developer'
    }
  },
  {
    id: '5',
    timestamp: '2024-06-15T14:30:00Z',
    action: 'project_updated',
    performedBy: {
      id: '1',
      name: 'Alice Johnson',
      role: 'HR'
    },
    target: {
      type: 'project',
      id: '2',
      name: 'Data Analytics Dashboard'
    },
    details: 'Updated project timeline for Data Analytics Dashboard',
    metadata: {
      projectName: 'Data Analytics Dashboard',
      previousValue: '2024-08-01',
      newValue: '2024-08-15'
    }
  },
  {
    id: '6',
    timestamp: '2024-06-15T11:45:00Z',
    action: 'request_rejected',
    performedBy: {
      id: '1',
      name: 'Alice Johnson',
      role: 'HR'
    },
    target: {
      type: 'request',
      id: '2',
      name: 'DevOps Engineer Request'
    },
    details: 'Rejected request for DevOps Engineer - insufficient budget allocation',
    metadata: {
      projectName: 'Mobile App Backend',
      role: 'DevOps Engineer'
    }
  }
];

const History = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAction, setSelectedAction] = useState<string>('all');
  const [filteredLog, setFilteredLog] = useState<AuditLogEntry[]>(mockAuditLog);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'project_created': return <FolderOpen className="h-4 w-4" />;
      case 'employee_assigned': return <UserPlus className="h-4 w-4" />;
      case 'employee_removed': return <UserMinus className="h-4 w-4" />;
      case 'project_updated': return <Calendar className="h-4 w-4" />;
      case 'request_approved': return <User className="h-4 w-4" />;
      case 'request_rejected': return <User className="h-4 w-4" />;
      default: return <HistoryIcon className="h-4 w-4" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'project_created': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'employee_assigned': return 'bg-green-100 text-green-800 border-green-200';
      case 'employee_removed': return 'bg-red-100 text-red-800 border-red-200';
      case 'project_updated': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'request_approved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'request_rejected': return 'bg-rose-100 text-rose-800 border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatActionLabel = (action: string) => {
    switch (action) {
      case 'project_created': return 'Project Created';
      case 'employee_assigned': return 'Employee Assigned';
      case 'employee_removed': return 'Employee Removed';
      case 'project_updated': return 'Project Updated';
      case 'request_approved': return 'Request Approved';
      case 'request_rejected': return 'Request Rejected';
      default: return action.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase());
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    filterLog(term, selectedAction);
  };

  const handleActionFilter = (action: string) => {
    setSelectedAction(action);
    filterLog(searchTerm, action);
  };

  const filterLog = (search: string, action: string) => {
    let filtered = mockAuditLog;

    if (action !== 'all') {
      filtered = filtered.filter(entry => entry.action === action);
    }

    if (search) {
      filtered = filtered.filter(entry => 
        entry.details.toLowerCase().includes(search.toLowerCase()) ||
        entry.performedBy.name.toLowerCase().includes(search.toLowerCase()) ||
        entry.target.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredLog(filtered);
  };

  const actionTypes = [
    { value: 'all', label: 'All Actions' },
    { value: 'project_created', label: 'Project Created' },
    { value: 'employee_assigned', label: 'Employee Assigned' },
    { value: 'employee_removed', label: 'Employee Removed' },
    { value: 'project_updated', label: 'Project Updated' },
    { value: 'request_approved', label: 'Request Approved' },
    { value: 'request_rejected', label: 'Request Rejected' }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">System History</h1>
          <p className="text-muted-foreground">Audit log of all system operations and changes</p>
        </div>
        <Badge variant="outline" className="text-lg px-3 py-1">
          <HistoryIcon className="h-4 w-4 mr-1" />
          {filteredLog.length} Records
        </Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 flex-wrap">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by action, user, or target..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Tabs value={selectedAction} onValueChange={handleActionFilter}>
              <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
                {actionTypes.map((type) => (
                  <TabsTrigger key={type.value} value={type.value} className="text-xs">
                    {type.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle>Audit Log</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredLog.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <HistoryIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No history records found</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredLog.map((entry) => (
                <div key={entry.id} className="border border-border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="flex items-center gap-2">
                        {getActionIcon(entry.action)}
                        <Badge className={getActionColor(entry.action)}>
                          {formatActionLabel(entry.action)}
                        </Badge>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {formatTimestamp(entry.timestamp)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {entry.performedBy.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{entry.performedBy.name}</p>
                      <p className="text-xs text-muted-foreground">{entry.performedBy.role}</p>
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-md p-3">
                    <p className="text-sm">{entry.details}</p>
                    {entry.metadata && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {entry.metadata.projectName && (
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            Project: {entry.metadata.projectName}
                          </span>
                        )}
                        {entry.metadata.employeeName && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Employee: {entry.metadata.employeeName}
                          </span>
                        )}
                        {entry.metadata.role && (
                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded">
                            Role: {entry.metadata.role}
                          </span>
                        )}
                        {entry.metadata.previousValue && entry.metadata.newValue && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                            {entry.metadata.previousValue} → {entry.metadata.newValue}
                          </span>
                        )}
                      </div>
                    )}
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

export default History;
