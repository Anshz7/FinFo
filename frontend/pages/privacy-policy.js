import React from 'react';
import Head from 'next/head';

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>Privacy Policy | FINFO</title>
        <meta
          name="description"
          content="Privacy Policy of FINFO detailing the collection, usage, and security of user information."
        />
      </Head>

      <section className="bg-[#23292f] text-white px-40 py-12">
        <div className="container mx-auto max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 text-white">Privacy Policy</h1>
            <h5 className="text-gray-400">Updated: April 24, 2025</h5>
            <div className="h-1 bg-[#ca0905] w-24 mx-auto mt-4"></div>
          </div>

          {/* Content */}
          <div className="space-y-8 text-gray-300 prose prose-invert">
            <h2 className="text-white">GENERAL</h2>
            <p>
              FINFO (“We”, “Our”, “Us”) is committed to the protection of personal information provided by the users (“You”,
              “Your”, “User”). You agree that Your use of FINFO’s mobile and web applications (collectively, “App”) implies Your
              consent to the collection, retention, and use of Your personal information in accordance with the terms of this
              Privacy Policy (“Privacy Policy”).
            </p>
            <p>
              We take the privacy of our Users seriously. We are committed to safeguarding the privacy of Our users while
              providing a personalized and valuable service.
            </p>
            <p>
              No User information is rented or sold to any third party. When You use the App, the App may collect Your device
              identifier and other personal information. We maintain a high standard of security, but transmissions over the
              internet or telephone networks are not completely secure. While We do Our best to protect Your information,
              FINFO cannot guarantee absolute security of data transmitted via networks.
            </p>
            <p>
              Access to App content is conditional upon Your acceptance of this Privacy Policy, which should be read together
              with our Terms and Conditions of Use (“Terms”). You acknowledge that this Privacy Policy, together with our
              Terms, forms Our agreement with You regarding Your use of the App (“Agreement”).
            </p>

            <h2 className="text-white">INFORMATION COLLECTED</h2>
            <h3 className="text-white">Traffic Data Collected</h3>
            <p>
              To provide the App, We automatically track and collect the following categories of information when You use
              the App:
            </p>
            <ul className="list-disc list-inside">
              <li>IP addresses;</li>
              <li>Domain servers;</li>
              <li>Other information regarding Your device and its interaction with the App (“Traffic Data”).</li>
            </ul>

            <h3 className="text-white">Personal Information Collected</h3>
            <p>
              We may require You to provide certain information that personally identifies You (“Personal Information”):
            </p>
            <ul className="list-disc list-inside">
              <li>Contact data (e.g., email address, phone number);</li>
              <li>Demographic data (e.g., time zone, postal address, location details).</li>
            </ul>
            <p>
              If You communicate with Us via email or other means, any information provided in such communication may be
              collected by FINFO.
            </p>
            <p>
              Personal Information transmitted to our internal servers is deleted upon account deletion, except as required by
              law. We implement commercially reasonable physical, managerial, operational, and technical security measures to
              protect Your Personal Information.
            </p>

            <h2 className="text-white">DISCLOSURE OF PERSONAL INFORMATION</h2>
            <p>
              We do not disclose Your Personal Information to any third parties except our affiliates or trusted partners,
              in compliance with this Privacy Policy.
            </p>
            <p>
              Aggregate (non-identifying) data may be used for:
            </p>
            <ul className="list-disc list-inside">
              <li>Marketing profiles;</li>
              <li>Strategic development, data collection, and analytics;</li>
              <li>Managing relationships with advertisers and partners;</li>
              <li>App usage auditing;</li>
              <li>Enhancing user experience.</li>
            </ul>
            <p>
              We may disclose Personal Information if required by law or to protect FINFO’s rights, property, or safety, or
              that of Our users.
            </p>

            <h2 className="text-white">CONFIDENTIALITY AND SECURITY</h2>
            <p>
              We will keep Your Personal Information private and will not share it with third parties unless permitted by this
              Privacy Policy or required by law.
            </p>
            <p>
              We follow industry standards to protect the Personal Information submitted to Us, but no system is completely
              secure. If a data breach occurs, We will notify You as soon as reasonably possible where permitted by law.
            </p>

            <h2 className="text-white">UPDATES AND CHANGES TO PRIVACY POLICY</h2>
            <p>
              We reserve the right to modify this Privacy Policy at any time. Updates will be posted on this page, and Your
              continued use of the App constitutes acceptance of the updated policy.
            </p>

            <h2 className="text-white">RESTRICTION OF LIABILITY</h2>
            <p>
              FINFO makes no guarantees regarding the accuracy or completeness of App content and disclaims liability for
              errors and omissions.
            </p>
            <p>
              No warranty of any kind is given regarding App content or third-party resources linked through the App.
            </p>
            <p>
              References to any products or services do not constitute endorsement by FINFO.
            </p>

            <p>
              If you have questions or concerns, email us at{' '}
              <a href="mailto:contact@finfo.com" className="text-[#ca0905] underline">
                contact@finfo.com
              </a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
