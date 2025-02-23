import { Link } from "react-router";
import { CiUser } from "react-icons/ci";
import { FaCalendarAlt } from "react-icons/fa";
import { Colors } from "~/constants/colors";

export default function LetestNews() {
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

  return (
    <div className="bg-gray-200 w-full py-8 sm:pt-0 pb-16">
      <div className="container h-full">
        <div className="flex justify-between pb-4">
          <p className="text-3xl font-bold max-sm:text-2xl">Our Latest News</p>
          <button
            className={[
              "px-6 py-3",
              Colors.primary,
            ].join(" ")}
          >
            Show More
          </button>
        </div>
        <div className="flex flex-wrap gap-4">
          {blogsData.map((item) => (
            <div key={item.id} className="w-full sm:w-[calc(50%-16px)] group">
              <div className="relative overflow-hidden border border-white group-hover:border-blue-300 rounded-2xl bg-white cursor-pointer">
                <div className="gap-4 p-4 flex max-lg:flex-wrap">
                  <div className="aspect-square overflow-hidden rounded-xl max-w-[500px] max-h-[500px]">
                    <img
                      src={item.img}
                      alt={item.img}
                      className="group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-between">
                    <div className="flex flex-col">
                      <Link
                        to={"/blogs/" + item.slug}
                        className="text-xl font-medium group-hover:text-blue-500"
                      >
                        {item.title}
                      </Link>
                      <p className="text-gray-500">{item.short_desc}</p>
                    </div>
                    <div className="flex text-sm items-center justify-between gap-3 text-gray-500">
                      <button className="px-6 py-2">Read More</button>
                      <div className="flex gap-2 items-center justify-between">
                        <FaCalendarAlt className="text-2xl" />
                        <p>{item.date}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
