// JackPotSettings
import React from "react";
import GameSettings from "../../../../../Helpers/GameProvider/GameSetting/GameSettings";

const JackPotSettings = () => {
  return (
    <>
      <GameSettings
        path={"/admin/games/jackpotGameSetting"}
    
        title="JackPot Game Settings"
        gameType="JackPot"
      />
      
    </>
  );
};

export default JackPotSettings;
