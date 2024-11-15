import PagesIndex from '../../../../PagesIndex'
import GameRatesProvider from '../../../../../Helpers/GameProvider/GameRates/GameRatesProvider'

const StarLineGameRate = () => {
    


  return (
    <>
    <GameRatesProvider gameType="StarLine"  path={"/admin/games/starlinegamerates"}  title="StarLine Game Rates"/>
  
    </>

  )
}

export default StarLineGameRate