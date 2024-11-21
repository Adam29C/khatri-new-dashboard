import PagesIndex from "../../../../PagesIndex";
import GameRatesProvider from "../../../../../Helpers/GameProvider/GameRates/GameRatesProvider";
import { Api } from "../../../../../Config/Api";

const StarLineGameRate = () => {
  return (
    <>
      <GameRatesProvider
        gameType="StarLine"
        path={"/admin/games/starlinegamerates"}
        title="StarLine Game Rates"
        GameRate_list={Api.STARLINE_GAME_RATE_LIST}
      />
    </>
  );
};

export default StarLineGameRate;
