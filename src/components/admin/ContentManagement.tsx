"use client";

import { useState, useEffect } from "react";
import { createClient } from "../../../supabase/client";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

type ContentSetting = {
  id: string;
  key: string;
  value: any;
  created_at: string;
  updated_at: string;
};

type ContentSection = {
  title: string;
  key: string;
  fields: {
    name: string;
    label: string;
    type: "text" | "textarea" | "number" | "json" | "image";
    placeholder?: string;
  }[];
};

export default function ContentManagement() {
  const [contentSettings, setContentSettings] = useState<
    Record<string, ContentSetting>
  >({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("hero");
  const [editingContent, setEditingContent] = useState<{
    section: string;
    data: any;
  } | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const supabase = createClient();

  // Define content sections
  const contentSections: ContentSection[] = [
    {
      title: "Hero Section",
      key: "hero",
      fields: [
        {
          name: "title",
          label: "Title",
          type: "text",
          placeholder: "Transform Your Mindset",
        },
        {
          name: "subtitle",
          label: "Subtitle",
          type: "textarea",
          placeholder: "Create personalized subliminal audio tracks",
        },
        {
          name: "cta_text",
          label: "CTA Button Text",
          type: "text",
          placeholder: "Get Started",
        },
        {
          name: "image_url",
          label: "Background Image URL",
          type: "text",
          placeholder: "https://example.com/image.jpg",
        },
      ],
    },
    {
      title: "Pricing Section",
      key: "pricing",
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Choose Your Plan",
        },
        {
          name: "subtitle",
          label: "Section Subtitle",
          type: "textarea",
          placeholder: "Select the package that works for you",
        },
      ],
    },
    {
      title: "Features Section",
      key: "features",
      fields: [
        {
          name: "title",
          label: "Section Title",
          type: "text",
          placeholder: "Key Features",
        },
        {
          name: "subtitle",
          label: "Section Subtitle",
          type: "textarea",
          placeholder: "Discover what makes us special",
        },
        {
          name: "features",
          label: "Features (JSON Array)",
          type: "json",
          placeholder:
            '[{"title": "Feature 1", "description": "Description", "icon": "icon-name"}]',
        },
      ],
    },
    {
      title: "Footer",
      key: "footer",
      fields: [
        {
          name: "company_name",
          label: "Company Name",
          type: "text",
          placeholder: "Cognitive Rewire",
        },
        {
          name: "copyright",
          label: "Copyright Text",
          type: "text",
          placeholder: "© 2024 Cognitive Rewire. All rights reserved.",
        },
        {
          name: "social_links",
          label: "Social Links (JSON)",
          type: "json",
          placeholder:
            '[{"platform": "twitter", "url": "https://twitter.com"}]',
        },
      ],
    },
  ];

  useEffect(() => {
    fetchContentSettings();
  }, []);

  const fetchContentSettings = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("content_settings").select("*");

    if (error) {
      console.error("Error fetching content settings:", error);
    } else {
      // Convert array to object with key as the index
      const settingsMap: Record<string, ContentSetting> = {};
      data?.forEach((setting) => {
        settingsMap[setting.key] = setting;
      });
      setContentSettings(settingsMap);
    }
    setLoading(false);
  };

  const handleEditContent = (section: string) => {
    // Get current content or use empty object
    const currentContent = contentSettings[section]?.value || {};
    setEditingContent({ section, data: currentContent });
    setIsDialogOpen(true);
  };

  const handleInputChange = (field: string, value: any) => {
    if (!editingContent) return;

    setEditingContent({
      ...editingContent,
      data: {
        ...editingContent.data,
        [field]: value,
      },
    });
  };

  const handleSaveContent = async () => {
    if (!editingContent) return;

    try {
      const { section, data } = editingContent;

      if (contentSettings[section]) {
        // Update existing content
        const { error } = await supabase
          .from("content_settings")
          .update({ value: data, updated_at: new Date().toISOString() })
          .eq("key", section);

        if (error) throw error;
      } else {
        // Create new content
        const { error } = await supabase
          .from("content_settings")
          .insert({ key: section, value: data });

        if (error) throw error;
      }

      // Refresh content settings
      await fetchContentSettings();
      setIsDialogOpen(false);
      setEditingContent(null);
    } catch (error) {
      console.error("Error saving content:", error);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Content Management</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          {contentSections.map((section) => (
            <TabsTrigger key={section.key} value={section.key}>
              {section.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {contentSections.map((section) => (
          <TabsContent key={section.key} value={section.key}>
            <Card>
              <CardHeader>
                <CardTitle>{section.title}</CardTitle>
                <CardDescription>
                  Manage content for the {section.title.toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="text-center py-4">Loading content...</div>
                ) : (
                  <div className="space-y-4">
                    {contentSettings[section.key] ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Current Content</h3>
                        <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60 text-sm">
                          {JSON.stringify(
                            contentSettings[section.key].value,
                            null,
                            2,
                          )}
                        </pre>
                        <p className="text-sm text-gray-500">
                          Last updated:{" "}
                          {new Date(
                            contentSettings[section.key].updated_at,
                          ).toLocaleString()}
                        </p>
                      </div>
                    ) : (
                      <div className="text-center py-4 text-gray-500">
                        No content defined yet. Click "Edit Content" to add
                        content.
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button onClick={() => handleEditContent(section.key)}>
                  Edit Content
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              Edit{" "}
              {editingContent?.section &&
                contentSections.find((s) => s.key === editingContent.section)
                  ?.title}
            </DialogTitle>
          </DialogHeader>
          {editingContent && (
            <div className="grid gap-4 py-4">
              {contentSections
                .find((s) => s.key === editingContent.section)
                ?.fields.map((field) => (
                  <div key={field.name} className="space-y-2">
                    <Label htmlFor={field.name}>{field.label}</Label>
                    {field.type === "textarea" ? (
                      <Textarea
                        id={field.name}
                        value={editingContent.data[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                        rows={3}
                      />
                    ) : field.type === "json" ? (
                      <Textarea
                        id={field.name}
                        value={
                          typeof editingContent.data[field.name] === "object"
                            ? JSON.stringify(
                                editingContent.data[field.name],
                                null,
                                2,
                              )
                            : editingContent.data[field.name] || ""
                        }
                        onChange={(e) => {
                          try {
                            const jsonValue = JSON.parse(e.target.value);
                            handleInputChange(field.name, jsonValue);
                          } catch {
                            // If not valid JSON, store as string
                            handleInputChange(field.name, e.target.value);
                          }
                        }}
                        placeholder={field.placeholder}
                        rows={5}
                      />
                    ) : (
                      <Input
                        id={field.name}
                        type={field.type}
                        value={editingContent.data[field.name] || ""}
                        onChange={(e) =>
                          handleInputChange(field.name, e.target.value)
                        }
                        placeholder={field.placeholder}
                      />
                    )}
                  </div>
                ))}
            </div>
          )}
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveContent}>Save Changes</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
