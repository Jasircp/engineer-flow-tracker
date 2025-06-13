
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Send } from 'lucide-react';

interface RequestEngineersFormProps {
  projectId: string;
  projectName: string;
  onSubmit: (request: EngineerRequest) => void;
}

interface EngineerRequest {
  projectId: string;
  role: string;
  quantity: number;
  skills: string[];
  priority: 'Low' | 'Medium' | 'High';
  justification: string;
  timeline: string;
}

const RequestEngineersForm = ({ projectId, projectName, onSubmit }: RequestEngineersFormProps) => {
  const [request, setRequest] = useState<EngineerRequest>({
    projectId,
    role: '',
    quantity: 1,
    skills: [],
    priority: 'Medium',
    justification: '',
    timeline: ''
  });

  const [skillInput, setSkillInput] = useState('');

  const addSkill = () => {
    if (skillInput.trim() && !request.skills.includes(skillInput.trim())) {
      setRequest({
        ...request,
        skills: [...request.skills, skillInput.trim()]
      });
      setSkillInput('');
    }
  };

  const removeSkill = (skill: string) => {
    setRequest({
      ...request,
      skills: request.skills.filter(s => s !== skill)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(request);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Additional Engineers - {projectName}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="role">Role Required</Label>
              <Select onValueChange={(value) => setRequest({ ...request, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="DevOps">DevOps Engineer</SelectItem>
                  <SelectItem value="QA">QA Engineer</SelectItem>
                  <SelectItem value="Lead">Technical Lead</SelectItem>
                  <SelectItem value="PM">Project Manager</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="quantity">Number of Engineers</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                max="5"
                value={request.quantity}
                onChange={(e) => setRequest({ ...request, quantity: parseInt(e.target.value) || 1 })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="skills">Required Skills</Label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add skill"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <Button type="button" onClick={addSkill}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {request.skills.map((skill) => (
                <span
                  key={skill}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm cursor-pointer"
                  onClick={() => removeSkill(skill)}
                >
                  {skill} ×
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select onValueChange={(value) => setRequest({ ...request, priority: value as 'Low' | 'Medium' | 'High' })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Low">Low</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="High">High</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="timeline">Required By</Label>
              <Input
                id="timeline"
                type="date"
                value={request.timeline}
                onChange={(e) => setRequest({ ...request, timeline: e.target.value })}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="justification">Justification</Label>
            <Textarea
              id="justification"
              placeholder="Explain why additional engineers are needed..."
              value={request.justification}
              onChange={(e) => setRequest({ ...request, justification: e.target.value })}
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full">
            <Send className="h-4 w-4 mr-2" />
            Send Request to HR
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RequestEngineersForm;
