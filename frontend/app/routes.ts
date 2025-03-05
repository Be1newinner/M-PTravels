import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { PAGES } from "./constants/pages";

export default [
  index("routes/Home.tsx"),
  route(PAGES.ABOUT, "routes/About.tsx"),
  route(PAGES.CONTACT, "routes/ContactUs.tsx"),
  route(PAGES.NEWS, "routes/News.tsx"),
  route(PAGES.PRIVACY, "routes/Privacy.tsx"),
  route(PAGES.TOUR_PACKAGES, "routes/TourPackage.tsx"),
  route(`${PAGES.TOUR_PACKAGES}:tour_id`, "routes/TripBooking.tsx"),
] satisfies RouteConfig;
