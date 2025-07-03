"use client";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";
import HeaderHero from "@/components/HeaderHero";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchBlogBySlug, NewsType } from "@/services/News";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { use } from "react";

const queryClient = new QueryClient();

function BlogContent({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const { isPending, error, data } = useQuery<NewsType, Error>({
    queryKey: ["blogDetail", slug],
    queryFn: () => fetchBlogBySlug(slug),
  });

  if (isPending)
    return <div className="text-center py-10">Loading blog details...</div>;
  if (error)
    return (
      <div className="text-center py-10 text-red-500">
        An error occurred: {error.message}
      </div>
    );
  if (!data) return <div className="text-center py-10">Blog not found.</div>;

  return (
    <div className="container py-8 bg-white shadow-lg rounded-lg my-8">
      <h1 className="text-4xl font-bold mb-6 text-center">{data.title}</h1>
      <div className="relative w-full h-[400px] mb-8 rounded-lg overflow-hidden">
        <Image
          src={data.image}
          alt={data.title}
          width={1920}
          height={1080}
          className="w-full h-full object-cover rounded-lg"
        />
      </div>
      <div className="text-gray-600 text-sm mb-6 text-center">
        Published on: {new Date(data.updatedAt).toLocaleDateString()}
      </div>
      <div className="prose max-w-none text-lg leading-relaxed text-gray-800 px-4 md:px-8 lg:px-12">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{data.content}</ReactMarkdown>
      </div>
    </div>
  );
}

export default function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div>
      <Navbar location="/news" />
      <HeaderHero title="Blog Details" />
      <div className="bg-gray-200 py-8">
        <QueryClientProvider client={queryClient}>
          <BlogContent params={params} />
        </QueryClientProvider>
      </div>
      <Footer />
    </div>
  );
}
