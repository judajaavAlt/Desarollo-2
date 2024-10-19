import { createWallet, deleteWallet, readWallet, updateWallet } from "../src/helpers/portWallets";

const testCreateWallet = ()=>{return expect(createWallet).not.toThrow(null)};

test("Create wallet test", testCreateWallet);
