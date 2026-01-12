import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("StoreDataModule", (m) => {
  const storeData = m.contract("StoreData");
  return { storeData };
});
