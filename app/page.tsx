import { getNews } from "@/lib/getNews";
import NewsCard from "@/components/NewsCard";

export default async function Home() {
  const articles = await getNews();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="max-w-md mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center">AI News Hub</h1>
        {articles.length === 0 ? (
          <div className="text-center text-gray-600">
            No news available.
          </div>
        ) : (
          <div className="space-y-4">
            {articles.map((article, index) => (
              <NewsCard
                key={index}
                title={article.title}
                description={article.description}
                image={article.image}
                source={article.source.name}
                publishedAt={article.publishedAt}
                url={article.url}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
