import React from "react";
import GameSettings from "../../../../../Helpers/GameProvider/GameSetting/GameSettings";

const StarLineSettingsList = () => {
  return (
    <>
      <GameSettings
        path={"/admin/games/starlinegamesetting"}
       
        title="Starline Game Settings"
        gameType="StarLine"
      />
  
    </>
  );
};

export default StarLineSettingsList;
