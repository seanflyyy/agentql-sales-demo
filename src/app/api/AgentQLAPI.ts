import axios from "axios";
import {APIResponse, QueryDataParams} from "@/types";

const API_BASE_URL = "https://api.agentql.com/v1";

export class AgentQLAPI {
  private api_key: string;

  constructor(api_key: string) {
    this.api_key = api_key;
  }

  private getHeaders() {
    return {
      "Content-Type": "application/json",
      "X-API-Key": this.api_key,
    };
  }

  async queryData(urls: string[]): Promise<APIResponse[]> {
    const params: QueryDataParams = {
      wait_for: 5,
      is_scroll_to_bottom_enabled: true,
      mode: "standard",
      is_screenshot_enabled: false,
    };

    const query = `{
      articles[] {
        title
        description
        url
        date
      }
    }`;

    try {
      const requests = urls.map((url) =>
        axios.post(
          `${API_BASE_URL}/query-data`,
          {
            query,
            url,
            params,
          },
          {headers: this.getHeaders()}
        )
      );

      const responses = await Promise.all(requests);

      return responses.map((response) => {
        const extractedData = response.data.data.articles.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (article: any) => ({
            title: article.title || "No Title",
            description: article.description || "No Description",
            url: article.url || "",
            date: article.date || null,
          })
        );

        return {
          success: true,
          data: extractedData,
        };
      });
    } catch (error) {
      console.error("AgentQL API Error:", error);
      return urls.map(() => ({
        success: false,
        data: [],
        error:
          error instanceof Error ? error.message : "An unknown error occurred",
      }));
    }
  }
}
