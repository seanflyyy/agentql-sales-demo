export interface ExtractedData {
  title: string;
  description: string;
  url: string;
  date?: string;
}

export interface APIResponse {
  success: boolean;
  data: ExtractedData[];
  error?: string;
}

export interface QueryDataParams {
  wait_for?: number;
  is_scroll_to_bottom_enabled?: boolean;
  mode?: 'fast' | 'standard';
  is_screenshot_enabled?: boolean;
}

export interface ChangeHistory {
  id: string;
  documentId: string;
  changeType: 'added' | 'modified' | 'removed';
  timestamp: string;
  previousValue?: string;
  newValue?: string;
  field: 'title' | 'description' | 'content';
}

export interface TabData {
  id: string;
  title: string;
  url: string;
  data: ExtractedData[];
  isLoading: boolean;
  error?: string;
  lastUpdated: string | null;
  changeHistory?: ChangeHistory[];
}

export type TabId = 'judiciary' | 'democrats-judiciary' | 'oversight' | 'oversight-democrats';