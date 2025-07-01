import { Input } from "../ui/input";
import { Button } from "../ui/button";

export default function ContactForm() {
  return (
    <form className="flex justify-center max-md:px-4 max-lg:px-8 h-full">
      <div className="flex w-full max-md:px-4 max-md:py-8 flex-wrap bg-white rounded-xl shadow-lg p-8 max-md:p-0">
        <div className="w-1/2 max-md:w-full h-12 pr-4 max-md:pr-0 ">
          <Input
            type="text"
            name="name"
            placeholder="Name"
            required
            className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black border-none shadow-none"
          />
        </div>
        <div className="w-1/2 max-md:w-full h-12 pl-4 max-md:pl-0 max-md:mt-4">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            required
            className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black border-none shadow-none"
          />
        </div>
        <div className="w-1/2 max-md:w-full h-12 pr-4 max-md:pr-0 mt-8 max-md:mt-4">
          <Input
            type="tel"
            name="tel"
            placeholder="Mobile Number"
            required
            className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black border-none shadow-none"
          />
        </div>
        <div className="w-1/2 max-md:w-full max-md:pl-0 h-12 pl-4 mt-8 max-md:mt-4">
          <Input
            type="text"
            name="subject"
            placeholder="Subject"
            required
            className="w-full h-full px-4 bg-slate-200 outline-none rounded placeholder-black border-none shadow-none"
          />
        </div>
        <div className="w-full">
          <textarea
            name="textarea"
            placeholder="Message"
            rows={5}
            cols={100}
            required
            className="w-full mt-4 md:mt-8 bg-slate-200 p-4 outline-none rounded placeholder-black border border-input focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          />
        </div>
        <div className="flex justify-end w-full">
          <Button
            type="submit"
            className="mt-4 shadow-lg font-medium"
          >
            Send Message
          </Button>
        </div>
      </div>
    </form>
  );
}