import Image from "next/image";
import React from "react";

export default function HeaderHero({ title }: { title: string }) {
  return (
    <div>
      <div className="px-10 max-sm:px-2 xl:h-[300px] w-full max-lg:py-4 bg-slate-50">
        <div className="flex justify-between items-center bg-slate-50">
          <Image
            width={300}
            height={300}
            src="/images/vacation.png"
            alt="vacation"
            className="h-72 max-sm:h-20 max-md:h-32 max-lg:h-48 max-sm:mt-6 p-8 max-sm:p-1 max-md:p-3 aspect-square"
          />
          <h1 className="text-center text-5xl max-sm:text-2xl font-bold w-1/3">
            {title}
          </h1>
          <Image
            width={300}
            height={300}
            src="/images/location.png"
            alt="plan"
            className="h-72 max-sm:h-20 max-md:h-32 max-lg:h-48 max-sm:mt-6 p-8 max-sm:p-1 max-md:p-3 aspect-square"
          />
        </div>
      </div>
    </div>
  );
}
