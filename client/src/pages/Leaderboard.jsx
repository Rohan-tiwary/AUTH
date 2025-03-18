import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import { FaTrophy, FaShareAlt, FaMedal, FaChartLine, FaGamepad } from 'react-icons/fa';
import { AppContent } from '../context/AppContext';

const faqs = [
  { question: 'How do I earn points?', answer: 'You earn points by winning matches and completing daily challenges.' },
  { question: 'How can I redeem points?', answer: 'You can redeem points once you have at least 100 points in your account.' },
  { question: 'What is the win rate?', answer: 'Win rate is calculated by dividing the number of matches won by total matches played.' },
];

const Leaderboard = () => {
  const { userData } = useContext(AppContent);
  const [activeTab, setActiveTab] = useState('score');
  const [redeemPoints, setRedeemPoints] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(null);

  const leaderboard = [
    {
      id: userData.id,
      name: userData,
      score: 100,
      totalPoints: 500,
      matchesPlayed: 20,
      winRate: 75,
      rank: 3,
      pic: 'https://cdn.vectorstock.com/i/1000v/38/48/gamer-gaming-logo-vector-47133848.jpg',
      history: [
        { won: true }, { won: false }, { won: true }, { won: true },
        { won: false }, { won: true }, { won: true }, { won: false }, { won: true },
      ],
    },
  ];

  const user = leaderboard[0];

  const handleRedeemPoints = () => {
    if (user.totalPoints >= 100) {
      setRedeemPoints(true);
    } else {
      alert('Minimum 100 points required to redeem.');
    }
  };

  const handlePaymentGateway = () => {
    alert('Redirecting to payment gateway...');
    setRedeemPoints(false);
  };

  const handleShareScore = () => {
    const shareText = `Check out my score on GauravGo Leaderboard! Name: ${user.name}, Score: ${user.score}, Win Rate: ${user.winRate}%. Can you beat me?`;
    if (navigator.share) {
      navigator.share({
        title: 'GauravGo Leaderboard Score',
        text: shareText,
      }).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden p-4 sm:p-6">
      <NavBar />
      <div className="flex flex-col items-center mb-6 p-4">
        <img src={user.pic} alt={user.name.name} className="w-24 h-24 rounded-full border-4 border-blue-500 shadow-lg" />
        <h1 className="text-2xl sm:text-4xl font-bold mt-4 text-blue-400">{user.name.name}</h1>
        <p className="text-gray-400">ID: {user.id}</p>
        <div className="flex gap-4 mt-4">
          <div className="text-center"><FaGamepad className="text-blue-500 text-xl" /><p>{user.matchesPlayed}</p><p className="text-sm text-gray-400">Matches</p></div>
          <div className="text-center"><FaChartLine className="text-green-500 text-xl" /><p>{user.winRate}%</p><p className="text-sm text-gray-400">Win Rate</p></div>
          <div className="text-center"><FaMedal className="text-yellow-500 text-xl" /><p>{user.rank}</p><p className="text-sm text-gray-400">Rank</p></div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {['score', 'history', 'winRate', 'matches', 'totalPoints', 'faq'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-2 sm:px-4 py-2 text-sm sm:text-base rounded-lg font-bold transition-all duration-300 ${
              activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-3xl mx-auto mb-8 overflow-hidden">
        {activeTab === 'score' && <p className="text-white text-4xl">{user.score}</p>}
        {activeTab === 'history' && user.history.map((match, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-700">
            <span>Match #{index + 1}</span>
            <span className={match.won ? 'text-green-400' : 'text-red-400'}>
              {match.won ? 'Victory' : 'Defeat'}
            </span>
          </div>
        ))}
        {activeTab === 'winRate' && <p className="text-white text-4xl">{user.winRate}%</p>}
        {activeTab === 'matches' && <p className="text-white text-4xl">{user.matchesPlayed}</p>}
        {activeTab === 'totalPoints' && (
          <div>
            <p className="text-white text-4xl mb-4">{user.totalPoints}</p>
            {!redeemPoints ? (
              <button onClick={handleRedeemPoints} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all">
                Redeem Points
              </button>
            ) : (
              <button onClick={handlePaymentGateway} className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-all">
                Go to Payment Gateway
              </button>
            )}
          </div>
        )}
        {activeTab === 'faq' && faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <button className="w-full text-left text-blue-400" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
              {faq.question}
            </button>
            {openFAQ === index && <p className="text-gray-300">{faq.answer}</p>}
          </div>
        ))}
      </div>

      <div className="text-center mb-8">
        <button onClick={handleShareScore} className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-all">
          <FaShareAlt className="inline mr-2" /> Share Your Score
        </button>
      </div>

      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2025 GauravGo Gaming Leaderboard. All rights reserved.
      </footer>
    </div>
  );
};

export default Leaderboard;
