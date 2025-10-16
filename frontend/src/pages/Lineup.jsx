import React, { useState, useMemo } from 'react';
import '../styles/lineup.css'; // Import the dedicated CSS file

// --- MOCK DATA (Required for component to run) ---
const matchPlayers = [
    // --- Starting XI ---
    { id: 'p1', name: 'Thibaut Courtois', number: 1, position: 'GK' },
    { id: 'p2', name: 'Dani Carvajal', number: 2, position: 'RB' },
    { id: 'p3', name: 'Éder Militão', number: 3, position: 'CB' },
    { id: 'p4', name: 'David Alaba', number: 4, position: 'CB' },
    { id: 'p5', name: 'Ferland Mendy', number: 23, position: 'LB' },
    { id: 'p6', name: 'Toni Kroos', number: 8, position: 'CM' },
    { id: 'p7', name: 'Luka Modrić', number: 10, position: 'CM' },
    { id: 'p8', name: 'Aurélien Tchouaméni', number: 18, position: 'CDM' },
    { id: 'p9', name: 'Rodrygo', number: 11, position: 'RW' },
    { id: 'p10', name: 'Vinícius Júnior', number: 7, position: 'LW' },
    { id: 'p11', name: 'Jude Bellingham', number: 5, position: 'CAM' },

    // --- Bench/Substitutes ---
    { id: 'p12', name: 'Kepa Arrizabalaga', number: 25, position: 'SUB' },
    { id: 'p13', name: 'Nacho Fernández', number: 6, position: 'SUB' },
    { id: 'p14', name: 'Federico Valverde', number: 15, position: 'SUB' },
    { id: 'p15', name: 'Eduardo Camavinga', number: 12, position: 'SUB' },
    { id: 'p16', name: 'Joselu', number: 14, position: 'SUB' },
];

const formations = [
  { id: '433', name: '4-3-3', positions: [ 
    { x: 50, y: 90 }, // GK
    { x: 15, y: 70 }, { x: 35, y: 70 }, { x: 65, y: 70 }, { x: 85, y: 70 }, // DEF
    { x: 30, y: 45 }, { x: 50, y: 40 }, { x: 70, y: 45 }, // MID
    { x: 25, y: 20 }, { x: 50, y: 15 }, { x: 75, y: 20 } // FWD
  ] },
  { id: '442', name: '4-4-2', positions: [ 
    { x: 50, y: 90 }, // GK
    { x: 15, y: 70 }, { x: 35, y: 70 }, { x: 65, y: 70 }, { x: 85, y: 70 }, // DEF
    { x: 15, y: 40 }, { x: 40, y: 40 }, { x: 60, y: 40 }, { x: 85, y: 40 }, // MID
    { x: 40, y: 15 }, { x: 60, y: 15 } // FWD
  ] },
];
// --- END MOCK DATA ---

const initialFormation = formations[0];

// --- Component Replacements (Plain HTML/CSS) ---

const SimpleButton = ({ children, onClick, variant = 'default', className = '' }) => (
    <button onClick={onClick} className={`simple-button simple-button-${variant} ${className}`}>
        {children}
    </button>
);

const SimpleBadge = ({ children, className = '' }) => (
    <div className={`simple-badge ${className}`}>{children}</div>
);

const SimpleSelect = ({ value, onValueChange, options }) => (
    <select 
        value={value} 
        onChange={(e) => onValueChange(e.target.value)}
        className="simple-select"
    >
        {options.map(opt => (
            <option key={opt.id} value={opt.id}>{opt.name}</option>
        ))}
    </select>
);

const Trash2 = () => <span className="icon-trash">🗑️</span>;
const Save = () => <span className="icon-save">💾</span>;
const Share2 = () => <span className="icon-share">🔗</span>;


// --- PlayerListCard Component (Replaces DraggablePlayer) ---
// Now handles the click to select a player for substitution

