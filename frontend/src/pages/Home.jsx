import React, { useState } from "react";
import "../styles/Home.css";
import { matches } from "../data/matchData";

const Home = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedLeague, setSelectedLeague] = useState("All Leagues");
    const [selectedTab, setSelectedTab] = useState("ongoing");
    
    // Generate dates for the date navigation
    const getDates = () => {
        const dates = [];
        for (let i = -2; i <= 4; i++) {
            const date = new Date();
            date.setDate(selectedDate.getDate() + i);
            dates.push(date);
        }
        return dates;
    };

    // Format date for display
    const formatDate = (date) => {
        const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
        return {
            day: days[date.getDay()],
            number: date.getDate()
        };
    };

    const leagues = [
        "La Liga",
        "Champions League",
        "Copa del Rey",
        "Supercopa",
        "Club World Cup"
    ];

    // Current Match Data
    const matches = [
        {
            id: 1,
            league: "Champions League",
            home: "Real Madrid",
            away: "Manchester City",
            homeFlag: "�🇸",
            awayFlag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
            score: "2 - 1",
            status: "72'",
            time: 72,
            isLive: true,
            homePossession: 48,
            awayPossession: 52
        },
        {
            id: 2,
            league: "La Liga",
            home: "Real Madrid",
            away: "Barcelona",
            homeFlag: "🇪🇸",
            awayFlag: "🇸",
            score: "3 - 2",
            status: "FT",
            time: 90,
            isLive: false
        },
        {
            id: 3,
            league: "La Liga",
            home: "Atletico Madrid",
            away: "Sevilla",
            homeFlag: "�🇸",
            awayFlag: "�🇸",
            score: "1 - 1",
            status: "HT",
            time: 45,
            isLive: true,
            homePossession: 55,
            awayPossession: 45
        },
        {
            id: 4,
            league: "Champions League",
            home: "PSG",
            away: "Real Madrid",
            homeFlag: "��",
            awayFlag: "🇪🇸",
            score: "VS",
            status: "20:00",
            time: 0,
            isLive: false,
            isUpcoming: true
        },
        {
            id: 5,
            league: "La Liga",
            home: "Real Sociedad",
            away: "Real Madrid",
            homeFlag: "🇪🇸",
            awayFlag: "🇪🇸",
            score: "1 - 2",
            status: "FT",
            time: 90,
            isLive: false
        },
        {
            id: 6,
            league: "Copa del Rey",
            home: "Real Madrid",
            away: "Athletic Club",
            homeFlag: "��",
            awayFlag: "��",
            score: "VS",
            status: "Next Week",
            time: 0,
            isLive: false,
            isUpcoming: true
        }
    ];

    const news = [
        {
            id: 1,
            title: "Haaland hits new record as Man City secure comfortable win",
            time: "3 hr ago",
        },
        {
            id: 2,
            title: "Pochettino under pressure after Chelsea's late concession",
            time: "5 hr ago",
        },
        {
            id: 3,
            title: "Mbappé confirms PSG exit, Madrid awaits star striker",
            time: "10 hr ago",
        },
    ];

    // Filter matches based on the selected league and the tab status
    const filteredMatches = matches
        .filter(m => selectedLeague === "All Leagues" || m.league === selectedLeague)
        .filter(m => {
            if (selectedTab === "ongoing") return m.isLive;
            if (selectedTab === "results") return m.status === 'FT';
            // Assume 'upcoming' matches have the 'isUpcoming: true' flag
            if (selectedTab === "upcoming") return m.isUpcoming; 
            return false;
        });

    return (
        <div className="home">
            {/* Header */}
            <header className="header">
                <div className="header-content">
                    <h1 className="header-title">FootScore</h1>
                    <div className="header-actions">
                        <div className="search-container">
                            <input 
                                type="text" 
                                className="search-input"
                                placeholder="Search teams, matches..."
                            />
                            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"/>
                                <path d="M21 21l-4.35-4.35"/>
                            </svg>
                        </div>
                        <button>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
                            </svg>
                            Favorites
                        </button>
                    </div>
                </div>
            </header>

            {/* Date Navigation */}
            <div className="date-nav">
                {getDates().map((date, index) => {
                    const formattedDate = formatDate(date);
                    const isActive = date.getDate() === selectedDate.getDate();
                    return (
                        <div 
                            key={index} 
                            className={`date-item ${isActive ? 'active' : ''}`}
                            onClick={() => setSelectedDate(date)}
                        >
                            <span className="date-day">{formattedDate.day}</span>
                            <span className="date-number">{formattedDate.number}</span>
                        </div>
                    );
                })}
            </div>

            {/* League Selector */}
            <div className="league-tabs">
                <button 
                    className={selectedLeague === "All Leagues" ? "active" : ""}
                    onClick={() => setSelectedLeague("All Leagues")}
                >
                    All Leagues
                </button>
                {leagues.map((league, i) => (
                    <button 
                        key={i} 
                        className={selectedLeague === league ? "active" : ""}
                        onClick={() => setSelectedLeague(league)}
                    >
                        {league}
                    </button>
                ))}
            </div>

            <div className="container">
                {/* Tabs (Ongoing / Upcoming / Results) */}
                <div className="tabs">
                    <button
                        className={selectedTab === "ongoing" ? "active" : ""}
                        onClick={() => setSelectedTab("ongoing")}
                    >
                        Ongoing
                    </button>
                    <button
                        className={selectedTab === "upcoming" ? "active" : ""}
                        onClick={() => setSelectedTab("upcoming")}
                    >
                        Upcoming
                    </button>
                    <button
                        className={selectedTab === "results" ? "active" : ""}
                        onClick={() => setSelectedTab("results")}
                    >
                        Results
                    </button>
                </div>

                {/* Live Header */}
                <div className="live-header">
                    {selectedTab === 'ongoing' && <div className="dot"></div>}
                    <h2>{selectedTab === 'ongoing' ? 'Live & Recent Matches' : selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1) + ' Matches'}</h2>
                </div>

                {/* Matches Section */}
                <div className="matches-section">
                    {/* Group matches by league */}
                    {leagues
                        .filter(league => selectedLeague === "All Leagues" || league === selectedLeague)
                        .map(league => {
                            const leagueMatches = matches.filter(m => m.league === league);
                            if (leagueMatches.length === 0) return null;

                            return (
                                <div key={league}>
                                    <div className="league-header">
                                        <div className="league-logo">
                                            <img 
                                                src={`https://media.api-sports.io/football/leagues/${league.toLowerCase().replace(/ /g, '-')}.png`}
                                                alt={`${league} logo`}
                                                onError={(e) => e.target.src = '/images/leagues/default.png'}
                                            />
                                        </div>
                                        <h2 className="league-name">{league}</h2>
                                    </div>

                                    {leagueMatches.map((match) => (
                                        <div key={match.id} className="match-card">
                                            <div className="match-header">
                                                {match.isLive ? (
                                                    <span className="live-indicator">{match.status}</span>
                                                ) : (
                                                    <span>{match.status}</span>
                                                )}
                                            </div>
                                            
                                            <div className="match-content">
                                                <div className="team team-home">
                                                    <span className="team-name">{match.home}</span>
                                                    <div className="team-logo">
                                                        <img 
                                                            src={match.homeTeamImage}
                                                            alt={`${match.home} logo`}
                                                            onError={(e) => e.target.src = '/images/teams/default.png'}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                <div className="match-score">
                                                    <span>{match.score.split(' - ')[0]}</span>
                                                    <span>-</span>
                                                    <span>{match.score.split(' - ')[1]}</span>
                                                </div>
                                                
                                                <div className="team team-away">
                                                    <div className="team-logo">
                                                        <img 
                                                            src={match.awayTeamImage}
                                                            alt={`${match.away} logo`}
                                                            onError={(e) => e.target.src = '/images/teams/default.png'}
                                                        />
                                                    </div>
                                                    <span className="team-name">{match.away}</span>
                                                </div>
                                            </div>

                                            {match.isLive && (
                                                <div className="match-stats">
                                                    <div className="possession">
                                                        <span>45%</span>
                                                        <div className="possession-bar">
                                                            <div 
                                                                className="possession-fill" 
                                                                style={{ width: "45%" }}
                                                            ></div>
                                                        </div>
                                                        <span>55%</span>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            );
                        })}

                    {filteredMatches.length === 0 && (
                        <div className="no-matches">
                            No matches found for {selectedLeague}
                        </div>
                    )}
                </div>

                {/* News Section */}
                <div className="news-section">
                    <h2>Latest News</h2>
                    <div className="news-grid">
                        {news.map((n) => (
                            <div key={n.id} className="news-card">
                                <div className="title">{n.title}</div>
                                <div className="time">{n.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;