import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";

// Mocks the supabase api so it always works
const select = jest.fn(() => ({
    eq: jest.fn(() => ({
      data: [], 
      error: null 
    })),
    in: jest.fn(() =>({
      gte: jest.fn(() => ({
        lte: jest.fn(() => ({
          data: [],
          error:null
        }))
      }))
    }))
  }));

const fnDelete = jest.fn(() => ({
    eq: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: null
      }))
    }))
  }));

const update = jest.fn(() => ({
    eq: jest.fn(() => ({
      error: null
    }))
  }));

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({
      from: jest.fn(() => ({
        select: select,
        insert: jest.fn(() => ({
            error: null
          })
        ),
        update: update,
        delete: fnDelete
      })),
    })),
  };
});

// Test related to the Wallet port
test("Work readWallet test", ()=>{expect(readWallet()).resolves.not.toThrow();});
test("Work createWallet test", ()=>{expect(createWallet()).resolves.not.toThrow();});
test("Work updateWallet test", ()=>{expect(updateWallet()).resolves.not.toThrow();});

// Test related to the Transaction port
test("Work updateTransaction test", () => {expect(updateTransaction()).resolves.not.toThrow();});