function PlayerListCard({ player, isSelected, onClick }) {
    return (
        <div
            onClick={() => onClick(player)}
            className={`draggable-player ${isSelected ? 'is-selected' : ''}`}
        >
            <div className="draggable-player-content">
                <div className="player-number-circle">
                    {player.number}
                </div>
                <div className="player-info">
                    <div className="player-name">{player.name}</div>
                    <div className="player-position">{player.position}</div>
                </div>
            </div>
        </div>
    );
}

// --- PlayerSlotOnPitch Component (Replaces Drop Zone) ---
// Now handles the click to place a selected player

function PlayerSlotOnPitch({
    slot,
    onPlace,
    onRemove,
    isSelectedSlot,
}) {
    return (
        <div
            onClick={() => onPlace(slot.id)}
            className="player-slot-pitch-container"
            style={{ left: `${slot.position.x}%`, top: `${slot.position.y}%` }}
        >
            {slot.player ? (
                <div
                    className={`player-slot-filled group ${
                        isSelectedSlot ? 'is-target' : ''
                    }`}
                >
                    <div className="player-slot-card">
                        <div className="player-slot-number">{slot.player.number}</div>
                        <div className="player-slot-name">
                            {slot.player.name.split(' ').pop()}
                        </div>
                    </div>
                    <button
                        onClick={(e) => { e.stopPropagation(); onRemove(slot.id); }}
                        className="player-remove-button"
                    >
                        <Trash2 />
                    </button>
                </div>
            ) : (
                <div
                    className={`player-slot-empty ${
                        isSelectedSlot
                            ? 'player-slot-active-target'
                            : 'player-slot-inactive-target'
                    }`}
                >
                    <span className="add-icon">+</span>
                </div>
            )}
        </div>
    );
}

// --- Main LineupBuilder Component ---

