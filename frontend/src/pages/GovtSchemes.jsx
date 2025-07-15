import React from "react";

const schemes = [ // ✅ renamed to avoid collision
  {
    title: "PM SVANidhi Yojana",
    description:
      "Micro credit scheme for street vendors — get up to ₹10,000 at low interest.",
    link: "https://pmsvanidhi.mohua.gov.in",
  },
  {
    title: "MUDRA Loan",
    description:
      "Collateral-free loans up to ₹10 lakhs for small businesses under Pradhan Mantri Mudra Yojana.",
    link: "https://www.mudra.org.in",
  },
  {
    title: "Stand-Up India",
    description:
      "Empowers SC/ST and women entrepreneurs with loans from ₹10 lakh to ₹1 crore.",
    link: "https://www.standupmitra.in",
  },
];

const GovtSchemes = () => {
  return (
    <section id="schemes" className="py-16 px-6 bg-gray-100 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
        Government Schemes
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
          >
            <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 mb-2">
              {scheme.title}
            </h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              {scheme.description}
            </p>
            <a
              href={scheme.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-green-500 hover:underline"
            >
              Visit Official Website →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default GovtSchemes;
