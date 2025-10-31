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

// GNews API Response
interface GNewsResponse {
  articles: Article[];
}

// NewsAPI Response
interface NewsAPIResponse {
  articles: Array<{
    title: string;
    description: string | null;
    urlToImage: string | null;
    source: {
      name: string;
    };
    publishedAt: string;
    url: string;
  }>;
}

// NewsData.io Response
interface NewsDataIOResponse {
  results: Array<{
    title: string;
    description: string | null;
    image_url: string | null;
    source_id: string;
    pubDate: string;
    link: string;
  }>;
}

// Mediastack Response
interface MediastackResponse {
  data: Array<{
    title: string;
    description: string | null;
    image: string | null;
    source: string;
    published_at: string;
    url: string;
  }>;
}

// NewsCatcher API Response
interface NewsCatcherResponse {
  articles: Array<{
    title: string;
    summary: string | null;
    media: string | null;
    author: string | null;
    published_date: string;
    link: string;
  }>;
}

// Currents API Response
interface CurrentsResponse {
  news: Array<{
    title: string;
    description: string | null;
    image: string | null;
    author: string | null;
    published: string;
    url: string;
  }>;
}

// Fetch from GNews API
async function fetchGNews(): Promise<Article[]> {
  const apiKey = process.env.GNEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://gnews.io/api/v4/search?q=artificial%20intelligence&lang=en&country=us&max=10&apikey=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: GNewsResponse = await response.json();
    return data.articles || [];
  } catch (error) {
    console.error("Error fetching from GNews:", error);
    return [];
  }
}

// Fetch from NewsAPI
async function fetchNewsAPI(): Promise<Article[]> {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://newsapi.org/v2/everything?q=artificial%20intelligence&language=en&sortBy=publishedAt&pageSize=10&apiKey=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: NewsAPIResponse = await response.json();
    return (
      data.articles?.map((article) => ({
        title: article.title,
        description: article.description || "",
        image: article.urlToImage || "",
        source: { name: article.source.name },
        publishedAt: article.publishedAt,
        url: article.url,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching from NewsAPI:", error);
    return [];
  }
}

// Fetch from NewsData.io
async function fetchNewsDataIO(): Promise<Article[]> {
  const apiKey = process.env.NEWSDATA_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=artificial%20intelligence&language=en&category=technology&size=10`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: NewsDataIOResponse = await response.json();
    return (
      data.results?.map((article) => ({
        title: article.title,
        description: article.description || "",
        image: article.image_url || "",
        source: { name: article.source_id || "Unknown" },
        publishedAt: article.pubDate,
        url: article.link,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching from NewsData.io:", error);
    return [];
  }
}

// Fetch from Mediastack
async function fetchMediastack(): Promise<Article[]> {
  const apiKey = process.env.MEDIASTACK_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://api.mediastack.com/v1/news?access_key=${apiKey}&keywords=artificial%20intelligence&languages=en&limit=10`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: MediastackResponse = await response.json();
    return (
      data.data?.map((article) => ({
        title: article.title,
        description: article.description || "",
        image: article.image || "",
        source: { name: article.source || "Unknown" },
        publishedAt: article.published_at,
        url: article.url,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching from Mediastack:", error);
    return [];
  }
}

// Fetch from NewsCatcher API
async function fetchNewsCatcher(): Promise<Article[]> {
  const apiKey = process.env.NEWSCATCHER_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://api.newscatcher.com/v2/search?q=artificial%20intelligence&lang=en&page_size=10&api_key=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: NewsCatcherResponse = await response.json();
    return (
      data.articles?.map((article) => ({
        title: article.title,
        description: article.summary || "",
        image: article.media || "",
        source: { name: article.author || "Unknown" },
        publishedAt: article.published_date,
        url: article.link,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching from NewsCatcher:", error);
    return [];
  }
}

// Fetch from Currents API
async function fetchCurrents(): Promise<Article[]> {
  const apiKey = process.env.CURRENTS_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://api.currentsapi.services/v1/search?keywords=artificial%20intelligence&language=en&apiKey=${apiKey}`;
    const response = await fetch(url, {
      next: { revalidate: 3600 },
    } as RequestInit);

    if (!response.ok) return [];

    const data: CurrentsResponse = await response.json();
    return (
      data.news?.map((article) => ({
        title: article.title,
        description: article.description || "",
        image: article.image || "",
        source: { name: article.author || "Unknown" },
        publishedAt: article.published,
        url: article.url,
      })) || []
    );
  } catch (error) {
    console.error("Error fetching from Currents:", error);
    return [];
  }
}

// Helper function to deduplicate articles by URL
function deduplicateArticles(articles: Article[]): Article[] {
  const seen = new Set<string>();
  return articles.filter((article) => {
    if (seen.has(article.url)) {
      return false;
    }
    seen.add(article.url);
    return true;
  });
}

// Main function to fetch from all APIs and combine results
export async function getNews(): Promise<Article[]> {
  // Fetch from all APIs in parallel
  const results = await Promise.allSettled([
    fetchGNews(),
    fetchNewsAPI(),
    fetchNewsDataIO(),
    fetchMediastack(),
    fetchNewsCatcher(),
    fetchCurrents(),
  ]);

  // Extract successful results
  const allArticles: Article[] = [];
  results.forEach((result) => {
    if (result.status === "fulfilled") {
      allArticles.push(...result.value);
    }
  });

  // Filter out articles with missing essential data
  const validArticles = allArticles.filter(
    (article) => article.title && article.url
  );

  // Deduplicate by URL
  const uniqueArticles = deduplicateArticles(validArticles);

  // Sort by published date (newest first)
  uniqueArticles.sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();
    return dateB - dateA;
  });

  // Return top 30 articles
  return uniqueArticles.slice(0, 30);
}
