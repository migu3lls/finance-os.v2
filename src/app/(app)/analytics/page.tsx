"use client";
import { useFinance } from "@/context/FinanceContext";
import { CATEGORY_COLORS } from "@/types/initial-data";

export default function AnalyticsPage() {
	const { expensesByCategory } = useFinance();

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	return (
		<div className="space-y-8">
			<div>
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
					Diagnóstico Profundo: Para Onde Vai o Dinheiro?
				</h1>
				<p className="text-xs sm:text-sm text-black/50 mt-1">
					Raio-X detalhado de custos fixos, supérfluos, investimentos e saúde
					financeira.
				</p>
			</div>

			{/* Grid de Destaque Analítico */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Gráfico / Segmentos de Drenos */}
				<div className="lg:col-span-1 rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] space-y-6">
					<h2 className="text-base font-semibold text-[#0d0d0d]">
						Concentração de Gastos
					</h2>

					<div className="h-6 w-full rounded-full overflow-hidden flex bg-black/[0.04] p-0.5 gap-0.5">
						{expensesByCategory.map((cat) => {
							const colorDef = CATEGORY_COLORS[cat.category]?.fill || "#0d0d0d";
							return (
								<div
									key={cat.category}
									style={{
										width: `${cat.percentage}%`,
										backgroundColor: colorDef,
									}}
									className="h-full rounded-sm"
									title={`${cat.category}: ${cat.percentage.toFixed(1)}%`}
								/>
							);
						})}
					</div>

					<div className="space-y-3">
						{expensesByCategory.map((cat) => (
							<div
								key={cat.category}
								className="flex items-center justify-between text-xs py-1 border-b border-black/[0.03]"
							>
								<div className="flex items-center gap-2">
									<span
										className="h-2.5 w-2.5 rounded-full"
										style={{
											backgroundColor:
												CATEGORY_COLORS[cat.category]?.fill || "#0d0d0d",
										}}
									/>
									<span className="text-black/80 font-medium">
										{cat.category}
									</span>
								</div>
								<span className="font-mono font-semibold text-[#0d0d0d]">
									{formatCurrency(cat.amount)} ({cat.percentage.toFixed(1)}%)
								</span>
							</div>
						))}
					</div>
				</div>

				{/* Avaliação de Eficiência Financeira (Regra 50-30-20) */}
				<div className="lg:col-span-2 rounded-3xl border border-black/[0.05] bg-white p-6 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] space-y-6">
					<h2 className="text-base font-semibold text-[#0d0d0d]">
						Diagnóstico de Saúde Financeira (Metodologia 50/30/20)
					</h2>

					<div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
						<div className="rounded-2xl border border-black/[0.05] bg-[#fafafa] p-4">
							<span className="font-mono text-[10px] text-black/40 uppercase">
								Custos Fixos & Essenciais
							</span>
							<p className="mt-1 font-mono text-xl font-semibold text-[#0d0d0d]">
								48.2%
							</p>
							<span className="text-[11px] text-[#0fa76e] font-medium">
								Ideal: até 50% (Saudável)
							</span>
						</div>

						<div className="rounded-2xl border border-black/[0.05] bg-[#fafafa] p-4">
							<span className="font-mono text-[10px] text-black/40 uppercase">
								Estilo de Vida & Lazer
							</span>
							<p className="mt-1 font-mono text-xl font-semibold text-[#0d0d0d]">
								18.5%
							</p>
							<span className="text-[11px] text-[#0fa76e] font-medium">
								Ideal: até 30% (Excelente)
							</span>
						</div>

						<div className="rounded-2xl border border-black/[0.05] bg-[#fafafa] p-4">
							<span className="font-mono text-[10px] text-black/40 uppercase">
								Aporte & Futuro
							</span>
							<p className="mt-1 font-mono text-xl font-semibold text-[#0d0d0d]">
								33.3%
							</p>
							<span className="text-[11px] text-[#0fa76e] font-medium">
								Meta mínima: 20% (Atingida)
							</span>
						</div>
					</div>

					{/* Recomendações Autônomas do Sistema */}
					<div className="rounded-2xl border border-[#18E299]/30 bg-[#d4fae8]/30 p-5">
						<h3 className="text-xs font-semibold text-[#0fa76e] uppercase tracking-wider mb-1 font-mono">
							Insights de Otimização Finance OS
						</h3>
						<p className="text-xs text-black/70 leading-relaxed">
							Sua margem de economia no mês atual está positiva. As maiores
							alavancas de redução imediata estão concentradas em{" "}
							<strong>Alimentação & Mercado</strong> e{" "}
							<strong>Assinaturas</strong>. Caso consiga reduzir 10% nesses
							centros de custo, você terá R$ 139,00 a mais por mês para aportes
							de longo prazo.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
