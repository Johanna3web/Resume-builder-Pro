import { Resume, ATSAnalysis } from '@/types/resume';

export const analyzeResume = (resume: Resume, jobDescription: string): ATSAnalysis => {
  const resumeText = extractResumeText(resume).toLowerCase();
  const jobDescText = jobDescription.toLowerCase();
  
  // Extract keywords from job description
  const jobKeywords = extractKeywords(jobDescText);
  const resumeKeywords = extractKeywords(resumeText);
  
  // Find missing keywords
  const missingKeywords = jobKeywords.filter(
    keyword => !resumeKeywords.includes(keyword)
  );
  
  // Calculate match percentage
  const matchedKeywords = jobKeywords.filter(
    keyword => resumeKeywords.includes(keyword)
  );
  const matchPercentage = Math.round(
    (matchedKeywords.length / jobKeywords.length) * 100
  );
  
  // Generate suggestions
  const suggestions = generateSuggestions(resume, missingKeywords, jobDescText);
  
  // Identify strengths
  const strengths = identifyStrengths(resume, matchedKeywords);
  
  // Generate warnings
  const warnings = generateWarnings(resume);
  
  return {
    matchPercentage,
    missingKeywords: missingKeywords.slice(0, 10),
    suggestions,
    strengths,
    warnings
  };
};

const extractResumeText = (resume: Resume): string => {
  const parts = [
    resume.personalInfo.fullName,
    resume.summary,
    ...resume.workExperience.map(exp => `${exp.jobTitle} ${exp.company} ${exp.description}`),
    ...resume.education.map(edu => `${edu.degree} ${edu.institution}`),
    ...resume.skills.map(skill => skill.name),
    ...resume.certifications.map(cert => cert.name),
    ...resume.projects.map(proj => `${proj.name} ${proj.description}`)
  ];
  return parts.join(' ');
};

const extractKeywords = (text: string): string[] => {
  // Remove common words and extract meaningful keywords
  const commonWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those'
  ]);
  
  const words = text
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 2 && !commonWords.has(word));
  
  return [...new Set(words)];
};

const generateSuggestions = (
  resume: Resume,
  missingKeywords: string[],
  jobDesc: string
): string[] => {
  const suggestions: string[] = [];
  
  if (missingKeywords.length > 0) {
    suggestions.push(
      `Add these keywords to your resume: ${missingKeywords.slice(0, 5).join(', ')}`
    );
  }
  
  if (resume.summary.length < 100) {
    suggestions.push('Expand your professional summary to 150-200 words');
  }
  
  if (resume.workExperience.length === 0) {
    suggestions.push('Add work experience to strengthen your resume');
  }
  
  if (resume.skills.length < 5) {
    suggestions.push('Add more relevant skills from the job description');
  }
  
  const hasQuantifiableAchievements = resume.workExperience.some(
    exp => /\d+/.test(exp.description)
  );
  if (!hasQuantifiableAchievements) {
    suggestions.push('Include quantifiable achievements (e.g., "Increased sales by 25%")');
  }
  
  return suggestions;
};

const identifyStrengths = (resume: Resume, matchedKeywords: string[]): string[] => {
  const strengths: string[] = [];
  
  if (matchedKeywords.length > 10) {
    strengths.push('Strong keyword match with job requirements');
  }
  
  if (resume.workExperience.length >= 3) {
    strengths.push('Solid work experience history');
  }
  
  if (resume.certifications.length > 0) {
    strengths.push('Professional certifications add credibility');
  }
  
  if (resume.projects.length > 0) {
    strengths.push('Project portfolio demonstrates practical skills');
  }
  
  return strengths;
};

const generateWarnings = (resume: Resume): string[] => {
  const warnings: string[] = [];
  
  if (!resume.personalInfo.email.includes('@')) {
    warnings.push('Invalid email format');
  }
  
  if (resume.workExperience.length === 0) {
    warnings.push('No work experience listed');
  }
  
  if (resume.education.length === 0) {
    warnings.push('No education information provided');
  }
  
  if (resume.summary.length === 0) {
    warnings.push('Missing professional summary');
  }
  
  return warnings;
};

export const parseUploadedResume = async (file: File): Promise<Partial<Resume>> => {
  // This is a simplified parser - in production, you'd use a proper library
  const text = await file.text();
  
  return {
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: ''
    },
    summary: '',
    workExperience: [],
    education: [],
    skills: [],
    certifications: [],
    projects: [],
    template: 'modern'
  };
};
