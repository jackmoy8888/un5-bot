\# UN5 Bot



UN5 Trading Bot for Uniswap V3 \& V4 – Automatically simulates buy/sell volume and tracks LP activity for market-making.



\## 🔧 Features



\- Auto-buy / auto-sell to simulate real user behavior  

\- Stealth operation (random gas, human-like delays)  

\- Liquidity tracking (Uniswap V3/V4 LP position monitors)  

\- Supports ETH, BNB, Solana networks  

\- Configurable trading strategy (full-range, fixed target, threshold)



\## 📂 File Structure





un5-bot/

├── config/

│   ├── config.js               # Bot config (wallet, pair, strategy)

│   ├── router.js               # Router ABI/contract

│   └── pairABI.json            # Pair ABI

├── helpers/

│   └── web3Helper.js           # Web3 setup and TX helpers

├── .env                        # Private keys and secrets

├── tradeBot.js                 # Main logic

├── README.md                   # This file





\## ✅ Setup



1\. Install Node.js and npm  

2\. Clone repo and run:



bash

npm install

cp .env.example .env    # create and edit .env

node tradeBot.js





3\. Inside .env, set:



env

PRIVATE\_KEY=your\_private\_key\_here

RPC\_URL=https://mainnet.infura.io/v3/xxx

PAIR\_ADDRESS=0xUniswapPairAddress





\## 📄 License



MIT © UN5Coin Team

