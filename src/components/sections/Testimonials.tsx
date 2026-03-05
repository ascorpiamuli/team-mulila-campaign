// components/sections/Testimonials.tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Quote, Star, ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { ScrollReveal } from "@/components/terminal";
import { Button } from "../ui/Button";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar?: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "John Kamau",
    role: "CTO",
    company: "Savanna Tech",
    content: "Stephen is an exceptional developer. He built our entire procurement system from scratch and delivered ahead of schedule. His code quality and attention to detail are outstanding.",
    rating: 5
  },
  {
    id: "2",
    name: "Mary Wanjiku",
    role: "Project Manager",
    company: "EcoPay Solutions",
    content: "Working with Stephen was a game-changer for our fintech startup. He not only understood our requirements but suggested improvements we hadn't considered. Our platform is now serving thousands of users seamlessly.",
    rating: 5
  },
  {
    id: "3",
    name: "David Omondi",
    role: "Founder",
    company: "Digital Bridge Kenya",
    content: "Stephen's expertise in both frontend and backend development is rare to find. He helped us scale our ISP management platform and integrated complex MikroTik APIs flawlessly.",
    rating: 5
  },
  {
    id: "4",
    name: "Sarah Kimani",
    role: "Product Owner",
    company: "Church Connect",
    content: "The church management system Stephen built for us has transformed how we manage our community. His communication throughout the project was excellent and he delivered exactly what we needed.",
    rating: 5
  }
];

export function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-24">
      <ScrollReveal>
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-2 rounded-lg bg-green-primary/10 border border-green-primary/20 mb-4">
            <Quote className="h-5 w-5 text-green-primary" />
          </div>
          <h2 className="font-mono text-3xl font-bold text-text-primary mb-4">
            Client Testimonials
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            What clients and collaborators say about working with me.
          </p>
        </div>
      </ScrollReveal>

      {/* Desktop Grid */}
      <div className="hidden md:grid md:grid-cols-2 gap-6">
        {testimonials.map((testimonial, index) => (
          <ScrollReveal key={testimonial.id} delay={index * 100}>
            <div className="h-full border border-border-default bg-bg-card rounded-xl p-6 hover:border-green-primary/30 transition-all duration-300 hover:-translate-y-1">
              {/* Rating */}
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-4 w-4",
                      i < testimonial.rating
                        ? "text-amber fill-amber"
                        : "text-text-dim"
                    )}
                  />
                ))}
              </div>

              {/* Quote icon */}
              <Quote className="h-8 w-8 text-green-primary/20 mb-4" />

              {/* Content */}
              <p className="text-text-secondary mb-6 line-clamp-4">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-green-primary/10 border border-green-primary/30 flex items-center justify-center">
                  <span className="font-mono text-sm font-bold text-green-primary">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h4 className="font-mono text-sm font-semibold text-text-primary">
                    {testimonial.name}
                  </h4>
                  <p className="font-mono text-xs text-text-dim">
                    {testimonial.role} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <ScrollReveal>
          <div className="border border-border-default bg-bg-card rounded-xl p-6">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < testimonials[activeIndex].rating
                      ? "text-amber fill-amber"
                      : "text-text-dim"
                  )}
                />
              ))}
            </div>

            {/* Quote icon */}
            <Quote className="h-8 w-8 text-green-primary/20 mb-4" />

            {/* Content */}
            <p className="text-text-secondary mb-6">
              "{testimonials[activeIndex].content}"
            </p>

            {/* Author */}
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-full bg-green-primary/10 border border-green-primary/30 flex items-center justify-center">
                <span className="font-mono text-sm font-bold text-green-primary">
                  {testimonials[activeIndex].name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h4 className="font-mono text-sm font-semibold text-text-primary">
                  {testimonials[activeIndex].name}
                </h4>
                <p className="font-mono text-xs text-text-dim">
                  {testimonials[activeIndex].role} · {testimonials[activeIndex].company}
                </p>
              </div>
            </div>

            {/* Navigation dots */}
            <div className="flex items-center justify-between">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-lg border border-border-default hover:border-green-primary/30 hover:text-green-primary transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveIndex(index)}
                    className={cn(
                      "h-2 rounded-full transition-all",
                      index === activeIndex
                        ? "w-6 bg-green-primary"
                        : "w-2 bg-border-default hover:bg-green-primary/50"
                    )}
                  />
                ))}
              </div>

              <button
                onClick={nextTestimonial}
                className="p-2 rounded-lg border border-border-default hover:border-green-primary/30 hover:text-green-primary transition-colors"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>

      {/* Optional: Add a CTA */}
      <ScrollReveal delay={200}>
        <div className="text-center mt-12">
          <p className="text-text-dim text-sm mb-4">Ready to work together?</p>
          <a href="#contact">
            <Button variant="secondary" className="group">
              Start a Conversation
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </a>
        </div>
      </ScrollReveal>
    </section>
  );
}