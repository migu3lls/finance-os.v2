"use client";

import type React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import type { Account, BudgetLimit, Transaction } from "@/types/finance";
import { INITIAL_ACCOUNTS, INITIAL_TRANSACTIONS } from "@/types/initial-data";

interface FinanceContextType {
	transactions: Transaction[];
	accounts: Account[];
	addTransaction: (tx: Omit<Transaction, "id">) => void;
	updateTransaction: (id: string, tx: Partial<Transaction>) => void;
	deleteTransaction: (id: string) => void;
	addAccount: (acc: Omit<Account, "id">) => void;
	budgetLimits: BudgetLimit[];
	updateBudgetLimit: (category: string, limit: number) => void;
	totalIncome: number;
	totalExpenses: number;
	netSavings: number;
	totalBalance: number;
	expensesByCategory: {
		category: string;
		amount: number;
		percentage: number;
	}[];
	importTransactions: (imported: Omit<Transaction, "id">[]) => void;
	isLoading: boolean;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
	const [transactions, setTransactions] = useState<Transaction[]>([]);
	const [accounts, setAccounts] = useState<Account[]>(INITIAL_ACCOUNTS);
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
			const savedTx = localStorage.getItem("finance_os_transactions");
			const savedAcc = localStorage.getItem("finance_os_accounts");

			if (savedTx) {
				setTransactions(JSON.parse(savedTx));
			} else {
				setTransactions(INITIAL_TRANSACTIONS);
			}

			if (savedAcc) {
				setAccounts(JSON.parse(savedAcc));
			}
		} catch {
			setTransactions(INITIAL_TRANSACTIONS);
		}
		timer = setTimeout(() => setIsLoading(false), 250);
		return () => clearTimeout(timer);
	}, []);

	const saveTransactions = (updated: Transaction[]) => {
		try {
			localStorage.setItem("finance_os_transactions", JSON.stringify(updated));
		} catch {
			// fallback
		}
	};

	const saveAccounts = (updated: Account[]) => {
		try {
			localStorage.setItem("finance_os_accounts", JSON.stringify(updated));
		} catch {
			// fallback
		}
	};

	const addTransaction = (newTx: Omit<Transaction, "id">) => {
		const tx: Transaction = {
			...newTx,
			id: `tx-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
			status: newTx.status || "completed",
		};
		const updated = [tx, ...transactions];
		setTransactions(updated);
		saveTransactions(updated);

		// Atualiza saldo da conta vinculada se aplicável
		if (tx.accountId) {
			setAccounts((prevAcc) => {
				const next = prevAcc.map((acc) => {
					if (acc.id === tx.accountId) {
						const delta = tx.type === "income" ? tx.amount : -tx.amount;
						return { ...acc, balance: acc.balance + delta };
					}
					return acc;
				});
				saveAccounts(next);
				return next;
			});
		}
	};

	const updateTransaction = (id: string, patch: Partial<Transaction>) => {
		const updated = transactions.map((t) =>
			t.id === id ? { ...t, ...patch } : t,
		);
		setTransactions(updated);
		saveTransactions(updated);
	};

	const deleteTransaction = (id: string) => {
		const updated = transactions.filter((t) => t.id !== id);
		setTransactions(updated);
		saveTransactions(updated);
	};

	const addAccount = (acc: Omit<Account, "id">) => {
		const newAcc: Account = {
			...acc,
			id: `acc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
		};
		const updated = [...accounts, newAcc];
		setAccounts(updated);
		saveAccounts(updated);
	};

	const importTransactions = (importedList: Omit<Transaction, "id">[]) => {
		const newEntries: Transaction[] = importedList.map((item, idx) => ({
			...item,
			id: `tx-imp-${Date.now()}-${idx}-${Math.random().toString(36).substring(2, 5)}`,
			status: "completed",
		}));
		const updated = [...newEntries, ...transactions];
		setTransactions(updated);
		saveTransactions(updated);
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

	const totalBalance = accounts.reduce((acc, curr) => acc + curr.balance, 0);

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
				accounts,
				addTransaction,
				updateTransaction,
				deleteTransaction,
				addAccount,
				budgetLimits,
				updateBudgetLimit,
				totalIncome,
				totalExpenses,
				netSavings,
				totalBalance,
				expensesByCategory,
				importTransactions,
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
