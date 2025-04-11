// pages/article/[slug].js
import React from "react";
import { useRouter } from "next/router";
import { getFinfotableBySlug } from "@/api.service"; // You'll need to create this API method
import Sidebar from "@/components/Sidebar";

export async function getStaticPaths() {
  // Generate paths at build time (you might need to fetch all slugs)
  return {
    paths: [], // Start with empty array, generate on-demand
    fallback: "blocking",
  };
}

export async function getStaticProps({ params }) {
  try {
    const article = await getFinfotableBySlug(params.slug);
    return {
      props: { article },
      revalidate: 60, // ISR: Regenerate page every 60 seconds
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}

export default function ArticlePage({ article }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return new Date(dateString).toLocaleDateString("en-GB", options);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Article Header */}
      <div className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <div className="bg-[#ca0905] w-1 h-4"></div>
          <h1 className="text-2xl font-bold text-[#23292f]">{article.title}</h1>
        </div>
        <p className="text-sm text-gray-500">
          Published: {formatDate(article.created_at)}
        </p>
      </div>

      {/* Banner Image */}
      <div className="mb-8">
        <img
          src={article.banner_link}
          alt={article.title}
          className="w-full h-64 object-cover rounded-lg"
        />
      </div>

      {/* Article Content */}
      <div className="prose max-w-none">
        <p className="text-gray-700 leading-relaxed">
          {article.content} {/* Assuming your API returns a content field */}
        </p>
      </div>

      {/* Back Button */}
      <div className="mt-8">
        <button
          onClick={() => router.back()}
          className="text-[#ca0905] hover:underline font-semibold"
        >
          &larr; Back to Tech News
        </button>
      </div>
      <Sidebar />
    </div>
  );
}
