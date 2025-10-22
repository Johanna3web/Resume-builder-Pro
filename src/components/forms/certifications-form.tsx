import { Certification } from '@/types/resume';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface CertificationsFormProps {
  data: Certification[];
  onChange: (data: Certification[]) => void;
}

export default function CertificationsForm({ data, onChange }: CertificationsFormProps) {
  const addCertification = () => {
    const newCert: Certification = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: ''
    };
    onChange([...data, newCert]);
  };

  const updateCertification = (id: string, field: keyof Certification, value: string) => {
    onChange(
      data.map((cert) =>
        cert.id === id ? { ...cert, [field]: value } : cert
      )
    );
  };

  const removeCertification = (id: string) => {
    onChange(data.filter((cert) => cert.id !== id));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#212121]">Certifications</CardTitle>
        <CardDescription className="text-[#757575]">
          Add professional certifications and licenses
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {data.map((cert, index) => (
          <div key={cert.id} className="p-4 border rounded-lg space-y-4 relative">
            <div className="flex justify-between items-start">
              <h4 className="font-semibold text-[#212121]">Certification {index + 1}</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCertification(cert.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>

            <div>
              <Label>Certification Name *</Label>
              <Input
                value={cert.name}
                onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
                placeholder="AWS Certified Solutions Architect"
                className="mt-1"
              />
            </div>

            <div>
              <Label>Issuing Organization *</Label>
              <Input
                value={cert.issuer}
                onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
                placeholder="Amazon Web Services"
                className="mt-1"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Issue Date *</Label>
                <Input
                  type="month"
                  value={cert.date}
                  onChange={(e) => updateCertification(cert.id, 'date', e.target.value)}
                  className="mt-1"
                />
              </div>

              <div>
                <Label>Expiry Date (Optional)</Label>
                <Input
                  type="month"
                  value={cert.expiryDate || ''}
                  onChange={(e) => updateCertification(cert.id, 'expiryDate', e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          </div>
        ))}

        <Button
          onClick={addCertification}
          variant="outline"
          className="w-full border-dashed border-2 border-[#FF9800] text-[#FF9800] hover:bg-[#FF9800]/5"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Certification
        </Button>

        {data.length === 0 && (
          <div className="text-center py-8 text-[#757575]">
            <p>No certifications added. Click above to add your first certification.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
