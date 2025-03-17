import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Pagination } from "../news/AllTime";
import { PackagesCard } from "./PackagesCard";
import { PackagesSearchBar } from "./PackagesSearchBar";
import { PackageTagBar } from "./PackageTagBar";
import { fetchPackages } from "~/services/packages";

export function TourPackageData() {
    const [currentPage, setCurrentPage] = useState(1);

    const { isPending, error, data, refetch } = useQuery({
        queryKey: ["fetchPackagesPage", currentPage],
        queryFn: async () => await fetchPackages({ limit: 9, page: currentPage }),
    });

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        refetch();
    };

    if (isPending) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return (
        <div className="bg-slate-100">
            <div className="container">
                <PackageTagBar />
                <PackagesSearchBar />
                <div className="grid grid-cols-3 gap-4 my-6">
                    {Array.from({ length: 9 }).map(e => <PackagesCard />)}
                </div>

                <Pagination totalPages={Math.ceil(data?.meta?.total / data?.meta?.limit || 1)}
                    currentPage={currentPage}
                    onPageChange={handlePageChange} />
            </div>
        </div>
    );
}