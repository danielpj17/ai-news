import Image from "next/image";
import Link from "next/link";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  source: string;
  publishedAt: string;
  url: string;
}

export default function NewsCard({
  title,
  description,
  image,
  source,
  publishedAt,
  url,
}: NewsCardProps) {
  const articleDate = new Date(publishedAt);
  const formattedDate = articleDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const formattedTime = articleDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return (
    <article className="bg-white rounded-xl shadow-sm p-4 mb-4">
      {image && (
        <div className="relative w-full h-48 mb-3 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <h2 className="font-bold text-gray-900 mb-2 line-clamp-2">{title}</h2>
      {description && (
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{description}</p>
      )}
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs text-gray-500">{source}</span>
        <span className="text-xs text-gray-500">{formattedDate} at {formattedTime}</span>
      </div>
      <Link
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors"
      >
        Read More
      </Link>
    </article>
  );
}

