"use client";

import { Download, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/types/initial-data";

export default function TransactionsPage() {
	const { transactions, deleteTransaction, accounts } = useFinance();
	const [searchTerm, setSearchTerm] = useState("");
	const [selectedType, setSelectedType] = useState<
		"all" | "expense" | "income"
	>("all");
	const [selectedCategory, _setSelectedCategory] = useState<string>("all");

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
		const matchesType = selectedType === "all" || t.type === selectedType;
		const matchesCategory =
			selectedCategory === "all" || t.category === selectedCategory;
		return matchesSearch && matchesType && matchesCategory;
	});

	const exportCSV = () => {
		const headers = "ID;Descrição;Valor;Tipo;Categoria;Data;Método\n";
		const rows = filtered
			.map(
				(t) =>
					`${t.id};"${t.description}";${t.amount};${t.type};"${t.category}";${t.date};"${t.paymentMethod}"`,
			)
			.join("\n");
		const blob = new Blob([headers + rows], {
			type: "text/csv;charset=utf-8;",
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement("a");
		link.href = url;
		link.setAttribute("download", `finance_os_extrato_${Date.now()}.csv`);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};

	return (
		<div className="space-y-6">
			{/* Header da Tela */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
						Extrato & Gestão de Transações
					</h1>
					<p className="text-xs sm:text-sm text-black/50 mt-1">
						Controle analítico de cada saída e entrada com filtros por centro de
						custo.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<button
						type="button"
						onClick={exportCSV}
						className="inline-flex items-center gap-2 rounded-full border border-black/[0.08] bg-white px-4 py-2 text-xs font-medium text-black/70 hover:bg-black/[0.02] shadow-sm transition-all"
					>
						<Download className="h-3.5 w-3.5" />
						Exportar CSV
					</button>
				</div>
			</div>

			{/* Barra de Filtros em Pill */}
			<div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl border border-black/[0.05] bg-white">
				<div className="relative flex-1 min-w-[240px]">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-black/40" />
					<input
						type="text"
						value={searchTerm}
						onChange={(e) => setSearchTerm(e.target.value)}
						placeholder="Buscar por descrição, estabelecimento ou tag..."
						className="w-full rounded-full border border-black/[0.08] pl-9 pr-4 py-1.5 text-xs text-[#0d0d0d] placeholder:text-black/40 focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299]"
					/>
				</div>

				{/* Alternador de Tipo */}
				<div className="flex rounded-full border border-black/[0.08] p-0.5 bg-black/[0.02]">
					<button
						type="button"
						onClick={() => setSelectedType("all")}
						className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
							selectedType === "all"
								? "bg-white text-black shadow-sm"
								: "text-black/50 hover:text-black"
						}`}
					>
						Todas ({transactions.length})
					</button>
					<button
						type="button"
						onClick={() => setSelectedType("expense")}
						className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
							selectedType === "expense"
								? "bg-white text-rose-600 shadow-sm"
								: "text-black/50 hover:text-black"
						}`}
					>
						Saídas
					</button>
					<button
						type="button"
						onClick={() => setSelectedType("income")}
						className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
							selectedType === "income"
								? "bg-white text-emerald-600 shadow-sm"
								: "text-black/50 hover:text-black"
						}`}
					>
						Entradas
					</button>
				</div>
			</div>

			{/* Tabela de Transações */}
			<div className="rounded-3xl border border-black/[0.05] bg-white overflow-hidden shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
				{filtered.length === 0 ? (
					<div className="py-20 text-center text-sm text-black/40">
						Nenhuma transação correspondente aos filtros aplicados.
					</div>
				) : (
					<div className="overflow-x-auto">
						<table className="w-full text-left text-xs">
							<thead className="border-b border-black/[0.05] bg-[#fafafa] font-mono uppercase tracking-wider text-black/40">
								<tr>
									<th className="py-3.5 px-4 font-medium">Data</th>
									<th className="py-3.5 px-4 font-medium">Descrição</th>
									<th className="py-3.5 px-4 font-medium">Categoria</th>
									<th className="py-3.5 px-4 font-medium">Conta / Método</th>
									<th className="py-3.5 px-4 font-medium text-right">Valor</th>
									<th className="py-3.5 px-4 font-medium text-center">Ações</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-black/[0.04]">
								{filtered.map((tx) => {
									const isExpense = tx.type === "expense";
									const colorDef = CATEGORY_COLORS[tx.category] || {
										bg: "bg-gray-100",
										text: "text-gray-800",
									};
									const acc = accounts.find((a) => a.id === tx.accountId);

									return (
										<tr
											key={tx.id}
											className="hover:bg-black/[0.01] transition-colors group"
										>
											<td className="py-3.5 px-4 font-mono text-black/50 whitespace-nowrap">
												{tx.date}
											</td>
											<td className="py-3.5 px-4">
												<div className="font-medium text-[#0d0d0d]">
													{tx.description}
												</div>
												{tx.tags && tx.tags.length > 0 && (
													<div className="flex gap-1 mt-1">
														{tx.tags.map((tag) => (
															<span
																key={tag}
																className="text-[9px] font-mono text-black/40 bg-black/[0.03] px-1.5 py-0.5 rounded"
															>
																#{tag}
															</span>
														))}
													</div>
												)}
											</td>
											<td className="py-3.5 px-4 whitespace-nowrap">
												<span
													className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${colorDef.bg} ${colorDef.text}`}
												>
													{tx.category}
												</span>
											</td>
											<td className="py-3.5 px-4 text-black/60 whitespace-nowrap">
												{acc ? acc.name : tx.paymentMethod}
											</td>
											<td className="py-3.5 px-4 text-right font-mono font-semibold whitespace-nowrap">
												<span
													className={
														isExpense ? "text-[#0d0d0d]" : "text-emerald-600"
													}
												>
													{isExpense ? "- " : "+ "}
													{formatCurrency(tx.amount)}
												</span>
											</td>
											<td className="py-3.5 px-4 text-center">
												<button
													type="button"
													onClick={() => deleteTransaction(tx.id)}
													aria-label="Deletar transação"
													className="opacity-0 group-hover:opacity-100 transition-opacity text-black/30 hover:text-rose-600 p-1"
												>
													<Trash2 className="h-4 w-4" />
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}
