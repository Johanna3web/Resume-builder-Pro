import { Education } from '@/types/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface EducationFormProps {
  data: Education[];
  onChange: (data: Education[]) => void;
}

export default function EducationForm({ data, onChange }: EducationFormProps) {
  const addEducation = () => {
    const newEdu: Education = {
      id: Date.now().toString(),
      degree: '',
      institution: '',
      location: '',
      graduationDate: '',
      gpa: '',
      description: ''
    };
    onChange([...data, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: string) => {
    onChange(
      data.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    );
  };

  const removeEducation = (id: string) => {
    onChange(data.filter((edu) => edu.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Education</CardTitle>
        <CardDescription className="text-[#757575]">
          Add your educational background
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-[#212121]">Education {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeEducation(edu.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Degree *</Label>
              <Input
                value={edu.degree}
                onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                placeholder="Bachelor of Science in Computer Science"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Institution *</Label>
                <Input
                  value={edu.institution}
                  onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                  placeholder="University Name"
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={edu.location}
                  onChange={(e) => updateEducation(edu.id, 'location', e.target.value)}
                  placeholder="City, State"
                  className="mt-1"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Graduation Date *</Label>
                <Input
                  type="month"
                  value={edu.graduationDate}
                  onChange={(e) => updateEducation(edu.id, 'graduationDate', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>GPA (Optional)</Label>
                <Input
                  value={edu.gpa || ''}
                  onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                  placeholder="3.8/4.0"
                  className="mt-1"
                />
              </div>
            </div>

            <div>
              <Label>Additional Details (Optional)</Label>
              <Textarea
                value={edu.description || ''}
                onChange={(e) => updateEducation(edu.id, 'description', e.target.value)}
                placeholder="Honors, relevant coursework, achievements..."
                className="mt-1"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addEducation}
          variant="outline"
          className="w-full border-dashed border-2 border-[#009688] text-[#009688] hover:bg-[#009688]/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Education
        </Button>
      </CardContent>
    </Card>
  );
}
