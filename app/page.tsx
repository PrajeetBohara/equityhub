import Link from 'next/link';
import { ArrowRight, TrendingUp, BookOpen, MessageCircle, Users, Award } from 'lucide-react';
import ChatbotWidget from './components/ChatbotWidget';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <ChatbotWidget />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #A0CEFD, #E4F2FF, #A0CEFD)' }}>
            Bridge the Financial Gap
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Empowering Black communities through financial literacy, AI-powered guidance, and gamified learning experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/chatbot"
              className="inline-flex items-center justify-center px-8 py-4 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity shadow-lg"
              style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}
            >
              Start Learning
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/courses"
              className="inline-flex items-center justify-center px-8 py-4 border-2 rounded-lg font-semibold transition-colors hover:bg-[#E4F2FF]"
              style={{ borderColor: '#A0CEFD', color: '#A0CEFD' }}
            >
              Browse Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#E4F2FF' }}>
              <MessageCircle className="h-6 w-6" style={{ color: '#A0CEFD' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Chatbot</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Get instant answers to financial questions, policy breakdowns, and personalized recommendations.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: '#E4F2FF' }}>
              <BookOpen className="h-6 w-6" style={{ color: '#A0CEFD' }} />
            </div>
            <h3 className="text-xl font-semibold mb-2">Financial Courses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Comprehensive courses on budgeting, investing, credit, and wealth building tailored for Black communities.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4">
              <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Gamification</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Earn badges, climb leaderboards, and track your financial literacy journey with scores and achievements.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Community</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Connect with experienced learners and get personalized guidance from financial advisors.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Monitor your financial literacy growth and see how you're closing the wealth gap.
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-pink-600 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Expert Advisors</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Access professional financial advisors who understand the unique challenges facing Black communities.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-3xl mx-auto text-center p-12 rounded-2xl text-white" style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Start Your Financial Journey?
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of learners building wealth and financial independence.
          </p>
          <Link
            href="/chatbot"
            className="inline-flex items-center justify-center px-8 py-4 bg-white rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
            style={{ color: '#A0CEFD' }}
          >
            Get Started Now
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
