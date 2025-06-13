
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ProjectRequirement {
  role: string;
  count: number;
  skills: string[];
}

interface CreateProjectFormProps {
  onSubmit: (projectData: any) => void;
  onCancel: () => void;
}

const CreateProjectForm = ({ onSubmit, onCancel }: CreateProjectFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    duration: '',
    description: '',
    techStack: '',
    startDate: '',
    endDate: '',
  });
  
  const [requirements, setRequirements] = useState<ProjectRequirement[]>([
    { role: 'Project Manager', count: 1, skills: ['Project Management'] },
    { role: 'Tech Lead', count: 1, skills: ['Leadership', 'Architecture'] },
    { role: 'Developer', count: 2, skills: ['React', 'Node.js'] },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRequirementChange = (index: number, field: keyof ProjectRequirement, value: any) => {
    const updated = [...requirements];
    if (field === 'skills') {
      updated[index][field] = value.split(',').map((s: string) => s.trim()).filter((s: string) => s);
    } else {
      updated[index][field] = value;
    }
    setRequirements(updated);
  };

  const addRequirement = () => {
    setRequirements([...requirements, { role: '', count: 1, skills: [] }]);
  };

  const removeRequirement = (index: number) => {
    setRequirements(requirements.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(s => s.trim()).filter(s => s),
      requirements,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    onSubmit(projectData);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h2 className="text-xl font-semibold text-foreground mb-6">Create New Project</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Project Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., Engineer Allocation Platform"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Duration *
            </label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="e.g., 2 months"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Start Date
            </label>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              End Date
            </label>
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="Brief description of the project..."
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Tech Stack (comma-separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            placeholder="e.g., React, Node.js, PostgreSQL, AWS"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-foreground">Engineer Requirements</h3>
            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Role
            </button>
          </div>
          
          <div className="space-y-4">
            {requirements.map((req, index) => (
              <div key={index} className="border border-border rounded-lg p-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Role
                    </label>
                    <input
                      type="text"
                      value={req.role}
                      onChange={(e) => handleRequirementChange(index, 'role', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., Frontend Developer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Count
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={req.count}
                      onChange={(e) => handleRequirementChange(index, 'count', parseInt(e.target.value))}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Required Skills (comma-separated)
                    </label>
                    <input
                      type="text"
                      value={req.skills.join(', ')}
                      onChange={(e) => handleRequirementChange(index, 'skills', e.target.value)}
                      className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="e.g., React, TypeScript"
                    />
                  </div>
                  
                  <div>
                    <button
                      type="button"
                      onClick={() => removeRequirement(index)}
                      className="flex items-center px-3 py-2 bg-destructive text-destructive-foreground rounded-lg hover:bg-destructive/90 transition-colors"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-2 border border-border rounded-lg text-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateProjectForm;
