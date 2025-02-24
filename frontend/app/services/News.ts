import { get } from "./apiInstance";

async function fetchBlogs() {
  const response = await get("");
  console.log(await response.data);
}
