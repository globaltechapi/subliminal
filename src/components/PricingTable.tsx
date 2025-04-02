"use client";

import { Check } from "lucide-react";

interface PricingFeature {
  included: boolean;
  text: string;
}

interface PricingPlan {
  name: string;
  price: number;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  popular?: boolean;
}

export default function PricingTable() {
  const plans: PricingPlan[] = [
    {
      name: "Basic",
      price: 499,
      description: "Perfect for beginners starting their subliminal journey",
      features: [
        { included: true, text: "5 Custom Subliminal Tracks" },
        { included: true, text: "Basic Affirmation Library" },
        { included: true, text: "Standard Audio Quality" },
        { included: false, text: "Advanced Frequency Options" },
        { included: false, text: "Priority Support" },
        { included: false, text: "Premium Music Library" },
      ],
      buttonText: "Get Started",
    },
    {
      name: "Premium",
      price: 999,
      description: "Our most popular plan for serious mindset transformation",
      features: [
        { included: true, text: "15 Custom Subliminal Tracks" },
        { included: true, text: "Extended Affirmation Library" },
        { included: true, text: "High-Quality Audio" },
        { included: true, text: "Basic Frequency Options" },
        { included: true, text: "Email Support" },
        { included: false, text: "Premium Music Library" },
      ],
      buttonText: "Choose Premium",
      popular: true,
    },
    {
      name: "Ultimate",
      price: 1999,
      description: "Complete subliminal toolkit for maximum transformation",
      features: [
        { included: true, text: "Unlimited Subliminal Tracks" },
        { included: true, text: "Complete Affirmation Library" },
        { included: true, text: "Studio-Quality Audio" },
        { included: true, text: "Advanced Frequency Options" },
        { included: true, text: "Priority 24/7 Support" },
        { included: true, text: "Premium Music Library" },
      ],
      buttonText: "Choose Ultimate",
    },
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Choose Your Plan</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Select the perfect package to start your subliminal journey and
            transform your mindset
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`rounded-2xl overflow-hidden border ${plan.popular ? "border-blue-500 shadow-lg shadow-blue-100" : "border-gray-200"} transition-all hover:shadow-xl`}
            >
              {plan.popular && (
                <div className="bg-blue-500 text-white text-center py-2 text-sm font-medium">
                  Most Popular
                </div>
              )}
              <div className={`p-8 ${!plan.popular && "pt-10"}`}>
                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">
                    {formatPrice(plan.price)}
                  </span>
                  <span className="text-gray-500 ml-2">/month</span>
                </div>
                <p className="text-gray-600 mb-6">{plan.description}</p>

                <button
                  className={`w-full py-3 px-4 rounded-lg font-medium ${plan.popular ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-100 text-gray-800 hover:bg-gray-200"} transition-colors mb-6`}
                >
                  {plan.buttonText}
                </button>

                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <span
                        className={`mr-2 mt-1 ${feature.included ? "text-green-500" : "text-gray-300"}`}
                      >
                        <Check className="h-4 w-4" />
                      </span>
                      <span
                        className={
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
