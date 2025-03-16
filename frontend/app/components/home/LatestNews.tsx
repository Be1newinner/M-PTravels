import { Link } from "react-router";
import { FaCalendarAlt } from "react-icons/fa";
import { Colors } from "~/constants/colors";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { fetchNews } from "~/services/News";
import imageUrlBuilder from "~/utils/imageUrlBuilder";

const queryClient = new QueryClient();

const blogsData = [
  {
    id: 1,
    title: "A New Sample Test available to you.",
    short_desc:
      "The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.",
    img: "sample-blog.png",
    date: "29 Nov, 2024",
    slug: "the-new-sample-test-available",
  },
  {
    id: 2,
    title: "A New Sample Test available to you.",
    short_desc:
      "The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.",
    img: "sample-blog.png",
    date: "29 Nov, 2024",
    slug: "the-new-sample-test-available",
  },
  {
    id: 3,
    title: "A New Sample Test available to you.",
    short_desc:
      "The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.",
    img: "sample-blog.png",
    date: "29 Nov, 2024",
    slug: "the-new-sample-test-available",
  },
  {
    id: 4,
    title: "A New Sample Test available to you.",
    short_desc:
      "The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.The Lorem ipsum things will be here.",
    img: "sample-blog.png",
    date: "29 Nov, 2024",
    slug: "the-new-sample-test-available",
  },
];

export default function LatestNews() {
  return (
    <div className="bg-gray-200 w-full py-8 sm:pt-0 pb-16">
      <div className="container h-full">
        <div className="flex justify-between pb-4">
          <p className="text-3xl font-bold max-sm:text-2xl">Our Latest News</p>
          <Link to={"/news"}>
            <button className={["px-6 py-3", Colors.primary].join(" ")}>
              Show More
            </button>
          </Link>
        </div>
        <QueryClientProvider client={queryClient}>
          <FetchData />
        </QueryClientProvider>
      </div>
    </div>
  );
}

export function FetchData() {
  const { isPending, error, data } = useQuery({
    queryKey: ["fetchNews"],
    queryFn: async () => await fetchNews({ limit: 4 }),
  });

  console.log({ LatestNews: data })

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-wrap gap-4">
      {data?.map((item) => (
        <div key={item._id} className="w-full sm:w-[calc(50%-16px)] group">
          <div className="relative overflow-hidden border border-white group-hover:border-blue-300 rounded-2xl bg-white cursor-pointer p-4 flex gap-4">
            {/* Left Image Section */}
            <div className="aspect-square overflow-hidden rounded-xl max-w-[200px] flex-shrink-0">
              <img
                src={imageUrlBuilder(item.image)}
                alt={item.image}
                className="group-hover:scale-105 w-full h-full object-cover"
              />
            </div>

            {/* Right Content Section */}
            <div className="flex flex-col justify-between flex-1">
              {/* Title & Description */}
              <div className="flex flex-col">
                <Link
                  to={"/blogs/" + item.slug}
                  className="text-xl font-medium group-hover:text-blue-500"
                >
                  {item.title}
                </Link>
                <p className="text-gray-500">{item.desc}</p>
              </div>

              {/* Bottom Section */}
              <div className="flex text-sm items-center justify-between gap-3 text-gray-500 mt-auto">
                <button className="px-6 py-2">Read More</button>
                <div className="flex gap-2 items-center">
                  <FaCalendarAlt className="text-2xl" />
                  <p>{item.updatedAt}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
