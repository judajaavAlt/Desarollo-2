import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";

// Mocks the supabase api so it always throws error
jest.mock('@supabase/supabase-js', () => {
    return {
      createClient: jest.fn(() => ({
        from: jest.fn(() => ({
          select: jest.fn(() => ({
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
          })),
          insert: jest.fn(() => ({
              error: {message: "FailTest", code: "32"} 
            })
          ),
          update: jest.fn(() => ({
              eq: jest.fn(() => ({
                error: {message: "FailTest", code: "32"} 
              }))
            })),
          delete: jest.fn(() => ({
            eq: jest.fn(() => ({
              select: jest.fn(() => ({
                data: null,
                error: {message: "FailTest", code: "32"} 
              }))
            }))
          }))
        })),
      })),
    };
  });
  
  // Test related to the Wallet port

  // Test related to the Transaction port
