"use client";

import { ChangeHistory } from '@/types';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RecentChangesProps {
  changes: ChangeHistory[];
}

export default function RecentChanges({ changes }: RecentChangesProps) {
  const getChangeTypeColor = (type: ChangeHistory['changeType']) => {
    switch (type) {
      case 'added':
        return 'bg-green-100 text-green-800';
      case 'modified':
        return 'bg-yellow-100 text-yellow-800';
      case 'removed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          Recent Changes
          {changes.length > 0 && (
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              {changes.length}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
          <div className="space-y-4">
            {changes.map((change) => (
              <div
                key={change.id}
                className="relative pl-8 pb-4"
              >
                <div className="absolute left-2 top-2 w-4 h-4 rounded-full border-4 border-white bg-blue-500" />
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <Badge
                      variant="secondary"
                      className={getChangeTypeColor(change.changeType)}
                    >
                      {change.changeType.charAt(0).toUpperCase() + change.changeType.slice(1)}
                    </Badge>
                    <time className="text-sm text-gray-500">
                      {new Date(change.timestamp).toLocaleString()}
                    </time>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    Field changed: <span className="font-medium">{change.field}</span>
                  </p>
                  {change.changeType !== 'removed' && change.newValue && (
                    <div className="text-sm">
                      <p className="text-gray-500">New value:</p>
                      <p className="text-gray-900 mt-1 bg-gray-50 p-2 rounded">{change.newValue}</p>
                    </div>
                  )}
                  {change.previousValue && (
                    <div className="text-sm mt-2">
                      <p className="text-gray-500">Previous value:</p>
                      <p className="text-gray-900 mt-1 bg-gray-50 p-2 rounded line-through">
                        {change.previousValue}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}