export default function contactForm() {
  return (
    <div className=" h-full bg-slate-50 ">
      <form className="flex justify-center py-16">
        <div className="flex w-1/2 flex-wrap bg-white rounded-xl shadow-lg p-8">
          <div className="w-1/2 h-12 pr-4 ">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black"
            />
          </div>
          <div className="w-1/2 h-12 pl-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black"
            />
          </div>
          <div className="w-1/2 h-12 pr-4 mt-8">
            <input
              type="tel"
              name="tel"
              placeholder="Mobile Number"
              required
              className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black"
            />
          </div>
          <div className="w-1/2 h-12 pl-4 mt-8">
            <input
              type="text"
              name="subject"
              placeholder="Subject"
              required
              className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black"
            />
          </div>
          <div>
            <textarea
              name="textarea"
              placeholder="Message"
              rows="4"
              cols="100"
              required
              className="w-full mt-8 bg-slate-200 p-4 outline-none rounded placeholder-black "
            />
          </div>
          <div className="flex justify-end w-full">
            <input
              type="submit"
              value="Send Message"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl mt-8 shadow-lg hover:text-black hover:bg-white duration-700 font-medium "
            />
            </div>
        </div>
      </form>
    </div>
  );
}
