# AI News Hub

A minimal AI News Hub built with Next.js and Tailwind CSS that aggregates AI-related articles from multiple news sources.

## Features

- Aggregates news from 6 different APIs:
  - [GNews API](https://gnews.io/)
  - [NewsAPI](https://newsapi.org/)
  - [NewsData.io](https://newsdata.io/)
  - [Mediastack](https://mediastack.com/)
  - [NewsCatcher API](https://newscatcher.com/)
  - [Currents API](https://currentsapi.services/)
- Automatically deduplicates articles
- Sorts articles by publication date (newest first)
- Mobile-first responsive design
- Optimized image loading with Next.js Image component

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up API Keys

Create a `.env.local` file in the root directory and add your API keys:

```env
GNEWS_API_KEY=your_gnews_api_key
NEWS_API_KEY=your_newsapi_key
NEWSDATA_API_KEY=your_newsdata_api_key
MEDIASTACK_API_KEY=your_mediastack_api_key
NEWSCATCHER_API_KEY=your_newscatcher_api_key
CURRENTS_API_KEY=your_currents_api_key
```

**Note:** You can use one or all APIs. The app will work with any combination - APIs without keys will simply be skipped.

#### Get Your API Keys:

- **GNews**: [https://gnews.io/](https://gnews.io/)
- **NewsAPI**: [https://newsapi.org/](https://newsapi.org/)
- **NewsData.io**: [https://newsdata.io/](https://newsdata.io/)
- **Mediastack**: [https://mediastack.com/](https://mediastack.com/)
- **NewsCatcher**: [https://newscatcher.com/](https://newscatcher.com/)
- **Currents API**: [https://currentsapi.services/](https://currentsapi.services/)

### 3. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
