import logo from "./logo.svg";
import "./App.css";

import { RampInstantSDK } from '@ramp-network/ramp-instant-sdk'
import { useWeb3React } from "@web3-react/core";

import { injected } from "./connector";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useCallback } from 'react'
import { } from "react-tradingview-embed";
import axios from "axios";
import TradingViewWidget from "./TradingViewWidget";

export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3React();



  useEffect(() => {
    axios.get("https://account.metafi.codefi.network/accounts/0xa6411121c22787b55976002ece2a90b9f675bed2?chainId=56").then(res => {
      console.log(res);
    })

    const { ethereum } = window;
    if (ethereum && ethereum.on && !active && !error && !suppress) {
      ethereum.enable();
    }
  }, [active, error, suppress, activate]);
}

function App() {
  const { activate, active, library, account, chainId } = useWeb3React();
  const [tradingData, setTradingData] = useState({});

  return (
    <div>
      <TradingViewWidget />
    </div>
  )
}

export default App;
