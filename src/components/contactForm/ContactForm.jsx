import { useState } from "react";
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane, FaGamepad, FaTag, FaCheckCircle } from "react-icons/fa";
import { MdMessage, MdAttachFile } from "react-icons/md";
import { HiUpload } from "react-icons/hi";
import { toast } from "react-toastify";

export default function ContactForm({ selectedDepartment }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    orderNumber: "",
    message: "",
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const subjects = {
    sales: ["Product Inquiry", "Bulk Orders", "Pricing Question", "Product Availability", "Custom Orders"],
    support: ["Technical Issue", "Product Defect", "Warranty Claim", "Setup Help", "Compatibility"],
    general: ["Partnership", "Press Inquiry", "Feedback", "Suggestions", "Other"]
  };

  const currentSubjects = subjects[selectedDepartment] || subjects.general;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const maxSize = 5 * 1024 * 1024; // 5MB
    const validFiles = files.filter(file => {
      if (file.size > maxSize) {
        toast.error(`${file.name} is too large. Max size is 5MB`);
        return false;
      }
      return true;
    });

    setFormData(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...validFiles].slice(0, 3) // Max 3 files
    }));
  };

  const removeAttachment = (index) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success(
        <div>
          <p className="font-bold">Message sent successfully!</p>
          <p className="text-sm">We'll get back to you within {subjects[selectedDepartment]?.response || "24 hours"}</p>
        </div>
      );
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        orderNumber: "",
        message: "",
        attachments: []
      });
      setIsSubmitting(false);
    }, 2000);
  };

  const inputClasses = (fieldName) => `
    w-full pl-12 pr-4 py-4 bg-white/10 border-2 rounded-2xl text-white placeholder-gray-400 
    transition-all duration-300
    ${focusedField === fieldName
      ? 'border-[#FF1E1E] bg-white/15 shadow-lg shadow-[#FF1E1E]/10'
      : 'border-white/10 hover:border-white/20'}
  `;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Personal Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <div className="w-8 h-[2px] bg-[#FF1E1E]" />
          Personal Information
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
            <input
              type="text"
              name="name"
              placeholder="Full Name *"
              value={formData.name}
              onChange={handleChange}
              onFocus={() => setFocusedField('name')}
              onBlur={() => setFocusedField(null)}
              required
              className={inputClasses('name')}
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
            <input
              type="email"
              name="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={handleChange}
              onFocus={() => setFocusedField('email')}
              onBlur={() => setFocusedField(null)}
              required
              className={inputClasses('email')}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => setFocusedField(null)}
              className={inputClasses('phone')}
            />
          </div>

          {selectedDepartment === 'support' && (
            <div className="relative">
              <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
              <input
                type="text"
                name="orderNumber"
                placeholder="Order Number (if applicable)"
                value={formData.orderNumber}
                onChange={handleChange}
                onFocus={() => setFocusedField('orderNumber')}
                onBlur={() => setFocusedField(null)}
                className={inputClasses('orderNumber')}
              />
            </div>
          )}
        </div>
      </div>

      {/* Message Details */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-white flex items-center gap-2">
          <div className="w-8 h-[2px] bg-[#FF1E1E]" />
          Message Details
        </h3>

        <div className="relative">
          <FaGamepad className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm z-10" />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            onFocus={() => setFocusedField('subject')}
            onBlur={() => setFocusedField(null)}
            required
            className={`${inputClasses('subject')} appearance-none cursor-pointer`}
          >
            <option value="" className="bg-[#1a1a1a]">Select Subject *</option>
            {currentSubjects.map((subject) => (
              <option key={subject} value={subject} className="bg-[#1a1a1a]">
                {subject}
              </option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <div className="relative">
          <MdMessage className="absolute left-4 top-4 text-gray-400 text-sm z-10" />
          <textarea
            name="message"
            placeholder="Describe your inquiry in detail... *"
            value={formData.message}
            onChange={handleChange}
            onFocus={() => setFocusedField('message')}
            onBlur={() => setFocusedField(null)}
            required
            rows="6"
            className={`${inputClasses('message')} pl-12 rounded-3xl resize-none`}
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-500">
            {formData.message.length}/1000
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-sm text-gray-400">
            <MdAttachFile />
            Attachments (Optional - Max 3 files, 5MB each)
          </label>

          <div className="relative">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              accept="image/*,.pdf,.doc,.docx"
              className="hidden"
              id="file-upload"
              disabled={formData.attachments.length >= 3}
            />
            <label
              htmlFor="file-upload"
              className={`flex items-center justify-center gap-3 p-4 border-2 border-dashed rounded-2xl cursor-pointer transition-all duration-300 ${formData.attachments.length >= 3
                  ? 'border-gray-600 bg-gray-800/50 cursor-not-allowed'
                  : 'border-white/20 bg-white/5 hover:border-[#FF1E1E]/50 hover:bg-[#FF1E1E]/10'
                }`}
            >
              <HiUpload className="text-xl text-gray-400" />
              <span className="text-gray-400">
                {formData.attachments.length >= 3 ? 'Maximum files reached' : 'Click to upload or drag files here'}
              </span>
            </label>
          </div>

          {/* Attached Files */}
          {formData.attachments.length > 0 && (
            <div className="space-y-2">
              {formData.attachments.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-500" />
                    <span className="text-sm text-white truncate max-w-[200px]">{file.name}</span>
                    <span className="text-xs text-gray-500">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeAttachment(index)}
                    className="text-red-500 hover:text-red-400 text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-gray-400">
          <span>Form Progress</span>
          <span>{Math.round((Object.values(formData).filter(v => v && v.length > 0).length / 5) * 100)}%</span>
        </div>
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#FF1E1E] to-[#ff4444] transition-all duration-500"
            style={{ width: `${(Object.values(formData).filter(v => v && v.length > 0).length / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* Submit Section */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Support team is online</span>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || formData.message.length > 1000}
          className="px-8 py-4 bg-gradient-to-r from-[#FF1E1E] to-[#ff3333] hover:from-[#ff3333] hover:to-[#ff4444] disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF1E1E]/30 flex items-center gap-3 min-w-[200px] justify-center"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <FaPaperPlane className="text-lg" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </div>

      {/* Security Notice */}
      <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-4">
        <div className="flex items-start gap-3">
          <div className="w-5 h-5 bg-blue-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
            <div className="w-2 h-2 bg-blue-500 rounded-full" />
          </div>
          <p className="text-xs text-blue-400 leading-relaxed">
            <strong>Privacy & Security:</strong> Your data is encrypted and secure. We use industry-standard SSL encryption
            and never share your information with third parties. View our <a href="/privacy" className="underline hover:text-blue-300">privacy policy</a> for details.
          </p>
        </div>
      </div>
    </form>
  );
}