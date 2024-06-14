import React, { useState, useEffect } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList";
import Teams from "./components/Teams";

import { createTeams, filterPlayers, clearPlayerSelection } from "./utils";

const spreadsheetId = "123rXNTlyQzA3lSJ__TyM43RAUJ6oDCwrUNNm6K4Bh9U";
const apiKey = "AIzaSyD1TiefCdKw5OROFuNdn62dDjDOTfjGxac";
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:P?key=${apiKey}`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [sortedAverages, setSortedAverages] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(0);
  const [teams, setTeams] = useState({ team1: [], team2: [] });
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const players = data.values.slice(1).map((player) => ({
          player: player[0],
          e: parseFloat(player[4]),
          f: parseFloat(player[5]),
          g: parseFloat(player[6]),
          h: parseFloat(player[7]),
          i: parseFloat(player[8]),
          j: parseFloat(player[9]),
          k: parseFloat(player[10]),
          l: parseFloat(player[11]),
          m: parseFloat(player[12]),
          average1: parseFloat(player[13]),
          average2: parseFloat(player[14]),
          availability: player[15],
          selectedAverage: "average1",
        }));
        const sortedAverages = players.sort((a, b) => b.average1 - a.average1);
        setPlayers(players);
        setSortedAverages(sortedAverages);
        setFilteredPlayers(sortedAverages); // Inizialmente, tutti i giocatori sono visibili
      })
      .catch((error) =>
        console.error("Errore durante il caricamento dei dati:", error)
      );
  }, []);

  const updatePlayerSelection = (newSelectedPlayerCount) => {
    setSelectedPlayerCount(newSelectedPlayerCount);
  };

  const updateTeams = (newTeams) => {
    setTeams(newTeams);
  };

  const showSelectionLimitPopup = () => {
    const popup = document.getElementById("selectionLimitPopup");
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000); // Mostra il popup per 3 secondi
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = players.filter((player) =>
      player.player.toLowerCase().includes(searchTerm)
    );
    setFilteredPlayers(filtered);
  };

  return (
    <div className="App">
      <header>
        <h2
          style={{
            textTransform: "uppercase",
            marginBottom: -10,
            marginTop: 50,
            marginLeft: 20,
          }}
        >
          Generatore di squadre equilibrate
        </h2>
      </header>
      <main id="contenitore">
        {isButtonClicked && <Teams teams={teams} />}

        <h2 style={{ fontSize: 20, fontWeight: 400, marginBottom: 50 }}>
          Seleziona <b>10 giocatori</b> e genera le squadre
        </h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Cerca giocatore..."
          onChange={handleSearchChange}
        />
        <button
          style={{ marginRight: 10, marginBottom: 25 }}
          onClick={() => {
            createTeams(sortedAverages, updateTeams);
            setIsButtonClicked(true);
          }}
        >
          Genera squadre
        </button>
        <button
          style={{ marginRight: 10, backgroundColor: "#e39520" }}
          onClick={() => {
            setSortedAverages(clearPlayerSelection(players));
            setSelectedPlayerCount(0);
          }}
        >
          Pulisci selezione
        </button>
        <PlayerList
          players={filteredPlayers}
          updatePlayerSelection={updatePlayerSelection}
          showSelectionLimitPopup={showSelectionLimitPopup}
        />
      </main>
      <div id="selectionLimitPopup" className="popup">
        Puoi selezionare solo 10 giocatori.
      </div>
    </div>
  );
};

export default App;
