
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Plus, X, Calendar } from 'lucide-react';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { CreateEngineerFormData, ROLES } from '@/types/engineer';

interface ProfessionalDetailsSectionProps {
  form: UseFormReturn<CreateEngineerFormData>;
}

const ProfessionalDetailsSection = ({ form }: ProfessionalDetailsSectionProps) => {
  const [newDesignation, setNewDesignation] = useState('');

  const addDesignation = () => {
    if (newDesignation.trim()) {
      const currentDesignations = form.getValues('designations') || [];
      form.setValue('designations', [
        ...currentDesignations,
        {
          designation_name: newDesignation.trim(),
          start_date: new Date(),
          is_current: true,
        }
      ]);
      setNewDesignation('');
    }
  };

  const removeDesignation = (index: number) => {
    const currentDesignations = form.getValues('designations') || [];
    form.setValue('designations', currentDesignations.filter((_, i) => i !== index));
  };

  const updateDesignation = (index: number, field: string, value: any) => {
    const currentDesignations = form.getValues('designations') || [];
    const updated = [...currentDesignations];
    updated[index] = { ...updated[index], [field]: value };
    form.setValue('designations', updated);
  };

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="experience"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Experience (Years) *</FormLabel>
            <FormControl>
              <Input 
                type="number" 
                placeholder="Enter years of experience" 
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="role_id"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Role *</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {ROLES.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="space-y-3">
        <FormLabel>Designations</FormLabel>
        <div className="flex space-x-2">
          <Input
            placeholder="Add designation"
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addDesignation()}
          />
          <Button type="button" onClick={addDesignation} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-3">
          {form.watch('designations')?.map((designation, index) => (
            <div key={index} className="border rounded-lg p-3 space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline">{designation.designation_name}</Badge>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeDesignation(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !designation.start_date && "text-muted-foreground"
                        )}
                      >
                        {designation.start_date ? (
                          format(designation.start_date, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={designation.start_date}
                        onSelect={(date) => updateDesignation(index, 'start_date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !designation.end_date && "text-muted-foreground"
                        )}
                        disabled={designation.is_current}
                      >
                        {designation.end_date ? (
                          format(designation.end_date, "PPP")
                        ) : (
                          <span>Current / Pick end date</span>
                        )}
                        <Calendar className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <CalendarComponent
                        mode="single"
                        selected={designation.end_date}
                        onSelect={(date) => updateDesignation(index, 'end_date', date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`current-${index}`}
                  checked={designation.is_current}
                  onCheckedChange={(checked) => updateDesignation(index, 'is_current', checked)}
                />
                <label htmlFor={`current-${index}`} className="text-sm font-medium">
                  Current designation
                </label>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDetailsSection;
