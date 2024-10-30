import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";

// Mocks the supabase api so it always throws error

const mockSelect = jest.fn(() => ({
    eq: jest.fn(() => ({
      data: null, 
      error: {message: "FailTest", code: "32"} 
    })),
    in: jest.fn(() =>({
      gte: jest.fn(() => ({
        lte: jest.fn(() => ({
          data: null,
          error:{message: "FailTest", code: "32"} 
        }))
      }))
    }))
  }));

const mockUpdate = jest.fn(() => ({
    eq: jest.fn(() => ({
      error: {message: "FailTest", code: "32"} 
    }))
  }));

const mockDelete = jest.fn(() => ({
    eq: jest.fn(() => ({
      select: jest.fn(() => ({
        data: null,
        error: {message: "FailTest", code: "32"} 
      }))
    }))
  }));

jest.mock('@supabase/supabase-js', () => {
    return {
      createClient: jest.fn(() => ({
        from: jest.fn(() => ({
          select: mockSelect,
          insert: jest.fn(() => ({
              error: {message: "FailTest", code: "32"} 
            })
          ),
          update: mockUpdate,
          delete: mockDelete
        })),
      })),
    };
  });
  
  // Test related to the Wallet port
  test("Fail readWallet test", ()=>{expect(readWallet()).rejects.toThrow();});
  test("Fail createWallet test", ()=>{expect(createWallet()).rejects.toThrow();});
  test("Fail updateWallet test", ()=>{expect(updateWallet()).rejects.toThrow();});

  // Test related to the Transaction port
  test("Fail updateTransaction test", () => {expect(updateTransaction()).rejects.toThrow();});