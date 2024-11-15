
import React from "react";
import GameProvider from "../../../../../Helpers/GameProvider/GameCrud/GameProvider";
import PagesIndex from "../../../../PagesIndex";
const StarLineProvider = () => {


  return (
    <div>
      <GameProvider
       path="/admin/games/starlineProvider"
       title="StarLine Provider"
       gametype="StarLine"
      />
    </div>
  );
};

export default StarLineProvider;
