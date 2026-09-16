"use client";

import { AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";

export default function BudgetsPage() {
	const { budgetLimits, transactions, updateBudgetLimit } = useFinance();
	const [editingCategory, setEditingCategory] = useState<string | null>(null);
	const [newLimitValue, setNewLimitValue] = useState<string>("");

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	const spentMap = transactions
		.filter((t) => t.type === "expense")
		.reduce(
			(acc, t) => {
				acc[t.category] = (acc[t.category] || 0) + t.amount;
				return acc;
			},
			{} as Record<string, number>,
		);

	const handleSave = (category: string) => {
		const val = parseFloat(newLimitValue.replace(",", "."));
		if (!Number.isNaN(val) && val > 0) {
			updateBudgetLimit(category, val);
		}
		setEditingCategory(null);
		setNewLimitValue("");
	};

	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
					Planejador de Tetos & Orçamentos
				</h1>
				<p className="text-xs sm:text-sm text-black/50 mt-1">
					Estabeleça limites de segurança para conter desvios orçamentários por
					categoria.
				</p>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{budgetLimits.map((b) => {
					const spent = spentMap[b.category] || 0;
					const percentage = (spent / b.limit) * 100;
					const isExceeded = spent > b.limit;
					const isNear = percentage >= 80 && !isExceeded;
					const isEditing = editingCategory === b.category;

					return (
						<div
							key={b.category}
							className="rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] space-y-4"
						>
							<div className="flex items-center justify-between">
								<span className="text-sm font-semibold text-[#0d0d0d]">
									{b.category}
								</span>
								{isExceeded ? (
									<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-semibold text-rose-700">
										<AlertCircle className="h-3 w-3" />
										Estourado
									</span>
								) : isNear ? (
									<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
										Alerta 80%
									</span>
								) : (
									<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
										<CheckCircle2 className="h-3 w-3" />
										Sob Controle
									</span>
								)}
							</div>

							<div className="flex items-baseline justify-between font-mono">
								<div>
									<span className="text-xl font-semibold text-[#0d0d0d]">
										{formatCurrency(spent)}
									</span>
									<span className="text-xs text-black/40">
										{" "}
										/ {formatCurrency(b.limit)}
									</span>
								</div>
								<span
									className={`text-xs font-semibold ${
										isExceeded
											? "text-rose-600"
											: isNear
												? "text-amber-600"
												: "text-black/60"
									}`}
								>
									{percentage.toFixed(0)}%
								</span>
							</div>

							<div className="h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
								<div
									className={`h-full rounded-full transition-all duration-500 ${
										isExceeded
											? "bg-[#d45656]"
											: isNear
												? "bg-[#c37d0d]"
												: "bg-[#18E299]"
									}`}
									style={{ width: `${Math.min(percentage, 100)}%` }}
								/>
							</div>

							<div className="pt-2 border-t border-black/[0.04] flex items-center justify-between">
								{isEditing ? (
									<div className="flex items-center gap-2 w-full">
										<input
											type="text"
											placeholder="Novo teto R$"
											value={newLimitValue}
											onChange={(e) => setNewLimitValue(e.target.value)}
											className="w-full rounded-lg border border-black/[0.1] px-2 py-1 text-xs font-mono"
										/>
										<button
											type="button"
											onClick={() => handleSave(b.category)}
											className="rounded-lg bg-[#0d0d0d] px-2.5 py-1 text-xs text-white"
										>
											Salvar
										</button>
									</div>
								) : (
									<>
										<span className="text-[11px] text-black/40">
											Saldo restante:{" "}
											{formatCurrency(Math.max(b.limit - spent, 0))}
										</span>
										<button
											type="button"
											onClick={() => {
												setEditingCategory(b.category);
												setNewLimitValue(b.limit.toString());
											}}
											className="text-xs text-[#0fa76e] hover:underline font-medium"
										>
											Ajustar Teto
										</button>
									</>
								)}
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}
