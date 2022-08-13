import { useState, useEffect, useContext } from "react"
import coinurl from "../api/coinurl"
import { Tab } from '@headlessui/react'
import CoinChart from "./CoinChart"
import Link from "next/link";
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const coinList = [
  "bitcoin",
  "ethereum",
  "tether",
]




const CoinSmall = () => {

    const [coins, setCoins] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    function classNames(...classes) {
      return classes.filter(Boolean).join(' ')
    } 


    const showDetails = (id) => {
    console.log('click')
      setId(id)
      setShowCoinDetail(true)
    }

    useEffect(() => {
        console.log("Not getting data")
        setIsLoading(true);
        const fetchData = async () => {
          const { data } = await coinurl.get("/coins/markets", {
            params: { vs_currency: "usd", ids: coinList.join(",") },
          });
          setCoins(data);
          setIsLoading(false);
        };
        if (coinList.length > 0) {
          fetchData();
        } else {
          setCoins([]);
        }
      }, [coinList]);

    return(
        <>
        <div className="">
      {isLoading ? (
       <h1 className="w-full h-20 mb-12 border  flex justify-center items-center
       'rounded-2xl bg-[#f7f8ff] p-3  border-dashed border-indigo-200
       ">LOADING COINS...</h1>
      ) : (
          <div className="w-full max-w-md px-2 py-16 sm:px-0">
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
             BTC
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
             ETH
            </Tab>
            <Tab
              className={({ selected }) =>
                classNames(
                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700',
                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2',
                  selected
                    ? 'bg-white shadow'
                    : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                )
              }
            >
             USDT
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
        {Object.values(coins).map((coin, idx) => (
            <Tab.Panel
            key={idx}
              className={classNames(
                'rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >

                <div>
                  <div className="flex justify-between">
                  <h2 className="text-base font-semibold pb-5 ">Last 24 hours</h2>
                <img className="h-5 w-5" src={coin.image} alt="" />
                </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Low</p>
                        <p className='text-bold text-lg font-semibold'>{coin.low_24h}
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Price</p>
                        <p className='text-bold text-lg font-semibold'>
                        {coin.current_price}
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>High</p>
                        <p className='text-bold text-lg font-semibold'>
                          {coin.high_24h}
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>CHANGE</p>
                        <p
                         className={
                          coin.price_change_percentage_24h < 0
                ? "text-bold text-lg font-semibold text-red-900"
                : "text-bold text-lg font-semibold text-green-900"
                         }
                        >
                        {coin.price_change_percentage_24h.toFixed(3)}{" "}%
                        </p>
                    </div>

                    
                </div>
               <div>
                <button
        
                className=" text-center py-4 w-full bg-[#5A41F5]
                rounded-xl 
                ">
                  DETAILS
                </button>
               </div>
            </Tab.Panel>
            ))}
   
        </Tab.Panels>
      </Tab.Group>
    </div>
      )}
        </div>
        </>
    )
}

export default CoinSmall;