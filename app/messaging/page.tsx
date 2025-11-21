'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
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
  const searchParams = useSearchParams();
  const [selectedMentor, setSelectedMentor] = useState<string | null>(null);
  const [messages, setMessages] = useState<{ [key: string]: Message[] }>({});
  const [input, setInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Check for user query parameter on mount
  useEffect(() => {
    const userId = searchParams.get('user');
    if (userId) {
      setSelectedMentor(userId);
    }
  }, [searchParams]);

  const mentors: Mentor[] = [
    {
      id: 'dubem',
      name: 'Dubem',
      level: 'Intermediate',
      score: 750,
      badges: 3,
      rank: 1,
      specialties: ['Home Ownership', 'Down Payment Strategies'],
      available: true,
    },
    {
      id: 'francis',
      name: 'Francis',
      level: 'Intermediate',
      score: 650,
      badges: 3,
      rank: 2,
      specialties: ['Financial Planning', 'Policy Analysis'],
      available: true,
    },
    {
      id: 'prajeet',
      name: 'Prajeet',
      level: 'Intermediate',
      score: 550,
      badges: 2,
      rank: 3,
      specialties: ['Investment Basics', 'Retirement Planning'],
      available: true,
    },
    {
      id: 'grace',
      name: 'Grace',
      level: 'Intermediate',
      score: 450,
      badges: 2,
      rank: 4,
      specialties: ['Budgeting', 'Credit Building'],
      available: true,
    },
    {
      id: 'chiamanda',
      name: 'Chiamanda',
      level: 'Beginner+',
      score: 350,
      badges: 2,
      rank: 5,
      specialties: ['First-Time Homebuyer', 'Mortgage Options'],
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
          <h1 className="text-4xl font-bold mb-2 bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
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
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                  onFocus={(e) => { e.currentTarget.style.borderColor = '#A0CEFD'; }}
                  onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
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
                      ? 'border-2'
                      : 'bg-gray-50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                  {...(selectedMentor === mentor.id && { style: { backgroundColor: '#E4F2FF', borderColor: '#A0CEFD' } })}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
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
                        className="px-2 py-1 rounded text-xs" style={{ backgroundColor: '#E4F2FF', color: '#A0CEFD' }}
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
                        <div className="h-10 w-10 rounded-full flex items-center justify-center text-white font-semibold" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
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
                        className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white`}
                        style={{ backgroundColor: '#A0CEFD' }}
                      >
                        {message.from === 'You' ? 'U' : message.from.charAt(0)}
                      </div>
                      <div
                        className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                          message.from === 'You'
                            ? 'text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        }`}
                        {...(message.from === 'You' && { style: { backgroundColor: '#A0CEFD' } })}
                      >
                        <p className="whitespace-pre-wrap break-words">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.from === 'You'
                              ? 'text-white/80'
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
                      className="flex-1 resize-none border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white"
                      onFocus={(e) => { e.currentTarget.style.borderColor = '#A0CEFD'; }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = ''; }}
                      rows={2}
                    />
                    <button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      className="px-6 py-3 text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    style={{ background: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}
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

