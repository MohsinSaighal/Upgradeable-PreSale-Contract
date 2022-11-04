require("@nomiclabs/hardhat-ethers");
require("@openzeppelin/hardhat-upgrades");
require("@nomiclabs/hardhat-etherscan");
require('dotenv').config();

const ALCHEMY_API_KEY = process.env.API_KEY;

const GOERLI_PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.17",
  networks: {
    matic: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
  },
},
etherscan:{
  apiKey:{
    polygonMumbai:'DDP6X59H3KE2N2F7U8MG22PZIWKYVHQBK5'
  }
},
};