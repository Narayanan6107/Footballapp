import React, { useState } from 'react';
// Assuming you have 'react-router-dom' installed and configured
import { useNavigate } from 'react-router';
import '../styles/Home.css'; // Centralized CSS import

// --- MOCK DATA (Unchanged) ---
const liveMatches = [
    {
        id: 'L001',
        league: 'Premier League',
        minute: 78,
        homeTeam: { name: 'Manchester United', logo: '🔴' },
        awayTeam: { name: 'Liverpool', logo: '🔴' },
        homeScore: 2,
        awayScore: 1,
        status: 'live',
        stadium: 'Old Trafford'
    },
];

const upcomingMatches = [
    {
        id: 'U001',
        league: 'Premier League',
        homeTeam: { name: 'Chelsea', logo: '🔵' },
        awayTeam: { name: 'Tottenham', logo: '🟣' },
        time: '17:30',
        venue: 'Stamford Bridge',
        status: 'upcoming',
        homeScore: 0,
        awayScore: 0,
    },
    {
        id: 'U002',
        league: 'Premier League',
        homeTeam: { name: 'Newcastle', logo: '⚫' },
        awayTeam: { name: 'Aston Villa', logo: '🟣' },
        time: '20:00',
        venue: "St. James' Park",
        status: 'upcoming',
        homeScore: 0,
        awayScore: 0,
    },
    {
        id: 'U003',
        league: 'Champions League',
        homeTeam: { name: 'Bayern Munich', logo: '🔴' },
        awayTeam: { name: 'Paris SG', logo: '🔵' },
        time: '21:00',
        venue: 'Allianz Arena',
        status: 'upcoming',
        homeScore: 0,
        awayScore: 0,
    },
];

const newsItems = [
    {
        id: 'N001',
        title: 'Emotional Farewell: Captain bids adieu to the fans after title win',
        category: 'Premier League',
        image: 'https://resources.premierleague.pulselive.com/premierleague/photo/2025/04/24/dbb256aa-3347-4c51-8e07-9d2c9d703df7/1-Jamie-Vardy.jpg',
        excerpt: 'The veteran skipper delivered a heartfelt speech after clinching the league title in dramatic fashion, signaling the end of an era.',
        time: '10 min ago'
    },
    {
        id: 'N002',
        title: 'New €100M signing fuels transfer speculation across Europe',
        category: 'Transfers',
        image: 'https://i.guim.co.uk/img/media/922f164edb86086034a2c9bb41778ff3d5a6ab13/589_0_3750_3000/master/3750.jpg?width=465&dpr=1&s=none&crop=none',
        excerpt: 'The stunning move of the young midfielder has sent shockwaves, forcing major clubs to rethink their summer strategies.',
        time: '2 hours ago'
    },
    {
        id: 'N003',
        title: 'Midfield Maestro rejects contract, eyes a move to Italy',
        category: 'La Liga',
        image: 'https://www.mancity.com/meta/media/dbjdl5hs/kdb-applause.jpg?width=1620',
        excerpt: 'After months of negotiations, the star playmaker has decided to pursue a new challenge in Serie A, ending his decade-long tenure.',
        time: '1 day ago'
    },
];

// --- COMPONENTS ---

// 1. Header Component (MODIFIED to use useNavigate)
function Header({ currentPage }) {
    // 1. Initialize useNavigate
    const navigate = useNavigate();

    // 2. Define navigation items with their respective paths
    const navItems = [
        { id: 'home', label: 'Home', path: '/' },
        { id: 'matches', label: 'Matches', path: '/match' },
        { id: 'lineup', label: 'Lineup Builder', path: '/lineup' },
        { id: 'predictions', label: 'Predictions', path: '/predictions' },
        { id: 'profile', label: 'Profile', path: '/profile' },
    ];

    // Helper function to handle both state update (for styling) and routing
    const handleNavigation = (item) => {
        // We can still log the intended navigation
        console.log(`Navigating to path: ${item.path}`);
        // Use the hook to navigate to the new route
        navigate(item.path);
    };

    return (
        <header className="header-sticky">
            <div className="header-container">
                
                {/* Logo */}
                <button 
                // Use handleNavigation with the home item
                onClick={() => handleNavigation(navItems[0])}
                className="header-logo-button"
                >
                    <span className="logo-text">FOOTHUB</span>
                </button>

                {/* Desktop Navigation */}
                <nav className="header-nav-desktop">
                    {navItems.map((item) => (
                    <button
                        key={item.id}
                        // Use handleNavigation with the specific item
                        onClick={() => handleNavigation(item)}
                        className={`nav-item-desktop ${
                        currentPage === item.id ? 'active' : ''
                        }`}
                    >
                        {item.label}
                    </button>
                    ))}
                </nav>

                {/* Search and User */}
                <div className="header-actions">
                    {/* Search Input (Desktop/Tablet) */}
                    <div className="search-input-wrapper">
                        <span className="search-icon">🔍</span> {/* Search Placeholder */}
                        <input
                            type="text"
                            placeholder="Search teams, players..."
                            className="search-input"
                        />
                    </div>
                    
                    {/* Profile Button */}
                    <button
                        onClick={() => handleNavigation(navItems.find(item => item.id === 'profile'))}
                        className="user-button"
                    >
                        👤 {/* User Placeholder */}
                    </button>

                    {/* Mobile Menu Button (Placeholder for Sheet) */}
                    <button className="menu-button-mobile">
                        ☰ {/* Menu Placeholder */}
                    </button>
                </div>
            </div>
        </header>
    );
}

