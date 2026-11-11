"use client";

import { useState } from "react";
import { AiOutlineCheck } from "react-icons/ai"; 
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function ChoosePlanPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openAccordion, setOpenAccordion] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (planType: string) => {
    setLoading(true);
    try {
      const res = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planType }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const faqs = [
    {
      q: "How does the 7-day free trial work?",
      a: "Beginning today, you're free to explore all the perks Summarist Premium has to offer. If you cancel before the 7 days are up, you won't be charged. If you love it, do nothing—your subscription will automatically continue.",
    },
    {
      q: "Can I cancel anytime?",
      a: "Yes, you can cancel your subscription at any time right from your account settings with just a single click.",
    },
    {
      q: "What's included in the Premium plan?",
      a: "You get unlimited access to thousands of book summaries, audio playback, offline listening, and recommendations tailored specifically to your goals.",
    },
  ];

  return (
    <div className="min-h-screen bg-white text-brand-dark flex flex-col justify-between">
      {/* Header Banner */}
      <div className="bg-[#042330] text-white py-16 px-6 text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold">Get unlimited access to many amazing books</h1>
        <p className="text-gray-300 max-w-xl mx-auto">
          Turn mundane commutes and chores into learning opportunities with bite-sized audio and text summaries.
        </p>
      </div>

      <div className="max-w-200 w-full mx-auto px-6 py-12 space-y-12">
        {/* Plan Switcher Toggle */}
        <div className="flex justify-center">
          <div className="bg-gray-100 p-1.5 rounded-full flex gap-2">
            <button 
              onClick={() => setBillingCycle("yearly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "yearly" ? "bg-brand-dark text-white shadow" : "text-brand-text hover:text-brand-dark"}`}
            >
              Annual Billing ($99.99/yr)
            </button>
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={`px-6 py-2 rounded-full font-medium transition-all ${billingCycle === "monthly" ? "bg-brand-dark text-white shadow" : "text-brand-text hover:text-brand-dark"}`}
            >
              Monthly Billing ($9.99/mo)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="border border-gray-200 rounded-xl p-8 flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold bg-gray-100 px-3 py-1 rounded text-brand-muted">Basic</span>
              <h3 className="text-3xl font-bold mt-4">$0 <span className="text-sm font-normal text-brand-muted">/ forever</span></h3>
              <p className="text-sm text-brand-muted mt-2">Explore core free titles and basic access.</p>
            </div>
            <ul className="space-y-3 text-sm text-brand-text">
              <li className="flex items-center gap-2">✓ Limited free summaries</li>
              <li className="flex items-center gap-2">✓ Standard text reading</li>
            </ul>
            <button 
              disabled 
              className="w-full bg-gray-100 text-gray-400 py-3 rounded-lg font-medium cursor-not-allowed"
            >
              Current Plan
            </button>
          </div>

          {/* Premium Plan */}
          <div className="border-2 border-brand-primary rounded-xl p-8 flex flex-col justify-between space-y-6 relative shadow-lg bg-[#fbefcs]/20">
            <span className="absolute -top-3 right-6 bg-brand-primary text-brand-dark text-xs uppercase tracking-wider px-3 py-1 rounded-full font-bold">
              Most Popular
            </span>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold bg-brand-primary text-brand-dark px-3 py-1 rounded">Premium</span>
              <h3 className="text-3xl font-bold mt-4">
                {billingCycle === "yearly" ? "$99.99" : "$9.99"} 
                <span className="text-sm font-normal text-brand-muted"> / {billingCycle === "yearly" ? "year" : "month"}</span>
              </h3>
              <p className="text-sm text-brand-muted mt-2">
                {billingCycle === "yearly" ? "Includes 7-day free trial, then $99.99/year" : "Billed monthly, cancel anytime."}
              </p>
            </div>
            <ul className="space-y-3 text-sm text-brand-text">
              <li className="flex items-center gap-2">✓ Unlimited book summaries</li>
              <li className="flex items-center gap-2">✓ Audio and Text player modes</li>
              <li className="flex items-center gap-2">✓ Offline listening support</li>
              <li className="flex items-center gap-2">✓ 7-day risk-free trial</li>
            </ul>
            <button 
              onClick={() => handleSubscribe(billingCycle)}
              disabled={loading}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-brand-dark py-3 rounded-lg font-bold shadow transition-colors"
            >
              {loading ? "Processing..." : billingCycle === "yearly" ? "Start 7-Day Free Trial" : "Subscribe Now"}
            </button>
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-6 pt-8">
          <h2 className="text-2xl font-bold text-center mb-6">Frequently Asked Questions</h2>
          {faqs.map((faq, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button 
                onClick={() => setOpenAccordion(openAccordion === idx ? null : idx)}
                className="w-full p-4 flex justify-between items-center bg-gray-50 font-semibold text-left"
              >
                {faq.q}
                {openAccordion === idx ? <FaChevronUp /> : <FaChevronDown />}
              </button>
              {openAccordion === idx && (
                <div className="p-4 text-sm text-brand-text bg-white border-t border-gray-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-100 text-center py-6 text-xs text-brand-muted">
        &copy; 2026 Summarist. All rights reserved.
      </footer>
    </div>
  );
}