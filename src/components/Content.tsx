"use client";

import {useState} from "react";
import {TabData, TabId, ExtractedData} from "@/types";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {LoadingButton} from "@/components/ui/loading-button";
import TabContent from "./TabContent";
import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";

const TABS: {id: TabId; title: string; url: string}[] = [
  {
    id: "judiciary",
    title: "House Judiciary",
    url: "https://judiciary.house.gov/media/press-releases",
  },
  {
    id: "democrats-judiciary",
    title: "Democrats Judiciary",
    url: "https://democrats-judiciary.house.gov/news/documentquery.aspx?DocumentTypeID=27",
  },
  {
    id: "oversight",
    title: "House Oversight",
    url: "https://oversight.house.gov/release/",
  },
  {
    id: "oversight-democrats",
    title: "Oversight Democrats",
    url: "https://oversightdemocrats.house.gov/news",
  },
];

export default function Content() {
  const [activeTab, setActiveTab] = useState<TabId>("judiciary");
  const [tabsData, setTabsData] = useState<Record<TabId, TabData>>(
    TABS.reduce(
      (acc, tab) => ({
        ...acc,
        [tab.id]: {
          ...tab,
          data: [],
          isLoading: false,
          error: undefined,
          lastUpdated: null,
        },
      }),
      {} as Record<TabId, TabData>
    )
  );

  const handleScrapeAll = async () => {
    setTabsData((prev) =>
      Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: {...prev[key as TabId], isLoading: true, error: undefined},
        }),
        {} as Record<TabId, TabData>
      )
    );

    try {
      const response = await fetch("/api/data", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": process.env.NEXT_PUBLIC_AGENTQL_API_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const allData: ExtractedData[][] = await response.json();

      setTabsData((prev) =>
        Object.keys(prev).reduce(
          (acc, key, index) => ({
            ...acc,
            [key]: {
              ...prev[key as TabId],
              data: allData[index] || [],
              isLoading: false,
              lastUpdated: new Date().toISOString(),
            },
          }),
          {} as Record<TabId, TabData>
        )
      );
    } catch (err) {
      setTabsData((prev) =>
        Object.keys(prev).reduce(
          (acc, key) => ({
            ...acc,
            [key]: {
              ...prev[key as TabId],
              isLoading: false,
              error: err instanceof Error ? err.message : "An error occurred",
            },
          }),
          {} as Record<TabId, TabData>
        )
      );
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TABS.map((tab) => {
          const tabData = tabsData[tab.id];
          const hasNewContent = tabData.data.length > 0;

          return (
            <Card
              key={tab.id}
              className={`relative overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer ${
                hasNewContent ? "border-blue-500 shadow-blue-100" : ""
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="text-lg font-semibold">{tab.title}</span>
                  {hasNewContent && (
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-blue-100 text-blue-800 animate-pulse"
                    >
                      {tabData.data.length} updates
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500 truncate">{tab.url}</p>
                  {tabData.lastUpdated && (
                    <p className="text-xs text-gray-400">
                      Last checked:{" "}
                      {new Date(tabData.lastUpdated).toLocaleString()}
                    </p>
                  )}
                  {tabData.isLoading && (
                    <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                      <div className="animate-pulse text-sm text-gray-500 flex items-center">
                        <svg
                          className="animate-spin h-4 w-4 mr-2"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                            fill="none"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          />
                        </svg>
                        Checking for updates...
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="flex justify-end">
        <LoadingButton
          onClick={handleScrapeAll}
          isLoading={Object.values(tabsData).some((tab) => tab.isLoading)}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Check All Sites
        </LoadingButton>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as TabId)}
      >
        <TabsList className="mb-4">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.id} value={tab.id}>
              {tab.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {TABS.map((tab) => (
          <TabsContent key={tab.id} value={tab.id}>
            <TabContent tab={tabsData[tab.id]} />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
