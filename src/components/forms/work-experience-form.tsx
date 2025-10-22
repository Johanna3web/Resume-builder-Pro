import { WorkExperience } from '@/types/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Plus, Trash2 } from 'lucide-react';

interface WorkExperienceFormProps {
  data: WorkExperience[];
  onChange: (data: WorkExperience[]) => void;
}

export default function WorkExperienceForm({ data, onChange }: WorkExperienceFormProps) {
  const addExperience = () => {
    const newExp: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    };
    onChange([...data, newExp]);
  };

  const updateExperience = (id: string, field: keyof WorkExperience, value: any) => {
    onChange(
      data.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    );
  };

  const removeExperience = (id: string) => {
    onChange(data.filter((exp) => exp.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Work Experience</CardTitle>
        <CardDescription className="text-[#757575]">
          Add your professional work history
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((exp, index) => (
          <div key={exp.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-[#212121]">Position {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeExperience(exp.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Job Title *</Label>
                <Input
                  value={exp.jobTitle}
                  onChange={(e) => updateExperience(exp.id, 'jobTitle', e.target.value)}
                  placeholder="Software Engineer"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Company *</Label>
                <Input
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  placeholder="Tech Corp"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Location</Label>
              <Input
                value={exp.location}
                onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                placeholder="San Francisco, CA"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Start Date *</Label>
                <Input
                  type="month"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>End Date</Label>
                <Input
                  type="month"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  disabled={exp.current}
                  className="mt-1"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id={`current-${exp.id}`}
                checked={exp.current}
                onCheckedChange={(checked) =>
                  updateExperience(exp.id, 'current', checked)
                }
              />
              <Label htmlFor={`current-${exp.id}`} className="cursor-pointer">
                I currently work here
              </Label>
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                placeholder="• Led a team of 5 developers&#10;• Increased performance by 40%&#10;• Implemented new features..."
                className="mt-1 min-h-[120px]"
              />
              <p className="text-xs text-[#757575] mt-1">
                Use bullet points and include quantifiable achievements
              </p>
            </div>
          </div>
        ))}

        <Button
          onClick={addExperience}
          variant="outline"
          className="w-full border-dashed border-2 border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5]/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Work Experience
        </Button>
      </CardContent>
    </Card>
  );
}
