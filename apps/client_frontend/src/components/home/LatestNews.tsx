"use client";
import { Colors } from "@/constants/colors";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchNews } from "@/services/News";
import NewsCard from "../news/NewsCard";
import Link from "next/link";

const queryClient = new QueryClient();

export default function LatestNews() {
  return (
    <div className="bg-gray-200 w-full py-8 sm:pt-0 pb-16">
      <div className="container h-full">
        <div className="flex justify-between pb-4">
          <p className="text-3xl font-bold max-sm:text-2xl">Our Latest News</p>
          <Link href={"/news"}>
            <button className={["px-6 py-3", Colors.primary].join(" ")}>
              Show More
            </button>
          </Link>
        </div>
        <QueryClientProvider client={queryClient}>
          <FetchData />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export function FetchData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchNews"],
    queryFn: async () => await fetchNews({ limit: 4 }),
  });

  // console.log({ LatestNews: data })

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-wrap gap-4">
      {data.data?.map((item) => <NewsCard key={item._id} img_url={item.image} slug={item.slug} title={item.title} description={item.desc} updatedAt={item.updatedAt} />
      )}
    </div>
  );
}
