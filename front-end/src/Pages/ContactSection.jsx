import React, { useState } from "react";
import {
    Phone,
    Mail,
    MapPin,
} from "lucide-react";
import { FaFacebookF, FaInstagram , FaYoutube , FaLinkedinIn  } from "react-icons/fa";


export default function ContactSection() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Submit logic here
    };

    return (
        <section className="relative min-h-[640px] w-full bg-[#0a0c0e] py-16 text-white font-sans overflow-hidden flex items-center">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920&auto=format&fit=crop"
                    alt="Modern House Evening View"
                    className="h-full w-full object-cover object-center brightness-[0.4]"
                />
                {/* Dark Gradients for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/50" />
            </div>

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-8 lg:px-12 w-full">
                <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">

                    {/* Left Column: Contact Details & Social Links */}
                    <div className="lg:col-span-6 flex flex-col justify-center">
                        <h2 className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl">
                            Get in Touch
                        </h2>
                        <p className="mt-3 text-sm sm:text-base text-gray-300 font-light max-w-md">
                            We're here to help you with anything related to land.
                        </p>

                        {/* Contact Info List */}
                        <div className="mt-8 space-y-5">
                            {/* Phone */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8b46a]/40 bg-[#121519]/80 text-[#ffd77f] shadow-md">
                                    <Phone className="h-4 w-4" />
                                </div>
                                <span className="text-sm sm:text-base font-medium text-gray-200">
                                    +91 98765 43210
                                </span>
                            </div>

                            {/* Email */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8b46a]/40 bg-[#121519]/80 text-[#ffd77f] shadow-md">
                                    <Mail className="h-4 w-4" />
                                </div>
                                <span className="text-sm sm:text-base font-medium text-gray-200">
                                    info@buyland.com
                                </span>
                            </div>

                            {/* Address */}
                            <div className="flex items-center gap-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d8b46a]/40 bg-[#121519]/80 text-[#ffd77f] shadow-md">
                                    <MapPin className="h-4 w-4" />
                                </div>
                                <span className="text-sm sm:text-base font-medium text-gray-200">
                                    Ahmedabad, Gujarat
                                </span>
                            </div>
                        </div>

                        {/* Social Media Buttons */}
                        <div className="mt-8 flex items-center gap-3">
                            {[
                                { Icon: FaFacebookF , href: "#" },
                                { Icon: FaInstagram , href: "#" },
                                { Icon: FaYoutube , href: "#" },
                                { Icon: FaLinkedinIn , href: "#" },
                            ].map(({ Icon, href }, idx) => (
                                <a
                                    key={idx}
                                    href={href}
                                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#d8b46a]/30 bg-[#121519]/80 text-[#ffd77f] transition-all hover:border-[#ffd77f] hover:bg-[#d8b46a]/20 hover:scale-105"
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: White Floating Contact Card */}
                    <div className="lg:col-span-6 flex justify-center lg:justify-end">
                        <div className="w-full max-w-lg rounded-3xl bg-white p-6 sm:p-8 shadow-2xl text-gray-800 border border-gray-100">
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Name Field */}
                                <div>
                                    <input
                                        type="text"
                                        name="name"
                                        required
                                        placeholder="Your Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                                    />
                                </div>

                                {/* Email Field */}
                                <div>
                                    <input
                                        type="email"
                                        name="email"
                                        required
                                        placeholder="Your Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                                    />
                                </div>

                                {/* Message Field */}
                                <div>
                                    <textarea
                                        name="message"
                                        required
                                        rows="4"
                                        placeholder="Your Message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full resize-none rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-[#d8b46a] focus:bg-white focus:ring-1 focus:ring-[#d8b46a]"
                                    ></textarea>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full rounded-xl bg-gradient-to-r from-[#ffe59a] via-[#f4ca68] to-[#edbb4d] py-3.5 text-sm font-bold text-[#30230c] shadow-md transition-all hover:brightness-105 active:scale-[0.98]"
                                >
                                    Send Message
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}