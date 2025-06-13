
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProjectForm from '../components/forms/CreateProjectForm';
import { toast } from 'sonner';

const CreateProject = () => {
  const navigate = useNavigate();

  const handleSubmit = (projectData: any) => {
    console.log('Creating project:', projectData);
    
    // In a real app, this would make an API call
    toast.success('Project created successfully!');
    
    // Navigate back to projects page
    navigate('/projects');
  };

  const handleCancel = () => {
    navigate('/projects');
  };

  return (
    <div className="p-6">
      <CreateProjectForm onSubmit={handleSubmit} onCancel={handleCancel} />
    </div>
  );
};

export default CreateProject;
