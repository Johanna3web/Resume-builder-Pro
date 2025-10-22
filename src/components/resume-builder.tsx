import { useState } from 'react';
import { Resume } from '@/types/resume';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Download, Eye } from 'lucide-react';
import PersonalInfoForm from './forms/personal-info-form';
import SummaryForm from './forms/summary-form';
import WorkExperienceForm from './forms/work-experience-form';
import EducationForm from './forms/education-form';
import SkillsForm from './forms/skills-form';
import CertificationsForm from './forms/certifications-form';
import ProjectsForm from './forms/projects-form';
import ResumePreview from './resume-preview';
import TemplateSelector from './template-selector';

interface ResumeBuilderProps {
  initialResume?: Partial<Resume>;
  onBack: () => void;
  onAnalyze: () => void;
}

export default function ResumeBuilder({ 
  initialResume, 
  onBack,
  onAnalyze 
}: ResumeBuilderProps) {
  const [resume, setResume] = useState<Resume>({
    personalInfo: initialResume?.personalInfo || {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    },
    summary: initialResume?.summary || '',
    workExperience: initialResume?.workExperience || [],
    education: initialResume?.education || [],
    skills: initialResume?.skills || [],
    certifications: initialResume?.certifications || [],
    projects: initialResume?.projects || [],
    template: initialResume?.template || 'modern'
  });

  const [showPreview, setShowPreview] = useState(false);

  const updateResume = (updates: Partial<Resume>) => {
    setResume(prev => ({ ...prev, ...updates }));
  };

  const handleExport = (format: 'pdf' | 'docx') => {
    // Export functionality will be implemented
    console.log(`Exporting as ${format}`);
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="text-[#757575] hover:text-[#212121]"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              <h1 className="text-2xl font-bold text-[#212121]">Resume Builder</h1>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                onClick={() => setShowPreview(!showPreview)}
                className="hidden md:flex"
              >
                <Eye className="w-4 h-4 mr-2" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </Button>
              <Button
                onClick={onAnalyze}
                className="bg-[#009688] hover:bg-[#00796B] text-white"
              >
                Analyze Resume
              </Button>
              <Button
                onClick={() => handleExport('pdf')}
                className="bg-[#FF9800] hover:bg-[#F57C00] text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Editor Section */}
          <div className="space-y-6">
            <TemplateSelector
              selected={resume.template}
              onSelect={(template) => updateResume({ template })}
            />

            <Tabs defaultValue="personal" className="w-full">
              <TabsList className="grid grid-cols-4 lg:grid-cols-7 w-full">
                <TabsTrigger value="personal">Personal</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
                <TabsTrigger value="experience">Experience</TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="certs">Certs</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
              </TabsList>

              <TabsContent value="personal" className="mt-6">
                <PersonalInfoForm
                  data={resume.personalInfo}
                  onChange={(personalInfo) => updateResume({ personalInfo })}
                />
              </TabsContent>

              <TabsContent value="summary" className="mt-6">
                <SummaryForm
                  data={resume.summary}
                  onChange={(summary) => updateResume({ summary })}
                />
              </TabsContent>

              <TabsContent value="experience" className="mt-6">
                <WorkExperienceForm
                  data={resume.workExperience}
                  onChange={(workExperience) => updateResume({ workExperience })}
                />
              </TabsContent>

              <TabsContent value="education" className="mt-6">
                <EducationForm
                  data={resume.education}
                  onChange={(education) => updateResume({ education })}
                />
              </TabsContent>

              <TabsContent value="skills" className="mt-6">
                <SkillsForm
                  data={resume.skills}
                  onChange={(skills) => updateResume({ skills })}
                />
              </TabsContent>

              <TabsContent value="certs" className="mt-6">
                <CertificationsForm
                  data={resume.certifications}
                  onChange={(certifications) => updateResume({ certifications })}
                />
              </TabsContent>

              <TabsContent value="projects" className="mt-6">
                <ProjectsForm
                  data={resume.projects}
                  onChange={(projects) => updateResume({ projects })}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Preview Section */}
          <div className={`${showPreview ? 'block' : 'hidden lg:block'}`}>
            <div className="sticky top-24">
              <ResumePreview resume={resume} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
