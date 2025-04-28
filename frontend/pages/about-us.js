import React from 'react';
import Head from 'next/head';

export default function AboutUsPage() {
  return (
    <>
      <Head>
        <title>About Us | FINFO</title>
        <meta
          name="description"
          content="Learn more about FINFO - our mission, vision, and the people behind the platform."
        />
      </Head>

      <section className="bg-[#23292f] text-white px-8 md:px-40 py-12">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">About Us</h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Discover the story behind FINFO, our mission, and the values that drive us forward.
            </p>
            <div className="h-1 bg-[#ca0905] w-24 mx-auto mt-4"></div>
          </div>

          {/* Content */}
          <div className="space-y-12 text-gray-300">
            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">Who We Are</h2>
              <p>
                FINFO is a forward-thinking financial information platform that empowers users with tools, calculators, and
                educational content to make smarter financial decisions. We believe that finance should be accessible to
                everyone—clear, transparent, and unbiased.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">Our Mission</h2>
              <p>
                To simplify finance for all by providing accurate, user-friendly tools and trustworthy insights. We aim to
                bridge the knowledge gap in financial literacy through intuitive digital experiences.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">Our Vision</h2>
              <p>
                A financially literate world where individuals are confident in making decisions that impact their future.
              </p>
            </div>

            <div>
              <h2 className="text-white text-2xl font-semibold mb-2">Meet the Team</h2>
              <p>
                Our team comprises passionate developers, designers, and financial experts who collaborate to bring powerful,
                engaging tools to life. We're dedicated to continuously improving and growing alongside our users.
              </p>
            </div>

            <div className="text-center">
              <p>
                Want to collaborate or get in touch? Reach us at{' '}
                <a href="mailto:contact@finfo.com" className="text-[#ca0905] underline">
                  officialfinfo@gmail.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
