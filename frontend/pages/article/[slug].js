// pages/article/[slug].js
import React from "react";
import { useRouter } from "next/router";
import { getFinfotableBySlug } from "@/api.service";
import Sidebar from "@/components/Sidebar";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faTwitter,
  faFacebookF,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const article = await getFinfotableBySlug(params.slug);
    return {
      props: { article },
      revalidate: 60,
    };
  } catch (error) {
    return { notFound: true };
  }
}

export default function ArticlePage({ article }) {
  const router = useRouter();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
  const currentPath = router.asPath;
  const fullUrl = `${baseUrl}${currentPath}`;

  if (router.isFallback) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  const getImageUrl = () => {
    if (article.banner_link) {
      if (article.banner_link.startsWith("http")) {
        return article.banner_link;
      } else {
        return `${baseUrl}${article.banner_link}`;
      }
    }
    return `${baseUrl}/default-banner.jpg`;
  };

  const shareData = {
    title: article.title,
    text: article.excerpt || article.meta_description,
    url: fullUrl,
    image: getImageUrl(),
  };

  return (
    <>
      <Head>
        <title>{article.title} | Your Site Name</title>
        <meta
          name="description"
          content={article.meta_description || article.excerpt}
        />
        <meta property="og:title" content={shareData.title} />
        <meta property="og:description" content={shareData.text} />
        <meta property="og:image" content={shareData.image} />
        <meta property="og:url" content={shareData.url} />
        <meta property="og:type" content="article" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={article.title} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={shareData.title} />
        <meta name="twitter:description" content={shareData.text} />
        <meta name="twitter:image" content={shareData.image} />
        <meta name="twitter:site" content="@YourTwitterHandle" />
      </Head>

      <div className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
          <main className="flex-1">
            <article className="bg-white shadow-lg p-6 md:p-8">
              <header className="mb-8">
                <div className="mb-4">
                  <span className="text-sm font-semibold text-[#ca0905] uppercase">
                    {article.category}
                  </span>
                  <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {article.title}
                  </h1>
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <span>Published: {formatDate(article.created_at)}</span>
                  {article.updated_at && (
                    <span>Updated: {formatDate(article.updated_at)}</span>
                  )}
                </div>
              </header>

              {article.banner_link && (
                <div className="mb-8 rounded-lg overflow-hidden">
                  <img
                    src={
                      article.banner_link.startsWith("http")
                        ? article.banner_link
                        : `${baseUrl}${article.banner_link}`
                    }
                    alt={article.title}
                    className="w-full h-64 md:h-96 object-cover"
                  />
                </div>
              )}

              <div className="prose lg:prose-xl max-w-none">
                {article.content && (
                  <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                )}

                {/* Read More Link */}
                {article.source_link && (
                  <p className="mt-0 text-sm">
                    <a
                      href={article.source_link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#ca0905] hover:text-[#b7302e]"
                    >
                      Read More
                    </a>
                  </p>
                )}
              </div>

              {article.tags && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex flex-col items-center sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Share this article
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Help spread the knowledge
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                        `${shareData.title}\n\n${shareData.url}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-green-100 hover:bg-green-200 transition-colors duration-200"
                      aria-label="Share on WhatsApp"
                    >
                      <FontAwesomeIcon
                        icon={faWhatsapp}
                        className="h-6 w-6 text-green-600"
                      />
                    </a>

                    <a
                      href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                        `${shareData.title}\n\n${shareData.url}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                      aria-label="Share on Twitter"
                    >
                      <FontAwesomeIcon
                        icon={faTwitter}
                        className="h-6 w-6 text-blue-400"
                      />
                    </a>

                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                        shareData.url
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors duration-200"
                      aria-label="Share on Facebook"
                    >
                      <FontAwesomeIcon
                        icon={faFacebookF}
                        className="h-6 w-6 text-blue-600"
                      />
                    </a>

                    <a
                      href={`https://www.instagram.com/?url=${encodeURIComponent(
                        shareData.url
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-full bg-pink-100 hover:bg-pink-200 transition-colors duration-200"
                      aria-label="Share on Instagram"
                    >
                      <FontAwesomeIcon
                        icon={faInstagram}
                        className="h-6 w-6 text-pink-600"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </article>
          </main>

          <aside className="md:w-96 md:sticky md:top-8 md:self-start">
            <Sidebar />
          </aside>
        </div>
      </div>
    </>
  );
}
