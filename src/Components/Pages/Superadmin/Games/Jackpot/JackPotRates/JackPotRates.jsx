import React from 'react'
import GameRatesProvider from '../../../../../Helpers/GameProvider/GameRates/GameRatesProvider'

const JackPotRates = () => {
  return (
    <GameRatesProvider gameType="JackPot"  path={"/admin/games/jackpotRates"}  title="JackPot Game Rates"/>
  )
}

export default JackPotRates