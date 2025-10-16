import React, { useState, useMemo } from 'react';
import '../styles/Prediction.css'

// --- MOCK DATA (Required for component to run) ---
const upcomingMatches = [
  {
    id: 'm1',
    league: 'Premier League',
    time: 'Today, 20:00',
    homeTeam: { name: 'Man Utd', logo: '' },
    awayTeam: { name: 'Liverpool', logo: '' },
  },
  {
    id: 'm2',
    league: 'La Liga',
    time: 'Tomorrow, 22:30',
    homeTeam: { name: 'Real Madrid', logo: '' },
    awayTeam: { name: 'Barcelona', logo: '' },
  },
  {
    id: 'm3',
    league: 'Bundesliga',
    time: 'Sat, 15:30',
    homeTeam: { name: 'Bayern', logo: '🔴' },
    awayTeam: { name: 'Dortmund', logo: '🟡' },
  },
];

const leaderboard = [
  { rank: 1, username: 'GoatPredictor', points: 1250, accuracy: 88 },
  { rank: 2, username: 'KloppTactics', points: 1100, accuracy: 85 },
  { rank: 3, username: 'CR7_Fan', points: 980, accuracy: 79 },
  { rank: 4, username: 'MessiFan', points: 950, accuracy: 78 },
  { rank: 5, username: 'Ancelotti', points: 890, accuracy: 75 },
  { rank: 6, username: 'FantasyKing', points: 870, accuracy: 74 },
  { rank: 7, username: 'Haaland_FTW', points: 850, accuracy: 73 },
  { rank: 8, username: 'PepGuardiola', points: 830, accuracy: 71 },
];
// --- END MOCK DATA ---

// --- Simple Component Replacements ---

const SimpleButton = ({ children, onClick, className = '' }) => (
    <button onClick={onClick} className={`simple-button ${className}`}>
        {children}
    </button>
);

const SimpleInput = ({ value, onChange, placeholder, className = '' }) => (
    <input 
        type="number"
        min="0"
        max="9"
        value={value} 
        onChange={onChange}
        placeholder={placeholder}
        className={`simple-input ${className}`}
    />
);

const SimpleCard = ({ children, className = '' }) => (
    <div className={`simple-card ${className}`}>{children}</div>
);

const SimpleTabs = ({ defaultValue, children }) => {
    const [activeTab, setActiveTab] = useState(defaultValue);
    return (
        <div className="simple-tabs">
            {/* TabsList */}
            <div className="tabs-list">
                {React.Children.map(children, child => 
                    child.type === TabsTrigger && 
                    React.cloneElement(child, {
                        onClick: () => setActiveTab(child.props.value),
                        isActive: activeTab === child.props.value,
                    })
                )}
            </div>
            {/* TabsContent */}
            {React.Children.map(children, child => 
                child.type === TabsContent && activeTab === child.props.value && child
            )}
        </div>
    );
};

// --- Trigger and Content for SimpleTabs ---
const TabsTrigger = ({ children, onClick, isActive, value }) => (
    <button 
        onClick={onClick} 
        className={`tabs-trigger ${isActive ? 'active' : ''}`}
        data-state={isActive ? 'active' : 'inactive'}
    >
        {children}
    </button>
);
const TabsContent = ({ children }) => <div className="tabs-content-area">{children}</div>;
const Badge = ({ children, className = '' }) => <div className={`simple-badge ${className}`}>{children}</div>;

// --- Icon Replacements (Unicode) ---
const Target = () => <span className="icon-target">🎯</span>;
const Trophy = () => <span className="icon-trophy">🏆</span>;
const TrendingUp = () => <span className="icon-trending">📈</span>;
const Award = () => <span className="icon-award">🏅</span>;
const Medal = () => <span className="icon-medal">🥇</span>;
const toast = { success: console.log, error: console.error }; // Simple console log replacement


// --- Main Component ---

