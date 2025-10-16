import React, { useState } from 'react';
import '../styles/Match.css'


// --- MOCK DATA FOR EL CLÁSICO (Real Madrid 4 - 3 FC Barcelona) ---
const matchData = {
    competition: 'La Liga',
    time: 'FULL TIME',
    score: { home: 4, away: 3 }, // Real Madrid won 4-3
    progress: 90, // Static for FULL TIME
    homeTeam: { id: 'madrid', name: 'Real Madrid CF', short: 'Real Madrid', color: '#005694', flag: '🇪🇸' }, // Madrid is now Home team
    awayTeam: { id: 'barca', name: 'FC Barcelona', short: 'Barcelona', color: '#A50044', flag: '🇪🇸' }, // Barca is now Away team
    motm: { name: 'K. Mbappé', teamId: 'madrid', rating: 9.9 }, // New MOTM
    stats: [
        { label: 'Possession', barA: 45, barB: 55 }, // Madrid (Home) vs Barca (Away)
        { label: 'Shots (on Target)', barA: 17, barB: 10 },
        { label: 'Pass Accuracy', barA: 88, barB: 91 },
        { label: 'Fouls Committed', barA: 15, barB: 11 },
    ],
    lineups: {
        madrid: [ // Real Madrid Starters (Home Team)
            { num: 1, name: 'Courtois', pos: 'GK', rating: 6.5 },
            { num: 2, name: 'Carvajal', pos: 'RB', rating: 7.5 },
            { num: 3, name: 'Militão', pos: 'CB', rating: 7.0 },
            { num: 4, name: 'Alaba', pos: 'CB', rating: 6.9 },
            { num: 23, name: 'Mendy', pos: 'LB', rating: 7.2 },
            { num: 5, name: 'Bellingham', pos: 'CM', rating: 8.5 },
            { num: 6, name: 'Camavinga', pos: 'CM', rating: 7.8 },
            { num: 8, name: 'Valverde', pos: 'CM', rating: 7.7 },
            { num: 14, name: 'Tchouaméni', pos: 'DM', rating: 7.5 },
            { num: 7, name: 'Vini Jr.', pos: 'LW', rating: 8.8 },
            { num: 10, name: 'K. Mbappé', pos: 'ST', rating: 9.9 }, // MOTM
        ],
        barca: [ // Barcelona Starters (Away Team)
            { num: 1, name: 'Ter Stegen', pos: 'GK', rating: 5.5 },
            { num: 20, name: 'S. Roberto', pos: 'RB', rating: 6.0 },
            { num: 4, name: 'Araújo', pos: 'CB', rating: 6.2 },
            { num: 24, name: 'E. Garcia', pos: 'CB', rating: 5.9 },
            { num: 3, name: 'Balde', pos: 'LB', rating: 6.1 },
            { num: 21, name: 'F. De Jong', pos: 'CM', rating: 7.0 },
            { num: 5, name: 'Busquets', pos: 'DM', rating: 6.8 },
            { num: 8, name: 'Pedri', pos: 'CM', rating: 7.1 },
            { num: 27, name: 'L. Yamal', pos: 'RW', rating: 7.4 },
            { num: 9, name: 'Lewandowski', pos: 'ST', rating: 7.0 },
            { num: 11, name: 'Raphinha', pos: 'LW', rating: 7.3 },
        ],
    },
};

// --- Player Lineup/Ratings Helper (Unchanged) ---
const PlayerTable = ({ players, teamId, motmName }) => {
    const isMotm = (name) => name === motmName;
    const team = teamId === matchData.homeTeam.id ? matchData.homeTeam : matchData.awayTeam;

    return (
        <div className={`lineup-table team-${teamId}`}>
            <h4>{team.short} (Starting XI)</h4>
            <div className="player-row header-row">
                <span className="player-number">#</span>
                <span className="player-name">Player</span>
                <span className="player-position">POS</span>
                <span className="player-rating">RATING</span>
                <span className="motm-placeholder"></span>
            </div>
            {players.map(p => (
                <div key={p.num} className={`player-row ${isMotm(p.name) ? 'motm-highlight' : ''}`}>
                    <span className="player-number">{p.num}</span>
                    <span className="player-name">{p.name}</span>
                    <span className="player-position">{p.pos}</span>
                    <span className={`player-rating ${p.rating >= 8.5 ? 'rating-high' : p.rating >= 7.0 ? 'rating-mid' : ''}`}>
                        {p.rating.toFixed(1)}
                    </span>
                    {isMotm(p.name) && <span className="motm-badge">MOTM</span>}
                </div>
            ))}
        </div>
    );
};

