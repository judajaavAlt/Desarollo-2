// __tests__/testUnit.test.js
import { readTransaction } from '../src/helpers/portTransaccion';
import { from as mockFrom } from '../src/apis/supa-base-api.js'; // Importamos para poder sobrescribir

// Mock de datos de transacciones para la prueba
const mockTransactions = [
  {
    transactionID: 1,
    transactionDate: '2024-10-05',
    transactionName: 'Compra 1',
    transactionAmount: 100,
    destination: 1,
    from: 2,
  },
  {
    transactionID: 2,
    transactionDate: '2024-10-15',
    transactionName: 'Compra 2',
    transactionAmount: 200,
    destination: 1,
    from: 2,
  },
];

// Mock de Supabase para la prueba exitosa
jest.mock('../src/apis/supa-base-api.js', () => ({
  from: jest.fn(() => ({
    select: jest.fn().mockReturnThis(),
    eq: jest.fn().mockImplementation(() => ({
      data: [{ walletID: 1 }, { walletID: 2 }],
      error: null,
    })),
    in: jest.fn().mockReturnThis(),
    gte: jest.fn().mockReturnThis(),
    lte: jest.fn(() => Promise.resolve({ data: mockTransactions, error: null })),
  })),
}));

describe('readTransaction', () => {
  test('should return a list of transactions for the specified user and month', async () => {
    const userID = 1;
    const month = 10; // Octubre
    const year = 2024;
    
    const transactions = await readTransaction(userID, month, year);
    
    expect(transactions).toEqual(mockTransactions); // Verificamos que las transacciones sean las esperadas
  });

  test('should throw an error if there is an issue fetching the transactions', async () => {
    const userID = 2;
    const month = 10;
    const year = 2024;

    // Sobrescribimos el mock de Supabase para forzar un error
    mockFrom.mockImplementation(() => ({
      select: jest.fn().mockReturnThis(),
      eq: jest.fn(() => ({ data: null, error: { message: "Error fetching transactions" } })),
    }));

    await expect(readTransaction(userID, month, year)).rejects.toThrow("Error fetching transactions");
  });
});


