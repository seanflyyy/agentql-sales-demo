"use client";

import { TabData } from '@/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Skeleton } from '@/components/ui/skeleton';
import RecentChanges from './RecentChanges';

interface TabContentProps {
  tab: TabData;
}

export default function TabContent({ tab }: TabContentProps) {
  // Mock change history data
  const mockChangeHistory = [
    {
      id: '1',
      documentId: '1',
      changeType: 'modified' as const,
      timestamp: new Date().toISOString(),
      previousValue: 'Old title',
      newValue: 'New title',
      field: 'title' as const
    },
    {
      id: '2',
      documentId: '1',
      changeType: 'added' as const,
      timestamp: new Date(Date.now() - 86400000).toISOString(),
      newValue: 'New document added',
      field: 'title' as const
    },
    {
      id: '3',
      documentId: '2',
      changeType: 'removed' as const,
      timestamp: new Date(Date.now() - 172800000).toISOString(),
      previousValue: 'Removed document',
      field: 'title' as const
    }
  ];

  return (
    <div className="space-y-6">
      {tab.isLoading && (
        <div className="space-y-4">
          <Progress value={33} className="w-full h-2 bg-blue-100" />
          <p className="text-sm text-gray-500 text-center animate-pulse">
            Scraping data from {tab.url}...
          </p>
        </div>
      )}

      {tab.error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-lg border border-red-200">
          <p className="font-medium">Error occurred</p>
          <p className="text-sm mt-1">{tab.error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tab.isLoading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={`skeleton-${index}`} className="w-full transition-all duration-200 hover:shadow-md">
              <CardHeader>
                <Skeleton className="h-4 w-3/4 mb-2 bg-gray-200" />
                <Skeleton className="h-4 w-1/2 bg-gray-200" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-20 w-full bg-gray-200" />
              </CardContent>
            </Card>
          ))
        ) : (
          tab.data.map((item, index) => (
            <Card 
              key={`${item.url}-${index}`} 
              className="w-full transition-all duration-200 hover:shadow-md hover:border-blue-200"
            >
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-gray-900">
                  {item.title}
                </CardTitle>
                {item.date && (
                  <CardDescription className="text-sm text-gray-500">
                    {new Date(item.date).toLocaleDateString(undefined, {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {item.description}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm mt-4 transition-colors duration-200"
                >
                  Read more
                  <svg
                    className="w-4 h-4 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </a>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {!tab.isLoading && <RecentChanges changes={mockChangeHistory} />}
    </div>
  );
}