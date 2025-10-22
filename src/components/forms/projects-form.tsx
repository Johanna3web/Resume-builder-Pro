import { Project } from '@/types/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

export default function ProjectsForm({ data, onChange }: ProjectsFormProps) {
  const [newTech, setNewTech] = useState<{ [key: string]: string }>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: ''
    };
    onChange([...data, newProject]);
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(
      data.map((proj) =>
        proj.id === id ? { ...proj, [field]: value } : proj
      )
    );
  };

  const removeProject = (id: string) => {
    onChange(data.filter((proj) => proj.id !== id));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (tech) {
      const project = data.find((p) => p.id === projectId);
      if (project) {
        updateProject(projectId, 'technologies', [...project.technologies, tech]);
        setNewTech({ ...newTech, [projectId]: '' });
      }
    }
  };

  const removeTechnology = (projectId: string, techIndex: number) => {
    const project = data.find((p) => p.id === projectId);
    if (project) {
      const newTechs = project.technologies.filter((_, i) => i !== techIndex);
      updateProject(projectId, 'technologies', newTechs);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Projects</CardTitle>
        <CardDescription className="text-[#757575]">
          Showcase your personal or professional projects
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((project, index) => (
          <div key={project.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-[#212121]">Project {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeProject(project.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Project Name *</Label>
              <Input
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                placeholder="E-commerce Platform"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Description *</Label>
              <Textarea
                value={project.description}
                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                placeholder="Built a full-stack e-commerce platform with user authentication, payment processing..."
                className="mt-1 min-h-[100px]"
              />
            </div>

            <div>
              <Label>Technologies Used</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  value={newTech[project.id] || ''}
                  onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTechnology(project.id);
                    }
                  }}
                  placeholder="React, Node.js, MongoDB..."
                />
                <Button
                  type="button"
                  onClick={() => addTechnology(project.id)}
                  size="sm"
                  className="bg-[#009688] hover:bg-[#00796B]"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
              {project.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {project.technologies.map((tech, techIndex) => (
                    <Badge
                      key={techIndex}
                      variant="secondary"
                      className="bg-[#009688]/10 hover:bg-[#009688]/20"
                    >
                      {tech}
                      <button
                        onClick={() => removeTechnology(project.id, techIndex)}
                        className="ml-2 hover:text-red-500"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div>
              <Label>Project Link (Optional)</Label>
              <Input
                value={project.link || ''}
                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                placeholder="https://github.com/username/project"
                className="mt-1"
              />
            </div>
          </div>
        ))}

        <Button
          onClick={addProject}
          variant="outline"
          className="w-full border-dashed border-2 border-[#3F51B5] text-[#3F51B5] hover:bg-[#3F51B5]/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>

        {data.length === 0 && (
          <div className="text-center py-8 text-[#757575]">
            <p>No projects added. Showcase your work by adding a project!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
