import { useState } from "react";

export function Player({ playerName, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  let [editedPlayerName, setPlayerName] = useState(playerName);

  function handleEditClick() {
    setIsEditing((isEditing) => !isEditing);
  }

  function handleNameChange(event) {
    setPlayerName(event.target.value);
    editedPlayerName = event.target.value;
  }

  let nameField = <span className="player-name">{editedPlayerName}</span>;
  if (isEditing) {
    nameField = (
      <input
        name="play-name-input"
        className="player-name-input"
        type="text"
        value={editedPlayerName}
        onChange={handleNameChange}        
      />
    );
  }
  return (
    <>
      <li className={isActive ? "active" : ""}>
        <span className="player">
          {nameField}
          <span className="player-symbol">{symbol}</span>
        </span>

        <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}
