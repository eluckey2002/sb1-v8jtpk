export interface ResponseItem {
  title: string;
  items: string[];
  icon: string;
  layout_zone: string;
}

export interface FilterOption {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  options: string[];
}

export interface ResponseData {
  user_query: string;
  content: ResponseItem[];
  filters?: FilterOption[];
}

// Mock API call function
export async function callLLM(query: string): Promise<ResponseData> {
  // Simulating API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  // Mock response data
  const mockResponse: ResponseData = {
    user_query: query,
    content: [
      {
        title: "Key Points",
        items: ["Point 1", "Point 2", "Point 3"],
        icon: "lightbulb",
        layout_zone: "main_content_zone"
      },
      {
        title: "Related Topics",
        items: ["Topic A", "Topic B", "Topic C"],
        icon: "info",
        layout_zone: "right_pane"
      }
    ],
    filters: [
      {
        id: "difficulty",
        title: "Difficulty Level",
        type: "single",
        options: ["Beginner", "Intermediate", "Advanced"]
      },
      {
        id: "topics",
        title: "Topics",
        type: "multiple",
        options: ["Technology", "Science", "History", "Arts"]
      }
    ]
  };

  return mockResponse;
}