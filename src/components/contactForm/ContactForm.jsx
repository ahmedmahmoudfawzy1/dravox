export default function ContactForm() {
  return (
    <form className="  rounded-lg p-4 bg-zinc-900">
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          placeholder="Name"
          className="flex-1 border-[#A1A1A1] border p-2 rounded-md bg-transparent focus:border-primary-color pl-2 outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="flex-1 border-[#A1A1A1] border p-2 rounded-md bg-transparent focus:border-primary-color pl-2 outline-none"
        />
        <input
          type="text"
          placeholder="Phone"
          className="flex-1 border-[#A1A1A1] border p-2 rounded-md bg-transparent focus:border-primary-color pl-2 outline-none"
        />
      </div>
      <textarea
        name="contact"
        id="contact"
        className="w-[100%] h-[200px] mt-4 resize-none border-[#A1A1A1] border p-2 rounded-md bg-transparent focus:border-primary-color pl-2 outline-none "
      ></textarea>

      <div className="flex justify-end">
        <button className="main-btn px-6 py-2 text-[14px] font-normal rounded-md mt-4 ">Send Message</button>
      </div>
    </form>
  );
}
