const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

require("dotenv").config();

const config = require("../config");

// 初始化 Web3 实例
const web3 = new Web3(new Web3.providers.HttpProvider(process.env.RPC_URL));

// 读取 ABI
const routerABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "routerABI.json"), "utf8")
);
const pairABI = JSON.parse(
  fs.readFileSync(path.join(__dirname, "pairABI.json"), "utf8")
);

// 初始化合约
const routerContract = new web3.eth.Contract(routerABI, config.ROUTER_ADDRESS);
const pairContract = new web3.eth.Contract(pairABI, config.PAIR_ADDRESS);

// 获取当前钱包 ETH 余额
async function getEthBalance(address) {
  const balanceWei = await web3.eth.getBalance(address);
  return web3.utils.fromWei(balanceWei, "ether");
}

// 获取 token 余额（使用标准 ERC20 ABI）
async function getTokenBalance(tokenAddress, walletAddress) {
  const erc20ABI = [
    {
      constant: true,
      inputs: [{ name: "_owner", type: "address" }],
      name: "balanceOf",
      outputs: [{ name: "balance", type: "uint256" }],
      type: "function",
    },
  ];
  const tokenContract = new web3.eth.Contract(erc20ABI, tokenAddress);
  const balance = await tokenContract.methods.balanceOf(walletAddress).call();
  return balance;
}

module.exports = {
  web3,
  routerContract,
  pairContract,
  getEthBalance,
  getTokenBalance,
};