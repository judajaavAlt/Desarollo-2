import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createUser, deleteUser, readUser, updateUser } from "../src/helpers/portUsers";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";
import { createCategory, readCategoriesByType, updateCategory, deleteCategory } from "../src/helpers/portCategory";
import { createMovement, readMovements, updateMovement, deleteMovement } from "../src/helpers/portMovements";

// Mocks the supabase api so it always works
const mockSelect = jest.fn(() => ({
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

const mockDelete = jest.fn(() => ({
    eq: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: null
      }))
    }))
  }));

const mockUpdate = jest.fn(() => ({
    eq: jest.fn(() => ({
      error: null
    }))
  }));

jest.mock('@supabase/supabase-js', () => {
  return {
    createClient: jest.fn(() => ({
      from: jest.fn(() => ({
        select: mockSelect,
        insert: jest.fn(() => ({
            error: null
          })
        ),
        update: mockUpdate,
        delete: mockDelete
      })),
    })),
  };
});

// Test related to the User port
test("Work createUser test", ()=>{expect(createUser()).resolves.not.toThrow();});
test("Work readUser test", ()=>{expect(readUser()).resolves.not.toThrow();});
test("Work updateUser test", ()=>{expect(updateUser()).resolves.not.toThrow();});
test("Work deleteUser test", ()=>{expect(deleteUser()).resolves.not.toThrow();});

// Test related to the Wallet port
test("Work readWallet test", ()=>{expect(readWallet()).resolves.not.toThrow();});
test("Work createWallet test", ()=>{expect(createWallet()).resolves.not.toThrow();});
test("Work updateWallet test", ()=>{expect(updateWallet()).resolves.not.toThrow();});
test("Work deleteWallet test", ()=>{expect(deleteWallet()).resolves.not.toThrow();});

// Test related to the Transaction port
test("Work readTransaction test", ()=>{expect(readTransaction()).resolves.not.toThrow();});
test("Work updateTransaction test", () => {expect(updateTransaction()).resolves.not.toThrow();});
test("Work deleteTransaction test", () => {expect(deleteTransaction()).resolves.not.toThrow();});
test("Work createTransaction test", () => {expect(createTransaction()).resolves.not.toThrow();});

// Test related to the Categories port
test("Work readCategoriesByType test", () => {expect(readCategoriesByType()).resolves.not.toThrow();});
test("Work createCategory test", () => {expect(createCategory()).resolves.not.toThrow();});
test("Work updateCategory test", () => {expect(updateCategory()).resolves.not.toThrow();});
test("Work deleteCategory test", () => {expect(deleteCategory()).resolves.not.toThrow();});

// Test related to the Movement port
test("Work createMovement test", () => { expect(createMovement()).resolves.not.toThrow(); });
test("Work readMovements test", () => { expect(readMovements()).resolves.not.toThrow(); });
test("Work updateMovement test", () => { expect(updateMovement()).resolves.not.toThrow(); });
test("Work deleteMovement test", () => { expect(deleteMovement()).resolves.not.toThrow(); });