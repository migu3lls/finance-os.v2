"use client";

import { AlertCircle, CheckCircle2, Target } from "lucide-react";
import type React from "react";
import { useFinance } from "@/context/FinanceContext";

export const BudgetPlanner: React.FC = () => {
	const { budgetLimits, transactions } = useFinance();

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	// Soma de gastos por categoria
	const spentMap = transactions
		.filter((t) => t.type === "expense")
		.reduce(
			(acc, t) => {
				acc[t.category] = (acc[t.category] || 0) + t.amount;
				return acc;
			},
			{} as Record<string, number>,
		);

	return (
		<section
			id="orcamentos"
			className="py-12 border-t border-black/[0.05] bg-[#fafafa]/50"
		>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mb-8">
					<div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#0fa76e] uppercase tracking-wider mb-2">
						<Target className="h-3.5 w-3.5" />
						Metas de Disciplina
					</div>
					<h2 className="text-2xl font-semibold tracking-tight text-[#0d0d0d] section-title">
						Tetos de Gastos & Limites de Orçamento
					</h2>
					<p className="text-xs sm:text-sm text-black/50 mt-1">
						Defina limites máximos para manter suas despesas sob estrito
						controle.
					</p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{budgetLimits.map((b) => {
						const spent = spentMap[b.category] || 0;
						const percentage = (spent / b.limit) * 100;
						const isExceeded = spent > b.limit;
						const isNear = percentage >= 80 && !isExceeded;

						return (
							<div
								key={b.category}
								className="rounded-2xl border border-black/[0.06] bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] transition-all hover:border-black/[0.12]"
							>
								<div className="flex items-center justify-between mb-2">
									<span className="text-sm font-semibold text-[#0d0d0d]">
										{b.category}
									</span>
									{isExceeded ? (
										<span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-[10px] font-medium text-rose-700">
											<AlertCircle className="h-3 w-3" />
											Estourado
										</span>
									) : isNear ? (
										<span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
											Atenção
										</span>
									) : (
										<span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700">
											<CheckCircle2 className="h-3 w-3" />
											Sob Controle
										</span>
									)}
								</div>

								<div className="flex items-baseline justify-between mt-3 font-mono">
									<div>
										<span className="text-lg font-semibold text-[#0d0d0d]">
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

								{/* Progress Bar com cores semafóricas */}
								<div className="mt-3 h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
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
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};
