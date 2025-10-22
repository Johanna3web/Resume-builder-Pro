import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

interface SummaryFormProps {
  data: string;
  onChange: (data: string) => void;
}

export default function SummaryForm({ data, onChange }: SummaryFormProps) {
  const [charCount, setCharCount] = useState(data.length);

  const handleChange = (value: string) => {
    onChange(value);
    setCharCount(value.length);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Professional Summary</CardTitle>
        <CardDescription className="text-[#757575]">
          Write a compelling summary that highlights your key qualifications (150-200 words recommended)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            value={data}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Experienced professional with a proven track record in..."
            className="mt-1 min-h-[200px]"
          />
          <div className="flex justify-between mt-2 text-sm">
            <span className="text-[#757575]">
              {charCount < 100 && '💡 Tip: Aim for 150-200 characters for best results'}
              {charCount >= 100 && charCount < 150 && '✓ Good start! Add more details'}
              {charCount >= 150 && charCount <= 250 && '✓ Perfect length!'}
              {charCount > 250 && '⚠️ Consider making it more concise'}
            </span>
            <span className={`${charCount > 250 ? 'text-[#FF9800]' : 'text-[#757575]'}`}>
              {charCount} characters
            </span>
          </div>
        </div>

        <div className="bg-[#3F51B5]/5 p-4 rounded-lg">
          <h4 className="font-semibold text-[#3F51B5] mb-2">Tips for a great summary:</h4>
          <ul className="text-sm text-[#757575] space-y-1">
            <li>• Start with your professional title and years of experience</li>
            <li>• Highlight 2-3 key achievements or skills</li>
            <li>• Mention what you're looking for in your next role</li>
            <li>• Use action words and quantifiable results</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
