const { ethers, upgrades } = require("hardhat");

async function main() {
  const MyTokenUpgradable = await ethers.getContractFactory(
    "MyTokenUpgradable"
  );
   console.log("Deploying MyTokenUpgradable...");
  const contract = await upgrades.deployProxy(MyTokenUpgradable, [], {
    initializer: "initialize",
    kind: "transparent",
  });
  await contract.deployed();
  console.log("MyTokenUpgradable deployed to:", contract.address);
  
    const UpgradablePresale = await ethers.getContractFactory("UpgradablePresale");
    console.log("Deploying UpgradablePresale...");
    const sale = await upgrades.deployProxy(UpgradablePresale,[contract.address], {
        initializer: "initialize",
        kind: "transparent",
    });
    await sale.deployed();
    console.log("UpgradablePresale deployed to:", sale.address);

}

main();