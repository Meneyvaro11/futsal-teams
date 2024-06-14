import React, { useState, useEffect, useRef } from "react";
import RadarChart from "./RadarChart"; // Importa il nuovo componente del grafico radar

const PlayerList = ({ players, updatePlayerSelection }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPlayerForChart, setSelectedPlayerForChart] = useState(null);
  const [showLimitMessage, setShowLimitMessage] = useState(false);
  const cardRef = useRef(null);

  const handleRowSelection = (player) => {
    const isSelected = selectedPlayers.includes(player);
    const newSelectedPlayers = isSelected
      ? selectedPlayers.filter((p) => p !== player)
      : [...selectedPlayers, player];

    if (newSelectedPlayers.length <= 10) {
      setSelectedPlayers(newSelectedPlayers);
      updatePlayerSelection(newSelectedPlayers.length);
      setShowLimitMessage(false);
    } else {
      setShowLimitMessage(true);
    }
  };

  const handleChartIconClick = (player) => {
    if (selectedPlayerForChart === player) {
      setSelectedPlayerForChart(null); // Se è lo stesso giocatore, chiudi la card
    } else {
      setSelectedPlayerForChart(player);
    }
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setSelectedPlayerForChart(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showLimitMessage) {
      const timer = setTimeout(() => {
        setShowLimitMessage(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showLimitMessage]);

  return (
    <div id="sorted-list-container">
      <div>
        <p>Hai selezionato {selectedPlayers.length} su 10 giocatori</p>
      </div>
      <ul>
        {players.length > 0 ? (
          players.map((player) => (
            <li
              key={player.player}
              data-player={player.player}
              className={
                selectedPlayers.includes(player.player) ? "selected" : ""
              }
              onClick={() => handleRowSelection(player.player)}
            >
              <b>{player.player}</b>
              <span className="average1">PL {player.average1.toFixed(2)}</span>
              <span style={{ marginRight: 30 }} className="average2">
                GK {player.average2.toFixed(2)}
              </span>
              <div className="dropdown-container">
                <select
                  className="media-dropdown"
                  onChange={(e) => (player.selectedAverage = e.target.value)}
                  defaultValue="average1"
                >
                  <option value="average1">PL</option>
                  <option value="average2">GK</option>
                </select>
              </div>
              <button
                className="chart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChartIconClick(player);
                }}
              >
                📊
              </button>
            </li>
          ))
        ) : (
          <li>Nessun giocatore trovato</li>
        )}
      </ul>

      {selectedPlayerForChart && (
        <div className="card" ref={cardRef}>
          <h3>{selectedPlayerForChart.player}</h3>
          <RadarChart
            playerData={selectedPlayerForChart}
            performances={[
              selectedPlayerForChart.b,
              selectedPlayerForChart.c,
              selectedPlayerForChart.d,
              selectedPlayerForChart.e,
              selectedPlayerForChart.f,
            ]}
          />

          <button onClick={() => setSelectedPlayerForChart(null)}>
            Chiudi
          </button>
        </div>
      )}
      {showLimitMessage ? (
        <div id="sorted-list-container">
          {showLimitMessage && (
            <div
              style={{
                position: "fixed",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "white",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              Hai già selezionato 10 giocatori
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default PlayerList;
