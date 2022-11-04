const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyTokenUpgradableV2 = await ethers.getContractFactory(
    "MyTokenUpgradableV2"
  );
  console.log("Upgrading MyTokenUpgradableV2...");
  await upgrades.upgradeProxy(
    "0xA9dAE821a589C0E50fEf3596D667Af54023713F7",
    MyTokenUpgradableV2
  );
  console.log("Upgraded Successfully");

  // const UpgradablePresaleV2 = await ethers.getContractFactory(
  //   "UpgradablePresaleV2"
  // );
  // console.log("Upgrading UpgradablePresaleV2...");
  // await upgrades.upgradeProxy(
  //   "0xB761813E1bae882CB2e7D49144b1af51D4D7876F",
  //   UpgradablePresaleV2
  // );
  // console.log("Upgraded Successfully");
}

main();