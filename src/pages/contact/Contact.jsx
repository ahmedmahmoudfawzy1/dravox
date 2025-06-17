import { FaPhoneAlt } from "react-icons/fa";
import ContactForm from "../../components/contactForm/ContactForm";
import { MdOutlineEmail } from "react-icons/md";

export default function Contact() {
  return (
    <section className="pt-[100px] text-white min-h-[100vh] ele-center">
      <div className="container">
        <h3 className="w-full text-[4rem] text-center font-bold mb-8">
          Contact Us
        </h3>
        <div className="grid grid-cols-12 gap-4 items-stretch">
          <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-4 ">
            <div className="rounded-lg p-4 bg-zinc-900 h-full">
              <div className=" py-4 border-b border-[#A1A1A1] flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <span className="ele-center bg-primary-color h-[30px] w-[30px] rounded-[50%]">
                    <FaPhoneAlt />
                  </span>
                  <span className="text-[1.2rem]">Call Us</span>
                </div>
                <p>We are available 24/7 , 7 days a week.</p>
                <p>Phone : +972 58-892-8927</p>
              </div>
              <div className=" py-4 flex flex-col gap-4">
                <div className="flex gap-2 items-center">
                  <span className="ele-center bg-primary-color h-[30px] w-[30px] rounded-[50%]">
                    <MdOutlineEmail />
                  </span>
                  <span className="text-[1.2rem]">Write To Us</span>
                </div>
                <p>
                  File out our form and we will contact your within 24 hours
                </p>
                <p> Emails : customers@dravox.com</p>
                <p> Emails : support@dravox.com</p>
              </div>
            </div>
          </div>
          <div className=" col-span-12 sm:col-span-12 md:col-span-12 lg:col-span-8 ">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
