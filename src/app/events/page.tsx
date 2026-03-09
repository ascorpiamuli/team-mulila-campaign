import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/schema/BreadcrumbSchema";
import { EventsContent } from "./EventsContent";

export const metadata: Metadata = {
  title: "Events | Stephen Ascorpi's Portfolio",
  description:
    "Developer meetups, workshops, and career talks in Nairobi and Mombasa..",
  alternates: {
    canonical: "https://ascorpi.cloud/events",
  },
  openGraph: {
    title: "Events | Portfolio",
    description:
      "Developer meetups, workshops, and career talks in Nairobi and Mombasa.",
    url: "https://ascorpi.cloud/events",
    siteName: "Stephen Ascorpi's Portfolio",
    type: "website",
  },
};

export default function EventsPage() {
  return <EventsContent />;
}
