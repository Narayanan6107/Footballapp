import React, { useState } from 'react';
import '../styles/Home.css';

const Home = () => {
  const [selectedLeague, setSelectedLeague] = useState('all');

  const leagues = [
    { id: 'all', name: 'All Leagues' },
    { id: 'premier', name: 'Premier League' },
    { id: 'laliga', name: 'La Liga' },
    { id: 'ucl', name: 'Champions League' },
  ];

  const liveMatches = [
    { id: 1, teams: 'Real Madrid vs Barcelona', time: '70’', score: '2 - 1' },
    { id: 2, teams: 'Liverpool vs Chelsea', time: '55’', score: '1 - 1' },
  ];

  const upcomingMatches = [
    { id: 3, teams: 'Man City vs Arsenal', date: 'Tomorrow, 9:00 PM' },
    { id: 4, teams: 'Juventus vs Inter', date: 'Friday, 10:00 PM' },
  ];

  const finishedMatches = [
    { id: 5, teams: 'PSG vs Milan', result: '3 - 2' },
    { id: 6, teams: 'Atletico vs Napoli', result: '1 - 1' },
  ];

  const newsItems = [
    { id: 1, title: 'Ronaldo scores a hat-trick in Saudi league', time: '1h ago' },
    { id: 2, title: 'Madrid eyes new striker for next season', time: '3h ago' },
    { id: 3, title: 'UCL semifinals draw announced', time: '6h ago' },
  ];

  return (
    <div className="home">
      <div className="container">
        {/* Hero */}
        <div className="hero">
          <h1>Live Matches</h1>
          <p>Follow your favorite teams and players in real-time</p>
        </div>

        {/* League Tabs */}
        <div className="league-tabs">
          {leagues.map((league) => (
            <button
              key={league.id}
              onClick={() => setSelectedLeague(league.id)}
              className={selectedLeague === league.id ? 'active' : ''}
            >
              {league.name}
            </button>
          ))}
        </div>

        {/* Live Matches */}
        {liveMatches.length > 0 && (
          <section className="live-section">
            <div className="live-header">
              <div className="dot"></div>
              <h2>Live Now</h2>
            </div>
            <div className="match-grid">
              {liveMatches.map((match) => (
                <div key={match.id} className="match-card live">
                  <p className="teams">{match.teams}</p>
                  <p className="score">{match.score}</p>
                  <p className="time">{match.time}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Upcoming Matches */}
        <section className="match-section">
          <h2>Upcoming Matches</h2>
          <div className="match-grid">
            {upcomingMatches.map((match) => (
              <div key={match.id} className="match-card">
                <p className="teams">{match.teams}</p>
                <p className="time">{match.date}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Finished Matches */}
        <section className="match-section">
          <h2>Results</h2>
          <div className="match-grid">
            {finishedMatches.map((match) => (
              <div key={match.id} className="match-card">
                <p className="teams">{match.teams}</p>
                <p className="score">{match.result}</p>
              </div>
            ))}
          </div>
        </section>

        {/* News */}
        <section className="news-section">
          <h2>Trending News</h2>
          <div className="news-grid">
            {newsItems.map((news) => (
              <div key={news.id} className="news-card">
                <p className="title">{news.title}</p>
                <p className="time">{news.time}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
