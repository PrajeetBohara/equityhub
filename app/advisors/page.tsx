'use client';

import { useState } from 'react';
import { Users, Mail, Phone, MessageCircle, Calendar, Star, Award, Building2 } from 'lucide-react';

interface Advisor {
  id: string;
  name: string;
  title: string;
  company: string;
  email: string;
  phone: string;
  specialties: string[];
  experience: string;
  rating: number;
  availability: string;
  bio: string;
  image?: string;
}

export default function AdvisorsPage() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactMethod, setContactMethod] = useState<'email' | 'phone' | 'message' | null>(null);

  const advisors: Advisor[] = [
    {
      id: '1',
      name: 'Dr. Marcus Johnson',
      title: 'Certified Financial Planner',
      company: 'Black Wealth Advisory Group',
      email: 'marcus.j@blackwealthadvisory.com',
      phone: '(555) 123-4567',
      specialties: ['Investment Planning', 'Retirement Planning', 'Estate Planning'],
      experience: '15+ years',
      rating: 4.9,
      availability: 'Mon-Fri, 9am-5pm EST',
      bio: 'Specializing in helping Black families build generational wealth through strategic financial planning and investment management.',
    },
    {
      id: '2',
      name: 'Keisha Williams',
      title: 'Financial Advisor & CPA',
      company: 'Williams Financial Services',
      email: 'keisha.w@williamsfinancial.com',
      phone: '(555) 234-5678',
      specialties: ['Tax Planning', 'Small Business Finance', 'Budgeting & Debt Management'],
      experience: '12+ years',
      rating: 4.8,
      availability: 'Mon-Sat, 10am-6pm EST',
      bio: 'Dedicated to empowering Black entrepreneurs and individuals with financial knowledge and practical strategies for success.',
    },
    {
      id: '3',
      name: 'David Brown',
      title: 'Investment Advisor',
      company: 'Equity First Advisors',
      email: 'david.b@equityfirst.com',
      phone: '(555) 345-6789',
      specialties: ['Portfolio Management', 'Real Estate Investing', 'Risk Management'],
      experience: '10+ years',
      rating: 4.7,
      availability: 'Mon-Fri, 8am-6pm EST',
      bio: 'Expert in portfolio management and real estate investment strategies tailored for Black communities.',
    },
    {
      id: '4',
      name: 'Aisha Thompson',
      title: 'Financial Wellness Coach',
      company: 'Thompson Wealth Builders',
      email: 'aisha.t@thompsonwealth.com',
      phone: '(555) 456-7890',
      specialties: ['Financial Literacy Education', 'Homeownership', 'Credit Repair'],
      experience: '8+ years',
      rating: 4.9,
      availability: 'Tue-Sat, 9am-5pm EST',
      bio: 'Passionate about financial education and helping individuals overcome barriers to homeownership and credit building.',
    },
    {
      id: '5',
      name: 'Jordan Davis',
      title: 'Retirement Planning Specialist',
      company: 'Davis Retirement Solutions',
      email: 'jordan.d@davisretirement.com',
      phone: '(555) 567-8901',
      specialties: ['401(k) Planning', 'IRA Management', 'Social Security Optimization'],
      experience: '6+ years',
      rating: 4.6,
      availability: 'Mon-Fri, 9am-5pm EST',
      bio: 'Helping Black professionals maximize their retirement savings and plan for financial security in their golden years.',
    },
    {
      id: '6',
      name: 'Maya Johnson',
      title: 'Estate Planning Attorney & Advisor',
      company: 'Johnson Legal & Financial',
      email: 'maya.j@johnsonlegalfin.com',
      phone: '(555) 678-9012',
      specialties: ['Estate Planning', 'Trust Management', 'Generational Wealth Transfer'],
      experience: '11+ years',
      rating: 4.8,
      availability: 'Mon-Fri, 10am-6pm EST',
      bio: 'Expert in estate planning and helping Black families preserve and transfer wealth across generations.',
    },
  ];

  const handleContact = (advisor: Advisor, method: 'email' | 'phone' | 'message') => {
    setSelectedAdvisor(advisor);
    setContactMethod(method);
    setShowContactForm(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
            Financial Advisors
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Connect with professional financial advisors who understand the unique challenges facing Black communities
          </p>
        </div>

        {/* Advisors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {advisors.map((advisor) => (
            <div
              key={advisor.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
                    {advisor.name.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {advisor.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{advisor.title}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {advisor.rating}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                <Building2 className="h-4 w-4" />
                <span>{advisor.company}</span>
              </div>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {advisor.bio}
              </p>

              <div className="mb-4">
                <p className="text-xs font-semibold text-gray-700 dark:text-gray-300 mb-2">
                  Specialties:
                </p>
                <div className="flex flex-wrap gap-1">
                  {advisor.specialties.map((specialty) => (
                    <span
                      key={specialty}
                      className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#E4F2FF', color: '#A0CEFD' }}
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-4">
                <span>{advisor.experience} experience</span>
                <span>{advisor.availability}</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleContact(advisor, 'email')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-opacity text-sm hover:opacity-90"
                  style={{ backgroundColor: '#A0CEFD' }}
                >
                  <Mail className="h-4 w-4" />
                  Email
                </button>
                <button
                  onClick={() => handleContact(advisor, 'phone')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white rounded-lg font-semibold transition-opacity text-sm hover:opacity-90"
                  style={{ backgroundColor: '#A0CEFD' }}
                >
                  <Phone className="h-4 w-4" />
                  Call
                </button>
                <button
                  onClick={() => handleContact(advisor, 'message')}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border-2 rounded-lg font-semibold transition-colors text-sm hover:bg-[#E4F2FF]"
                  style={{ borderColor: '#A0CEFD', color: '#A0CEFD' }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Message
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Modal */}
        {showContactForm && selectedAdvisor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
                Contact {selectedAdvisor.name}
              </h2>

              {contactMethod === 'email' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Send an email to {selectedAdvisor.name}:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="font-mono text-sm break-all">{selectedAdvisor.email}</p>
                  </div>
                  <a
                    href={`mailto:${selectedAdvisor.email}?subject=Financial%20Advisory%20Consultation`}
                    className="block w-full text-center px-6 py-3 text-white rounded-lg font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#A0CEFD' }}
                  >
                    Open Email Client
                  </a>
                </div>
              )}

              {contactMethod === 'phone' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Call {selectedAdvisor.name}:
                  </p>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
                    <p className="text-xl font-semibold">{selectedAdvisor.phone}</p>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    Availability: {selectedAdvisor.availability}
                  </p>
                  <a
                    href={`tel:${selectedAdvisor.phone}`}
                    className="block w-full text-center px-6 py-3 text-white rounded-lg font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#A0CEFD' }}
                  >
                    Call Now
                  </a>
                </div>
              )}

              {contactMethod === 'message' && (
                <div>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Send a message to {selectedAdvisor.name}:
                  </p>
                  <textarea
                    placeholder="Type your message here..."
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 mb-4 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#A0CEFD'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                    rows={4}
                  />
                  <button className="w-full px-6 py-3 text-white rounded-lg font-semibold transition-opacity hover:opacity-90"
                    style={{ backgroundColor: '#A0CEFD' }}>
                    Send Message
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setShowContactForm(false);
                  setSelectedAdvisor(null);
                  setContactMethod(null);
                }}
                className="w-full mt-4 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

