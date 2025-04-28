import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faPhone, 
  faEnvelope,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faYoutube,
  } from "@fortawesome/free-brands-svg-icons";
import { submitContactMessage } from '@/api.service';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    category: 'Other'
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);

    if (!formData.name || !formData.email || !formData.message) {
      setError('Name, email, and message are required fields');
      return;
    }

    try {
      setLoading(true);
      await submitContactMessage(formData);
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        category: 'Other'
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#23292f] text-white px-40 py-6 min-h-screen">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">
            Get in Touch
          </h1>
          <div className="h-1 bg-[#ca0905] w-24 mx-auto mb-6"></div>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Have questions or want to discuss a project? Fill out the form below 
            and our team will get back to you within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-[#2d343a] p-8 rounded-xl shadow-xl">
            {error && (
              <div className="mb-6 p-4 bg-red-800/20 text-red-300 rounded-lg">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-6 p-4 bg-green-800/20 text-green-300 rounded-lg">
                Message sent successfully! We'll respond within 24 hours.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    className="w-full bg-[#363d44] border border-gray-700 rounded-lg px-4 py-3
                      focus:border-[#ca0905] focus:ring-2 focus:ring-[#ca0905] outline-none"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="w-full bg-[#363d44] border border-gray-700 rounded-lg px-4 py-3
                      focus:border-[#ca0905] focus:ring-2 focus:ring-[#ca0905] outline-none"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full bg-[#363d44] border border-gray-700 rounded-lg px-4 py-3
                    focus:border-[#ca0905] focus:ring-2 focus:ring-[#ca0905] outline-none"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>
                <select
                  className="w-full bg-[#363d44] border border-gray-700 rounded-lg px-4 py-3
                    focus:border-[#ca0905] focus:ring-2 focus:ring-[#ca0905] outline-none"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>General Inquiry</option>
                  <option>Technical Support</option>
                  <option>Advertising</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Message *
                </label>
                <textarea
                  className="w-full bg-[#363d44] border border-gray-700 rounded-lg px-4 py-3 h-40
                    focus:border-[#ca0905] focus:ring-2 focus:ring-[#ca0905] outline-none"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#ca0905] hover:bg-[#b00805] text-white font-semibold py-3 px-6 rounded-lg
                  transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <FontAwesomeIcon icon={faPaperPlane} />
                <span>{loading ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="bg-[#2d343a] p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="text-[#ca0905] pt-1">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Headquarters</h3>
                    <p className="text-gray-300">
                      SRMIST Campus<br/>
                      Chennai, Tamil Nadu<br/>
                      India
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#ca0905] pt-1">
                    <FontAwesomeIcon icon={faPhone} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Phone</h3>
                    <p className="text-gray-300">
                      +91 9876543211<br/>
                      Mon-Fri: 9:00 AM - 6:00 PM IST
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="text-[#ca0905] pt-1">
                    <FontAwesomeIcon icon={faEnvelope} className="text-xl" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">Email</h3>
                    <p className="text-gray-300">
                      contact@finfo.com<br/>
                      support@finfo.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#2d343a] p-8 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold mb-4">Social Media</h2>
              <div className="flex space-x-4">
                <div className="flex space-x-4 mt-2 lg:mt-0 text-xl">
                            <a
                              href="https://www.facebook.com/people/Finfo-Guruji/pfbid02vU2ArM6veMaMPzqLyjVFYFwNCx5AmVcn8VBJz9JFsySkccgKJiGCKZ3e2DSdVKEhl/"
                              aria-label="Facebook"
                              className="hover:text-[#ca0905]"
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faFacebookF} />
                            </a>
                            <a
                              href="https://x.com/finfoguruji"
                              aria-label="Twitter"
                              className="hover:text-[#ca0905]"
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faTwitter} />
                            </a>
                            <a
                              href="https://www.instagram.com/finfo_guru/"
                              aria-label="Instagram"
                              className="hover:text-[#ca0905]"
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faInstagram} />
                            </a>
                            <a
                              href="https://www.youtube.com/@finfo-Guruji"
                              aria-label="YouTube"
                              className="hover:text-[#ca0905]"
                              target="_blank"
                            >
                              <FontAwesomeIcon icon={faYoutube} />
                            </a>
                          </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}