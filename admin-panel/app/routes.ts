import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/dashboard.tsx"),
  route("/login", "routes/Login.jsx"),
] satisfies RouteConfig;
