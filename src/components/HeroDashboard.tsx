"use client";

import { TrendingDown, TrendingUp, Wallet } from "lucide-react";
import type React from "react";
import { useFinance } from "@/context/FinanceContext";

export const HeroDashboard: React.FC = () => {
	const { totalIncome, totalExpenses, netSavings, isLoading } = useFinance();

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	return (
		<section id="dashboard" className="relative pt-8 pb-12 overflow-hidden">
			{/* Mintlify Atmospheric Gradient Wash */}
			<div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-gradient-to-b from-[#18E299]/10 via-[#d4fae8]/20 to-transparent blur-3xl opacity-70" />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				{/* Pill Badge Introdutório */}
				<div className="flex items-center justify-center">
					<div className="inline-flex items-center gap-2 rounded-full border border-black/[0.05] bg-[#d4fae8]/70 px-4 py-1.5 text-xs font-medium text-[#0fa76e] backdrop-blur-sm">
						<span className="flex h-2 w-2 rounded-full bg-[#18E299] animate-pulse" />
						<span className="uppercase tracking-wider font-mono text-[11px]">
							Controle Financeiro Autônomo
						</span>
					</div>
				</div>

				{/* Headline com tracking comprimido do brand/DESIGN.md */}
				<div className="mt-6 text-center max-w-3xl mx-auto">
					<h1 className="text-3xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
						Descubra com precisão{" "}
						<span className="underline decoration-[#18E299] decoration-4 underline-offset-4">
							para onde vai
						</span>{" "}
						o seu dinheiro.
					</h1>
					<p className="mt-4 text-base sm:text-lg text-black/60 font-normal leading-relaxed">
						Centralize saídas, audite despesas por centro de custo e proteja sua
						margem de liquidez mensal com clareza radical e design de alto
						padrão.
					</p>
				</div>

				{/* 3 Metric Cards Minimalistas */}
				<div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
					{/* Saldo Líquido Restante */}
					<div className="relative rounded-2xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] transition-all hover:border-black/[0.09] hover:shadow-md group">
						<div className="flex items-center justify-between">
							<span className="font-mono text-xs uppercase tracking-wider text-black/40">
								Margem / Saldo Líquido
							</span>
							<div className="rounded-full bg-[#d4fae8] p-2 text-[#0fa76e]">
								<Wallet className="h-4 w-4" />
							</div>
						</div>
						{isLoading ? (
							<div className="mt-4 h-9 w-36 rounded-lg skeleton-shimmer" />
						) : (
							<div className="mt-4">
								<span className="font-mono text-3xl font-semibold text-[#0d0d0d] tracking-tight">
									{formatCurrency(netSavings)}
								</span>
								<p className="mt-1 text-xs text-black/50">
									{netSavings >= 0
										? "Economia acumulada positiva"
										: "Alerta de déficit no período"}
								</p>
							</div>
						)}
					</div>

					{/* Entradas / Faturamento */}
					<div className="relative rounded-2xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] transition-all hover:border-black/[0.09] hover:shadow-md group">
						<div className="flex items-center justify-between">
							<span className="font-mono text-xs uppercase tracking-wider text-black/40">
								Entradas Consolidadas
							</span>
							<div className="rounded-full bg-emerald-50 p-2 text-emerald-600">
								<TrendingUp className="h-4 w-4" />
							</div>
						</div>
						{isLoading ? (
							<div className="mt-4 h-9 w-36 rounded-lg skeleton-shimmer" />
						) : (
							<div className="mt-4">
								<span className="font-mono text-3xl font-semibold text-[#0d0d0d] tracking-tight">
									{formatCurrency(totalIncome)}
								</span>
								<p className="mt-1 text-xs text-emerald-600 font-medium">
									+100% de receitas cadastradas
								</p>
							</div>
						)}
					</div>

					{/* Saídas / Despesas Totais */}
					<div className="relative rounded-2xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.03)] transition-all hover:border-black/[0.09] hover:shadow-md group">
						<div className="flex items-center justify-between">
							<span className="font-mono text-xs uppercase tracking-wider text-black/40">
								Saídas Totais (Despesas)
							</span>
							<div className="rounded-full bg-rose-50 p-2 text-rose-600">
								<TrendingDown className="h-4 w-4" />
							</div>
						</div>
						{isLoading ? (
							<div className="mt-4 h-9 w-36 rounded-lg skeleton-shimmer" />
						) : (
							<div className="mt-4">
								<span className="font-mono text-3xl font-semibold text-[#0d0d0d] tracking-tight">
									{formatCurrency(totalExpenses)}
								</span>
								<p className="mt-1 text-xs text-rose-600 font-medium">
									{totalIncome > 0
										? `${((totalExpenses / totalIncome) * 100).toFixed(1)}% da receita comprometida`
										: "Sem receita informada"}
								</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</section>
	);
};
