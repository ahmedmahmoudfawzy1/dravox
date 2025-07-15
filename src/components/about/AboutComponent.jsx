import aboutImage from "../../assets/images/about.webp";
import {
  FaGamepad,
  FaUsers,
  FaShieldAlt,
  FaTrophy,
  FaHeadset,
  FaRocket,
  FaGlobe,
  FaStar
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { Link } from "react-router-dom";

export default function AboutComponent() {
  const stats = [
    { value: "10K+", label: "Happy Gamers", icon: <FaUsers /> },
    { value: "500+", label: "Products", icon: <FaGamepad /> },
    { value: "4.9", label: "Rating", icon: <FaStar /> },
    { value: "24/7", label: "Support", icon: <FaHeadset /> }
  ];

  const values = [
    {
      icon: <FaShieldAlt className="text-3xl" />,
      title: "Quality First",
      description: "We curate only the best gaming gear from trusted brands worldwide"
    },
    {
      icon: <FaTrophy className="text-3xl" />,
      title: "Competitive Pricing",
      description: "Get premium gaming equipment at prices that won't break the bank"
    },
    {
      icon: <FaRocket className="text-3xl" />,
      title: "Fast Delivery",
      description: "Lightning-fast shipping across Egypt to get you gaming sooner"
    },
    {
      icon: <FaGlobe className="text-3xl" />,
      title: "Local Support",
      description: "Egyptian customer service that understands your gaming needs"
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] pt-[120px] pb-20">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-40 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-20" />
            <HiSparkles className="text-[#FF1E1E] text-3xl" />
            <div className="h-px bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent w-20" />
          </div>
          <h1 className="text-5xl lg:text-6xl font-bold text-white mb-4">
            About <span className="text-[#FF1E1E]">Dravox</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Empowering Egyptian gamers with world-class gaming gear
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Side */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-[#FF1E1E]/20 to-transparent rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-500" />
            <div className="relative bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden">
              <img
                src={aboutImage}
                alt="Dravox Gaming Setup"
                className="w-full h-auto transform transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              {/* Overlay Stats */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.slice(0, 2).map((stat, index) => (
                    <div key={index} className="text-center">
                      <div className="flex items-center justify-center gap-2 text-[#FF1E1E] mb-1">
                        {stat.icon}
                        <span className="text-3xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-sm text-gray-300">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
                Your Ultimate Gaming
                <span className="block text-[#FF1E1E] text-5xl lg:text-6xl font-bold mt-2">
                  Destination
                </span>
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed">
                <p className="text-lg">
                  Welcome to <span className="text-[#FF1E1E] font-semibold">Dravox</span>,
                  where passion meets performance. We're not just another gaming store –
                  we're gamers who understand what you need to dominate the battlefield.
                </p>
                <p>
                  Founded by Egyptian gamers for Egyptian gamers, we've built our reputation
                  on delivering authentic, high-quality gaming peripherals at prices that make
                  sense. From mechanical keyboards that register every keystroke to mice that
                  track your every move with precision, we've got you covered.
                </p>
                <p>
                  Our mission is simple: make world-class gaming accessible to every Egyptian
                  gamer. No more overpriced imports, no more settling for less – just pure
                  gaming excellence delivered to your doorstep.
                </p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30"
              >
                <FaGamepad />
                Explore Products
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-full transition-all duration-300"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300"
            >
              <div className="text-[#FF1E1E] mb-3 flex justify-center">
                {stat.icon}
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">{stat.value}</h3>
              <p className="text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-center text-white mb-12">
            Why Gamers Choose <span className="text-[#FF1E1E]">Dravox</span>
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div
                key={index}
                className="group bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-8 hover:shadow-2xl hover:shadow-[#FF1E1E]/20 hover:border-[#FF1E1E]/30 transition-all duration-500"
              >
                <div className="text-[#FF1E1E] mb-4 transform group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{value.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center">
          <div className="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-sm border border-white/10 rounded-3xl p-12 max-w-4xl mx-auto">
            <FaUsers className="text-5xl text-[#FF1E1E] mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">
              Join Our Gaming Community
            </h2>
            <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
              More than just customers, you're part of the Dravox family. Connect with
              thousands of Egyptian gamers, share strategies, and stay updated on the
              latest gaming gear.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300"
              >
                Join Discord
              </a>
              <a
                href="#"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full transition-all duration-300"
              >
                Follow Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}