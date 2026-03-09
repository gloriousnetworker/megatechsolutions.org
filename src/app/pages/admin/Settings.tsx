import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Save, Upload } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSettings() {
  const [siteName, setSiteName] = useState('MEGA-TECH SOLUTIONS LTD');
  const [siteTagline, setSiteTagline] = useState('Bridging the Digital Divide');
  const [contactEmail, setContactEmail] = useState('info@megatech.com');
  const [contactPhone, setContactPhone] = useState('+234 123 456 7890');
  const [address, setAddress] = useState('Lagos, Nigeria');
  const [aboutText, setAboutText] = useState('MEGA-TECH is a leading technology training institution...');

  const handleSaveGeneral = () => {
    toast.success('General settings saved successfully!');
  };

  const handleSaveContact = () => {
    toast.success('Contact information updated!');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      toast.success('Logo uploaded successfully!');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Website Settings</h1>
        <p className="text-gray-600 mt-2">Manage your website configuration and settings</p>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="contact">Contact Info</TabsTrigger>
          <TabsTrigger value="branding">Branding</TabsTrigger>
          <TabsTrigger value="homepage">Homepage</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure basic website information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input
                  id="siteName"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                  id="tagline"
                  value={siteTagline}
                  onChange={(e) => setSiteTagline(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="about">About Description</Label>
                <Textarea
                  id="about"
                  value={aboutText}
                  onChange={(e) => setAboutText(e.target.value)}
                  rows={4}
                />
              </div>
              <Button onClick={handleSaveGeneral}>
                <Save className="mr-2 size-4" />
                Save General Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>Update contact details displayed on the website</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Contact Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Contact Phone</Label>
                <Input
                  id="phone"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
              <Button onClick={handleSaveContact}>
                <Save className="mr-2 size-4" />
                Save Contact Info
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>Upload logo and customize brand colors</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Website Logo</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="logo"
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="max-w-xs"
                  />
                  <Button variant="outline">
                    <Upload className="mr-2 size-4" />
                    Upload Logo
                  </Button>
                </div>
                <p className="text-sm text-gray-500">Recommended size: 200x200 pixels</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="primaryColor"
                    type="color"
                    defaultValue="#2563eb"
                    className="w-24 h-10"
                  />
                  <span className="text-sm text-gray-600">#2563eb</span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondaryColor">Secondary Color</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="secondaryColor"
                    type="color"
                    defaultValue="#7c3aed"
                    className="w-24 h-10"
                  />
                  <span className="text-sm text-gray-600">#7c3aed</span>
                </div>
              </div>
              <Button>
                <Save className="mr-2 size-4" />
                Save Branding
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="homepage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Homepage Settings</CardTitle>
              <CardDescription>Customize homepage content and featured items</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="heroTitle">Hero Section Title</Label>
                <Input
                  id="heroTitle"
                  defaultValue="Transform Your Career with World-Class Tech Education"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="heroSubtitle">Hero Section Subtitle</Label>
                <Textarea
                  id="heroSubtitle"
                  defaultValue="Join thousands of students mastering the skills that matter. Learn from industry experts and build your future in technology."
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label>Featured Courses Count</Label>
                <Input type="number" defaultValue="3" min="1" max="6" />
              </div>
              <div className="space-y-2">
                <Label>Show Success Stories Section</Label>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked id="showStories" />
                  <Label htmlFor="showStories" className="cursor-pointer">
                    Display student success stories on homepage
                  </Label>
                </div>
              </div>
              <Button>
                <Save className="mr-2 size-4" />
                Save Homepage Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
