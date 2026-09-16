"use client";

import { Info, Layers, PieChart } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/types/initial-data";

export const ExpenseBreakdown: React.FC = () => {
	const { expensesByCategory, totalExpenses, isLoading } = useFinance();
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	return (
		<section id="onde-vai" className="py-12 border-t border-black/[0.05]">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-8">
					<div>
						<div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-[#0fa76e] uppercase tracking-wider mb-2">
							<Layers className="h-3.5 w-3.5" />
							Diagnóstico de Fluxo
						</div>
						<h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] section-title">
							Para Onde Vai o Seu Dinheiro?
						</h2>
						<p className="mt-2 text-sm text-black/60 max-w-xl">
							Audite visualmente a distribuição de cada real gasto no mês,
							identificando gargalos e categorias que consomem mais liquidez.
						</p>
					</div>

					<div className="mt-4 md:mt-0 font-mono text-xs text-black/50 bg-black/[0.02] border border-black/[0.05] px-4 py-2 rounded-full">
						Total auditado:{" "}
						<strong className="text-black">
							{formatCurrency(totalExpenses)}
						</strong>
					</div>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
					<div className="lg:col-span-1 rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.03)]">
						<h3 className="text-base font-semibold text-[#0d0d0d] mb-4 flex items-center justify-between">
							Distribuição Proporcional
							<PieChart className="h-4 w-4 text-black/40" />
						</h3>

						{isLoading ? (
							<div className="space-y-4">
								<div className="h-6 w-full rounded-full skeleton-shimmer" />
								<div className="h-24 w-full rounded-2xl skeleton-shimmer" />
							</div>
						) : (
							<>
								<div className="h-5 w-full rounded-full overflow-hidden flex bg-black/[0.04] p-0.5 gap-0.5">
									{expensesByCategory.map((item) => {
										const colorDef =
											CATEGORY_COLORS[item.category]?.fill || "#0d0d0d";
										return (
											<button
												type="button"
												key={item.category}
												style={{
													width: `${item.percentage}%`,
													backgroundColor: colorDef,
												}}
												className="h-full rounded-sm transition-all hover:opacity-80 cursor-pointer border-none focus:outline-none"
												title={`${item.category}: ${item.percentage.toFixed(1)}%`}
												onClick={() =>
													setSelectedCategory(
														selectedCategory === item.category
															? null
															: item.category,
													)
												}
											/>
										);
									})}
								</div>

								<div className="mt-6 space-y-3">
									<span className="font-mono text-xs uppercase tracking-wider text-black/40">
										Principais Drenos de Caixa
									</span>
									{expensesByCategory.slice(0, 4).map((item, idx) => (
										<div
											key={item.category}
											className="flex items-center justify-between text-xs py-1.5 border-b border-black/[0.03]"
										>
											<div className="flex items-center gap-2">
												<span className="font-mono text-[11px] text-black/40">
													#{idx + 1}
												</span>
												<span className="font-medium text-black/80">
													{item.category}
												</span>
											</div>
											<span className="font-mono font-semibold text-[#0d0d0d]">
												{item.percentage.toFixed(1)}%
											</span>
										</div>
									))}
								</div>

								<div className="mt-6 p-4 rounded-2xl bg-[#fafafa] border border-black/[0.05] text-xs text-black/60 flex items-start gap-2.5">
									<Info className="h-4 w-4 text-[#0fa76e] shrink-0 mt-0.5" />
									<span>
										Dica: Especialistas recomendam que gastos fixos não
										ultrapassem 50% da sua renda líquida mensal.
									</span>
								</div>
							</>
						)}
					</div>

					<div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
						{isLoading ? (
							["s1", "s2", "s3", "s4"].map((id) => (
								<div
									key={id}
									className="h-32 rounded-2xl border border-black/[0.05] p-5 skeleton-shimmer"
								/>
							))
						) : expensesByCategory.length === 0 ? (
							<div className="col-span-2 py-12 text-center text-sm text-black/50">
								Nenhuma despesa registrada até o momento.
							</div>
						) : (
							expensesByCategory.map((cat) => {
								const colorDef = CATEGORY_COLORS[cat.category] || {
									bg: "bg-gray-100",
									text: "text-gray-800",
									fill: "#0d0d0d",
								};
								const isSelected = selectedCategory === cat.category;

								return (
									<button
										type="button"
										key={cat.category}
										onClick={() =>
											setSelectedCategory(isSelected ? null : cat.category)
										}
										className={`text-left w-full cursor-pointer rounded-2xl border transition-all p-5 bg-white ${
											isSelected
												? "border-[#18E299] ring-2 ring-[#18E299]/20 shadow-md"
												: "border-black/[0.05] hover:border-black/[0.1] hover:shadow-[0px_2px_4px_rgba(0,0,0,0.03)]"
										}`}
									>
										<div className="flex items-center justify-between">
											<span
												className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${colorDef.bg} ${colorDef.text}`}
											>
												{cat.category}
											</span>
											<span className="font-mono text-xs font-semibold text-black/60">
												{cat.percentage.toFixed(1)}%
											</span>
										</div>

										<div className="mt-4 flex items-baseline justify-between">
											<span className="font-mono text-xl font-semibold text-[#0d0d0d]">
												{formatCurrency(cat.amount)}
											</span>
										</div>

										<div className="mt-3 h-1.5 w-full rounded-full bg-black/[0.04] overflow-hidden">
											<div
												className="h-full rounded-full transition-all duration-500"
												style={{
													width: `${cat.percentage}%`,
													backgroundColor: colorDef.fill,
												}}
											/>
										</div>
									</button>
								);
							})
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
