import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  User,
  Shield,
  Bell,
  Database,
  Palette,
  Globe,
  Clock,
  Key,
  Mail,
  Phone,
  MapPin,
  Save,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  Server,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";

interface SettingsData {
  profile: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  security: {
    twoFactorEnabled: boolean;
    loginAlerts: boolean;
    sessionTimeout: number;
  };
  notifications: {
    emailNotifications: boolean;
    smsNotifications: boolean;
    pushNotifications: boolean;
    newUserAlerts: boolean;
    highBetAlerts: boolean;
  };
  platform: {
    maintenanceMode: boolean;
    newRegistrations: boolean;
    gamesBetting: boolean;
    withdrawals: boolean;
    minBetAmount: number;
    maxBetAmount: number;
    maxDailyWithdrawal: number;
  };
  system: {
    backupFrequency: string;
    logRetention: number;
    cacheTimeout: number;
  };
}

export function Settings() {
  const [settings, setSettings] = useState<SettingsData>({
    profile: {
      name: "Admin User",
      email: "admin@betplatform.com",
      phone: "+91 98765 43210",
      address: "Mumbai, Maharashtra, India",
    },
    security: {
      twoFactorEnabled: true,
      loginAlerts: true,
      sessionTimeout: 30,
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      newUserAlerts: true,
      highBetAlerts: true,
    },
    platform: {
      maintenanceMode: false,
      newRegistrations: true,
      gamesBetting: true,
      withdrawals: true,
      minBetAmount: 10,
      maxBetAmount: 100000,
      maxDailyWithdrawal: 500000,
    },
    system: {
      backupFrequency: "daily",
      logRetention: 30,
      cacheTimeout: 60,
    },
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const updateSetting = (
    section: keyof SettingsData,
    key: string,
    value: any,
  ) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));
  };

  const handleSave = (section: string) => {
    toast.success(`${section} settings saved successfully!`);
  };

  const handlePasswordChange = () => {
    if (!passwords.current || !passwords.new || !passwords.confirm) {
      toast.error("Please fill all password fields");
      return;
    }
    if (passwords.new !== passwords.confirm) {
      toast.error("New passwords don't match");
      return;
    }
    if (passwords.new.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }

    toast.success("Password changed successfully!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleSystemAction = (action: string) => {
    switch (action) {
      case "backup":
        toast.success("System backup initiated successfully!");
        break;
      case "cache":
        toast.success("System cache cleared successfully!");
        break;
      case "logs":
        toast.success("System logs cleared successfully!");
        break;
      case "restart":
        toast.warning("System restart scheduled for next maintenance window");
        break;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground">
          Manage your platform settings, security, and configurations
        </p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <Bell className="w-4 h-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger value="platform" className="flex items-center gap-2">
            <Globe className="w-4 h-4" />
            Platform
          </TabsTrigger>
          <TabsTrigger value="system" className="flex items-center gap-2">
            <Server className="w-4 h-4" />
            System
          </TabsTrigger>
        </TabsList>

        {/* Profile Settings */}
        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={settings.profile.name}
                    onChange={(e) =>
                      updateSetting("profile", "name", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.profile.email}
                    onChange={(e) =>
                      updateSetting("profile", "email", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={settings.profile.phone}
                    onChange={(e) =>
                      updateSetting("profile", "phone", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={settings.profile.address}
                    onChange={(e) =>
                      updateSetting("profile", "address", e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("Profile")}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="w-5 h-5" />
                Change Password
              </CardTitle>
              <CardDescription>
                Update your password to keep your account secure
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="current-password">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="current-password"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          current: e.target.value,
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() =>
                        setShowCurrentPassword(!showCurrentPassword)
                      }
                    >
                      {showCurrentPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="new-password">New Password</Label>
                  <div className="relative">
                    <Input
                      id="new-password"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) =>
                        setPasswords((prev) => ({
                          ...prev,
                          new: e.target.value,
                        }))
                      }
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    value={passwords.confirm}
                    onChange={(e) =>
                      setPasswords((prev) => ({
                        ...prev,
                        confirm: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handlePasswordChange}
                  className="flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Change Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
              <CardDescription>
                Configure security options and authentication settings
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.twoFactorEnabled}
                  onCheckedChange={(checked) =>
                    updateSetting("security", "twoFactorEnabled", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Login Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when someone logs into your account
                  </p>
                </div>
                <Switch
                  checked={settings.security.loginAlerts}
                  onCheckedChange={(checked) =>
                    updateSetting("security", "loginAlerts", checked)
                  }
                />
              </div>
              <Separator />
              <div className="space-y-2">
                <Label htmlFor="session-timeout">
                  Session Timeout (minutes)
                </Label>
                <Input
                  id="session-timeout"
                  type="number"
                  value={settings.security.sessionTimeout}
                  onChange={(e) =>
                    updateSetting(
                      "security",
                      "sessionTimeout",
                      parseInt(e.target.value),
                    )
                  }
                  className="w-32"
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("Security")}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Security Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose how you want to be notified about platform activities
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.emailNotifications}
                  onCheckedChange={(checked) =>
                    updateSetting(
                      "notifications",
                      "emailNotifications",
                      checked,
                    )
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via SMS
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.smsNotifications}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "smsNotifications", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">New User Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new users register
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.newUserAlerts}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "newUserAlerts", checked)
                  }
                />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">High Bet Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified about high-value bets
                  </p>
                </div>
                <Switch
                  checked={settings.notifications.highBetAlerts}
                  onCheckedChange={(checked) =>
                    updateSetting("notifications", "highBetAlerts", checked)
                  }
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("Notifications")}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Notification Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Platform Settings */}
        <TabsContent value="platform" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                Platform Configuration
              </CardTitle>
              <CardDescription>
                Configure platform-wide settings and limits
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Platform Controls</h4>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Maintenance Mode</Label>
                        <p className="text-sm text-muted-foreground">
                          Put platform in maintenance mode
                        </p>
                      </div>
                      <Switch
                        checked={settings.platform.maintenanceMode}
                        onCheckedChange={(checked) =>
                          updateSetting("platform", "maintenanceMode", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">New Registrations</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow new user registrations
                        </p>
                      </div>
                      <Switch
                        checked={settings.platform.newRegistrations}
                        onCheckedChange={(checked) =>
                          updateSetting("platform", "newRegistrations", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Games Betting</Label>
                        <p className="text-sm text-muted-foreground">
                          Enable betting on games
                        </p>
                      </div>
                      <Switch
                        checked={settings.platform.gamesBetting}
                        onCheckedChange={(checked) =>
                          updateSetting("platform", "gamesBetting", checked)
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label className="text-base">Withdrawals</Label>
                        <p className="text-sm text-muted-foreground">
                          Allow user withdrawals
                        </p>
                      </div>
                      <Switch
                        checked={settings.platform.withdrawals}
                        onCheckedChange={(checked) =>
                          updateSetting("platform", "withdrawals", checked)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Betting Limits</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-bet">Minimum Bet Amount (₹)</Label>
                      <Input
                        id="min-bet"
                        type="number"
                        value={settings.platform.minBetAmount}
                        onChange={(e) =>
                          updateSetting(
                            "platform",
                            "minBetAmount",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-bet">Maximum Bet Amount (₹)</Label>
                      <Input
                        id="max-bet"
                        type="number"
                        value={settings.platform.maxBetAmount}
                        onChange={(e) =>
                          updateSetting(
                            "platform",
                            "maxBetAmount",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="max-withdrawal">
                        Max Daily Withdrawal (₹)
                      </Label>
                      <Input
                        id="max-withdrawal"
                        type="number"
                        value={settings.platform.maxDailyWithdrawal}
                        onChange={(e) =>
                          updateSetting(
                            "platform",
                            "maxDailyWithdrawal",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("Platform")}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Platform Settings
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="w-5 h-5" />
                System Administration
              </CardTitle>
              <CardDescription>
                Manage system settings, backups, and maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Configuration</h4>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="backup-frequency">Backup Frequency</Label>
                      <select
                        id="backup-frequency"
                        className="w-full p-2 border border-input rounded-md"
                        value={settings.system.backupFrequency}
                        onChange={(e) =>
                          updateSetting(
                            "system",
                            "backupFrequency",
                            e.target.value,
                          )
                        }
                      >
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="log-retention">
                        Log Retention (days)
                      </Label>
                      <Input
                        id="log-retention"
                        type="number"
                        value={settings.system.logRetention}
                        onChange={(e) =>
                          updateSetting(
                            "system",
                            "logRetention",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cache-timeout">
                        Cache Timeout (minutes)
                      </Label>
                      <Input
                        id="cache-timeout"
                        type="number"
                        value={settings.system.cacheTimeout}
                        onChange={(e) =>
                          updateSetting(
                            "system",
                            "cacheTimeout",
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-sm font-medium">System Actions</h4>
                  <div className="space-y-3">
                    <Button
                      onClick={() => handleSystemAction("backup")}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <Database className="w-4 h-4 mr-2" />
                      Create System Backup
                    </Button>
                    <Button
                      onClick={() => handleSystemAction("cache")}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Clear System Cache
                    </Button>
                    <Button
                      onClick={() => handleSystemAction("logs")}
                      className="w-full justify-start"
                      variant="outline"
                    >
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Clear System Logs
                    </Button>
                    <Button
                      onClick={() => handleSystemAction("restart")}
                      className="w-full justify-start"
                      variant="destructive"
                    >
                      <Server className="w-4 h-4 mr-2" />
                      Schedule System Restart
                    </Button>
                  </div>
                </div>
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={() => handleSave("System")}
                  className="flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save System Settings
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system health and performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">Database</p>
                    <p className="text-xs text-muted-foreground">
                      Online & Healthy
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-success/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-success" />
                  <div>
                    <p className="text-sm font-medium">API Services</p>
                    <p className="text-xs text-muted-foreground">
                      All Services Running
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-warning/10 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm font-medium">Last Backup</p>
                    <p className="text-xs text-muted-foreground">2 hours ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
