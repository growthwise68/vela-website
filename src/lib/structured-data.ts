const SITE = "https://velaforcrew.com";

export const organization = {
  "@type": "Organization",
  name: "VÉLA",
  alternateName: ["VÉLA for Crew", "Vela for Crew", "Vela4Crew"],
  legalName: "Vela4Crew Inc.",
  url: SITE,
  logo: `${SITE}/vela-icon.svg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: "131 Continental Dr, Suite 305",
    addressLocality: "Newark",
    addressRegion: "DE",
    postalCode: "19713",
    addressCountry: "US",
  },
  sameAs: ["https://www.instagram.com/velaforcrew"],
};

export const mobileApplication = {
  "@type": "MobileApplication",
  name: "VÉLA",
  alternateName: ["VÉLA for Crew", "Vela for Crew", "Vela4Crew"],
  description:
    "VÉLA is the rest and recovery app for long-haul cabin crew. It reads your roster and plans your sleep, light and caffeine across every duty, layover and day off, so you stop starting every trip already exhausted.",
  applicationCategory: "HealthApplication",
  operatingSystem: "iOS, Android",
  url: SITE,
  publisher: organization,
  offers: [
    {
      "@type": "Offer",
      name: "VÉLA Core — Monthly",
      price: "14.99",
      priceCurrency: "USD",
      description: "Full access to VÉLA Core, billed monthly. Includes a 14-day free trial.",
    },
    {
      "@type": "Offer",
      name: "VÉLA Core — Annual",
      price: "139.99",
      priceCurrency: "USD",
      description: "Full access to VÉLA Core, billed annually. Includes a 14-day free trial.",
    },
    {
      "@type": "Offer",
      name: "Founding Crew — Annual",
      price: "99.99",
      priceCurrency: "USD",
      description:
        "Founding Crew annual plan, locked in for as long as you stay subscribed. Includes a 14-day free trial.",
    },
  ],
};
