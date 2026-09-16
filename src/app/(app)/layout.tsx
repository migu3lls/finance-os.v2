"use client";

import {
	LayoutDashboard,
	Menu,
	PieChart,
	Plus,
	Receipt,
	Target,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { AppSidebar } from "@/components/AppSidebar";
import { FinanceProvider } from "@/context/FinanceContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
	const pathname = usePathname();

	return (
		<FinanceProvider>
			<div className="flex h-screen overflow-hidden bg-[#fafafa]">
				{/* Sidebar Funcional (Desktop + Mobile Drawer) */}
				<AppSidebar
					onOpenAddModal={() => setIsModalOpen(true)}
					mobileOpen={mobileSidebarOpen}
					onCloseMobile={() => setMobileSidebarOpen(false)}
				/>

				{/* Área Principal de Trabalho */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{/* Top Bar Responsiva */}
					<header className="flex h-16 items-center justify-between border-b border-black/[0.05] bg-white px-4 sm:px-6">
						<div className="flex items-center gap-3">
							<button
								type="button"
								onClick={() => setMobileSidebarOpen(true)}
								aria-label="Abrir menu"
								className="md:hidden p-2 -ml-2 rounded-xl text-black/60 hover:bg-black/[0.04] transition-colors"
							>
								<Menu className="h-5 w-5" />
							</button>

							<span className="font-mono text-[11px] text-black/40 uppercase tracking-wider">
								Workspace Operacional
							</span>
						</div>

						<div className="flex items-center gap-2 sm:gap-3">
							<div className="hidden sm:flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.02] px-3 py-1 text-xs text-black/60">
								<span className="h-2 w-2 rounded-full bg-[#18E299]" />
								<span>Modo Local Criptografado</span>
							</div>

							<button
								type="button"
								onClick={() => setIsModalOpen(true)}
								className="md:hidden flex items-center gap-1.5 rounded-full bg-[#0d0d0d] px-3.5 py-1.5 text-xs font-semibold text-white active:scale-95 shadow-sm"
							>
								<Plus className="h-3.5 w-3.5 text-[#18E299]" />
								<span>Lançar</span>
							</button>
						</div>
					</header>

					{/* Conteúdo Dinâmico */}
					<main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 pb-24 md:pb-8">
						<div className="mx-auto max-w-7xl">{children}</div>
					</main>

					{/* Bottom Navigation Bar 100% Centralizada com Grid Simétrico de 5 Colunas */}
					<nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 h-16 bg-white/95 backdrop-blur-md border-t border-black/[0.08] shadow-[0_-2px_10px_rgba(0,0,0,0.03)] grid grid-cols-5 items-center justify-items-center px-1">
						{/* Item 1: Início */}
						<Link
							href="/dashboard"
							className={`flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors ${
								pathname === "/dashboard"
									? "text-[#0fa76e] font-semibold"
									: "text-black/50"
							}`}
						>
							<LayoutDashboard className="h-4 w-4" />
							<span>Início</span>
						</Link>

						{/* Item 2: Extrato */}
						<Link
							href="/transactions"
							className={`flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors ${
								pathname === "/transactions"
									? "text-[#0fa76e] font-semibold"
									: "text-black/50"
							}`}
						>
							<Receipt className="h-4 w-4" />
							<span>Extrato</span>
						</Link>

						{/* Item 3 (Centro Exato): Botão Flutuante Central FAB */}
						<div className="flex items-center justify-center w-full h-full relative">
							<button
								type="button"
								onClick={() => {
									setIsModalOpen(true);
								}}
								aria-label="Adicionar despesa rápida"
								className="absolute -top-5 flex h-13 w-13 items-center justify-center rounded-full bg-[#0d0d0d] text-white shadow-xl border-4 border-white active:scale-90 transition-transform focus:outline-none focus:ring-2 focus:ring-[#18E299] z-50 cursor-pointer"
								style={{ width: "52px", height: "52px" }}
							>
								<Plus className="h-6 w-6 text-[#18E299]" />
							</button>
						</div>

						{/* Item 4: Tetos */}
						<Link
							href="/budgets"
							className={`flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors ${
								pathname === "/budgets"
									? "text-[#0fa76e] font-semibold"
									: "text-black/50"
							}`}
						>
							<Target className="h-4 w-4" />
							<span>Tetos</span>
						</Link>

						{/* Item 5: Diagnóstico */}
						<Link
							href="/analytics"
							className={`flex flex-col items-center justify-center w-full h-full gap-1 text-[10px] font-medium transition-colors ${
								pathname === "/analytics"
									? "text-[#0fa76e] font-semibold"
									: "text-black/50"
							}`}
						>
							<PieChart className="h-4 w-4" />
							<span>Análise</span>
						</Link>
					</nav>
				</div>

				{/* Modal / Bottom Sheet de Transação Rápida */}
				<AddTransactionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		</FinanceProvider>
	);
}
