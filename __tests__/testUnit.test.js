import { createWallet, deleteWallet, readWallet, updateWallet } from "../src/helpers/portWallets";

const testCreateWallet = ()=>{return expect(createWallet).not.toThrow(Error);};

test("Create wallet test", testCreateWallet);


const testReadWallet = ()=>{return expect(readWallet).not.toThrow(Error);};

test("Read wallet test", testReadWallet);
