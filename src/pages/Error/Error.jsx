import { Link, useNavigate } from "react-router-dom";
import { FaHome, FaSearch, FaGamepad, FaExclamationTriangle } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi";
import { useState, useEffect } from "react";

export default function Error() {
  const navigate = useNavigate();
  const [glitchText, setGlitchText] = useState("404");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Glitch effect for 404 text
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      const glitchChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
      const shouldGlitch = Math.random() > 0.8;

      if (shouldGlitch) {
        let glitched = "";
        for (let i = 0; i < 3; i++) {
          if (Math.random() > 0.5) {
            glitched += glitchChars[Math.floor(Math.random() * glitchChars.length)];
          } else {
            glitched += "404"[i];
          }
        }
        setGlitchText(glitched);
        setTimeout(() => setGlitchText("404"), 100);
      }
    }, 2000);

    return () => clearInterval(glitchInterval);
  }, []);

  // Mouse tracking for parallax effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const quickLinks = [
    { icon: <FaHome />, text: "Homepage", link: "/" },
    { icon: <FaSearch />, text: "Shop", link: "/shop" },
    { icon: <FaGamepad />, text: "Categories", link: "/categories" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0b0b0b] to-[#1a1a1a] flex items-center justify-center px-4 overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating Orbs */}
        <div
          className="absolute top-20 left-20 w-96 h-96 bg-[#FF1E1E]/10 rounded-full blur-3xl animate-pulse"
          style={{ transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)` }}
        />
        <div
          className="absolute bottom-20 right-20 w-72 h-72 bg-[#FF1E1E]/5 rounded-full blur-3xl animate-pulse delay-1000"
          style={{ transform: `translate(${-mousePosition.x}px, ${-mousePosition.y}px)` }}
        />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-50"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Glitch 404 Text */}
        <div className="relative mb-8">
          <h1 className="text-[150px] md:text-[200px] lg:text-[250px] font-bold text-[#FF1E1E] leading-none relative">
            <span className="absolute inset-0 text-[#ff4444] animate-glitch-1">{glitchText}</span>
            <span className="absolute inset-0 text-[#ff6666] animate-glitch-2">{glitchText}</span>
            <span className="relative">{glitchText}</span>
          </h1>

          {/* Animated Line */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-[#FF1E1E] to-transparent animate-pulse" />
        </div>

        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-24 h-24 bg-gradient-to-br from-[#FF1E1E]/20 to-[#FF1E1E]/10 rounded-full flex items-center justify-center animate-bounce">
              <FaExclamationTriangle className="text-[#FF1E1E] text-4xl" />
            </div>
            <div className="absolute inset-0 w-24 h-24 bg-[#FF1E1E]/20 rounded-full blur-xl animate-pulse" />
          </div>
        </div>

        {/* Error Message */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate-fadeIn">
          Oops! Level Not Found
        </h2>

        <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
          Looks like you've ventured into uncharted territory. This page has been fragged and is currently respawning in another dimension.
        </p>

        {/* Gaming-themed message */}
        <div className="mb-10 animate-fadeIn animation-delay-400">
          <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
            <HiSparkles className="text-[#FF1E1E]" />
            Press any button to continue...
            <HiSparkles className="text-[#FF1E1E]" />
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fadeIn animation-delay-600">
          <button
            onClick={() => navigate(-1)}
            className="px-8 py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-[#FF1E1E]/50 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 backdrop-blur-sm"
          >
            Go Back
          </button>

          <Link
            to="/"
            className="px-8 py-3 bg-[#FF1E1E] hover:bg-[#ff3333] text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center gap-2"
          >
            <FaHome />
            Return Home
          </Link>
        </div>

        {/* Quick Links */}
        <div className="animate-fadeIn animation-delay-800">
          <p className="text-gray-500 text-sm mb-4">Or try these popular pages:</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {quickLinks.map((link, index) => (
              <Link
                key={index}
                to={link.link}
                className="group flex items-center gap-2 text-gray-400 hover:text-[#FF1E1E] transition-all duration-300"
              >
                <span className="w-10 h-10 bg-white/5 group-hover:bg-[#FF1E1E]/20 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                  {link.icon}
                </span>
                <span className="font-medium">{link.text}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mt-12 max-w-md mx-auto animate-fadeIn animation-delay-1000">
          <form className="relative">
            <input
              type="text"
              placeholder="Search for products..."
              className="w-full px-6 py-3 pl-12 bg-white/10 border border-white/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-[#FF1E1E] focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>
        </div>
      </div>

      {/* Floating Gaming Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 text-white/5 text-6xl animate-float">
          <FaGamepad />
        </div>
        <div className="absolute bottom-20 left-10 text-white/5 text-8xl animate-float-delayed">
          <FaGamepad />
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes glitch-1 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
          40% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -2px); }
          60% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
          80% { clip-path: inset(80% 0 0 0); transform: translate(2px, -2px); }
        }

        @keyframes glitch-2 {
          0%, 100% { clip-path: inset(0 0 0 0); transform: translate(0); }
          20% { clip-path: inset(80% 0 0 0); transform: translate(2px, -2px); }
          40% { clip-path: inset(60% 0 20% 0); transform: translate(-2px, 2px); }
          60% { clip-path: inset(40% 0 40% 0); transform: translate(2px, -2px); }
          80% { clip-path: inset(20% 0 60% 0); transform: translate(-2px, 2px); }
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }

        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(-10deg); }
        }

        .animate-glitch-1 {
          animation: glitch-1 2s infinite;
        }

        .animate-glitch-2 {
          animation: glitch-2 2s infinite reverse;
        }

        .animate-fadeIn {
          animation: fadeIn 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }

        .animation-delay-400 {
          animation-delay: 400ms;
        }

        .animation-delay-600 {
          animation-delay: 600ms;
        }

        .animation-delay-800 {
          animation-delay: 800ms;
        }

        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}