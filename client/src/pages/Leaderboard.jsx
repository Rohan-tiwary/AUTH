import React, { useState, useContext } from 'react';
import NavBar from '../components/NavBar';
import { FaTrophy, FaShareAlt, FaMedal, FaChartLine, FaGamepad } from 'react-icons/fa';
import { AppContent } from '../context/AppContext';

const FAQ = [
  { question: 'How do I earn points?', answer: 'You earn points by winning matches and completing daily challenges.' },
  { question: 'How can I redeem points?', answer: 'You can redeem points once you have at least 100 points in your account.' },
  { question: 'What is the win rate?', answer: 'Win rate is calculated by dividing the number of matches won by total matches played.' },
  { question: 'Can I play with my friends?', answer: 'Yes! You can invite friends to join your matches through the "Play with Friends" option.' },
  { question: 'What rewards can I get with points?', answer: 'You can redeem points for game credits, exclusive skins, and other in-game perks.' },
  { question: 'How do I track my performance?', answer: 'Your performance is tracked on the leaderboard, showing stats like win rate, matches played, and rank.' },
  { question: 'Is there a daily login reward?', answer: 'Yes, logging in daily gives you bonus points and other surprises.' },
  { question: 'Can I reset my stats?', answer: 'No, stats cannot be reset, ensuring a fair competition for all players.' },
  { question: 'Where can I report a bug or issue?', answer: 'You can report bugs through the "Support" section in the app, or contact our helpdesk.' },
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
    const options = {
      key: 'YOUR_RAZORPAY_KEY_ID',
      amount: 50000,
      currency: 'INR',
      name: 'Your Company Name',
      description: 'Test Transaction',
      image: 'https://your-logo-url.com',
      handler: function (response) {
        alert('Payment successful! Payment ID: ' + response.razorpay_payment_id);
      },
      prefill: {
        name: 'Gaurav',
        email: 'gaurav@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#3399cc',
      },
    };
  
    const razorpay = new window.Razorpay(options);
    razorpay.open();
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

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {['score', 'history', 'winRate', 'matches', 'totalPoints', 'Performance','FAQ'].map((tab) => (
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
        {activeTab === 'Performance' && (
  <div className="bg-gray-900 p-4 rounded-lg shadow-lg w-full max-w-sm space-y-4">
  <h2 className="text-white text-lg font-semibold mb-4">Performance</h2>

  {/* Win Rate */}
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-white">Win Rate</span>
      <span className="text-white text-4xl">{user.winRate}%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className="bg-green-500 h-2 rounded-full" style={{ width: `${user.winRate}%` }}></div>
    </div>
  </div>

  {/* Accuracy */}
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-white">Accuracy Rate</span>
      <span className="text-white text-4xl">69%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className="bg-yellow-300 h-2 rounded-full" style={{ width: '69%' }}></div>
    </div>
  </div>

  {/* Kills */}
  <div>
    <div className="flex items-center justify-between mb-1">
      <span className="text-white">Kills</span>
      <span className="text-white text-4xl">20%</span>
    </div>
    <div className="w-full bg-gray-700 rounded-full h-2">
      <div className="bg-red-500 h-2 rounded-full" style={{ width: '20%' }}></div>
    </div>
  </div>
</div>

  
)}

        {activeTab === 'totalPoints' && (
         <div className="text-center">
         <p className="text-white text-5xl font-bold mb-6 animate-pulse">{user.totalPoints} Points</p>
         {!redeemPoints ? (
           <button
             onClick={handleRedeemPoints}
             className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out"
           >
             🎉 Redeem Your Points
           </button>
         ) : (
           <button
             onClick={handlePaymentGateway}
             className="bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:scale-105 hover:shadow-2xl transition-transform duration-300 ease-out"
           >
             💸 Go to Payment Gateway
           </button>
         )}
         
       </div>
       
        )}
        {activeTab === 'FAQ' && FAQ.map((FAQ, index) => (
          <div key={index} className="mb-4">
            <button className="w-full text-left text-blue-400" onClick={() => setOpenFAQ(openFAQ === index ? null : index)}>
              {FAQ.question}
            </button>
            {openFAQ === index && <p className="text-gray-300">{FAQ.answer}</p>}
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
