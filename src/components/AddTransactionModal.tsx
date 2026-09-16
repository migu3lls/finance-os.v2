"use client";

import { Receipt, Sparkles, X } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import type { Category, TransactionType } from "@/types/finance";

interface AddTransactionModalProps {
	isOpen: boolean;
	onClose: () => void;
}

const QUICK_EXPENSE_PRESETS = [
	{
		label: "Almoço / Café",
		amount: 35,
		category: "Alimentação & Mercado" as Category,
	},
	{
		label: "Supermercado",
		amount: 180,
		category: "Alimentação & Mercado" as Category,
	},
	{
		label: "Uber / Transporte",
		amount: 24,
		category: "Transporte & Mobilidade" as Category,
	},
	{ label: "Farmácia", amount: 50, category: "Saúde & Bem-estar" as Category },
];

const CATEGORIES: Category[] = [
	"Alimentação & Mercado",
	"Moradia & Contas",
	"Transporte & Mobilidade",
	"Lazer & Entretenimento",
	"Saúde & Bem-estar",
	"Educação & Livros",
	"Assinaturas & Software",
	"Investimentos",
	"Salário & Faturamento",
	"Outros",
];

const METHODS = [
	"Cartão de Crédito",
	"PIX",
	"Boleto",
	"Débito",
	"Dinheiro",
] as const;

