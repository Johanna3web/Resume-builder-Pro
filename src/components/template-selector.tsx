import { Card, CardContent } from '@/components/ui/card';
import { Check } from 'lucide-react';

interface TemplateSelectorProps {
  selected: 'classic' | 'modern' | 'minimalist';
  onSelect: (template: 'classic' | 'modern' | 'minimalist') => void;
}

export default function TemplateSelector({ selected, onSelect }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'classic' as const,
      name: 'Classic',
      description: 'Traditional and professional',
      preview: 'bg-gradient-to-br from-slate-100 to-slate-200'
    },
    {
      id: 'modern' as const,
      name: 'Modern',
      description: 'Clean and contemporary',
      preview: 'bg-gradient-to-br from-[#3F51B5]/10 to-[#009688]/10'
    },
    {
      id: 'minimalist' as const,
      name: 'Minimalist',
      description: 'Simple and elegant',
      preview: 'bg-gradient-to-br from-gray-50 to-white'
    }
  ];

  return (
    <Card>
      <CardContent className="pt-6">
        <h3 className="text-lg font-semibold text-[#212121] mb-4">Choose Template</h3>
        <div className="grid grid-cols-3 gap-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onSelect(template.id)}
              className={`relative group cursor-pointer transition-all ${
                selected === template.id ? 'ring-2 ring-[#3F51B5]' : ''
              } rounded-lg overflow-hidden`}
            >
              <div className={`${template.preview} aspect-[3/4] border-2 ${
                selected === template.id ? 'border-[#3F51B5]' : 'border-gray-200'
              } rounded-lg p-2`}>
                {selected === template.id && (
                  <div className="absolute top-2 right-2 w-6 h-6 bg-[#3F51B5] rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                )}
                <div className="space-y-1">
                  <div className="h-2 bg-gray-300 rounded w-3/4" />
                  <div className="h-1 bg-gray-200 rounded w-1/2" />
                  <div className="h-1 bg-gray-200 rounded w-2/3" />
                </div>
              </div>
              <div className="mt-2 text-center">
                <p className="text-sm font-medium text-[#212121]">{template.name}</p>
                <p className="text-xs text-[#757575]">{template.description}</p>
              </div>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