export function LineupBuilder() {
    const [selectedFormation, setSelectedFormation] = useState(initialFormation);
    const [slots, setSlots] = useState(
        initialFormation.positions.map((pos, idx) => ({
            id: `slot-${idx}`,
            player: null,
            position: pos,
        }))
    );
    // New state to manage the currently selected player from the bench/list
    const [selectedPlayer, setSelectedPlayer] = useState(null); 

    const [availablePlayers] = useState(matchPlayers);

    const handleFormationChange = (formationId) => {
        const formation = formations.find((f) => f.id === formationId);
        if (formation) {
            setSelectedFormation(formation);
            setSelectedPlayer(null); // Clear selection
            setSlots(
                formation.positions.map((pos, idx) => ({
                    id: `slot-${idx}`,
                    player: null,
                    position: pos,
                }))
            );
        }
    };

    const handlePlayerSelect = (player) => {
        // If the same player is selected, deselect them
        if (selectedPlayer && selectedPlayer.id === player.id) {
            setSelectedPlayer(null);
        } else {
            setSelectedPlayer(player);
        }
    };

    const handlePlacePlayer = (slotId) => {
        if (!selectedPlayer) return;

        // 1. Remove the selected player from any slot they might currently occupy
        let newSlots = slots.map(slot => 
            slot.player && slot.player.id === selectedPlayer.id 
                ? { ...slot, player: null } 
                : slot
        );

        // 2. Place the selected player into the new slot
        newSlots = newSlots.map((slot) => 
            slot.id === slotId ? { ...slot, player: selectedPlayer } : slot
        );

        setSlots(newSlots);
        setSelectedPlayer(null); // Clear selection after placement
    };

    const handleRemove = (slotId) => {
        setSlots((prev) =>
            prev.map((slot) => (slot.id === slotId ? { ...slot, player: null } : slot))
        );
        setSelectedPlayer(null); // Clear selection
    };

    const handleClearAll = () => {
        setSlots((prev) => prev.map((slot) => ({ ...slot, player: null })));
        setSelectedPlayer(null);
    };

    const placedPlayerIds = useMemo(() => new Set(
        slots.filter((s) => s.player).map((s) => s.player.id)
    ), [slots]);

    // Available players include unplaced players PLUS the currently selected player (if they came from a slot)
    const benchPlayers = useMemo(() => availablePlayers.filter((p) => {
        // Show players if they are not placed OR if they are the currently selected player (for potential swaps)
        return !placedPlayerIds.has(p.id) || (selectedPlayer && selectedPlayer.id === p.id);
    }), [availablePlayers, placedPlayerIds, selectedPlayer]);
    
    const playersSelectedCount = slots.filter((s) => s.player).length;
    const isComplete = playersSelectedCount === slots.length;

    return (
        <div className="lineup-builder-page">
            <div className="lineup-container">
                {/* Header */}
                <div className="header-section">
                    <h1 className="main-title">Lineup Builder</h1>
                    <p className="subtitle">Click a player to select them, then click an empty slot to place them.</p>
                </div>

                <div className="main-grid">
                    {/* Pitch Area */}
                    <div className="pitch-area-container">
                        {/* Controls */}
                        <div className="controls-panel">
                            <div className="control-group">
                                <label className="control-label">Formation</label>
                                <SimpleSelect 
                                    value={selectedFormation.id} 
                                    onValueChange={handleFormationChange} 
                                    options={formations} 
                                />
                            </div>
                            <div className="control-buttons">
                                <SimpleButton variant="outline" onClick={handleClearAll} className="clear-button">
                                    <Trash2 /> Clear
                                </SimpleButton>
                                <SimpleButton variant="outline" className="save-button">
                                    <Save /> Save
                                </SimpleButton>
                                <SimpleButton variant="primary" className="share-button">
                                    <Share2 /> Share
                                </SimpleButton>
                            </div>
                        </div>

                        {/* Football Pitch */}
                        <div className="football-pitch-wrapper">
                            <div className="football-pitch">
                                {/* Pitch Markings */}
                                <div className="pitch-markings">
                                    <div className="center-circle" />
                                    <div className="center-dot" />
                                    <div className="penalty-box top" />
                                    <div className="penalty-box bottom" />
                                    <div className="goal top" />
                                    <div className="goal bottom" />
                                </div>

                                {/* Player Slots */}
                                {slots.map((slot) => (
                                    <PlayerSlotOnPitch
                                        key={slot.id}
                                        slot={slot}
                                        onPlace={handlePlacePlayer}
                                        onRemove={handleRemove}
                                        isSelectedSlot={selectedPlayer !== null}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="stats-panel">
                            <div className="stat-item">
                                <div className="stat-label">Players Selected</div>
                                <div className="stat-value">
                                    {playersSelectedCount} / {slots.length}
                                </div>
                            </div>
                            <SimpleBadge className={isComplete ? 'badge-complete' : 'badge-incomplete'}>
                                {isComplete ? 'Complete' : 'Incomplete'}
                            </SimpleBadge>
                        </div>
                    </div>

                    {/* Player Bench */}
                    <div className="bench-column">
                        <div className="bench-panel">
                            <h3 className="bench-title">Available Players</h3>
                            <div className="player-list">
                                {benchPlayers.map((player) => (
                                    <PlayerListCard 
                                        key={player.id} 
                                        player={player} 
                                        onClick={handlePlayerSelect} 
                                        isSelected={selectedPlayer && selectedPlayer.id === player.id}
                                    />
                                ))}
                            </div>
                            {benchPlayers.length === 0 && (
                                <div className="empty-bench-message">
                                    All players have been placed on the pitch
                                </div>
                            )}
                        </div>

                        <div className="pro-tip-box">
                            <h4 className="pro-tip-title">Selected Player</h4>
                            {selectedPlayer ? (
                                <p className="pro-tip-text">
                                    **{selectedPlayer.name}** is ready. Click a slot on the pitch to place them.
                                </p>
                            ) : (
                                <p className="pro-tip-text">
                                    Click a player from the list to select them for placement.
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}