export const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
	isOpen,
	onClose,
}) => {
	const { addTransaction, accounts } = useFinance();
	const [description, setDescription] = useState("");
	const [amount, setAmount] = useState("");
	const [type, setType] = useState<TransactionType>("expense");
	const [category, setCategory] = useState<Category>("Alimentação & Mercado");
	const [paymentMethod, setPaymentMethod] =
		useState<(typeof METHODS)[number]>("PIX");
	const [accountId, setAccountId] = useState(accounts[0]?.id || "");
	const [date, setDate] = useState(new Date().toISOString().split("T")[0]);

	if (!isOpen) return null;

	const handleQuickPreset = (preset: (typeof QUICK_EXPENSE_PRESETS)[0]) => {
		setDescription(preset.label);
		setAmount(preset.amount.toString());
		setCategory(preset.category);
		setType("expense");
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const numAmount = parseFloat(amount.replace(",", "."));
		if (Number.isNaN(numAmount) || numAmount <= 0) return;

		addTransaction({
			description: description.trim() || "Despesa rápida",
			amount: numAmount,
			type,
			category,
			paymentMethod,
			accountId: accountId || undefined,
			date,
		});

		setDescription("");
		setAmount("");
		onClose();
	};

	return (
		<div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40 backdrop-blur-sm p-0 sm:p-4 animate-in fade-in duration-200">
			<div className="w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl border border-black/[0.08] bg-white p-5 sm:p-6 shadow-2xl transition-all max-h-[92vh] overflow-y-auto">
				{/* Header do Modal / Sheet */}
				<div className="flex items-center justify-between pb-3 border-b border-black/[0.05]">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4fae8] text-[#0fa76e]">
							<Receipt className="h-4 w-4" />
						</div>
						<h3 className="text-base sm:text-lg font-semibold text-[#0d0d0d]">
							{type === "expense"
								? "Registrar Gasto Rápido"
								: "Registrar Entrada"}
						</h3>
					</div>
					<button
						type="button"
						onClick={onClose}
						aria-label="Fechar"
						className="rounded-full p-2 text-black/40 hover:text-black hover:bg-black/[0.04] transition-colors"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				{/* Botões Rápidos Mobile para 1 Toque */}
				{type === "expense" && (
					<div className="mt-3">
						<span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-black/40 mb-1.5">
							<Sparkles className="h-3 w-3 text-[#18E299]" />
							Atalhos de 1 toque (mobile)
						</span>
						<div className="flex flex-wrap gap-1.5">
							{QUICK_EXPENSE_PRESETS.map((p) => (
								<button
									key={p.label}
									type="button"
									onClick={() => handleQuickPreset(p)}
									className="rounded-full border border-black/[0.06] bg-[#fafafa] px-3 py-1 text-xs text-black/70 hover:bg-[#d4fae8] hover:text-[#0fa76e] transition-all"
								>
									{p.label} (R${p.amount})
								</button>
							))}
						</div>
					</div>
				)}

				<form onSubmit={handleSubmit} className="mt-4 space-y-4">
					{/* Tipo de Operação */}
					<div className="grid grid-cols-2 gap-2 p-1 rounded-full bg-black/[0.04] border border-black/[0.05]">
						<button
							type="button"
							onClick={() => setType("expense")}
							className={`rounded-full py-2 text-xs font-semibold transition-all ${
								type === "expense"
									? "bg-white text-rose-600 shadow-sm"
									: "text-black/50 hover:text-black"
							}`}
						>
							Despesa (Saída)
						</button>
						<button
							type="button"
							onClick={() => setType("income")}
							className={`rounded-full py-2 text-xs font-semibold transition-all ${
								type === "income"
									? "bg-white text-emerald-600 shadow-sm"
									: "text-black/50 hover:text-black"
							}`}
						>
							Receita (Entrada)
						</button>
					</div>

					{/* Campo de Valor Gigante amigável para celular */}
					<div className="rounded-2xl bg-black/[0.02] border border-black/[0.05] p-3 text-center">
						<label
							htmlFor="tx-amount"
							className="block text-[11px] font-mono uppercase text-black/40 mb-1"
						>
							Valor monetário
						</label>
						<div className="flex items-center justify-center gap-1">
							<span className="font-mono text-xl font-bold text-black/40">
								R$
							</span>
							<input
								id="tx-amount"
								type="text"
								inputMode="decimal"
								required
								value={amount}
								onChange={(e) => setAmount(e.target.value)}
								placeholder="0,00"
								className="w-48 bg-transparent text-center font-mono text-3xl font-semibold text-[#0d0d0d] placeholder:text-black/20 focus:outline-none"
							/>
						</div>
					</div>

					{/* Descrição */}
					<div>
						<label
							htmlFor="tx-desc"
							className="block text-xs font-medium text-black/70 mb-1"
						>
							O que você comprou / pagou?
						</label>
						<input
							id="tx-desc"
							type="text"
							required
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder="Ex: Almoço de Negócios, Combustível, Farmácia..."
							className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-sm focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299]"
						/>
					</div>

					{/* Categoria e Conta */}
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="tx-category"
								className="block text-xs font-medium text-black/70 mb-1"
							>
								Categoria
							</label>
							<select
								id="tx-category"
								value={category}
								onChange={(e) => setCategory(e.target.value as Category)}
								className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-xs focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299] bg-white"
							>
								{CATEGORIES.map((cat) => (
									<option key={cat} value={cat}>
										{cat}
									</option>
								))}
							</select>
						</div>

						<div>
							<label
								htmlFor="tx-acc"
								className="block text-xs font-medium text-black/70 mb-1"
							>
								Conta / Cartão
							</label>
							<select
								id="tx-acc"
								value={accountId}
								onChange={(e) => setAccountId(e.target.value)}
								className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-xs focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299] bg-white"
							>
								{accounts.map((acc) => (
									<option key={acc.id} value={acc.id}>
										{acc.name}
									</option>
								))}
							</select>
						</div>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
						<div>
							<label
								htmlFor="tx-method"
								className="block text-xs font-medium text-black/70 mb-1"
							>
								Forma de Pagamento
							</label>
							<select
								id="tx-method"
								value={paymentMethod}
								onChange={(e) =>
									setPaymentMethod(e.target.value as (typeof METHODS)[number])
								}
								className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2.5 text-xs focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299] bg-white"
							>
								{METHODS.map((m) => (
									<option key={m} value={m}>
										{m}
									</option>
								))}
							</select>
						</div>

						<div>
							<label
								htmlFor="tx-date"
								className="block text-xs font-medium text-black/70 mb-1"
							>
								Data
							</label>
							<input
								id="tx-date"
								type="date"
								required
								value={date}
								onChange={(e) => setDate(e.target.value)}
								className="w-full rounded-xl border border-black/[0.08] px-3.5 py-2 font-mono text-xs focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299]"
							/>
						</div>
					</div>

					{/* Ações / Botões */}
					<div className="mt-6 flex items-center justify-end gap-2 pt-3 border-t border-black/[0.05]">
						<button
							type="button"
							onClick={onClose}
							className="rounded-full border border-black/[0.08] px-4 py-2.5 text-xs font-medium text-black/60 hover:bg-black/[0.03]"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="flex-1 sm:flex-initial rounded-full bg-[#0d0d0d] px-6 py-2.5 text-xs font-medium text-white hover:bg-black/90 focus:outline-none focus:ring-2 focus:ring-[#18E299] active:scale-95 transition-all text-center"
						>
							Salvar Despesa
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};
