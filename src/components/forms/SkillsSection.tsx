
import React, { useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { X, Plus } from 'lucide-react';
import { FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CreateEngineerFormData, AVAILABLE_SKILLS, PROFICIENCY_LEVELS } from '@/types/engineer';

interface SkillsSectionProps {
  form: UseFormReturn<CreateEngineerFormData>;
}

const SkillsSection = ({ form }: SkillsSectionProps) => {
  const [selectedSkillId, setSelectedSkillId] = useState('');
  const [selectedProficiency, setSelectedProficiency] = useState('');

  const addSkill = () => {
    if (selectedSkillId && selectedProficiency) {
      const skill = AVAILABLE_SKILLS.find(s => s.id === selectedSkillId);
      if (skill) {
        const currentSkills = form.getValues('skills') || [];
        const skillExists = currentSkills.some(s => s.skill_id === selectedSkillId);
        
        if (!skillExists) {
          form.setValue('skills', [
            ...currentSkills,
            {
              skill_id: selectedSkillId,
              skill_name: skill.name,
              proficiency_level: selectedProficiency as any,
            }
          ]);
          setSelectedSkillId('');
          setSelectedProficiency('');
        }
      }
    }
  };

  const removeSkill = (skillId: string) => {
    const currentSkills = form.getValues('skills') || [];
    form.setValue('skills', currentSkills.filter(s => s.skill_id !== skillId));
  };

  const updateSkillProficiency = (skillId: string, proficiency: string) => {
    const currentSkills = form.getValues('skills') || [];
    const updated = currentSkills.map(skill => 
      skill.skill_id === skillId 
        ? { ...skill, proficiency_level: proficiency as any }
        : skill
    );
    form.setValue('skills', updated);
  };

  const availableSkills = AVAILABLE_SKILLS.filter(skill => 
    !form.watch('skills')?.some(s => s.skill_id === skill.id)
  );

  const skillsByCategory = availableSkills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof AVAILABLE_SKILLS>);

  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-red-100 text-red-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-blue-100 text-blue-800';
      case 'Expert': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <FormItem>
        <FormLabel>Skills</FormLabel>
        <div className="flex space-x-2">
          <Select value={selectedSkillId} onValueChange={setSelectedSkillId}>
            <SelectTrigger className="flex-1">
              <SelectValue placeholder="Select a skill" />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(skillsByCategory).map(([category, skills]) => (
                <div key={category}>
                  <div className="px-2 py-1 text-sm font-semibold text-muted-foreground">
                    {category}
                  </div>
                  {skills.map((skill) => (
                    <SelectItem key={skill.id} value={skill.id}>
                      {skill.name}
                    </SelectItem>
                  ))}
                </div>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={selectedProficiency} onValueChange={setSelectedProficiency}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Proficiency" />
            </SelectTrigger>
            <SelectContent>
              {PROFICIENCY_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button type="button" onClick={addSkill} size="sm" disabled={!selectedSkillId || !selectedProficiency}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <FormMessage />
      </FormItem>

      <div className="space-y-3">
        <FormLabel>Selected Skills</FormLabel>
        {form.watch('skills')?.length === 0 ? (
          <p className="text-sm text-muted-foreground">No skills selected yet.</p>
        ) : (
          <div className="space-y-2">
            {form.watch('skills')?.map((skill) => (
              <div key={skill.skill_id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center space-x-3">
                  <Badge variant="outline">{skill.skill_name}</Badge>
                  <Select
                    value={skill.proficiency_level}
                    onValueChange={(value) => updateSkillProficiency(skill.skill_id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PROFICIENCY_LEVELS.map((level) => (
                        <SelectItem key={level} value={level}>
                          {level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Badge className={getProficiencyColor(skill.proficiency_level)}>
                    {skill.proficiency_level}
                  </Badge>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeSkill(skill.skill_id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SkillsSection;
