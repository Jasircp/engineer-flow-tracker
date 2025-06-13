
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ProjectFormData {
  name: string;
  duration: string;
  techStack: string[];
  requiredEngineers: number;
  description: string;
}

interface CreateProjectFormProps {
  onSubmit: (data: ProjectFormData) => void;
  onCancel: () => void;
}

const CreateProjectForm = ({ onSubmit, onCancel }: CreateProjectFormProps) => {
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    duration: '',
    techStack: [],
    requiredEngineers: 1,
    description: ''
  });

  const [techStackInput, setTechStackInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const addTechStack = () => {
    if (techStackInput.trim() && !formData.techStack.includes(techStackInput.trim())) {
      setFormData(prev => ({
        ...prev,
        techStack: [...prev.techStack, techStackInput.trim()]
      }));
      setTechStackInput('');
    }
  };

  const removeTechStack = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      techStack: prev.techStack.filter(t => t !== tech)
    }));
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create New Project</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Project Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Duration</label>
            <input
              type="text"
              required
              placeholder="e.g., 3 months"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Required Engineers</label>
            <input
              type="number"
              min="1"
              required
              value={formData.requiredEngineers}
              onChange={(e) => setFormData(prev => ({ ...prev, requiredEngineers: parseInt(e.target.value) }))}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Tech Stack</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                placeholder="Add technology"
                className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTechStack())}
              />
              <Button type="button" onClick={addTechStack}>Add</Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2 py-1 bg-secondary text-secondary-foreground rounded text-sm flex items-center gap-1"
                >
                  {tech}
                  <button
                    type="button"
                    onClick={() => removeTechStack(tech)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Project description..."
            />
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="flex-1">Create Project</Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreateProjectForm;
