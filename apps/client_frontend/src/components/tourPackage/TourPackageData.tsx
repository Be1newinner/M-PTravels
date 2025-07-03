"use client";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../news/AllTime";
import { PackagesCard } from "./PackagesCard";
import { PackageTagBar } from "./PackageTagBar";
import { fetchPackages } from "@/services/packages";
import { slugify } from "@/utils/text_helpers";

export function TourPackageData() {
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchQuery] = useState("");
  const [debouncedSearchQuery] = useState("");

  // Debounce search query
  // useEffect(() => {
  //   const handler = setTimeout(() => {
  //     setDebouncedSearchQuery(searchQuery);
  //     setCurrentPage(1); // Reset to first page on new search
  //   }, 500); // 500ms debounce time

  //   return () => {
  //     clearTimeout(handler);
  //   };
  // }, [searchQuery]);

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["fetchPackagesPage", currentPage, debouncedSearchQuery],
    queryFn: async () =>
      await fetchPackages({
        limit: 9,
        page: currentPage,
        search: debouncedSearchQuery,
      }),
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    refetch();
  };

  // const handleSearchChange = (query: string) => {
  //   setSearchQuery(query);
  // };

  // const handleSearchSubmit = () => {
  //   setDebouncedSearchQuery(searchQuery);
  //   setCurrentPage(1); // Reset to first page on search submit
  // };

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="bg-slate-100">
      <div className="container py-4 px-4 sm:px-6 lg:px-8">
        <PackageTagBar />
        {/* <PackagesSearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          onSearchSubmit={handleSearchSubmit}
        /> */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          {data.data?.map((item) => {
            return (
              <PackagesCard
                key={item._id}
                image={item.image}
                title={item.title}
                slug={slugify(item.title) + "-" + item._id}
              />
            );
          })}
        </div>

        <Pagination
          totalPages={Math.ceil(data?.meta?.total / data?.meta?.limit || 1)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}