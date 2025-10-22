import { Skill } from '@/types/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export default function SkillsForm({ data, onChange }: SkillsFormProps) {
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('Intermediate');

  const addSkill = () => {
    if (newSkillName.trim()) {
      const newSkill: Skill = {
        id: Date.now().toString(),
        name: newSkillName.trim(),
        level: newSkillLevel
      };
      onChange([...data, newSkill]);
      setNewSkillName('');
      setNewSkillLevel('Intermediate');
    }
  };

  const removeSkill = (id: string) => {
    onChange(data.filter((skill) => skill.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Skills</CardTitle>
        <CardDescription className="text-[#757575]">
          Add your technical and soft skills
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Add New Skill */}
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <Label>Skill Name</Label>
              <Input
                value={newSkillName}
                onChange={(e) => setNewSkillName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="e.g., JavaScript, Project Management"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Proficiency Level</Label>
              <Select
                value={newSkillLevel}
                onValueChange={(value) => setNewSkillLevel(value as Skill['level'])}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Beginner">Beginner</SelectItem>
                  <SelectItem value="Intermediate">Intermediate</SelectItem>
                  <SelectItem value="Advanced">Advanced</SelectItem>
                  <SelectItem value="Expert">Expert</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button
            onClick={addSkill}
            className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Skill
          </Button>
        </div>

        {/* Skills List */}
        {data.length > 0 && (
          <div>
            <Label className="mb-3 block">Your Skills ({data.length})</Label>
            <div className="flex flex-wrap gap-2">
              {data.map((skill) => (
                <Badge
                  key={skill.id}
                  variant="secondary"
                  className="px-3 py-2 text-sm bg-gradient-to-r from-[#3F51B5]/10 to-[#009688]/10 hover:from-[#3F51B5]/20 hover:to-[#009688]/20"
                >
                  <span className="font-medium">{skill.name}</span>
                  {skill.level && (
                    <span className="ml-2 text-xs text-[#757575]">
                      ({skill.level})
                    </span>
                  )}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-2 hover:text-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        )}

        {data.length === 0 && (
          <div className="text-center py-8 text-[#757575]">
            <p>No skills added yet. Add your first skill above!</p>
          </div>
        )}

        <div className="bg-[#009688]/5 p-4 rounded-lg">
          <h4 className="font-semibold text-[#009688] mb-2">Skill Tips:</h4>
          <ul className="text-sm text-[#757575] space-y-1">
            <li>• Include both technical and soft skills</li>
            <li>• Match skills from the job description</li>
            <li>• Be honest about your proficiency level</li>
            <li>• Aim for 8-12 relevant skills</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
