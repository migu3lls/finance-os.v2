"use client";

import type React from "react";
import { useState } from "react";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { AppSidebar } from "@/components/AppSidebar";
import { FinanceProvider } from "@/context/FinanceContext";

export default function AppLayout({ children }: { children: React.ReactNode }) {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<FinanceProvider>
			<div className="flex h-screen overflow-hidden bg-[#fafafa]">
				{/* Sidebar Funcional */}
				<AppSidebar onOpenAddModal={() => setIsModalOpen(true)} />

				{/* Área Principal de Trabalho */}
				<div className="flex flex-1 flex-col overflow-hidden">
					{/* Top Bar da Aplicação */}
					<header className="flex h-16 items-center justify-between border-b border-black/[0.05] bg-white px-6">
						<div className="flex items-center gap-4">
							<span className="font-mono text-xs text-black/40 uppercase tracking-wider">
								Workspace Operacional
							</span>
						</div>

						<div className="flex items-center gap-3">
							<div className="flex items-center gap-2 rounded-full border border-black/[0.06] bg-black/[0.02] px-3 py-1 text-xs text-black/60">
								<span className="h-2 w-2 rounded-full bg-[#18E299]" />
								<span>Modo Local Criptografado</span>
							</div>

							<button
								type="button"
								className="flex h-8 w-8 items-center justify-center rounded-full border border-black/[0.06] bg-black/[0.02] text-[#0d0d0d] font-semibold text-xs"
							>
								FO
							</button>
						</div>
					</header>

					{/* Conteúdo Dinâmico com Scroll Suave */}
					<main className="flex-1 overflow-y-auto p-6 md:p-8">
						<div className="mx-auto max-w-7xl">{children}</div>
					</main>
				</div>

				{/* Modal de Transação Rápida */}
				<AddTransactionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			</div>
		</FinanceProvider>
	);
}
