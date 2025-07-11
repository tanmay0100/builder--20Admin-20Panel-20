import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Download,
  Smartphone,
  Monitor,
  Trash2,
  Plus,
  ExternalLink,
  CheckCircle,
} from "lucide-react";

export function DownloadLinks() {
  const [links, setLinks] = useState([
    {
      id: 1,
      platform: "Android APK",
      version: "v2.1.0",
      url: "https://example.com/app-v2.1.0.apk",
      size: "15.2 MB",
      active: true,
    },
    {
      id: 2,
      platform: "iOS App Store",
      version: "v2.1.0",
      url: "https://apps.apple.com/app/gaming-platform",
      size: "18.5 MB",
      active: true,
    },
    {
      id: 3,
      platform: "Windows Desktop",
      version: "v1.8.0",
      url: "https://example.com/desktop-setup.exe",
      size: "45.1 MB",
      active: false,
    },
  ]);

  const [newLink, setNewLink] = useState({
    platform: "",
    version: "",
    url: "",
    size: "",
    active: true,
  });

  const handleAddLink = () => {
    if (newLink.platform && newLink.version && newLink.url) {
      const link = {
        id: Date.now(),
        ...newLink,
      };
      setLinks((prev) => [...prev, link]);
      setNewLink({
        platform: "",
        version: "",
        url: "",
        size: "",
        active: true,
      });
    }
  };

  const handleRemoveLink = (id: number) => {
    setLinks((prev) => prev.filter((link) => link.id !== id));
  };

  const toggleLinkStatus = (id: number) => {
    setLinks((prev) =>
      prev.map((link) =>
        link.id === id ? { ...link, active: !link.active } : link,
      ),
    );
  };

  const handleSave = () => {
    console.log("Saving download links:", links);
    // Add API call here
  };

  const getPlatformIcon = (platform: string) => {
    if (platform.toLowerCase().includes("android"))
      return <Smartphone className="w-5 h-5 text-green-600" />;
    if (platform.toLowerCase().includes("ios"))
      return <Smartphone className="w-5 h-5 text-blue-600" />;
    if (platform.toLowerCase().includes("windows"))
      return <Monitor className="w-5 h-5 text-purple-600" />;
    return <Download className="w-5 h-5 text-gray-600" />;
  };

  return (
    <div className="p-6 bg-gradient-light min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">
          📱 Download Links Update
        </h1>
        <p className="text-muted-foreground">
          Manage download links for mobile apps and desktop applications
        </p>
      </div>

      <div className="grid gap-6 max-w-5xl">
        {/* Current Download Links */}
        <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Download className="w-6 h-6" />
              📥 Current Download Links
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {links.map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between p-4 border-2 border-gray-100 rounded-lg bg-gradient-to-r from-white to-gray-50 hover:from-gray-50 hover:to-gray-100 transition-all duration-200"
                >
                  <div className="flex items-center gap-4">
                    {getPlatformIcon(link.platform)}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-800">
                          {link.platform}
                        </span>
                        <Badge
                          variant={link.active ? "default" : "secondary"}
                          className={
                            link.active
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-600"
                          }
                        >
                          {link.active ? "Active" : "Inactive"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                        <span>Version: {link.version}</span>
                        <span>Size: {link.size}</span>
                      </div>
                      <div className="mt-1">
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                        >
                          <ExternalLink className="w-3 h-3" />
                          {link.url}
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant={link.active ? "secondary" : "default"}
                      onClick={() => toggleLinkStatus(link.id)}
                      className={
                        link.active
                          ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                          : "bg-green-100 text-green-800 hover:bg-green-200"
                      }
                    >
                      {link.active ? "Deactivate" : "Activate"}
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleRemoveLink(link.id)}
                      className="bg-red-100 text-red-800 hover:bg-red-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Add New Download Link */}
        <Card className="shadow-soft border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-t-lg">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-6 h-6" />➕ Add New Download Link
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="platform">Platform</Label>
                <Input
                  id="platform"
                  value={newLink.platform}
                  onChange={(e) =>
                    setNewLink((prev) => ({
                      ...prev,
                      platform: e.target.value,
                    }))
                  }
                  placeholder="e.g., Android APK, iOS App Store"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="version">Version</Label>
                <Input
                  id="version"
                  value={newLink.version}
                  onChange={(e) =>
                    setNewLink((prev) => ({ ...prev, version: e.target.value }))
                  }
                  placeholder="e.g., v2.1.0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="url">Download URL</Label>
                <Input
                  id="url"
                  value={newLink.url}
                  onChange={(e) =>
                    setNewLink((prev) => ({ ...prev, url: e.target.value }))
                  }
                  placeholder="https://example.com/download-link"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="size">File Size</Label>
                <Input
                  id="size"
                  value={newLink.size}
                  onChange={(e) =>
                    setNewLink((prev) => ({ ...prev, size: e.target.value }))
                  }
                  placeholder="e.g., 15.2 MB"
                />
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <Button
                onClick={handleAddLink}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                ➕ Add Download Link
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Changes */}
        <div className="flex gap-4">
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-6 py-2 shadow-lg"
          >
            💾 Save All Changes
          </Button>
          <Button
            variant="outline"
            className="border-2 border-gray-300 text-gray-600 hover:bg-gray-50 font-semibold px-6 py-2"
          >
            🔄 Refresh Links
          </Button>
        </div>
      </div>
    </div>
  );
}
