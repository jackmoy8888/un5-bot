require('dotenv').config();
const Web3 = require('web3');
const { TOKEN_ADDRESS, PAIR_ADDRESS, ROUTER_ADDRESS, WALLET_ADDRESS, SLIPPAGE, GAS_LIMIT, TRADE_AMOUNT_ETH, CHECK_INTERVAL } = require('./config');
const { getTokenAmountOut, executeSwap } = require('./helper/web3Helper');

const web3 = new Web3(process.env.RPC_URL);
const privateKey = process.env.PRIVATE_KEY;

async function runBot() {
  try {
    const amountOut = await getTokenAmountOut(web3, ROUTER_ADDRESS, TRADE_AMOUNT_ETH, TOKEN_ADDRESS);
    console.log([${new Date().toLocaleString()}] Estimated output: ${amountOut} UN5);

    // 👇可自定义策略，例如触发时买入（简单示例）
    if (amountOut && parseFloat(amountOut) > 0) {
      console.log(Triggering swap for ${TRADE_AMOUNT_ETH} ETH...);

      const tx = await executeSwap(web3, {
        privateKey,
        routerAddress: ROUTER_ADDRESS,
        fromAddress: WALLET_ADDRESS,
        amountInETH: TRADE_AMOUNT_ETH,
        toToken: TOKEN_ADDRESS,
        slippage: SLIPPAGE,
        gasLimit: GAS_LIMIT
      });

      console.log('✅ Swap success! Tx Hash:', tx.transactionHash);
    } else {
      console.log('No profitable trade at this time.');
    }

  } catch (error) {
    console.error('❌ Bot error:', error.message);
  }
}

// 自动循环运行
setInterval(runBot, CHECK_INTERVAL);
console.log('🤖 UN5 ETH Bot 正在运行...');