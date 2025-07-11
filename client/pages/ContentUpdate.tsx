import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Edit, Globe, AlertCircle } from "lucide-react";

export function ContentUpdate() {
  const [content, setContent] = useState({
    welcomeNote:
      "Welcome to our gaming platform! Experience the thrill of online gaming with secure transactions and fair play.",
    disclaimer:
      "Please gamble responsibly. This platform is for entertainment purposes only. Users must be 18+ to participate.",
    termsOfService:
      "By using this platform, you agree to our terms and conditions. All transactions are final.",
    privacyPolicy:
      "We respect your privacy and protect your personal information according to applicable laws.",
    aboutUs:
      "We are a leading online gaming platform dedicated to providing fair and exciting gaming experiences.",
  });

  const handleSave = (contentType: string) => {
    console.log(
      `Saving ${contentType}:`,
      content[contentType as keyof typeof content],
    );
    // Add API call here
  };

  const handleSaveAll = () => {
    console.log("Saving all content:", content);
    // Add API call here
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-500 to-teal-600 bg-clip-text text-transparent">
          📝 Content Update
        </h1>
        <p className="text-muted-foreground">
          Update website content, welcome notes, disclaimers, and other text
        </p>
      </div>

      <Card className="max-w-4xl shadow-soft border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Globe className="w-6 h-6" />
            🌐 Website Content Management
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Tabs defaultValue="welcome" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="welcome">Welcome Note</TabsTrigger>
              <TabsTrigger value="disclaimer">Disclaimer</TabsTrigger>
              <TabsTrigger value="terms">Terms</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="about">About Us</TabsTrigger>
            </TabsList>

            <TabsContent value="welcome" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="welcomeNote">Welcome Note</Label>
                <Textarea
                  id="welcomeNote"
                  rows={6}
                  value={content.welcomeNote}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      welcomeNote: e.target.value,
                    }))
                  }
                  placeholder="Enter welcome message for users..."
                  className="resize-none"
                />
              </div>
              <Button
                onClick={() => handleSave("welcomeNote")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                💾 Save Welcome Note
              </Button>
            </TabsContent>

            <TabsContent value="disclaimer" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="disclaimer">Legal Disclaimer</Label>
                <Textarea
                  id="disclaimer"
                  rows={6}
                  value={content.disclaimer}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      disclaimer: e.target.value,
                    }))
                  }
                  placeholder="Enter legal disclaimer..."
                  className="resize-none"
                />
              </div>
              <div className="flex items-start gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-medium text-yellow-800 text-sm">
                    Important
                  </p>
                  <p className="text-sm text-yellow-700">
                    Ensure all legal disclaimers comply with local gambling laws
                    and regulations.
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleSave("disclaimer")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                💾 Save Disclaimer
              </Button>
            </TabsContent>

            <TabsContent value="terms" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="termsOfService">Terms of Service</Label>
                <Textarea
                  id="termsOfService"
                  rows={6}
                  value={content.termsOfService}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      termsOfService: e.target.value,
                    }))
                  }
                  placeholder="Enter terms of service..."
                  className="resize-none"
                />
              </div>
              <Button
                onClick={() => handleSave("termsOfService")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                💾 Save Terms
              </Button>
            </TabsContent>

            <TabsContent value="privacy" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="privacyPolicy">Privacy Policy</Label>
                <Textarea
                  id="privacyPolicy"
                  rows={6}
                  value={content.privacyPolicy}
                  onChange={(e) =>
                    setContent((prev) => ({
                      ...prev,
                      privacyPolicy: e.target.value,
                    }))
                  }
                  placeholder="Enter privacy policy..."
                  className="resize-none"
                />
              </div>
              <Button
                onClick={() => handleSave("privacyPolicy")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                💾 Save Privacy Policy
              </Button>
            </TabsContent>

            <TabsContent value="about" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="aboutUs">About Us</Label>
                <Textarea
                  id="aboutUs"
                  rows={6}
                  value={content.aboutUs}
                  onChange={(e) =>
                    setContent((prev) => ({ ...prev, aboutUs: e.target.value }))
                  }
                  placeholder="Enter about us content..."
                  className="resize-none"
                />
              </div>
              <Button
                onClick={() => handleSave("aboutUs")}
                className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
              >
                💾 Save About Us
              </Button>
            </TabsContent>
          </Tabs>

          <div className="flex gap-4 mt-8 pt-6 border-t border-gray-200">
            <Button
              onClick={handleSaveAll}
              className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 shadow-lg"
            >
              💾 Save All Content
            </Button>
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-2"
            >
              📋 Preview Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
