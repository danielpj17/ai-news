interface Article {
  title: string;
  description: string;
  image: string;
  source: {
    name: string;
  };
  publishedAt: string;
  url: string;
}

interface GNewsResponse {
  articles: Article[];
}

export async function getNews(): Promise<Article[]> {
  const apiKey: string | undefined = process.env.GNEWS_API_KEY;

  if (!apiKey) {
    console.error("GNEWS_API_KEY is not set");
    return [];
  }

  try {
    const url = `https://gnews.io/api/v4/search?q=artificial%20intelligence&lang=en&country=us&max=10&apikey=${apiKey}`;
    
    const response = await fetch(url, {
      next: { revalidate: 3600 }, // Revalidate every hour
    } as RequestInit);

    if (!response.ok) {
      throw new Error(`GNews API error: ${response.status}`);
    }

    const data: GNewsResponse = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching news:", error);
    return [];
  }
}

