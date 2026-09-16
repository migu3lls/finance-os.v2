"use client";

import {
	ArrowDownLeft,
	ArrowUpRight,
	Building2,
	CreditCard,
	TrendingDown,
	TrendingUp,
	Wallet,
} from "lucide-react";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/types/initial-data";

export default function DashboardPage() {
	const {
		totalIncome,
		totalExpenses,
		netSavings,
		totalBalance,
		accounts,
		transactions,
		expensesByCategory,
	} = useFinance();

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	const recentTransactions = transactions.slice(0, 5);

	return (
		<div className="space-y-8">
			{/* Top Banner de Boas-Vindas */}
			<div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
				<div>
					<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
						Visão Geral Operacional
					</h1>
					<p className="text-xs sm:text-sm text-black/50 mt-1">
						Monitoramento de liquidez, contas correntes, cartões e fluxo de
						caixa.
					</p>
				</div>

				<div className="flex items-center gap-2">
					<span className="font-mono text-xs text-black/50 bg-white border border-black/[0.05] px-3.5 py-1.5 rounded-full">
						Mês de Referência:{" "}
						<strong className="text-black">Setembro / 2026</strong>
					</span>
				</div>
			</div>

			{/* 4 Cards de Métricas Principais */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{/* Patrimônio Líquido */}
				<div className="rounded-2xl border border-black/[0.05] bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<div className="flex items-center justify-between text-black/40">
						<span className="font-mono text-[11px] uppercase tracking-wider">
							Patrimônio Consolidado
						</span>
						<Wallet className="h-4 w-4 text-[#0fa76e]" />
					</div>
					<div className="mt-3">
						<span className="font-mono text-2xl font-semibold text-[#0d0d0d]">
							{formatCurrency(totalBalance)}
						</span>
						<p className="mt-1 text-[11px] text-[#0fa76e]">
							Soma de todas as contas e ativos
						</p>
					</div>
				</div>

				{/* Entradas */}
				<div className="rounded-2xl border border-black/[0.05] bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<div className="flex items-center justify-between text-black/40">
						<span className="font-mono text-[11px] uppercase tracking-wider">
							Receitas do Mês
						</span>
						<TrendingUp className="h-4 w-4 text-emerald-600" />
					</div>
					<div className="mt-3">
						<span className="font-mono text-2xl font-semibold text-emerald-600">
							+{formatCurrency(totalIncome)}
						</span>
						<p className="mt-1 text-[11px] text-black/40">
							Entradas confirmadas
						</p>
					</div>
				</div>

				{/* Despesas */}
				<div className="rounded-2xl border border-black/[0.05] bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<div className="flex items-center justify-between text-black/40">
						<span className="font-mono text-[11px] uppercase tracking-wider">
							Saídas do Mês
						</span>
						<TrendingDown className="h-4 w-4 text-rose-600" />
					</div>
					<div className="mt-3">
						<span className="font-mono text-2xl font-semibold text-rose-600">
							-{formatCurrency(totalExpenses)}
						</span>
						<p className="mt-1 text-[11px] text-black/40">
							{totalIncome > 0
								? `${((totalExpenses / totalIncome) * 100).toFixed(0)}% da receita gasta`
								: "Sem receitas"}
						</p>
					</div>
				</div>

				{/* Sobra / Economia Líquida */}
				<div className="rounded-2xl border border-black/[0.05] bg-white p-5 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<div className="flex items-center justify-between text-black/40">
						<span className="font-mono text-[11px] uppercase tracking-wider">
							Margem de Economia
						</span>
						<span className="h-2 w-2 rounded-full bg-[#18E299]" />
					</div>
					<div className="mt-3">
						<span className="font-mono text-2xl font-semibold text-[#0d0d0d]">
							{formatCurrency(netSavings)}
						</span>
						<p className="mt-1 text-[11px] text-[#0fa76e]">
							Disponível para aporte / reserva
						</p>
					</div>
				</div>
			</div>

			{/* Grid: Contas & Cartões + Diagnóstico Rápido */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Contas Vinculadas */}
				<div className="lg:col-span-1 rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<h2 className="text-base font-semibold text-[#0d0d0d] mb-4 flex items-center justify-between">
						Contas & Cartões
						<Building2 className="h-4 w-4 text-black/40" />
					</h2>

					<div className="space-y-3">
						{accounts.map((acc) => (
							<div
								key={acc.id}
								className="flex items-center justify-between p-3 rounded-2xl border border-black/[0.04] bg-[#fafafa]/60 hover:bg-[#fafafa] transition-colors"
							>
								<div className="flex items-center gap-3">
									<div
										className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white text-xs font-bold"
										style={{ backgroundColor: acc.color }}
									>
										{acc.type === "credit_card" ? (
											<CreditCard className="h-4 w-4" />
										) : (
											acc.name.charAt(0)
										)}
									</div>
									<div>
										<p className="text-xs font-semibold text-[#0d0d0d]">
											{acc.name}
										</p>
										<span className="text-[10px] text-black/40 capitalize">
											{acc.type === "credit_card"
												? `Fatura vence dia ${acc.dueDay}`
												: "Conta corrente"}
										</span>
									</div>
								</div>

								<span
									className={`font-mono text-xs font-semibold ${
										acc.balance < 0 ? "text-rose-600" : "text-[#0d0d0d]"
									}`}
								>
									{formatCurrency(acc.balance)}
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Diagnóstico Rápido de Categorias */}
				<div className="lg:col-span-2 rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
					<div className="flex items-center justify-between mb-4">
						<h2 className="text-base font-semibold text-[#0d0d0d]">
							Para Onde Vai o Dinheiro (Drenos do Mês)
						</h2>
						<span className="font-mono text-xs text-black/40">
							Top Categorias
						</span>
					</div>

					<div className="space-y-4">
						{expensesByCategory.slice(0, 5).map((cat) => {
							const colorDef = CATEGORY_COLORS[cat.category] || {
								fill: "#0d0d0d",
								text: "text-gray-800",
								bg: "bg-gray-100",
							};

							return (
								<div key={cat.category} className="space-y-1.5">
									<div className="flex items-center justify-between text-xs">
										<span className="font-medium text-black/80">
											{cat.category}
										</span>
										<div className="flex items-center gap-2 font-mono">
											<span className="text-black/50">
												{cat.percentage.toFixed(1)}%
											</span>
											<strong className="text-[#0d0d0d]">
												{formatCurrency(cat.amount)}
											</strong>
										</div>
									</div>
									<div className="h-2 w-full rounded-full bg-black/[0.04] overflow-hidden">
										<div
											className="h-full rounded-full transition-all duration-500"
											style={{
												width: `${cat.percentage}%`,
												backgroundColor: colorDef.fill,
											}}
										/>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			{/* Lançamentos Recentes */}
			<div className="rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)]">
				<div className="flex items-center justify-between mb-4">
					<h2 className="text-base font-semibold text-[#0d0d0d]">
						Últimos Registros
					</h2>
					<span className="font-mono text-xs text-black/40">Tempo Real</span>
				</div>

				<div className="divide-y divide-black/[0.04]">
					{recentTransactions.map((tx) => {
						const isExpense = tx.type === "expense";
						const colorDef = CATEGORY_COLORS[tx.category] || {
							bg: "bg-gray-100",
							text: "text-gray-800",
						};

						return (
							<div
								key={tx.id}
								className="flex items-center justify-between py-3 hover:bg-black/[0.01] transition-colors"
							>
								<div className="flex items-center gap-3">
									<div
										className={`flex h-8 w-8 items-center justify-center rounded-full ${
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
										<p className="text-xs font-semibold text-[#0d0d0d]">
											{tx.description}
										</p>
										<div className="flex items-center gap-2 mt-0.5">
											<span
												className={`rounded-full px-2 py-0.5 text-[9px] font-medium ${colorDef.bg} ${colorDef.text}`}
											>
												{tx.category}
											</span>
											<span className="text-[10px] text-black/40 font-mono">
												{tx.date}
											</span>
										</div>
									</div>
								</div>

								<span
									className={`font-mono text-xs font-semibold ${
										isExpense ? "text-[#0d0d0d]" : "text-emerald-600"
									}`}
								>
									{isExpense ? "- " : "+ "}
									{formatCurrency(tx.amount)}
								</span>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}
