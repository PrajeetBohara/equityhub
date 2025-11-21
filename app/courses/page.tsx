'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BookOpen, CheckCircle, PlayCircle, Award, TrendingUp, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  level: string;
  points: number;
  completed: boolean;
  progress: number;
  modules: number;
  icon: string;
}

export default function CoursesPage() {
  const { user, updateScore } = useUser();
  const [courses, setCourses] = useState<Course[]>([
    {
      id: '1',
      title: 'First-Time Homebuyer Guide',
      description: 'Complete guide to buying your first home: from credit preparation to closing. Learn about down payment assistance, first-time buyer programs, and navigating the mortgage process.',
      duration: '4 hours',
      level: 'Beginner',
      points: 125,
      completed: false,
      progress: 0,
      modules: 9,
      icon: '🏡',
    },
    {
      id: '2',
      title: 'Home Ownership & Wealth Building',
      description: 'Navigate the path to homeownership, understand mortgages, and use real estate to build generational wealth. Learn how to leverage your home to close the wealth gap.',
      duration: '3.5 hours',
      level: 'Intermediate',
      points: 100,
      completed: false,
      progress: 0,
      modules: 7,
      icon: '🏠',
    },
    {
      id: '3',
      title: 'Down Payment Strategies & Assistance Programs',
      description: 'Discover down payment assistance programs, grants, and strategies to save for your first home. Learn about FHA loans, USDA loans, and state/local programs for Black homebuyers.',
      duration: '2.5 hours',
      level: 'Beginner',
      points: 100,
      completed: false,
      progress: 0,
      modules: 6,
      icon: '💵',
    },
    {
      id: '4',
      title: 'Understanding Housing Policies & Zoning',
      description: 'Break down complex housing policies, zoning laws, and fair housing legislation. Understand how policies impact Black communities and your rights as a homebuyer.',
      duration: '3 hours',
      level: 'Intermediate',
      points: 100,
      completed: false,
      progress: 0,
      modules: 7,
      icon: '📋',
    },
    {
      id: '5',
      title: 'Credit Mastery for Homeownership',
      description: 'Build and improve your credit score specifically for mortgage approval. Learn what lenders look for, how to fix credit issues, and strategies to qualify for the best mortgage rates.',
      duration: '3 hours',
      level: 'Beginner',
      points: 75,
      completed: false,
      progress: 0,
      modules: 6,
      icon: '💳',
    },
    {
      id: '6',
      title: 'Mortgage Types & Loan Options',
      description: 'Understand different mortgage types (FHA, Conventional, VA, USDA), interest rates, and which loan is best for your situation. Learn about refinancing and home equity options.',
      duration: '3 hours',
      level: 'Intermediate',
      points: 100,
      completed: false,
      progress: 0,
      modules: 6,
      icon: '📝',
    },
    {
      id: '7',
      title: 'Budgeting & Savings for Homeownership',
      description: 'Learn budgeting strategies specifically designed to save for a down payment and manage homeownership costs. Master the 50/30/20 rule and home buying budget planning.',
      duration: '2 hours',
      level: 'Beginner',
      points: 50,
      completed: false,
      progress: 0,
      modules: 5,
      icon: '💰',
    },
    {
      id: '8',
      title: 'Investment Basics',
      description: 'Introduction to investing, stocks, bonds, and building wealth through smart investment strategies to supplement your homeownership journey.',
      duration: '4 hours',
      level: 'Intermediate',
      points: 100,
      completed: false,
      progress: 0,
      modules: 8,
      icon: '📈',
    },
    {
      id: '9',
      title: 'Understanding Financial Policies',
      description: 'Break down complex financial policies, legislation, and how they impact Black communities and homeownership opportunities.',
      duration: '4 hours',
      level: 'Intermediate',
      points: 100,
      completed: false,
      progress: 0,
      modules: 8,
      icon: '📊',
    },
    {
      id: '10',
      title: 'Retirement Planning',
      description: 'Plan for retirement with IRAs, 401(k)s, Social Security, and other retirement vehicles to complement your homeownership wealth-building strategy.',
      duration: '3 hours',
      level: 'Intermediate',
      points: 75,
      completed: false,
      progress: 0,
      modules: 6,
      icon: '🎯',
    },
  ]);

  const handleCompleteCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? { ...course, completed: true, progress: 100 }
          : course
      )
    );
    
    const course = courses.find((c) => c.id === courseId);
    if (course && !course.completed) {
      updateScore(course.points);
    }
  };

  const handleStartCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId && course.progress === 0
          ? { ...course, progress: 10 }
          : course
      )
    );
  };

  const completedCourses = courses.filter((c) => c.completed).length;
  const totalPoints = courses.filter((c) => c.completed).reduce((sum, c) => sum + c.points, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Homeownership & Financial Literacy Courses
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
            Build your path to homeownership and financial knowledge. Start with housing-focused courses to achieve your homeownership goals and earn points along the way.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Courses Completed</p>
                  <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">{completedCourses}/{courses.length}</p>
                </div>
                <CheckCircle className="h-12 w-12 text-purple-600 dark:text-purple-400 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Points Earned</p>
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">{totalPoints}</p>
                </div>
                <Award className="h-12 w-12 text-indigo-600 dark:text-indigo-400 opacity-20" />
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Your Score</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{user?.score || 0}</p>
                </div>
                <TrendingUp className="h-12 w-12 text-blue-600 dark:text-blue-400 opacity-20" />
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{course.icon}</div>
                  {course.completed && (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                  {course.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm line-clamp-2">
                  {course.description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" />
                    <span>{course.modules} modules</span>
                  </div>
                </div>

                {/* Progress Bar */}
                {course.progress > 0 && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400 mb-1">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-xs font-medium">
                    {course.level}
                  </span>
                  <span className="text-sm font-semibold text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    {course.points} pts
                  </span>
                </div>

                <button
                  onClick={() => {
                    if (course.completed) return;
                    if (course.progress === 0) {
                      handleStartCourse(course.id);
                    } else {
                      handleCompleteCourse(course.id);
                    }
                  }}
                  disabled={course.completed}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2 ${
                    course.completed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 cursor-not-allowed'
                      : course.progress > 0
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {course.completed ? (
                    <>
                      <CheckCircle className="h-5 w-5" />
                      Completed
                    </>
                  ) : course.progress > 0 ? (
                    <>
                      <PlayCircle className="h-5 w-5" />
                      Complete Course
                    </>
                  ) : (
                    <>
                      <PlayCircle className="h-5 w-5" />
                      Start Course
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

