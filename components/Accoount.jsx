import { useState, useEffect } from 'react'
import { Tab } from '@headlessui/react'
import CoinSmall from './CoinSmall'
import CoinDetail from './CoinDetail'
import CoinChart from './CoinChart'
import coinurl from '../api/coinurl'
function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const OneCoin = ({id}) => {
  const [isCoinDetail, setcoinDetail] = useState({});
  
  const [isLoading, setIsLoading] = useState(false);
 
  const formatData = (data) => {
    return data.map((el) => {
      return {
        t: el[0],
        y: el[1].toFixed(2),
      };
    });
  };



  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const [resDay, resWeek, resMonth, resYear, detail] = await Promise.all([
        coinurl.get(`/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: "1" },
        }),
        coinurl.get(`/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: "7" },
        }),
        coinurl.get(`/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: "30" },
        }),
        coinurl.get(`/coins/${id}/market_chart`, {
          params: { vs_currency: "usd", days: "365" },
        }),
        coinurl.get("/coins/markets", {
          params: { vs_currency: "usd", ids: id },
        }),
      ]);

      setcoinDetail({
        day: formatData(resDay.data.prices),
        week: formatData(resWeek.data.prices),
        month: formatData(resMonth.data.prices),
        year: formatData(resYear.data.prices),
        detail: detail.data[0],
      });
      setIsLoading(false);
    };

    fetchData();
  }, [id]);


  if (isLoading) {

    return <>
    <div>
      <h1>LOADING...</h1>
    </div>
    </>
  }

  return(

    <>
<CoinChart data={isCoinDetail} />
    
    </>
  )
}


const Account = () => {



  const [showCoinDetail, setShowCoinDetail] = useState(false)
  // const toggleCoinDetail = () => setCoinDetail(!isCoinDetail)
  const [id, setId] = useState(0)


    return (
        <>
        <div className="w-11/12 mx-auto"> 
            <div>
        <div className="flex justify-center mx-auto">
             <svg width="261" height="185" viewBox="0 0 261 185" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M189.58 72.9202L187.9 72.7402V152.18L186.34 151.91L184.11 161.2C184.11 161.2 193.31 160.95 193.31 153.15V79.5902C193.31 74.5702 190.97 73.2202 189.58 72.9202Z" fill="#7774FF"></path><path d="M184.6 73.0902L93.7698 53.2102C92.0251 52.7026 90.2169 52.4467 88.3998 52.4502C77.7398 52.4502 69.0898 56.8102 69.0898 67.4502C69.0932 70.4434 69.7919 73.3948 71.131 76.0717C72.47 78.7487 74.4127 81.0779 76.8058 82.8756C79.1989 84.6734 81.977 85.8905 84.921 86.431C87.8649 86.9715 90.8942 86.8206 93.7698 85.9902V134.99C93.7698 136.662 94.3439 138.284 95.396 139.583C96.448 140.883 97.9144 141.782 99.5498 142.13L181.55 161C182.612 161.227 183.712 161.213 184.768 160.96C185.825 160.707 186.812 160.221 187.656 159.537C188.5 158.854 189.181 157.99 189.649 157.01C190.117 156.029 190.36 154.957 190.36 153.87V80.2302C190.361 78.5609 189.79 76.9417 188.742 75.6424C187.693 74.3432 186.232 73.4424 184.6 73.0902Z" fill="url(#paint0_linear_2565_18502)"></path><path d="M166.57 86.0306L166.1 85.8906V164.221L164.55 163.941L162.32 173.111C162.32 173.111 171.51 172.871 171.51 165.171V92.6406C171.512 91.1529 171.032 89.7045 170.141 88.5128C169.25 87.3211 167.997 86.4501 166.57 86.0306Z" fill="#7774FF"></path><path d="M162.91 86.7101L75.2198 67.2701L72.4698 56.8701C69.1698 62.0201 69.0898 65.9401 69.0898 65.9401V145.94C69.0903 147.611 69.6647 149.231 70.7169 150.529C71.7691 151.827 73.2352 152.724 74.8698 153.07L159.87 172.94C160.932 173.165 162.031 173.15 163.087 172.896C164.143 172.642 165.128 172.156 165.972 171.472C166.816 170.789 167.497 169.927 167.966 168.947C168.434 167.968 168.678 166.896 168.68 165.81V93.8701C168.687 92.1955 168.117 90.5695 167.066 89.2656C166.015 87.9617 164.548 87.0593 162.91 86.7101Z" fill="url(#paint1_linear_2565_18502)"></path><path d="M189.58 72.9197L93.6502 51.8097C89.9491 51.0238 86.1406 50.8784 82.3902 51.3797C78.1802 51.9897 74.6502 53.6297 72.4702 56.8997C70.2902 60.1697 70.7502 62.5297 71.4702 64.0597C74.0202 69.7397 84.7902 71.4497 86.3202 71.6597L165.42 89.2397C165.42 89.2397 168.57 89.7997 168.72 94.7197C168.72 94.7197 170.88 87.3297 166.47 85.9997C166.361 85.9526 166.247 85.9158 166.13 85.8897L86.9702 68.2997H86.8402C84.1502 67.9297 76.1302 66.1097 74.5902 62.6797C74.4102 62.2797 73.8502 61.0497 75.3502 58.8097C76.9802 56.3597 79.6602 55.2497 82.9102 54.8097C86.268 54.3653 89.6769 54.4972 92.9902 55.1997L187.93 76.0997H188.01C188.469 76.2041 188.894 76.4244 189.244 76.7394C189.595 77.0545 189.858 77.4539 190.01 77.8997C190.38 78.9897 190.43 77.1397 190.42 75.8997C190.675 75.6621 190.85 75.351 190.92 75.0097C190.977 74.7841 190.988 74.5491 190.951 74.3194C190.913 74.0896 190.829 73.87 190.704 73.674C190.578 73.4781 190.413 73.31 190.22 73.1803C190.027 73.0505 189.809 72.9618 189.58 72.9197Z" fill="#7774FF"></path><mask id="mask0_2565_18502" maskUnits="userSpaceOnUse" x="92" y="23" width="79" height="60"  style={{maskType: 'alpha'}}><path d="M153 82.9995L99 70.9995L92.0197 45.0712L105.504 23.5979L170.874 38.1348L153 82.9995Z" fill="black"></path></mask><g mask="url(#mask0_2565_18502)"><path d="M153.84 60.4793C153.529 56.577 152.428 52.7787 150.604 49.3148C148.78 45.851 146.272 42.794 143.23 40.3294C141.411 38.8953 139.389 37.7394 137.23 36.8993C136.466 36.6062 135.684 36.3591 134.89 36.1593C133.733 35.8592 132.552 35.6585 131.36 35.5593C130.65 35.5093 129.93 35.4993 129.21 35.5093H129C128.58 35.5093 128.17 35.5093 127.75 35.5693C127.33 35.6293 126.91 35.6594 126.5 35.7194L120.62 36.2393L120.74 37.4993C111.52 41.8693 105.57 52.7793 106.74 64.8993C107.067 69.0503 108.296 73.0798 110.341 76.7068C112.386 80.3338 115.198 83.471 118.58 85.8993C119.603 86.6032 120.68 87.2251 121.8 87.7593C122.55 88.1093 123.32 88.4193 124.09 88.6894C124.6 88.8593 125.09 89.0193 125.64 89.1493L125.76 90.4093L136.3 89.4093L136.66 89.0193C147.6 85.9493 155.11 73.9593 153.84 60.4793Z" fill="#EBB20D"></path><path d="M146.72 61.1489C148.13 76.1489 138.72 89.2589 125.72 90.4789C124.999 90.5486 124.274 90.5786 123.55 90.5689C121.296 90.5504 119.06 90.1654 116.93 89.4289C116.151 89.1587 115.387 88.8483 114.64 88.4989C113.519 87.9647 112.443 87.3427 111.42 86.6389C108.032 84.2052 105.216 81.0601 103.171 77.424C101.126 73.7878 99.9001 69.7485 99.5801 65.5889C98.1701 50.5889 107.58 37.4789 120.58 36.2589C122.982 36.0258 125.406 36.2188 127.74 36.8289C128.533 37.0316 129.315 37.2786 130.08 37.5689C132.239 38.4089 134.261 39.5649 136.08 40.9989C139.126 43.4616 141.64 46.5176 143.469 49.9814C145.298 53.4452 146.404 57.2446 146.72 61.1489Z" fill="#FFCC13"></path><g opacity="0.31"><path opacity="0.31" d="M121.37 44.6697C112.37 45.5097 105.88 54.5897 106.85 64.8997C107.82 75.2097 115.92 82.8997 124.85 82.0797C133.78 81.2597 140.33 72.1497 139.36 61.8397C138.39 51.5297 130.34 43.8697 121.37 44.6697Z" fill="white"></path></g><path opacity="0.4" d="M107.85 65.0193C106.8 53.9293 113.77 44.2193 123.41 43.3093H123.71C122.888 43.2393 122.062 43.2393 121.24 43.3093C111.6 44.2193 104.63 53.9293 105.67 65.0193C106.71 76.1093 115.2 84.1593 124.72 83.4493C116.12 82.8693 108.8 75.1393 107.85 65.0193Z" fill="#CE8B05"></path><path opacity="0.4" d="M140.58 61.7298C139.63 51.5998 132.31 43.8698 123.71 43.2998H123.41C113.77 44.2098 106.8 53.9198 107.85 65.0098C108.8 75.1298 116.12 82.8598 124.72 83.4398H125.02C134.66 82.5298 141.63 72.8098 140.58 61.7298Z" fill="#E49D01"></path><g opacity="0.2" style={{mixBlendMode: 'screen'}}><path d="M153.84 60.4793C153.529 56.577 152.428 52.7787 150.604 49.3148C148.78 45.851 146.272 42.794 143.23 40.3294C141.411 38.8953 139.389 37.7394 137.23 36.8993C136.466 36.6062 135.684 36.3591 134.89 36.1593C133.733 35.8592 132.552 35.6585 131.36 35.5593C130.65 35.5093 129.93 35.4993 129.21 35.5093H129C128.58 35.5093 128.17 35.5093 127.75 35.5693C127.33 35.6293 126.91 35.6594 126.5 35.7194L120.62 36.2393L120.74 37.4993C111.52 41.8693 105.57 52.7793 106.74 64.8993C107.067 69.0503 108.296 73.0798 110.341 76.7068C112.386 80.3338 115.198 83.471 118.58 85.8993C119.603 86.6032 120.68 87.2251 121.8 87.7593C122.55 88.1093 123.32 88.4193 124.09 88.6894C124.6 88.8593 125.09 89.0193 125.64 89.1493L125.76 90.4093L136.3 89.4093L136.66 89.0193C147.6 85.9493 155.11 73.9593 153.84 60.4793Z" fill="#EBB20D"></path><path d="M146.72 61.1489C148.13 76.1489 138.72 89.2589 125.72 90.4789C124.999 90.5486 124.274 90.5786 123.55 90.5689C121.296 90.5504 119.06 90.1654 116.93 89.4289C116.151 89.1587 115.387 88.8483 114.64 88.4989C113.519 87.9647 112.443 87.3427 111.42 86.6389C108.032 84.2052 105.216 81.0601 103.171 77.424C101.126 73.7878 99.9001 69.7485 99.5801 65.5889C98.1701 50.5889 107.58 37.4789 120.58 36.2589C122.982 36.0258 125.406 36.2188 127.74 36.8289C128.533 37.0316 129.315 37.2786 130.08 37.5689C132.239 38.4089 134.261 39.5649 136.08 40.9989C139.126 43.4616 141.64 46.5176 143.469 49.9814C145.298 53.4452 146.404 57.2446 146.72 61.1489Z" fill="#FFCC13"></path><g opacity="0.31"><path opacity="0.31" d="M121.37 44.6697C112.37 45.5097 105.88 54.5897 106.85 64.8997C107.82 75.2097 115.92 82.8997 124.85 82.0797C133.78 81.2597 140.33 72.1497 139.36 61.8397C138.39 51.5297 130.34 43.8697 121.37 44.6697Z" fill="white"></path></g><path opacity="0.4" d="M107.85 65.0193C106.8 53.9293 113.77 44.2193 123.41 43.3093H123.71C122.888 43.2393 122.062 43.2393 121.24 43.3093C111.6 44.2193 104.63 53.9293 105.67 65.0193C106.71 76.1093 115.2 84.1593 124.72 83.4493C116.12 82.8693 108.8 75.1393 107.85 65.0193Z" fill="#CE8B05"></path><path opacity="0.4" d="M140.58 61.7298C139.63 51.5998 132.31 43.8698 123.71 43.2998H123.41C113.77 44.2098 106.8 53.9198 107.85 65.0098C108.8 75.1298 116.12 82.8598 124.72 83.4398H125.02C134.66 82.5298 141.63 72.8098 140.58 61.7298Z" fill="#E49D01"></path></g></g><path d="M176.88 119.93L145.59 112.32C143.289 111.813 140.888 112.037 138.72 112.96L138.47 113.09C138.2 113.21 137.93 113.35 137.67 113.49L133.45 115.61L134.15 116.48C132.59 118.479 131.746 120.944 131.75 123.48V124.17C131.751 126.775 132.645 129.302 134.282 131.329C135.92 133.356 138.203 134.761 140.75 135.31L172.13 142.95L173.97 145.24L177.68 143.39L177.9 143.28L178.02 143.22C178.583 142.896 179.051 142.43 179.378 141.868C179.704 141.307 179.877 140.669 179.88 140.02V123.58C179.874 122.719 179.573 121.887 179.027 121.223C178.481 120.558 177.723 120.102 176.88 119.93Z" fill="#4E32FC"></path><path d="M170.91 145.87L136.32 137.54C133.773 136.988 131.491 135.58 129.854 133.552C128.217 131.524 127.322 128.996 127.32 126.39V125.7C127.321 123.993 127.704 122.309 128.442 120.77C129.179 119.232 130.252 117.878 131.582 116.808C132.911 115.738 134.464 114.98 136.125 114.59C137.786 114.199 139.513 114.185 141.18 114.55L172.47 122.16C173.303 122.346 174.047 122.81 174.581 123.475C175.116 124.14 175.408 124.967 175.41 125.82V142.22C175.408 142.774 175.283 143.322 175.044 143.822C174.804 144.322 174.457 144.763 174.026 145.113C173.595 145.462 173.092 145.711 172.553 145.842C172.014 145.973 171.453 145.983 170.91 145.87Z" fill="#7774FF"></path><path d="M144.44 126.471C144.44 127.541 144.123 128.586 143.528 129.476C142.934 130.366 142.089 131.059 141.1 131.469C140.112 131.878 139.024 131.985 137.975 131.777C136.925 131.568 135.961 131.053 135.205 130.296C134.448 129.539 133.933 128.575 133.724 127.526C133.515 126.477 133.622 125.389 134.032 124.4C134.441 123.412 135.135 122.567 136.024 121.972C136.914 121.378 137.96 121.061 139.03 121.061C139.741 121.061 140.444 121.2 141.1 121.472C141.757 121.744 142.353 122.143 142.856 122.645C143.358 123.147 143.756 123.744 144.028 124.4C144.3 125.057 144.44 125.76 144.44 126.471Z" fill="#4C30F8"></path><path d="M119 7L120.192 10.1222C120.559 11.0715 121.122 11.9337 121.842 12.6536C122.562 13.3734 123.425 13.9351 124.375 14.3027L127.5 15.5066L124.375 16.6973C123.425 17.0649 122.562 17.6266 121.842 18.3464C121.122 19.0663 120.559 19.9285 120.192 20.8778L119 24L117.795 20.8778C117.429 19.9272 116.868 19.064 116.147 18.3438C115.427 17.6237 114.563 17.0627 113.611 16.6973L110.5 15.5066L113.611 14.3027C114.563 13.9373 115.427 13.3763 116.147 12.6562C116.868 11.936 117.429 11.0728 117.795 10.1222L119 7Z" fill="#C4C9FA"></path><path d="M45.5 34L46.3423 36.203C46.6028 36.8736 47.0001 37.4826 47.5088 37.9912C48.0174 38.4999 48.6264 38.8971 49.297 39.1577L51.5 40L49.297 40.8423C48.624 41.0986 48.0128 41.4943 47.5036 42.0036C46.9944 42.5128 46.5986 43.124 46.3423 43.797L45.5 46L44.6447 43.797C44.3906 43.1248 43.9971 42.5141 43.4901 42.0048C42.9831 41.4956 42.374 41.0994 41.703 40.8423L39.5 40L41.703 39.1577C42.3712 38.8956 42.9777 38.4977 43.484 37.9891C43.9904 37.4805 44.3856 36.8723 44.6447 36.203L45.5 34Z" fill="#C4C9FA"></path><path d="M182.008 28L182.913 30.3856C183.196 31.1102 183.626 31.7678 184.178 32.3164C184.729 32.865 185.388 33.2924 186.114 33.5714L188.5 34.4925L186.114 35.4135C185.387 35.6933 184.726 36.1228 184.174 36.6742C183.623 37.2256 183.193 37.8866 182.913 38.6144L182.008 41L181.087 38.6144C180.812 37.8837 180.384 37.2201 179.832 36.668C179.28 36.116 178.616 35.6883 177.886 35.4135L175.5 34.4925L177.886 33.5714C178.614 33.2966 179.276 32.8706 179.827 32.3215C180.379 31.7723 180.808 31.1126 181.087 30.3856L182.008 28Z" fill="#C4C9FA"></path><path d="M46.9936 95L47.6373 96.8455C47.8329 97.4021 48.1309 97.9072 48.5122 98.3284C48.8936 98.7497 49.3499 99.0778 49.8519 99.2919L51.5 100.007L49.8519 100.708C49.3486 100.924 48.8915 101.254 48.5101 101.678C48.1287 102.102 47.8314 102.61 47.6373 103.169L46.9936 105L46.3627 103.169C46.1686 102.61 45.8713 102.102 45.4899 101.678C45.1085 101.254 44.6514 100.924 44.1481 100.708L42.5 100.007L44.1481 99.2919C44.6501 99.0778 45.1064 98.7497 45.4878 98.3284C45.8691 97.9072 46.1671 97.4021 46.3627 96.8455L46.9936 95Z" fill="#C4C9FA"></path><path d="M213.507 66L214.208 67.8312C214.424 68.3904 214.754 68.8983 215.178 69.3221C215.602 69.7459 216.11 70.0762 216.669 70.2918L218.5 70.9929L216.669 71.7082C216.111 71.9222 215.604 72.2503 215.18 72.6716C214.757 73.0928 214.425 73.5979 214.208 74.1545L213.507 76L212.792 74.1545C212.575 73.5979 212.244 73.0928 211.82 72.6716C211.396 72.2503 210.889 71.9222 210.331 71.7082L208.5 70.9929L210.331 70.2918C210.89 70.0762 211.398 69.7459 211.822 69.3221C212.246 68.8983 212.576 68.3904 212.792 67.8312L213.507 66Z" fill="#C4C9FA"></path><defs><linearGradient id="paint0_linear_2565_18502" x1="60.4999" y1="66.5" x2="198.263" y2="172.815" gradientUnits="userSpaceOnUse"><stop stop-color="#4021FC"></stop><stop offset="1" stop-color="#553AFC"></stop></linearGradient><linearGradient id="paint1_linear_2565_18502" x1="62.9999" y1="90.5" x2="168.5" y2="141.5" gradientUnits="userSpaceOnUse"><stop stop-color="#6C55FB"></stop><stop offset="1" stop-color="#593EFF"></stop></linearGradient></defs></svg>
        </div>

        <div className="mb-4">
           <h2 className="text-center">Welcome to Haru Invest</h2> 
           <p className="text-center">Make your first investment today.</p>
           <button className="w-full py-4 bg-[#5A41F5]">
            Deposit to Haru invest
           </button>
        </div>
        

        <div className='text-center'>
            <p className='text-[#5A41F5] text-5xl font-black '>$ {" "} 0.00</p>
            <h1 className='pt-3 '>Total Balance</h1>
        </div>

        <div className="w-full max-w-md px-2 pt-16 sm:px-0">
        <h2 className='text-2xl font-semibold pb-5 text-[#5A41F5]'>Accumulated Earnings</h2>
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
              ALL
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
              24H
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
              7D
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
              1M
            </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                <div>
                    <h2 className='text-base font-semibold pb-5'>Day 4 at Haru</h2>

              
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Bitcoin</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>BTC</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Ethereum</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>ETH</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Tether</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>USDT</span>
                        </p>
                    </div>

                    <div className='flex justify-between pb-3'>
                        <p className='text-xs'>Accumulated {" "} 
                        <br></br>
                        Total Earning in USD</p>
                        <p className='text-[#5A41F5] font-bold text-2xl'>$ 0.00</p>
                    </div>
                </div>
             
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                <div>
                    <h2 className='text-lg font-bold pb-5'>Day 4 at Haru</h2>

              
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Bitcoin</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>BTC</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Ethereum</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>ETH</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Tether</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>USDT</span>
                        </p>
                    </div>

                    <div className='flex justify-between pb-3'>
                        <p className='text-xs'>Accumulated {" "} 
                        <br></br>
                        Total Earning in USD</p>
                        <p className='text-[#5A41F5] font-bold text-2xl'>$ 0.00</p>
                    </div>
                </div>
             
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                <div>
                    <h2 className='text-lg font-bold pb-5'>Day 4 at Haru</h2>

              
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal '>BITCOIN</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>BTC</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>ETHEREUM</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>ETH</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>TETHER</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>USDT</span>
                        </p>
                    </div>

                    <div className='flex justify-between pb-3'>
                        <p className='text-xs'>Accumulated {" "} 
                        <br></br>
                        Total Earning in USD</p>
                        <p className='text-[#5A41F5] font-bold text-2xl'>$ 0.00</p>
                    </div>
                </div>
             
            </Tab.Panel>
            <Tab.Panel
              className={classNames(
                'rounded-xl bg-[#f7f8ff] p-3 border border-dashed border-indigo-600',
                'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
              )}
            >
                <div>
                    <h2 className='text-lg font-bold pb-5'>Day 4 at Haru</h2>

              
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Bitcoin</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>BTC</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Ethereum</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>ETH</span>
                        </p>
                    </div>
                    <div className='flex justify-between pb-3'>
                        <p className='text-lg font-normal'>Tether</p>
                        <p className='text-bold text-lg font-semibold'>0
                            <span className='ml-2 text-base font-normal text-gray-400'>USDT</span>
                        </p>
                    </div>

                    <div className='flex justify-between pb-3'>
                        <p className='text-xs'>Accumulated {" "} 
                        <br></br>
                        Total Earning in USD</p>
                        <p className='text-[#5A41F5] font-bold text-2xl'>$ 0.00</p>
                    </div>
                </div>
             
            </Tab.Panel>
   
        </Tab.Panels>
      </Tab.Group>
    </div>

    


        <div>
      
          <CoinSmall  setShowCoinDetail={setShowCoinDetail} setId={setId} />
        </div>
        </div>
      </div>


        </>
    )
}

export default Account