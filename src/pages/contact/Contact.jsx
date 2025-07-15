import { useState } from "react";
import { FaPhoneAlt, FaMapMarkerAlt, FaClock, FaHeadset, FaDiscord, FaWhatsapp, FaTelegram } from "react-icons/fa";
import { MdOutlineEmail, MdSupport, MdBusinessCenter } from "react-icons/md";
import { HiSparkles, HiLightningBolt } from "react-icons/hi";
import { BsCheckCircleFill } from "react-icons/bs";
import ContactForm from "../../components/contactForm/ContactForm";

export default function Contact() {
  const [selectedDepartment, setSelectedDepartment] = useState("sales");

  const departments = [
    {
      id: "sales",
      name: "Sales Team",
      icon: <MdBusinessCenter />,
      description: "Product inquiries & orders",
      email: "sales@dravox.com",
      response: "< 2 hours"
    },
    {
      id: "support",
      name: "Tech Support",
      icon: <FaHeadset />,
      description: "Technical assistance",
      email: "support@dravox.com",
      response: "< 1 hour"
    },
    {
      id: "general",
      name: "General Inquiry",
      icon: <MdSupport />,
      description: "Other questions",
      email: "info@dravox.com",
      response: "< 24 hours"
    }
  ];

  const contactMethods = [
    {
      icon: <FaWhatsapp className="text-2xl" />,
      platform: "WhatsApp",
      info: "+972 58-892-8927",
      available: true,
      color: "from-green-500 to-green-600",
      link: "https://wa.me/972588928927"
    },
    {
      icon: <FaDiscord className="text-2xl" />,
      platform: "Discord",
      info: "Join Server",
      available: true,
      color: "from-indigo-500 to-purple-600",
      link: "#"
    },
    {
      icon: <FaTelegram className="text-2xl" />,
      platform: "Telegram",
      info: "@DravoxSupport",
      available: true,
      color: "from-blue-500 to-cyan-600",
      link: "#"
    }
  ];

  const features = [
    "24/7 Customer Support",
    "Average Response Time: 30 mins",
    "Multi-language Support",
    "Dedicated Gaming Experts"
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-20">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 left-20 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF1E1E]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <HiLightningBolt className="text-[#FF1E1E] text-2xl animate-pulse" />
            <span className="text-sm font-bold text-[#FF1E1E] uppercase tracking-wider">24/7 Support</span>
            <HiLightningBolt className="text-[#FF1E1E] text-2xl animate-pulse" />
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6">
            We're Here to <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF1E1E] to-[#ff4444]">Help</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our gaming experts are standing by to assist you. Whether you need product recommendations,
            technical support, or just want to talk gaming gear - we've got you covered.
          </p>

          {/* Trust Indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                <BsCheckCircleFill className="text-green-500" />
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Selection */}
        <div className="max-w-4xl mx-auto mb-12">
          <h3 className="text-xl font-semibold text-white mb-6 text-center">Choose Department</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {departments.map((dept) => (
              <button
                key={dept.id}
                onClick={() => setSelectedDepartment(dept.id)}
                className={`relative p-6 rounded-2xl border-2 transition-all duration-300 ${selectedDepartment === dept.id
                    ? "bg-[#FF1E1E]/20 border-[#FF1E1E] shadow-lg shadow-[#FF1E1E]/20"
                    : "bg-white/5 border-white/10 hover:border-white/20"
                  }`}
              >
                <div className={`text-3xl mb-3 ${selectedDepartment === dept.id ? "text-[#FF1E1E]" : "text-gray-400"}`}>
                  {dept.icon}
                </div>
                <h4 className="text-lg font-bold text-white mb-1">{dept.name}</h4>
                <p className="text-sm text-gray-400 mb-2">{dept.description}</p>
                <p className="text-xs text-gray-500">Response: {dept.response}</p>
                {selectedDepartment === dept.id && (
                  <div className="absolute top-2 right-2">
                    <BsCheckCircleFill className="text-[#FF1E1E]" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Quick Connect Section */}
          <div className="lg:col-span-1 space-y-6">
            {/* Instant Connect Card */}
            <div className="bg-gradient-to-br from-[#FF1E1E]/20 to-[#ff4444]/10 backdrop-blur-sm border border-[#FF1E1E]/30 rounded-3xl p-8">
              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-[#FF1E1E]/20 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                  <FaHeadset className="text-4xl text-[#FF1E1E]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Instant Connect</h3>
                <p className="text-gray-300">Choose your preferred channel</p>
              </div>

              <div className="space-y-3">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.link}
                    className="group flex items-center gap-4 p-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl transition-all duration-300"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${method.color} rounded-xl flex items-center justify-center text-white transform group-hover:scale-110 transition-transform`}>
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">{method.platform}</h4>
                      <p className="text-sm text-gray-400">{method.info}</p>
                    </div>
                    {method.available && (
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    )}
                  </a>
                ))}
              </div>
            </div>

            {/* Office Info Card */}
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-6">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <FaMapMarkerAlt className="text-[#FF1E1E]" />
                Visit Our Store
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Address</p>
                  <p className="text-white font-medium">111 Fisal, Giza, Egypt</p>
                </div>

                <div>
                  <p className="text-sm text-gray-400 mb-1">Store Hours</p>
                  <div className="space-y-1 text-white">
                    <p className="flex justify-between">
                      <span>Mon - Fri:</span>
                      <span className="font-medium">9:00 AM - 8:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </p>
                    <p className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">10:00 AM - 6:00 PM</span>
                    </p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10">
                  <p className="text-sm text-gray-400 mb-2">Phone</p>
                  <a href="tel:+972588928927" className="text-[#FF1E1E] font-medium hover:text-[#ff3333] transition-colors">
                    +972 58-892-8927
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 lg:p-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Send Message</h2>
                  <p className="text-gray-400">
                    Contacting: <span className="text-[#FF1E1E] font-medium">
                      {departments.find(d => d.id === selectedDepartment)?.name}
                    </span>
                  </p>
                </div>
                <div className="hidden sm:block">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Expected Response</p>
                    <p className="text-xl font-bold text-[#FF1E1E]">
                      {departments.find(d => d.id === selectedDepartment)?.response}
                    </p>
                  </div>
                </div>
              </div>
              <ContactForm selectedDepartment={selectedDepartment} />
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-[#FF1E1E]/10 to-transparent backdrop-blur-sm border border-[#FF1E1E]/20 rounded-3xl p-12 text-center">
            <HiSparkles className="text-5xl text-[#FF1E1E] mx-auto mb-6" />
            <h2 className="text-4xl font-bold text-white mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Check out our comprehensive FAQ section or join our community for instant help from fellow gamers.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="/faq"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105"
              >
                Browse FAQs
              </a>
              <a
                href="#"
                className="px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}