// 2. MatchCard Component (Unchanged)
function MatchCard({ match, onClick }) {
    const isLive = match.status === 'live';
    const isUpcoming = match.status === 'upcoming';
    const matchMinute = match.minute || 0;

    return (
        <div
            onClick={onClick}
            className="match-card-base match-card-hover group"
        >
            {/* League and Status */}
            <div className="match-card-header-top">
                <span className="match-card-league">{match.league}</span>
                
                {isLive && (
                    <span className="match-card-badge match-badge-live">
                        <span className="live-dot-small" />
                        LIVE
                    </span>
                )}
                
                {isUpcoming && (
                    <span className="match-card-badge match-badge-upcoming">
                        🕒
                        {match.time}
                    </span>
                )}
                
                {match.status === 'finished' && (
                    <span className="match-card-badge match-badge-finished">
                        FT
                    </span>
                )}
            </div>

            {/* Teams and Score */}
            <div className="match-card-teams-scores">
                {/* Home Team */}
                <div className="match-card-score-row">
                    <div className="match-card-team-info">
                        <div className="team-logo-small">
                            {match.homeTeam.logo}
                        </div>
                        <span className="team-name-text">
                            {match.homeTeam.name}
                        </span>
                    </div>
                    <span className="score-text">{match.homeScore}</span>
                </div>

                {/* Away Team */}
                <div className="match-card-score-row">
                    <div className="match-card-team-info">
                        <div className="team-logo-small">
                            {match.awayTeam.logo}
                        </div>
                        <span className="team-name-text">
                            {match.awayTeam.name}
                        </span>
                    </div>
                    <span className="score-text">{match.awayScore}</span>
                </div>
            </div>

            {/* Live Timeline */}
            {isLive && matchMinute > 0 && (
                <div className="match-card-live-timeline">
                    <div className="live-timeline-bar-wrapper">
                        <span className="timeline-minute">{matchMinute}'</span>
                        <div className="timeline-track">
                            <div
                                className="timeline-fill"
                                style={{ width: `${(matchMinute / 90) * 100}%` }}
                            />
                        </div>
                        <span className="timeline-end">90'</span>
                    </div>
                </div>
            )}
            
            {/* Stadium */}
            {match.venue && (
                <div className="match-card-stadium">
                    📍 {match.venue}
                </div>
            )}
        </div>
    );
}

// 3. NewsCard Component (Unchanged)
function NewsCard({ news }) {
    const excerpt = news.excerpt || 'Read the latest updates and analysis on this developing story.';
    const time = news.time || '10 min ago';

    return (
        <div className="news-card-base news-card-hover group">
            <div className="news-card-image-container">
                <img
                    src={news.image}
                    alt={news.title}
                    className="news-image-full"
                    onError={(e) => {
                        e.currentTarget.onerror = null; 
                        e.currentTarget.src = "https://placehold.co/400x200/1a1a1a/fff?text=News";
                    }}
                />
                
                {/* Gradient Overlay */}
                <div className="news-image-gradient-overlay" /> 
                
                {/* Category Badge */}
                <div className="news-card-badge-position">
                    <span className="news-card-badge">
                        {news.category}
                    </span>
                </div>
            </div>
            <div className="news-card-content">
                <h3 className="news-title-text group-hover-color-effect">
                    {news.title}
                </h3>
                <p className="news-excerpt-text">{excerpt}</p>
                <span className="news-time-text">{time}</span>
            </div>
        </div>
    );
}


