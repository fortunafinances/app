import { useQuery } from "@apollo/client"
import { GET_WATCHLIST } from "../../utilities/graphQL"



export default function WatchlistItem() {
  const { loading, error, data } = useQuery<StockData>(GET_WATCHLIST, {})
  return (
    <div className='card'>
      <div className='card-body'></div>
    </div>
  )
}
