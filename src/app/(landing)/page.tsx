"use client";

import { useState } from "react";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { BudgetPlanner } from "@/components/BudgetPlanner";
import { CookieBanner } from "@/components/CookieBanner";
import { ExpenseBreakdown } from "@/components/ExpenseBreakdown";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroDashboard } from "@/components/HeroDashboard";
import { TransactionList } from "@/components/TransactionList";
import { FinanceProvider } from "@/context/FinanceContext";

export default function Home() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<FinanceProvider>
			<div className="flex min-h-screen flex-col bg-white">
				<Header />

				<main className="flex-1">
					<HeroDashboard />
					<ExpenseBreakdown />
					<BudgetPlanner />
					<TransactionList />
				</main>

				<Footer />
				<CookieBanner />
				<AddTransactionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		</FinanceProvider>
	);
}
