'use client';

import { useState } from 'react';
import { MessageCircle, Send, Search, User, Award, Crown, Star, Trophy } from 'lucide-react';
import { useUser } from '../context/UserContext';

interface Message {
  id: string;
  from: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

interface Mentor {
  id: string;
  name: string;
  level: string;
  score: number;
  badges: number;
  rank: number;
  specialties: string[];
  available: boolean;
}

export default function MessagingPage() {
  const { user } = useUser();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Marcus Johnson',
      level: 'Expert',
      score: 3500,
      badges: 5,
      rank: 2,
      specialties: ['Investing', 'Home Ownership'],
      available: true,
    },
    {
      id: '2',
      name: 'Keisha Williams',
      level: 'Expert',
      score: 2800,
      badges: 4,
      rank: 3,
      specialties: ['Budgeting', 'Credit'],
      available: true,
    },
    {
      id: '3',
      name: 'David Brown',
      level: 'Advanced',
      score: 1800,
      badges: 3,
      rank: 4,
      specialties: ['Retirement Planning'],
      available: false,
    },
    {
      id: '4',
      name: 'Aisha Thompson',
      level: 'Advanced',
      score: 1200,
      badges: 3,
      rank: 5,
      specialties: ['Business Finance', 'Entrepreneurship'],
      available: true,
    },
    {
      id: '5',
      name: 'Jordan Davis',
      level: 'Intermediate',
      score: 850,
      badges: 2,
      rank: 6,
      specialties: ['Investment Basics'],
      available: true,
    },
  ];

  const filteredMentors = mentors.filter((mentor) =>
    mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mentor.specialties.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const currentMessages = selectedMentor ? messages[selectedMentor] || [] : [];

  const handleSend = () => {
    if (!input.trim() || !selectedMentor) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      from: 'You',
      content: input,
      timestamp: new Date(),
      read: true,
    };

    setMessages((prev) => ({
      ...prev,
      [selectedMentor]: [...(prev[selectedMentor] || []), newMessage],
    }));

    setInput('');

    // Simulate response after 2 seconds
    setTimeout(() => {
      const mentor = mentors.find((m) => m.id === selectedMentor);
      const response: Message = {
        id: (Date.now() + 1).toString(),
        from: mentor?.name || 'Mentor',
        content: `Thank you for your message! I'd be happy to help you with that. Let me share some insights based on my experience in financial literacy. Feel free to ask me more specific questions!`,
        timestamp: new Date(),
        read: false,
      };

      setMessages((prev) => ({
        ...prev,
        [selectedMentor]: [...(prev[selectedMentor] || []), response],
      }));
    }, 2000);
  };

  const getRankIcon = (rank: number) => {
    if (rank === 1) return <Crown className="h-4 w-4 text-yellow-500" />;
    if (rank === 2) return <Star className="h-4 w-4 text-gray-400" />;
    if (rank === 3) return <Star className="h-4 w-4 text-orange-500" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            Connect with Experienced Learners
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Message experienced users for guidance and support on your financial journey
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)] min-h-[600px]">
          {/* Mentors List */}
          <div className="lg:col-span-1 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search mentors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {filteredMentors.map((mentor) => (
                <button
                  key={mentor.id}
                  onClick={() => setSelectedMentor(mentor.id)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedMentor === mentor.id
                      ? 'bg-purple-100 dark:bg-purple-900/30 border-purple-300 dark:border-purple-700'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                        {mentor.name.charAt(0)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-gray-900 dark:text-white">{mentor.name}</p>
                          {mentor.rank <= 3 && getRankIcon(mentor.rank)}
                        </div>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{mentor.level}</p>
                      </div>
                    </div>
                    {mentor.available && (
                      <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Award className="h-3 w-3" />
                      {mentor.score} pts
                    </span>
                    <span className="flex items-center gap-1">
                      <Trophy className="h-3 w-3" />
                      {mentor.badges} badges
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {mentor.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex flex-col">
            {selectedMentor ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  {(() => {
                    const mentor = mentors.find((m) => m.id === selectedMentor);
                    return mentor ? (
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center text-white font-semibold">
                          {mentor.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-white">{mentor.name}</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {mentor.available ? 'Online' : 'Offline'} • {mentor.level}
                          </p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {currentMessages.length === 0 && (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
                      <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Start a conversation by sending a message!</p>
                    </div>
                  )}
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${
                        message.from === 'You' ? 'flex-row-reverse' : 'flex-row'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          message.from === 'You'
                            ? 'bg-purple-600 text-white'
                            : 'bg-indigo-600 text-white'
                        }`}
                      >
                        {message.from === 'You' ? 'U' : message.from.charAt(0)}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          message.from === 'You'
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.from === 'You'
                              ? 'text-purple-100'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex gap-2">
                    <textarea
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                      placeholder="Type your message..."
                      className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 dark:bg-gray-700 dark:text-white"
                      rows={2}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
                <div className="text-center">
                  <MessageCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a mentor to start a conversation</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

