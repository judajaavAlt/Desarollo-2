import { createWallet, deleteWallet, readWallet, updateWallet } from "../src/helpers/portWallets";

const testCreateWallet = ()=>{return expect(createWallet).not.toThrow(Error)};

test("Create wallet test", testCreateWallet);
