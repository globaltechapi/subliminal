"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Search, Copy, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "../../../supabase/client";
import { Tables } from "@/types/supabase";

type Affirmation = Tables<"affirmations">;

type AffirmationsByCategory = {
  [category: string]: Affirmation[];
};

export default function Affirmations() {
  const [affirmationsByCategory, setAffirmationsByCategory] =
    useState<AffirmationsByCategory>({});
  const [categories, setCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAffirmations = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const supabase = createClient();
        const { data, error } = await supabase
          .from("affirmations")
          .select("*")
          .order("category");

        if (error) {
          throw new Error(error.message);
        }

        if (!data || data.length === 0) {
          setError("No affirmations found");
          return;
        }

        // Group affirmations by category
        const groupedData: AffirmationsByCategory = {};
        const uniqueCategories: string[] = [];

        data.forEach((item) => {
          if (!groupedData[item.category]) {
            groupedData[item.category] = [];
            uniqueCategories.push(item.category);
          }
          groupedData[item.category].push(item);
        });

        setAffirmationsByCategory(groupedData);
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Error fetching affirmations:", error);
        setError(
          error instanceof Error
            ? error.message
            : "Failed to fetch affirmations",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchAffirmations();
  }, []);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const filteredAffirmations = () => {
    let result: { category: string; affirmation: Affirmation; id: string }[] =
      [];

    Object.entries(affirmationsByCategory).forEach(
      ([category, affirmations]) => {
        if (activeTab === "all" || activeTab === category) {
          affirmations.forEach((affirmation) => {
            if (
              searchTerm === "" ||
              affirmation.affirmation
                .toLowerCase()
                .includes(searchTerm.toLowerCase())
            ) {
              result.push({
                category,
                affirmation,
                id: affirmation.id,
              });
            }
          });
        }
      },
    );

    return result;
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <p className="text-red-500 mb-4">{error}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Affirmation Library</h1>
      <p className="text-muted-foreground mb-6">
        Browse our collection of powerful affirmations or search for specific
        topics. Click on any affirmation to copy it for use in your subliminal
        tracks.
      </p>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search affirmations..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 flex flex-wrap h-auto">
          <TabsTrigger value="all" className="mb-1">
            All Categories
          </TabsTrigger>
          {categories.map((category) => (
            <TabsTrigger key={category} value={category} className="mb-1">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredAffirmations().map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    {item.category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-base">{item.affirmation.affirmation}</p>
                </CardContent>
                <CardFooter className="pt-2 flex justify-end">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      handleCopy(item.affirmation.affirmation, item.id)
                    }
                    className={cn(
                      "text-muted-foreground hover:text-foreground",
                      copiedIndex === item.id && "text-green-500",
                    )}
                  >
                    {copiedIndex === item.id ? (
                      <>
                        <Check className="h-4 w-4 mr-1" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-1" /> Copy
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredAffirmations().length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                No affirmations found matching your search.
              </p>
              <Button
                variant="link"
                onClick={() => {
                  setSearchTerm("");
                  setActiveTab("all");
                }}
                className="mt-2"
              >
                Clear filters
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
