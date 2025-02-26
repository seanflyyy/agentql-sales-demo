import {NextResponse} from "next/server";
import {AgentQLAPI} from "../AgentQLAPI";

export async function GET() {
  const apiKey = process.env.AGENTQL_API_KEY;
  const urls = [
    "https://judiciary.house.gov/media/press-releases",
    "https://democrats-judiciary.house.gov/news/documentquery.aspx?DocumentTypeID=27",
    "https://oversight.house.gov/release/",
    "https://oversightdemocrats.house.gov/news",
  ];

  if (!apiKey) {
    return NextResponse.json({error: "API key not configured"}, {status: 500});
  }

  try {
    const api = new AgentQLAPI(apiKey);
    const responses = await api.queryData(urls);

    if (responses.some((response) => !response.success)) {
      const errors = responses
        .filter((response) => !response.success)
        .map((response) => response.error)
        .join(", ");

      return NextResponse.json(
        {error: `Failed to fetch data: ${errors}`},
        {status: 400}
      );
    }

    return NextResponse.json(responses.map((response) => response.data));
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({error: "Internal Server Error"}, {status: 500});
  }
}
