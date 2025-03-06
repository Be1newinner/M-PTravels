import type { Route } from "./+types/dashboard";

export function meta({ }: Route.MetaArgs) {
  return [
    { title: "M&P Travels" },
    { name: "description", content: "Welcome to M&P Admin Panel!" },
  ];
}

export default function Dashboard() {
  return (
    <div>
      <h1>Vijay</h1>
    </div>
  )
}
