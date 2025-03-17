import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TourPackageData } from "./TourPackageData";

const queryClient = new QueryClient();

export default function TourPackageDataWrapper() {
  return (
    <QueryClientProvider client={queryClient}>
      <TourPackageData />
    </QueryClientProvider>
  );
}