// --- Tabs Content Renderer (Unchanged) ---
const renderTabContent = (activeTab) => {
    const { stats, lineups, motm } = matchData;
    const homeTeam = matchData.homeTeam;
    const awayTeam = matchData.awayTeam;
    const allPlayers = [...lineups.madrid, ...lineups.barca];
    const motmPlayer = allPlayers.find(p => p.name === motm.name) || {};

    switch (activeTab) {
        case 'Lineups':
            return (
                <div className="tab-content lineups-content">
                    {/* MOTM Banner placed above Lineups */}
                    <div className="stats-header-motm">
                        <div className="motm-card">
                            <span className="motm-icon">🌟</span>
                            <span className="motm-label">Man of the Match ({motm.rating.toFixed(1)})</span>
                            <span className="motm-player-name">{motmPlayer.name} ({motmPlayer.pos})</span>
                        </div>
                    </div>

                    <div className="lineups-table-grid">
                        <PlayerTable players={lineups.madrid} teamId="madrid" motmName={motm.name} />
                        <PlayerTable players={lineups.barca} teamId="barca" motmName={motm.name} />
                    </div>
                </div>
            );
        case 'Stats':
            // BarA is Home Team (Real Madrid), BarB is Away Team (FC Barcelona)
            return (
                <div className="tab-content stats-content">
                    <h3>Team Statistics</h3>
                    {stats.map(s => (
                        <div key={s.label} className="stat-item-bar">
                            <div className="stat-label-row">
                                <span className="stat-label-home">{s.barA}%</span>
                                <span className="stat-name">{s.label}</span>
                                <span className="stat-label-away">{s.barB}%</span>
                            </div>
                            <div className="stat-bar-container">
                                <div className="progress-track-bar">
                                    <div 
                                        className="stat-bar stat-bar-home" 
                                        // The style here visually shows home team's portion from left
                                        style={{ width: `${s.barA}%`, backgroundColor: s.label === 'Possession' ? matchData.homeTeam.color : '' }}> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        default:
            return null;
    }
};


// --- Main Match UI Component (MODIFIED: HEADER REMOVED) ---
export function Match() {
    const [activeTab, setActiveTab] = useState('Lineups'); // Default to Lineups
    const { competition, time, score, homeTeam, awayTeam, progress } = matchData;
    const tabs = ['Lineups', 'Stats'];

    return (
        <div className="advanced-match-page">
            {/* The global-header section has been removed as requested.
            <div className="global-header">...</div> 
            */}

            <div className="content-area">
                <a href="#matches" className="back-link">← Back to Matches</a>

                {/* === SCOREBOARD CARD === */}
                <div className="scoreboard-card">
                    <div className="league-live-status">
                        <span className="league-name">{competition} | El Clásico</span>
                        <span className="live-tag">🔴 {time}</span>
                    </div>

                    <div className="score-area">
                        <div className="team-score-left">
                            {/* NOTE: Inline styles added for distinct team colors */}
                            <div className="team-indicator-circle left-circle" style={{ backgroundColor: homeTeam.color }}></div>
                            <div className="team-name">{homeTeam.short}</div>
                        </div>
                        <div className="score-display">
                            {score.home} - {score.away}
                        </div>
                        <div className="team-score-right">
                            {/* NOTE: Inline styles added for distinct team colors */}
                            <div className="team-indicator-circle right-circle" style={{ backgroundColor: awayTeam.color }}></div>
                            <div className="team-name">{awayTeam.short}</div>
                        </div>
                    </div>

                    {/* Time Progress Bar */}
                    <div className="time-progress-bar">
                        <div className="time-label left">⏱️</div>
                        <div className="progress-track">
                            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="time-label right">90'</div>
                    </div>
                </div>

                {/* === TABS NAVIGATION === */}
                <div className="tabs-nav-container">
                    <div className="tabs-nav">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                                onClick={() => setActiveTab(tab)}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {/* === TAB CONTENT === */}
                <div className="panel tab-content-wrapper">
                    {renderTabContent(activeTab)}
                </div>
            </div>
        </div>
    );
}

export default Match