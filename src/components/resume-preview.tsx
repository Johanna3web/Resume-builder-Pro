import { Resume } from '@/types/resume';
import { Card } from '@/components/ui/card';
import { Mail, Phone, MapPin, Linkedin, Github, Globe } from 'lucide-react';

interface ResumePreviewProps {
  resume: Resume;
}

export default function ResumePreview({ resume }: ResumePreviewProps) {
  const { template } = resume;

  if (template === 'modern') {
    return <ModernTemplate resume={resume} />;
  } else if (template === 'minimalist') {
    return <MinimalistTemplate resume={resume} />;
  } else {
    return <ClassicTemplate resume={resume} />;
  }
}

function ClassicTemplate({ resume }: { resume: Resume }) {
  return (
    <Card className="bg-white p-8 shadow-lg">
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center border-b-2 border-gray-300 pb-4">
          <h1 className="text-3xl font-bold text-[#212121]">
            {resume.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-3 text-sm text-[#757575]">
            {resume.personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3 h-3" />
                {resume.personalInfo.email}
              </span>
            )}
            {resume.personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                {resume.personalInfo.phone}
              </span>
            )}
            {resume.personalInfo.address && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {resume.personalInfo.address}
              </span>
            )}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div>
            <h2 className="text-lg font-bold text-[#212121] mb-2">PROFESSIONAL SUMMARY</h2>
            <p className="text-sm text-[#757575]">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#212121] mb-3">WORK EXPERIENCE</h2>
            <div className="space-y-4">
              {resume.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-[#212121]">{exp.jobTitle}</h3>
                      <p className="text-sm text-[#757575]">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-[#757575]">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-[#757575] mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#212121] mb-3">EDUCATION</h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-semibold text-[#212121]">{edu.degree}</h3>
                  <p className="text-sm text-[#757575]">{edu.institution} • {edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-[#212121] mb-2">SKILLS</h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span key={skill.id} className="text-sm text-[#757575]">
                  {skill.name}
                  {skill !== resume.skills[resume.skills.length - 1] && ' •'}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function ModernTemplate({ resume }: { resume: Resume }) {
  return (
    <Card className="bg-white shadow-lg overflow-hidden">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-[#3F51B5] to-[#009688] text-white p-8">
        <h1 className="text-4xl font-bold mb-3">
          {resume.personalInfo.fullName || 'Your Name'}
        </h1>
        <div className="flex flex-wrap gap-4 text-sm">
          {resume.personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-4 h-4" />
              {resume.personalInfo.email}
            </span>
          )}
          {resume.personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-4 h-4" />
              {resume.personalInfo.phone}
            </span>
          )}
          {resume.personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-4 h-4" />
              LinkedIn
            </span>
          )}
        </div>
      </div>

      <div className="p-8 space-y-6">
        {/* Summary */}
        {resume.summary && (
          <div>
            <h2 className="text-xl font-bold text-[#3F51B5] mb-3 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#009688]" />
              About Me
            </h2>
            <p className="text-[#757575]">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#3F51B5] mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#009688]" />
              Experience
            </h2>
            <div className="space-y-5">
              {resume.workExperience.map((exp) => (
                <div key={exp.id} className="border-l-2 border-[#009688] pl-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-bold text-[#212121]">{exp.jobTitle}</h3>
                      <p className="text-[#757575]">{exp.company} • {exp.location}</p>
                    </div>
                    <span className="text-sm text-[#757575] bg-[#F5F5F5] px-3 py-1 rounded">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-[#757575]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#3F51B5] mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#009688]" />
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-bold text-[#212121]">{edu.degree}</h3>
                  <p className="text-[#757575]">{edu.institution} • {edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-[#3F51B5] mb-4 flex items-center gap-2">
              <div className="w-1 h-6 bg-[#009688]" />
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {resume.skills.map((skill) => (
                <span
                  key={skill.id}
                  className="px-3 py-1 bg-gradient-to-r from-[#3F51B5]/10 to-[#009688]/10 text-[#212121] rounded-full text-sm"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}

function MinimalistTemplate({ resume }: { resume: Resume }) {
  return (
    <Card className="bg-white p-8 shadow-lg">
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-light text-[#212121] mb-4">
            {resume.personalInfo.fullName || 'Your Name'}
          </h1>
          <div className="flex flex-wrap gap-3 text-sm text-[#757575]">
            {resume.personalInfo.email && <span>{resume.personalInfo.email}</span>}
            {resume.personalInfo.phone && <span>•</span>}
            {resume.personalInfo.phone && <span>{resume.personalInfo.phone}</span>}
            {resume.personalInfo.address && <span>•</span>}
            {resume.personalInfo.address && <span>{resume.personalInfo.address}</span>}
          </div>
        </div>

        {/* Summary */}
        {resume.summary && (
          <div>
            <p className="text-[#757575] leading-relaxed">{resume.summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {resume.workExperience.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[#212121] uppercase tracking-wider mb-4 pb-2 border-b">
              Experience
            </h2>
            <div className="space-y-5">
              {resume.workExperience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-medium text-[#212121]">{exp.jobTitle}</h3>
                    <span className="text-xs text-[#757575]">
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-[#757575] mb-2">{exp.company}, {exp.location}</p>
                  <p className="text-sm text-[#757575]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {resume.education.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[#212121] uppercase tracking-wider mb-4 pb-2 border-b">
              Education
            </h2>
            <div className="space-y-3">
              {resume.education.map((edu) => (
                <div key={edu.id}>
                  <h3 className="font-medium text-[#212121]">{edu.degree}</h3>
                  <p className="text-sm text-[#757575]">{edu.institution}, {edu.graduationDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills */}
        {resume.skills.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-[#212121] uppercase tracking-wider mb-4 pb-2 border-b">
              Skills
            </h2>
            <p className="text-sm text-[#757575]">
              {resume.skills.map((skill) => skill.name).join(' • ')}
            </p>
          </div>
        )}
      </div>
    </Card>
  );
}
