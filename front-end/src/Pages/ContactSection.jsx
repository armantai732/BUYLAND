import React, { useState } from "react";
import {
  Home,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Send,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Building,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const faqsData = [
  {
    q: "How can I list my property on BuyLand?",
    a: "You can easily list your property by contacting our support team or filling out our property listing form with complete details and photos.",
  },
  {
    q: "What documents are required to sell property?",
    a: "Clear title deeds, sale deed history, latest tax receipts, identity proof, and property tax NOC are generally required.",
  },
  {
    q: "Is Buying Property Online Safe?",
    a: "Yes, BuyLand verifies all properties 100% and provides complete legal assistance to ensure a safe and transparent transaction.",
  },
  {
    q: "Can I get help from your team?",
    a: "Our expert support team is available Mon - Sat (9 AM - 7 PM) to guide you through every step of your property journey.",
  },
];

export default function Contact() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    subject: "General Inquiry",
    message: "",
  });

  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you ${formData.name}! Your message has been sent successfully.`);
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] font-sans text-gray-800 antialiased">
      
      {/* 1. HERO HEADER BANNER */}
      <div className="relative bg-[#090b0c] text-white overflow-hidden border-b border-gray-800">
        <div className="absolute inset-0 opacity-40">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1600&auto=format&fit=crop"
            alt="Luxury modern villa background"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-300 mb-2">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1 hover:text-amber-400 transition"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Home</span>
            </button>
            <span>&gt;</span>
            <span className="text-amber-400 font-semibold">Contact</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Contact <span className="text-amber-400">Us</span>[cite: 13]
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-300 font-medium">
            Have any questions? We're here to help![cite: 13]
          </p>
          <p className="text-[11px] text-gray-400 mt-0.5">
            Get in touch with us for property inquiries, support or any assistance.[cite: 13]
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 space-y-10">
        
        {/* 2. TOP 4 CONTACT HIGHLIGHT CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Call Us */}
          <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Phone className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Call Us[cite: 13]</h4>
              <p className="text-xs font-bold text-amber-600 mt-0.5">+91 98765 43210[cite: 13]</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Mon - Sat: 9 AM - 7 PM[cite: 13]</p>
            </div>
          </div>

          {/* Card 2: Email Us */}
          <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Email Us[cite: 13]</h4>
              <p className="text-xs font-bold text-amber-600 mt-0.5">info@buyland.com[cite: 13]</p>
              <p className="text-[10px] text-gray-400 mt-0.5">We reply within 24 hours[cite: 13]</p>
            </div>
          </div>

          {/* Card 3: Our Office */}
          <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">Our Office[cite: 13]</h4>
              <p className="text-xs font-semibold text-gray-800 mt-0.5">Ahmedabad, Gujarat[cite: 13]</p>
              <p className="text-[10px] text-gray-400 mt-0.5">India - 380015[cite: 13]</p>
            </div>
          </div>

          {/* Card 4: WhatsApp */}
          <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <MessageSquare className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-gray-900 uppercase">WhatsApp[cite: 13]</h4>
              <p className="text-xs font-bold text-amber-600 mt-0.5">+91 98765 43210[cite: 13]</p>
              <p className="text-[10px] text-gray-400 mt-0.5">Chat with us now[cite: 13]</p>
            </div>
          </div>

        </div>

        {/* 3. MAIN TWO-COLUMN SECTION (FORM & DETAILS) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: SEND US A MESSAGE FORM (Col 6) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-5">
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2">
                🏠 Send Us a Message[cite: 13]
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Fill out the form below and we'll get back to you soon.[cite: 13]
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Your Name *[cite: 13]
                </label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Your Mobile Number *[cite: 13]
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Enter mobile number"
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Your Email Address[cite: 13]
                </label>
                <input
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Select Subject[cite: 13]
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white"
                >
                  <option>General Inquiry</option>
                  <option>Buy Property</option>
                  <option>Sell Property</option>
                  <option>Legal Support</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-gray-700 mb-1">
                  Your Message *[cite: 13]
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Type your message here..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-2.5 text-xs text-gray-800 outline-none focus:border-amber-400 focus:bg-white resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-amber-600 to-amber-500 py-3 text-xs font-bold text-white shadow-md transition hover:brightness-105 active:scale-95"
              >
                <Send className="h-4 w-4" />
                <span>Send Message[cite: 13]</span>
              </button>
            </form>
          </div>

          {/* RIGHT: OUR CONTACT DETAILS (Col 6) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">
                <span className="h-[2px] w-6 bg-amber-500" />
                <span>Our Contact Details[cite: 13]</span>
              </div>
              <p className="text-xs text-gray-500 font-medium">
                We're always open to help you[cite: 13]
              </p>
            </div>

            <div className="space-y-5 divide-y divide-gray-100">
              
              {/* Phone Number */}
              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase">Phone Number[cite: 13]</h4>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">+91 98765 43210[cite: 13]</p>
                  <p className="text-xs text-gray-500 mt-0.5">Mon - Sat: 9 AM - 7 PM[cite: 13]</p>
                </div>
              </div>

              {/* Email Address */}
              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase">Email Address[cite: 13]</h4>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">info@buyland.com[cite: 13]</p>
                  <p className="text-xs text-gray-500 mt-0.5">We reply within 24 hours[cite: 13]</p>
                </div>
              </div>

              {/* Office Address */}
              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase">Office Address[cite: 13]</h4>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">BuyLand Real Estate Pvt. Ltd.[cite: 13]</p>
                  <p className="text-xs text-gray-600 mt-0.5 leading-relaxed">
                    301, Silver Business Hub, S.G. Highway, Ahmedabad - 380015, Gujarat, India[cite: 13]
                  </p>
                </div>
              </div>

              {/* WhatsApp Support */}
              <div className="flex items-start gap-4 pt-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-[11px] font-bold text-gray-400 uppercase">WhatsApp Support[cite: 13]</h4>
                  <p className="text-sm font-bold text-gray-900 mt-0.5">+91 98765 43210[cite: 13]</p>
                  <p className="text-xs text-gray-500 mt-0.5">Chat with us for quick support[cite: 13]</p>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* 4. FREQUENTLY ASKED QUESTIONS SECTION */}
        <div className="pt-6 space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-amber-600 uppercase mb-1">
              <span className="h-[2px] w-6 bg-amber-500" />
              <span>Frequently Asked Questions[cite: 13]</span>
              <span className="h-[2px] w-6 bg-amber-500" />
            </div>
            <p className="text-xs sm:text-sm text-gray-500 font-medium">
              Find quick answers to common questions[cite: 13]
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {faqsData.map((faq, idx) => (
              <div
                key={idx}
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-100 shadow-sm cursor-pointer transition"
              >
                <div className="flex items-center justify-between text-xs sm:text-sm font-bold text-gray-900">
                  <span className="flex items-center gap-2">
                    <span className="text-amber-500">👤</span> {faq.q}
                  </span>
                  {openFaq === idx ? (
                    <ChevronUp className="h-4 w-4 text-gray-500 shrink-0" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-gray-500 shrink-0" />
                  )}
                </div>

                {openFaq === idx && (
                  <p className="mt-3 text-xs text-gray-600 font-medium leading-relaxed pt-3 border-t border-gray-100">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* 5. BOTTOM CTA FOOTER BANNER */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="rounded-3xl bg-white p-6 sm:p-8 border border-amber-200/60 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500 text-white font-bold shrink-0">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-serif text-base sm:text-xl font-bold text-gray-900">
                Ready to Find Your Dream Property?[cite: 13]
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Explore the best properties with BuyLand today![cite: 13]
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/properties")}
            className="shrink-0 flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-600 to-amber-500 px-6 py-3 text-xs sm:text-sm font-bold text-white shadow-md transition hover:scale-105 active:scale-95"
          >
            <span>Browse Properties[cite: 13]</span>
            <ArrowRight className="h-4 w-4 stroke-[2.5]" />
          </button>

        </div>
      </div>

    </div>
  );
}