


const Earn = () => {

    return (
        <>
        <div  className="w-11/12 mx-auto">
            <h1 className='text-base font-bold py-4'>Products</h1>
            <h2 className="text-[#5A41F5] font-normal text-lg">EarnPlus</h2>

            <p className="text-lg font-semibold mb-6 pt-4">Earn up to 14.5% APR every single day</p>


            <div class="rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600
                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">
        <div className="flex justify-between">
            <p class="rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">Pricipal guaranteed</p>
        <span class="rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">15-365 days lock</span>
        </div>
        <div className='flex justify-between pb-3 pt-8'>
                        <p className='text-lg font-normal'>Bitcoin
                        <span className="ml-1 text-base font-normal text-gray-400">(BTC)</span>
                        </p>
                        <p className='text-bold text-lg font-semibold'>Up to 13.5%
                        </p>
                    </div>
        <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Ethereum
                        <span className="ml-1 text-base font-normal text-gray-400">(ETH)</span>
                        </p>
                        <p className='text-bold text-lg font-semibold'>Up to 13.5%
                        </p>
                    </div>
        <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Tether
                        <span className="ml-1 text-base font-normal text-gray-400">(USDT)</span>
                        </p>
                        <p className='text-bold text-lg font-semibold'>Up to 14.5%
                        </p>
                    </div>

                    <button
        
        className=" text-center p-4 mt-4 w-full bg-[#5A41F5]
        rounded-xl 
        ">
          DETAILS
        </button>
</div>



<div className="pt-12">
<h2 className="text-[#5A41F5] font-normal text-lg">Earn Explore</h2>
<p className="text-lg font-semibold mb-6 pt-4">Earn up to 25% APR with top trading strategies</p>

<div class="rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600
                ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2">

<div className="flex items-center space-x-8">
<img className="h-8 w-8" src="/bitcoin.webp" />
<div className="flex-1">
<p>Earn Like the Best</p>
<p>Target Return <span className="text-[#5A41F5]"> 25%+ APR</span> </p>
<div className="flex space-x-5 pt-2">
            <p class="rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">BTC</p>
        <span class="rounded-full px-3 py-1.5 bg-green-100 text-green-600 font-medium text-xs">3+ months</span>
        </div>
</div>
</div>
</div>

</div>


        </div>
        </>
    )
}

export default Earn