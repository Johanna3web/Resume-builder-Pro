import { useState } from 'react';
import { Resume } from './types/resume';
import { parseUploadedResume } from './lib/ats-analyzer';
import LandingPage from './components/landing-page';
import ResumeBuilder from './components/resume-builder';
import ATSAnalyzer from './components/ats-analyzer';
import { Toaster } from './components/ui/toaster';
import { useToast } from './components/ui/use-toast';

type AppView = 'landing' | 'builder' | 'analyzer';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [currentResume, setCurrentResume] = useState<Partial<Resume> | undefined>();
  const { toast } = useToast();

  const handleCreateNew = () => {
    setCurrentResume(undefined);
    setCurrentView('builder');
  };

  const handleUpload = async (file: File) => {
    try {
      const parsedResume = await parseUploadedResume(file);
      setCurrentResume(parsedResume);
      setCurrentView('builder');
      toast({
        title: 'Resume Uploaded',
        description: 'Your resume has been uploaded. You can now edit and optimize it.',
      });
    } catch (error) {
      toast({
        title: 'Upload Failed',
        description: 'There was an error uploading your resume. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleBackToLanding = () => {
    setCurrentView('landing');
    setCurrentResume(undefined);
  };

  const handleAnalyze = () => {
    setCurrentView('analyzer');
  };

  const handleBackToBuilder = () => {
    setCurrentView('builder');
  };

  return (
    <>
      {currentView === 'landing' && (
        <LandingPage onCreateNew={handleCreateNew} onUpload={handleUpload} />
      )}

      {currentView === 'builder' && (
        <ResumeBuilder
          initialResume={currentResume}
          onBack={handleBackToLanding}
          onAnalyze={handleAnalyze}
        />
      )}

      {currentView === 'analyzer' && currentResume && (
        <ATSAnalyzer
          resume={currentResume as Resume}
          onBack={handleBackToBuilder}
        />
      )}

      <Toaster />
    </>
  );
}

export default App;