import React from "react";
import GameProvider from "../../../../../Helpers/GameProvider/GameCrud/GameProvider";
const JackpotProvider = () => {


  return (
    <div>
      <GameProvider
       path="/admin/games/jackpotProvider"
       title="JackPot Provider"
       gametype="JackPot"
      />
    </div>
  );
};

export default JackpotProvider;
