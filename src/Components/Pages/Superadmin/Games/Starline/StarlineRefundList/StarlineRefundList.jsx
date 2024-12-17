import React from "react";
import GameRefundList from "../../../../../Helpers/GameProvider/GameRefundList/GameRefundList";
import { Api } from "../../../../../Config/Api";

const StarlineRefundList = () => {
  return (
    <div>
      <GameRefundList refund_list={Api.STARLINE_GAME_REFUND_PAYMENT} />
    </div>
  );
};

export default StarlineRefundList;
