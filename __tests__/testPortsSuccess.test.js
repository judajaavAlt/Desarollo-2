import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";

// Mocks the supabase api so it always works
jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({
      from: jest.fn(() => ({
        select: jest.fn(() => ({
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
        })),
        insert: jest.fn(() => ({
            error: null
          })
        ),
        update: jest.fn(() => ({
            eq: jest.fn(() => ({
              error: null
            }))
          })),
        delete: jest.fn(() => ({
          eq: jest.fn(() => ({
            select: jest.fn(() => ({
              data: [],
              error: null
            }))
          }))
        }))
      })),
    })),
  };
});

// Test related to the Wallet port

// Test related to the Transaction port
