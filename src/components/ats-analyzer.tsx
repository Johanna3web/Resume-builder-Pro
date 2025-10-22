import { useState } from 'react';
import { Resume, ATSAnalysis } from '@/types/resume';
import { analyzeResume } from '@/lib/ats-analyzer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, CheckCircle2, AlertTriangle, XCircle, Sparkles } from 'lucide-react';

interface ATSAnalyzerProps {
  resume: Resume;
  onBack: () => void;
}

export default function ATSAnalyzer({ resume, onBack }: ATSAnalyzerProps) {
  const [jobDescription, setJobDescription] = useState('');
  const [analysis, setAnalysis] = useState<ATSAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = () => {
    if (!jobDescription.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay
    setTimeout(() => {
      const result = analyzeResume(resume, jobDescription);
      setAnalysis(result);
      setIsAnalyzing(false);
    }, 1500);
  };

  const getScoreColor = (score: number) => {
    if (score >= 75) return 'text-green-600';
    if (score >= 50) return 'text-[#FF9800]';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 75) return 'bg-green-600';
    if (score >= 50) return 'bg-[#FF9800]';
    return 'bg-red-600';
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-[#757575] hover:text-[#212121]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Editor
            </Button>
            <h1 className="text-2xl font-bold text-[#212121]">ATS Analysis</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Job Description Input */}
          <Card>
            <CardHeader>
              <CardTitle className="text-[#212121] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#3F51B5]" />
                Job Description Analysis
              </CardTitle>
              <CardDescription className="text-[#757575]">
                Paste the job description you're applying for to get a detailed match analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="jobDesc">Job Description *</Label>
                <Textarea
                  id="jobDesc"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Paste the full job description here..."
                  className="mt-1 min-h-[200px]"
                />
              </div>
              <Button
                onClick={handleAnalyze}
                disabled={!jobDescription.trim() || isAnalyzing}
                className="w-full bg-[#3F51B5] hover:bg-[#303F9F] text-white"
                size="lg"
              >
                {isAnalyzing ? 'Analyzing...' : 'Analyze Resume'}
              </Button>
            </CardContent>
          </Card>

          {/* Analysis Results */}
          {analysis && (
            <div className="space-y-6">
              {/* Match Score */}
              <Card className="border-2 border-[#3F51B5]">
                <CardHeader>
                  <CardTitle className="text-[#212121]">Match Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className={`text-6xl font-bold ${getScoreColor(analysis.matchPercentage)} mb-4`}>
                      {analysis.matchPercentage}%
                    </div>
                    <Progress 
                      value={analysis.matchPercentage} 
                      className="h-3 mb-4"
                    />
                    <p className="text-[#757575]">
                      {analysis.matchPercentage >= 75 && 'Excellent match! Your resume aligns well with the job requirements.'}
                      {analysis.matchPercentage >= 50 && analysis.matchPercentage < 75 && 'Good match! Consider adding more relevant keywords.'}
                      {analysis.matchPercentage < 50 && 'Needs improvement. Review the suggestions below to strengthen your resume.'}
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Strengths */}
              {analysis.strengths.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-green-600 flex items-center gap-2">
                      <CheckCircle2 className="w-5 h-5" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.strengths.map((strength, index) => (
                        <Alert key={index} className="border-green-200 bg-green-50">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <AlertDescription className="text-[#212121]">
                            {strength}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Suggestions */}
              {analysis.suggestions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#FF9800] flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5" />
                      Suggestions for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.suggestions.map((suggestion, index) => (
                        <Alert key={index} className="border-[#FF9800]/30 bg-[#FF9800]/5">
                          <AlertTriangle className="w-4 h-4 text-[#FF9800]" />
                          <AlertDescription className="text-[#212121]">
                            {suggestion}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Missing Keywords */}
              {analysis.missingKeywords.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-[#212121]">Missing Keywords</CardTitle>
                    <CardDescription className="text-[#757575]">
                      Consider adding these keywords from the job description
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {analysis.missingKeywords.map((keyword, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="border-[#3F51B5] text-[#3F51B5]"
                        >
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <XCircle className="w-5 h-5" />
                      Warnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {analysis.warnings.map((warning, index) => (
                        <Alert key={index} className="border-red-200 bg-red-50">
                          <XCircle className="w-4 h-4 text-red-600" />
                          <AlertDescription className="text-[#212121]">
                            {warning}
                          </AlertDescription>
                        </Alert>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  onClick={onBack}
                  className="flex-1 bg-[#009688] hover:bg-[#00796B] text-white"
                  size="lg"
                >
                  Edit Resume
                </Button>
                <Button
                  onClick={() => setAnalysis(null)}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  Analyze Another Job
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
