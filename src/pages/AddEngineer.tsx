
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { ArrowLeft, Save, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import PersonalInfoSection from '@/components/forms/PersonalInfoSection';
import ProfessionalDetailsSection from '@/components/forms/ProfessionalDetailsSection';
import SkillsSection from '@/components/forms/SkillsSection';
import AdditionalInfoSection from '@/components/forms/AdditionalInfoSection';
import { createEngineerSchema, type CreateEngineerFormData } from '@/types/engineer';

const AddEngineer = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<CreateEngineerFormData>({
    resolver: zodResolver(createEngineerSchema),
    defaultValues: {
      name: '',
      user_id: '',
      email: '',
      password: '',
      joined_at: new Date(),
      experience: 0,
      role_id: '',
      skills: [],
      designations: [],
      notes: '',
    },
  });

  const onSubmit = async (data: CreateEngineerFormData) => {
    try {
      console.log('Creating engineer:', data);
      // TODO: Integrate with backend API
      // await createEngineer(data);
      
      toast({
        title: "Engineer added successfully",
        description: `${data.name} has been added to the system.`,
      });
      
      navigate('/engineers');
    } catch (error) {
      toast({
        title: "Error adding engineer",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  const onSaveAndAddAnother = async (data: CreateEngineerFormData) => {
    try {
      console.log('Creating engineer and adding another:', data);
      // TODO: Integrate with backend API
      // await createEngineer(data);
      
      toast({
        title: "Engineer added successfully",
        description: `${data.name} has been added. Ready to add another.`,
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error adding engineer",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb Navigation */}
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/engineers">Engineers</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbPage>Add Engineer</BreadcrumbPage>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/engineers')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Engineers
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Add New Engineer</h1>
            <p className="text-muted-foreground">Create a new engineer profile with complete information</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserPlus className="h-5 w-5 mr-2" />
                  Personal Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <PersonalInfoSection form={form} />
              </CardContent>
            </Card>

            {/* Professional Details */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Details</CardTitle>
              </CardHeader>
              <CardContent>
                <ProfessionalDetailsSection form={form} />
              </CardContent>
            </Card>

            {/* Skills and Expertise */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Skills and Expertise</CardTitle>
              </CardHeader>
              <CardContent>
                <SkillsSection form={form} />
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <AdditionalInfoSection form={form} />
              </CardContent>
            </Card>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-6 border-t">
            <Button type="button" variant="outline" onClick={() => navigate('/engineers')}>
              Cancel
            </Button>
            <Button 
              type="button" 
              variant="secondary"
              onClick={form.handleSubmit(onSaveAndAddAnother)}
            >
              <Save className="h-4 w-4 mr-2" />
              Save & Add Another
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Save & Close
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddEngineer;
