"use client";

import { ArrowDownLeft, ArrowUpRight, Search, Trash2 } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/types/initial-data";

export const TransactionList: React.FC = () => {
	const { transactions, deleteTransaction, isLoading } = useFinance();
	const [searchTerm, setSearchTerm] = useState("");
	const [filterType, setFilterType] = useState<"all" | "expense" | "income">(
		"all",
	);

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	const filtered = transactions.filter((t) => {
		const matchesSearch =
			t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
			t.category.toLowerCase().includes(searchTerm.toLowerCase());
		const matchesType = filterType === "all" || t.type === filterType;
		return matchesSearch && matchesType;
	});

	return (
		<section id="transacoes" className="py-12 border-t border-black/[0.05]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
					<div>
						<h2 className="text-2xl font-semibold tracking-tight text-[#0d0d0d] section-title">
							Extrato Centralizado de Transações
						</h2>
						<p className="text-xs sm:text-sm text-black/50 mt-1">
							Registro unificado de saídas, compras no cartão, PIX e receitas.
						</p>
					</div>

					<div className="flex flex-wrap items-center gap-2">
						<div className="relative">
							<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-black/40" />
							<input
								type="text"
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								placeholder="Buscar despesa ou tag..."
								className="rounded-full border border-black/[0.08] bg-transparent pl-8 pr-4 py-1.5 text-xs text-[#0d0d0d] placeholder:text-black/40 focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299]"
							/>
						</div>

						<div className="flex rounded-full border border-black/[0.08] p-0.5 bg-black/[0.02]">
							<button
								type="button"
								onClick={() => setFilterType("all")}
								className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
									filterType === "all"
										? "bg-white text-black shadow-sm"
										: "text-black/50 hover:text-black"
								}`}
							>
								Todas
							</button>
							<button
								type="button"
								onClick={() => setFilterType("expense")}
								className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
									filterType === "expense"
										? "bg-white text-rose-600 shadow-sm"
										: "text-black/50 hover:text-black"
								}`}
							>
								Saídas
							</button>
							<button
								type="button"
								onClick={() => setFilterType("income")}
								className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
									filterType === "income"
										? "bg-white text-emerald-600 shadow-sm"
										: "text-black/50 hover:text-black"
								}`}
							>
								Entradas
							</button>
						</div>
					</div>
				</div>

				<div className="rounded-2xl border border-black/[0.05] bg-white overflow-hidden shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					{isLoading ? (
						<div className="p-6 space-y-4">
							{["sk1", "sk2", "sk3", "sk4", "sk5"].map((skId) => (
								<div
									key={skId}
									className="h-12 w-full rounded-xl skeleton-shimmer"
								/>
							))}
						</div>
					) : filtered.length === 0 ? (
						<div className="py-16 text-center text-sm text-black/50">
							Nenhuma transação encontrada com os filtros selecionados.
						</div>
					) : (
						<div className="divide-y divide-black/[0.04]">
							{filtered.map((tx) => {
								const colorDef = CATEGORY_COLORS[tx.category] || {
									bg: "bg-gray-100",
									text: "text-gray-800",
								};
								const isExpense = tx.type === "expense";

								return (
									<div
										key={tx.id}
										className="flex items-center justify-between p-4 hover:bg-black/[0.01] transition-colors group"
									>
										<div className="flex items-center gap-3.5">
											<div
												className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
													isExpense
														? "bg-rose-50 text-rose-600"
														: "bg-emerald-50 text-emerald-600"
												}`}
											>
												{isExpense ? (
													<ArrowDownLeft className="h-4 w-4" />
												) : (
													<ArrowUpRight className="h-4 w-4" />
												)}
											</div>

											<div>
												<p className="text-sm font-semibold text-[#0d0d0d]">
													{tx.description}
												</p>
												<div className="flex items-center gap-2 mt-0.5">
													<span
														className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${colorDef.bg} ${colorDef.text}`}
													>
														{tx.category}
													</span>
													<span className="text-[11px] text-black/40">
														{tx.paymentMethod}
													</span>
													<span className="text-[11px] text-black/40 font-mono">
														• {tx.date}
													</span>
												</div>
											</div>
										</div>

										<div className="flex items-center gap-4">
											<span
												className={`font-mono text-sm font-semibold ${
													isExpense ? "text-[#0d0d0d]" : "text-emerald-600"
												}`}
											>
												{isExpense ? "- " : "+ "}
												{formatCurrency(tx.amount)}
											</span>

											<button
												type="button"
												onClick={() => deleteTransaction(tx.id)}
												title="Remover transação"
												aria-label="Remover transação"
												className="opacity-0 group-hover:opacity-100 transition-opacity text-black/30 hover:text-rose-600 p-1 rounded-md"
											>
												<Trash2 className="h-3.5 w-3.5" />
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</section>
	);
};
