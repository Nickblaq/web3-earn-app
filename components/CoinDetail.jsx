import { useState, useEffect } from "react";
import coinurl from "../api/coinurl"

const CoinDetail = ({ id }) => {
      return (
        <div className="">
         <CoinChart data={coinData} />
        </div>
      );
    };


export default CoinDetail;
  