import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("about", "routes/About.tsx"),
  route("contact", "routes/ContactUs.tsx"),
  route("news", "routes/News.tsx"),
  route("privacy", "routes/Privacy.tsx"),
  route("tour_package", "routes/TourPackage.tsx"),
  route("trip_booking", "routes/TripBooking.tsx"),
] satisfies RouteConfig;
