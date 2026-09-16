"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { BudgetLimit, Transaction } from "@/types/finance";
import { INITIAL_TRANSACTIONS } from "@/types/initial-data";

interface FinanceContextType {
	transactions: Transaction[];
	addTransaction: (tx: Omit<Transaction, "id">) => void;
	deleteTransaction: (id: string) => void;
	budgetLimits: BudgetLimit[];
	updateBudgetLimit: (category: string, limit: number) => void;
	totalIncome: number;
	totalExpenses: number;
	netSavings: number;
	expensesByCategory: {
		category: string;
		amount: number;
		percentage: number;
	}[];
	isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [budgetLimits, setBudgetLimits] = useState<BudgetLimit[]>([
		{ category: "Alimentação & Mercado", limit: 2000 },
		{ category: "Moradia & Contas", limit: 3200 },
		{ category: "Transporte & Mobilidade", limit: 600 },
		{ category: "Lazer & Entretenimento", limit: 800 },
		{ category: "Saúde & Bem-estar", limit: 700 },
		{ category: "Assinaturas & Software", limit: 300 },
	]);

	useEffect(() => {
		let timer: NodeJS.Timeout;
		try {
			const saved = localStorage.getItem("finance_os_transactions");
			if (saved) {
				setTransactions(JSON.parse(saved));
			} else {
				setTransactions(INITIAL_TRANSACTIONS as unknown as Transaction[]);
			}
		} catch {
			setTransactions(INITIAL_TRANSACTIONS as unknown as Transaction[]);
		}
		timer = setTimeout(() => setIsLoading(false), 350);
		return () => clearTimeout(timer);
	}, []);

	const saveToStorage = (updated: Transaction[]) => {
		try {
			localStorage.setItem("finance_os_transactions", JSON.stringify(updated));
		} catch {
			// fallback silencioso
		}
	};

	const addTransaction = (newTx: Omit<Transaction, "id">) => {
		const tx: Transaction = {
			...newTx,
			id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
		};
		const updated = [tx, ...transactions];
		setTransactions(updated);
		saveToStorage(updated);
	};

	const deleteTransaction = (id: string) => {
		const updated = transactions.filter((t) => t.id !== id);
		setTransactions(updated);
		saveToStorage(updated);
	};

	const updateBudgetLimit = (category: string, limit: number) => {
		setBudgetLimits((prev) =>
			prev.map((b) => (b.category === category ? { ...b, limit } : b)),
		);
	};

	const totalIncome = transactions
		.filter((t) => t.type === "income")
		.reduce((acc, curr) => acc + curr.amount, 0);

	const totalExpenses = transactions
		.filter((t) => t.type === "expense")
		.reduce((acc, curr) => acc + curr.amount, 0);

	const netSavings = totalIncome - totalExpenses;

	const expenseMap = transactions
		.filter((t) => t.type === "expense")
		.reduce(
			(acc, curr) => {
				acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
				return acc;
			},
			{} as Record<string, number>,
		);

	const expensesByCategory = Object.entries(expenseMap)
		.map(([category, amount]) => ({
			category,
			amount,
			percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
		}))
		.sort((a, b) => b.amount - a.amount);

	return (
		<FinanceContext.Provider
			value={{
				transactions,
				addTransaction,
				deleteTransaction,
				budgetLimits,
				updateBudgetLimit,
				totalIncome,
				totalExpenses,
				netSavings,
				expensesByCategory,
				isLoading,
			}}
		>
			{children}
		</FinanceContext.Provider>
	);
}

export function useFinance() {
	const context = useContext(FinanceContext);
	if (!context) {
		throw new Error("useFinance deve ser usado dentro de um FinanceProvider");
	}
	return context;
}