// 4. Main Home Component (MODIFIED to remove unused handleNavigate and pass current page state)
export function Home() {
    const [selectedLeague, setSelectedLeague] = useState('all');

    const [currentPage, setCurrentPage] = useState('home'); 

    const leagues = [
        { id: 'all', name: 'All Leagues' },
        { id: 'premier', name: 'Premier League' },
        { id: 'laliga', name: 'La Liga' },
        { id: 'ucl', name: 'Champions League' },
    ];

    const liveMatch = liveMatches[0];
    const matchProgress = (liveMatch.minute / 90) * 100;

    // handleNavigate is no longer needed since Header uses useNavigate
    // const handleNavigate = (page) => {
    //     setCurrentPage(page);
    //     console.log(`Navigating to: ${page}`);
    // };
    
    const handleMatchClick = (id) => {
        console.log(`Viewing match details for ${id}`);
    };

    return (
        <div className="app-container">
            {/* Passed currentPage for styling, removed onNavigate prop */}
            <Header currentPage={currentPage} />
            
            <div className="content-wrapper">
                {/* Hero Section */}
                <div className="hero-section">
                    <h1 className="hero-title">Live Football</h1>
                    <p className="hero-subtitle">Real-time scores, lineups, and analytics from leagues around the world</p>
                </div>

                {/* Bento Grid Layout (Live Match + Stats) */}
                <div className="main-content-area">
                    {/* Live Match Card (Large) */}
                    <div className="live-match-card">
                        <div className="live-match-header">
                            <span className="live-status">
                                <div className="live-dot"></div>
                                LIVE {liveMatch.minute}'
                            </span>
                            <span className="live-league">{liveMatch.league}</span>
                        </div>
                        <div className="live-score-row">
                            <div className="live-team">
                                <div className="live-logo-wrapper">
                                    {liveMatch.homeTeam.logo}
                                </div>
                                <div>
                                    <div className="live-team-name">{liveMatch.homeTeam.name}</div>
                                    <div className="live-team-subtext">Home</div>
                                </div>
                            </div>
                            <div className="live-score">{liveMatch.homeScore}</div>
                        </div>
                        <div className="live-score-row">
                            <div className="live-team">
                                <div className="live-logo-wrapper">
                                    {liveMatch.awayTeam.logo}
                                </div>
                                <div>
                                    <div className="live-team-name">{liveMatch.awayTeam.name}</div>
                                    <div className="live-team-subtext">Away</div>
                                </div>
                            </div>
                            <div className="live-score">{liveMatch.awayScore}</div>
                        </div>
                        
                        <div className="match-progress-container">
                            <div className="progress-label">
                                <span className="progress-icon">🕒</span> {/* Clock icon */}
                                Match Progress
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${matchProgress}%` }}></div>
                            </div>
                        </div>

                        <button className="match-details-button" onClick={() => handleMatchClick(liveMatch.id)}>
                            View Match Details
                            <span className="arrow-icon">▶</span> {/* Right arrow icon */}
                        </button>
                    </div>

                    {/* Quick Stats Column */}
                    <div className="quick-stats-container">
                        <div className="stat-card hot-card">
                            <div className="stat-header">
                                <span className="stat-title-icon top-scorer">🔥 Top Scorer</span>
                                <span className="stat-badge hot">Hot</span>
                            </div>
                            <p className="stat-detail">Erling Haaland</p>
                            <p className="stat-subtext">24 goals</p>
                            <div className="stat-progress-bar">
                                <div className="stat-progress-fill hot"></div>
                            </div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-header">
                                <span className="stat-title-icon rising-star">📈 Rising Star</span>
                            </div>
                            <p className="stat-detail">Jude Bellingham</p>
                            <p className="stat-subtext">Real Madrid</p>
                        </div>
                        <div className="stat-card next-match">
                            <div className="stat-header">
                                <span className="stat-title-icon next-match">📅 Next Big Match</span>
                            </div>
                            <p className="stat-detail">El Clásico</p>
                            <p className="stat-time">Tomorrow 20:00</p>
                        </div>
                    </div>
                </div>

                {/* League Filter */}
                <div className="league-filter">
                    {leagues.map((league) => (
                        <button
                            key={league.id}
                            onClick={() => setSelectedLeague(league.id)}
                            className={`league-pill ${selectedLeague === league.id ? 'active' : ''}`}
                        >
                            {league.name}
                        </button>
                    ))}
                </div>

                {/* Upcoming Matches Section */}
                <section className="section-container">
                    <div className="section-header">
                        <h2>Upcoming Matches</h2>
                        <button className="view-all-button">
                            View All
                            <span className="arrow-icon">▶</span>
                        </button>
                    </div>
                    <div className="matches-grid">
                        {upcomingMatches.map((match) => (
                            <MatchCard
                                key={match.id}
                                match={match}
                                onClick={() => handleMatchClick(match.id)}
                            />
                        ))}
                    </div>
                </section>

                {/* Latest News Section */}
                <section className="section-container">
                    <div className="section-header">
                        <h2>📰 Latest News</h2>
                    </div>
                    <div className="news-grid">
                        <div className="news-featured">
                            <NewsCard news={newsItems[0]} />
                        </div>
                        <div className="news-secondary">
                            <NewsCard news={newsItems[1]} />
                            <NewsCard news={newsItems[2]} />
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home