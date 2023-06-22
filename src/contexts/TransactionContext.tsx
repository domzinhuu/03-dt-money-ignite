import { ReactNode, useEffect, useState } from "react";
import { asyncRequestSimulate } from "../utils/functions";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
  id: number;
  description: string;
  type: string;
  price: number;
  category: string;
  createdAt: string;
}

interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  createTransaction: (data: CreateTransaction) => Promise<void>;
}

interface TransactionsProviderProps {
  children: ReactNode;
}

interface CreateTransaction {
  description: string;
  type: string;
  price: number;
  category: string;
}

export const TransactionContext = createContext({} as TransactionContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("/transactions", {
      params: {
        q: query,
        _sort: "createdAt",
        _order: "DESC",
      },
    });

    setTransactions(response.data);
  }

  async function createTransaction(data: CreateTransaction) {
    const { description, category, price, type } = data;
    await asyncRequestSimulate();

    const response = await api.post("/transactions", {
      description,
      category,
      price,
      type,
      createdAt: new Date(),
    });

    setTransactions((current) => [response.data, ...current]);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, fetchTransactions, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
