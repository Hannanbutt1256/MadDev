import { useState } from "react";

const HelpPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is MadDev?",
      answer:
        "MadDev is a blog website for the developer community, providing the best of software solutions and content.",
    },
    {
      question: "How can I contact MadDev?",
      answer:
        "You can contact us through the contact form on our website or by emailing us at support@maddev.com.",
    },
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button on the top right corner of the homepage and fill in the required details.",
    },
    {
      question: "How can I contribute to MadDev?",
      answer:
        "You can contribute by writing articles, sharing your knowledge, and participating in discussions on our platform.",
    },
  ];

  return (
    <div className="p-6 bg-light-background dark:bg-black min-h-screen flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-4">Help & FAQs</h1>
      <p className="mb-6 text-center max-w-2xl">
        Here you will find answers to the most commonly asked questions about
        MadDev. If you have any other questions, feel free to reach out to us.
      </p>
      <div className="space-y-4 w-full max-w-2xl">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200">
            <button
              className="w-full text-left py-2 focus:outline-none"
              onClick={() => toggleAccordion(index)}
            >
              <h2 className="text-xl font-semibold">{faq.question}</h2>
            </button>
            {activeIndex === index && (
              <div className="py-2">
                <p>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpPage;
