import { createTransaction, readTransaction, updateTransaction, deleteTransaction } from "../src/helpers/portTransaccion";
import { createUser, deleteUser, readUser, updateUser } from "../src/helpers/portUsers";
import { createWallet, readWallet, updateWallet, deleteWallet } from "../src/helpers/portWallets";
import { createCategory, readCategoriesByUserId, updateCategory, deleteCategory } from "../src/helpers/portCategory";

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
  
  // Test related to the User port
  test("Fail createUser test", ()=>{expect(createUser()).rejects.toThrow();});
  test("Fail readUser test", ()=>{expect(readUser()).rejects.toThrow();});
  test("Fail updateUser test", ()=>{expect(updateUser()).rejects.toThrow();});
  test("Fail deleteUser test", ()=>{expect(deleteUser()).rejects.toThrow();});

  // Test related to the Wallet port
  test("Fail readWallet test", ()=>{expect(readWallet()).rejects.toThrow();});
  test("Fail createWallet test", ()=>{expect(createWallet()).rejects.toThrow();});
  test("Fail updateWallet test", ()=>{expect(updateWallet()).rejects.toThrow();});
  test("Fail deleteWallet test", ()=>{expect(deleteWallet()).rejects.toThrow();});

  // Test related to the Transaction port
  test("Fail readTransaction test", ()=>{expect(readTransaction()).rejects.toThrow();});
  test("Fail updateTransaction test", () => {expect(updateTransaction()).rejects.toThrow();});
  test("Fail deleteTrasanction test", () => {expect(deleteTransaction()).rejects.toThrow();});
  test("Fail createTrasanction test", () => {expect(createTransaction()).rejects.toThrow();});

  // Test related to the Categories port
  test("Fail readCategoriesByUserId test", () => {expect(readCategoriesByUserId()).rejects.toThrow();});
  test("Fail updateCategory test", () => {expect(updateCategory()).rejects.toThrow();});
  test("Fail deleteCategory test", () => {expect(deleteCategory()).rejects.toThrow();});
  test("Fail createCategory test", () => {expect(createCategory()).rejects.toThrow();});

  