export function PredictionsPage() {
    const [predictions, setPredictions] = useState({});
    const [pollVote, setPollVote] = useState(null);

    const handlePredictionChange = (matchId, team, value) => {
        setPredictions((prev) => ({
            ...prev,
            [matchId]: {
                ...prev[matchId],
                [team]: value,
            },
        }));
    };

    const handleSubmitPrediction = (matchId) => {
        const prediction = predictions[matchId];
        if (prediction?.home && prediction?.away) {
            toast.success(`Prediction submitted successfully! ${prediction.home} - ${prediction.away}`);
        } else {
            toast.error('Please enter scores for both teams');
        }
    };

    const pollOptions = [
        { id: '1', text: 'Manchester United', votes: 1247, percentage: 45 },
        { id: '2', text: 'Liverpool', votes: 892, percentage: 32 },
        { id: '3', text: 'Draw', votes: 634, percentage: 23 },
    ];

    const handlePollVote = (optionId) => {
        setPollVote(optionId);
        toast.success('Vote recorded!');
    };

    return (
        <div className="predictions-page">
            <div className="page-container">
                {/* Header */}
                <div className="header-section">
                    <div className="header-title-group">
                        <h1 className="main-title">Prediction Center</h1>
                    </div>
                    <p className="subtitle">
                        Predict match scores and compete with the community
                    </p>
                </div>

                <div className="main-grid">
                    {/* Main Content (Tabs and Poll) */}
                    <div className="main-content-column">
                        <SimpleTabs defaultValue="predict">
                            <div className="tabs-list-wrapper">
                                <TabsTrigger value="predict">
                                    Make Predictions
                                </TabsTrigger>
                                <TabsTrigger value="my-predictions">
                                    My Predictions
                                </TabsTrigger>
                            </div>

                            {/* Predict Tab Content */}
                            <TabsContent value="predict">
                                {upcomingMatches.map((match) => (
                                    <div key={match.id} className="match-card">
                                        <div className="match-header-info">
                                            <span className="text-muted">{match.league}</span>
                                            <Badge className="badge-outline">
                                                {match.time}
                                            </Badge>
                                        </div>

                                        <div className="score-prediction-area">
                                            {/* Home Team */}
                                            <div className="team-display">
                                                <div className="team-logo">{match.homeTeam.logo}</div>
                                                <div className="team-name">{match.homeTeam.name}</div>
                                            </div>

                                            {/* Score Inputs */}
                                            <div className="score-inputs">
                                                <SimpleInput
                                                    placeholder="0"
                                                    value={predictions[match.id]?.home || ''}
                                                    onChange={(e) =>
                                                        handlePredictionChange(match.id, 'home', e.target.value)
                                                    }
                                                    className="input-score"
                                                />
                                                <span className="score-divider">-</span>
                                                <SimpleInput
                                                    placeholder="0"
                                                    value={predictions[match.id]?.away || ''}
                                                    onChange={(e) =>
                                                        handlePredictionChange(match.id, 'away', e.target.value)
                                                    }
                                                    className="input-score"
                                                />
                                            </div>

                                            {/* Away Team */}
                                            <div className="team-display">
                                                <div className="team-logo">{match.awayTeam.logo}</div>
                                                <div className="team-name">{match.awayTeam.name}</div>
                                            </div>
                                        </div>

                                        <SimpleButton
                                            onClick={() => handleSubmitPrediction(match.id)}
                                            className="submit-button"
                                        >
                                            Submit Prediction
                                        </SimpleButton>
                                    </div>
                                ))}
                            </TabsContent>

                            {/* My Predictions Tab Content */}
                            <TabsContent value="my-predictions">
                                <SimpleCard className="empty-state-card">
                                    <Trophy />
                                    <h3 className="empty-state-title">No Predictions Yet</h3>
                                    <p className="empty-state-text">
                                        Start predicting match scores to see your history here
                                    </p>
                                    <SimpleButton className="submit-button">
                                        Make Your First Prediction
                                    </SimpleButton>
                                </SimpleCard>
                            </TabsContent>
                        </SimpleTabs>

                        {/* Community Poll */}
                        <SimpleCard className="poll-card">
                            <h3 className="poll-title">Community Poll</h3>
                            <p className="poll-question">
                                Who will win: Manchester United vs Liverpool?
                            </p>
                            <div className="poll-options-list">
                                {pollOptions.map((option) => (
                                    <button
                                        key={option.id}
                                        onClick={() => handlePollVote(option.id)}
                                        disabled={pollVote !== null}
                                        className={`poll-option ${
                                            pollVote === option.id ? 'voted-selected' : ''
                                        } ${pollVote !== null ? 'voted-locked' : ''}`}
                                    >
                                        <div className="poll-option-header">
                                            <span className="poll-option-text">{option.text}</span>
                                            <span className="poll-percentage">{option.percentage}%</span>
                                        </div>
                                        {pollVote !== null && (
                                            <div className="poll-progress-bar-bg">
                                                <div
                                                    className="poll-progress-fill"
                                                    style={{ width: `${option.percentage}%` }}
                                                />
                                            </div>
                                        )}
                                    </button>
                                ))}
                            </div>
                            {pollVote !== null && (
                                <p className="poll-total-votes">
                                    {pollOptions.reduce((sum, opt) => sum + opt.votes, 0).toLocaleString()}{' '}
                                    total votes
                                </p>
                            )}
                        </SimpleCard>
                    </div>

                    {/* Sidebar */}
                    <div className="sidebar-column">
                        {/* User Stats */}
                        <SimpleCard className="stats-card">
                            <div className="stats-header">
                                <div className="stat-icon-circle">
                                    <Award />
                                </div>
                                <div>
                                    <div className="stat-main-text">Your Stats</div>
                                    <div className="stat-sub-text">Season 2024/25</div>
                                </div>
                            </div>
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <div className="stat-value-large">0</div>
                                    <div className="stat-label-small">Predictions</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value-large">0</div>
                                    <div className="stat-label-small">Points</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value-large">0%</div>
                                    <div className="stat-label-small">Accuracy</div>
                                </div>
                                <div className="stat-item">
                                    <div className="stat-value-large">-</div>
                                    <div className="stat-label-small">Rank</div>
                                </div>
                            </div>
                        </SimpleCard>

                        {/* Leaderboard */}
                        <SimpleCard className="leaderboard-card">
                            <div className="leaderboard-header">
                                <TrendingUp />
                                <h3 className="leaderboard-title">Top Predictors</h3>
                            </div>
                            <div className="leaderboard-list">
                                {leaderboard.slice(0, 8).map((user) => (
                                    <div key={user.rank} className="leaderboard-item">
                                        <div className={`rank-badge rank-${user.rank}`}>
                                            {user.rank <= 3 ? (
                                                <Medal />
                                            ) : (
                                                <span className="rank-number">{user.rank}</span>
                                            )}
                                        </div>
                                        <div className="user-info">
                                            <div className="user-name">{user.username}</div>
                                            <div className="user-accuracy">{user.accuracy}% accuracy</div>
                                        </div>
                                        <div className="user-points">{user.points}</div>
                                    </div>
                                ))}
                            </div>
                        </SimpleCard>

                        {/* Scoring Info */}
                        <SimpleCard className="scoring-info-card">
                            <h4 className="scoring-title">How Scoring Works</h4>
                            <div className="scoring-rules">
                                <div className="scoring-rule">
                                    <span>Exact score</span>
                                    <span className="rule-points">10 pts</span>
                                </div>
                                <div className="scoring-rule">
                                    <span>Correct outcome</span>
                                    <span className="rule-points">5 pts</span>
                                </div>
                                <div className="scoring-rule">
                                    <span>One goal difference</span>
                                    <span className="rule-points">3 pts</span>
                                </div>
                            </div>
                        </SimpleCard>
                    </div>
                </div>
            </div>
        </div>
    );
}