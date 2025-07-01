import { IoSearchOutline } from "react-icons/io5";
import { Colors } from "@/constants/colors";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

type PackagesSearchBarProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSearchSubmit: () => void;
};

export function PackagesSearchBar({
  searchQuery,
  onSearchChange,
  onSearchSubmit,
}: PackagesSearchBarProps) {
  return (
    <div className="flex gap-4 items-center justify-end">
      <div className="border px-5 rounded-lg bg-slate-200 py-2 border-black">
        <label htmlFor="package-search" className="text-sm font-medium text-gray-500">
          Destination or package
        </label>
        <div className="flex text-center items-center gap-4">
          <IoSearchOutline
            className={`text-3xl ${Colors.textPrimary}`}
          />
          <Input
            type="text"
            name="package-search"
            id="package-search"
            placeholder="Search for the Destination or Package"
            className="w-80 bg-slate-200 border-none shadow-none"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSearchSubmit();
              }
            }}
          />
        </div>
      </div>
      <Button onClick={onSearchSubmit} className="h-16">
        Search the Package
      </Button>
    </div>
  );
}