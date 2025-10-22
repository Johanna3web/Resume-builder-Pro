import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileUp, FileText, Sparkles } from 'lucide-react';

interface LandingPageProps {
  onCreateNew: () => void;
  onUpload: (file: File) => void;
}

export default function LandingPage({ onCreateNew, onUpload }: LandingPageProps) {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (file.type === 'application/pdf' || 
          file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
          file.type === 'text/plain') {
        onUpload(file);
      }
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#3F51B5] to-[#009688] rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-[#212121]">Resume Builder Pro</h1>
          </div>
          <p className="mt-2 text-[#757575]">Create ATS-friendly resumes with smart analysis</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#212121] mb-4">
            Build Your Perfect Resume
          </h2>
          <p className="text-xl text-[#757575] max-w-2xl mx-auto">
            Choose how you'd like to get started with your professional resume
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Create New Resume */}
          <Card className="border-2 hover:border-[#3F51B5] transition-all cursor-pointer group">
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-[#3F51B5] to-[#009688] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#212121]">Create New Resume</CardTitle>
              <CardDescription className="text-[#757575]">
                Start from scratch with our guided form builder
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-[#757575]">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#009688] rounded-full" />
                  Step-by-step form guidance
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#009688] rounded-full" />
                  Live preview as you type
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#009688] rounded-full" />
                  Choose from 3 professional templates
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#009688] rounded-full" />
                  ATS-optimized formatting
                </li>
              </ul>
              <Button 
                onClick={onCreateNew}
                className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white"
                size="lg"
              >
                Start Building
              </Button>
            </CardContent>
          </Card>

          {/* Upload Existing Resume */}
          <Card 
            className={`border-2 hover:border-[#009688] transition-all cursor-pointer group ${
              dragActive ? 'border-[#009688] bg-[#009688]/5' : ''
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <CardHeader>
              <div className="w-16 h-16 bg-gradient-to-br from-[#009688] to-[#3F51B5] rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <FileUp className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-[#212121]">Upload Existing Resume</CardTitle>
              <CardDescription className="text-[#757575]">
                Import your current resume for analysis and optimization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6 text-[#757575]">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#3F51B5] rounded-full" />
                  Supports PDF, DOCX, TXT formats
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#3F51B5] rounded-full" />
                  Smart content extraction
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#3F51B5] rounded-full" />
                  ATS compatibility analysis
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#3F51B5] rounded-full" />
                  Job match scoring
                </li>
              </ul>
              <div className="relative">
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.docx,.txt"
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload">
                  <Button 
                    className="w-full bg-[#FF9800] hover:bg-[#F57C00] text-white"
                    size="lg"
                    asChild
                  >
                    <span>Upload Resume</span>
                  </Button>
                </label>
              </div>
              <p className="text-xs text-[#757575] text-center mt-3">
                or drag and drop your file here
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-[#212121] text-center mb-8">
            Why Choose Resume Builder Pro?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#3F51B5]">ATS-Optimized</CardTitle>
              </CardHeader>
              <CardContent className="text-[#757575]">
                Our templates are designed to pass Applicant Tracking Systems with ease
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#009688]">Smart Analysis</CardTitle>
              </CardHeader>
              <CardContent className="text-[#757575]">
                Get real-time feedback on how well your resume matches job descriptions
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg text-[#FF9800]">Professional Templates</CardTitle>
              </CardHeader>
              <CardContent className="text-[#757575]">
                Choose from multiple professionally designed templates
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
