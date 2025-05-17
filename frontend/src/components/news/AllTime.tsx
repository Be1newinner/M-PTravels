"use client";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import NewsCard from "./NewsCard";
import { fetchNews } from "@/services/News";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useState } from "react";

const queryClient = new QueryClient();

export default function AllNewsWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <AllNews />
    </QueryClientProvider>
  );
}

export function AllNews() {
  const [currentPage, setCurrentPage] = useState(1);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["fetchNews", currentPage],
    queryFn: async () => await fetchNews({ limit: 6, page: currentPage }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-gray-200 py-4">
      <div className="grid grid-cols-2 items-center justify-center gap-6 mt-6 px-24 max-md:px-4 max-lg:px-8 max-2xl:px-16 mx-auto max-2xl:gap-5">
        {data?.data?.map((item) => (
          <NewsCard
            key={item._id}
            img_url={item.image}
            slug={item.slug}
            title={item.title}
            description={item.desc}
            updatedAt={item.updatedAt?.split("T")[0]}
          />
        ))}
      </div>
      <Pagination
        totalPages={Math.ceil(data?.meta?.total / data?.meta?.limit || 1)}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}


type PaginationProps = {
  totalPages: number;
  currentPage: number;
  onPageChange: (e: number) => void
}

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="w-full flex pb-8 justify-center mt-8">
      <ul className="flex gap-4 items-center">
        {/* Left Arrow */}
        <li
          className={`px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-blue-500 hover:text-white cursor-pointer ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        >
          <FaChevronLeft />
        </li>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <li
            key={page}
            className={`px-6 py-2 rounded-xl cursor-pointer transition-all duration-300 ${currentPage === page
              ? "bg-blue-500 text-white scale-110"
              : "bg-slate-100 shadow-lg text-black hover:bg-blue-500 hover:text-white hover:scale-110"
              }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}

        {/* Right Arrow */}
        <li
          className={`px-4 py-2 rounded-xl bg-gray-200 text-black hover:bg-blue-500 hover:text-white cursor-pointer ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
          onClick={() => currentPage < totalPages && onPageChange(currentPage + 1)}
        >
          <FaChevronRight />
        </li>
      </ul>
    </div>
  );
}
