export default function FirstPage() {
  return (
    <div>
      <div className="px-10 max-sm:px-2 xl:h-[300px] w-full max-lg:py-4 bg-slate-50">
        <div className="flex justify-between items-center bg-slate-50">
          <img
            src="vacation.png"
            alt="vacation"
            className="h-72 max-sm:h-20 max-md:h-32 max-lg:h-48 max-sm:mt-6 p-8 max-sm:p-1 max-md:p-3"
          />
          <h1 className="text-center text-5xl max-sm:text-2xl font-bold w-1/3">
            About Us
          </h1>
          <img
            src="Location.png"
            alt="plan"
            className="w-1/4 max-sm:w-1/4 bg-slate-200"
          />
        </div>
      </div>
    </div>
  );
}
