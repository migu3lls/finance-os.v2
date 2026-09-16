"use client";

import { AlertCircle, CheckCircle2, FileText, UploadCloud } from "lucide-react";
import type React from "react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";
import type { Category, TransactionType } from "@/types/finance";

export default function ImportPage() {
	const { importTransactions, accounts } = useFinance();
	const [fileContent, setFileContent] = useState<string>("");
	const [selectedAccountId, setSelectedAccountId] = useState<string>(
		accounts[0]?.id || "",
	);
	const [previewCount, setPreviewCount] = useState<number | null>(null);
	const [successMessage, setSuccessMessage] = useState(false);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = (event) => {
			const text = event.target?.result as string;
			setFileContent(text);
			// Analisa quantidade de linhas/registros
			const lines = text.split("\n").filter((l) => l.trim().length > 0);
			setPreviewCount(Math.max(lines.length - 1, 0));
		};
		reader.readAsText(file);
	};

	const processImport = () => {
		if (!fileContent) return;

		const lines = fileContent
			.split("\n")
			.map((l) => l.trim())
			.filter(Boolean);
		const parsedTransactions = [];

		// Parser simples e resiliente de CSV / extratos
		for (let i = 1; i < lines.length; i++) {
			const parts = lines[i]
				.split(/[;,]/)
				.map((p) => p.replace(/["']/g, "").trim());
			if (parts.length >= 3) {
				// Assume formato: Data; Descricao; Valor
				const dateStr = parts[0];
				const desc = parts[1];
				const rawVal = parseFloat(parts[2].replace(",", "."));

				if (!Number.isNaN(rawVal)) {
					const isExp = rawVal < 0;
					const absVal = Math.abs(rawVal);

					// Inferência inteligente de categoria com base no nome
					let cat: Category = "Outros";
					const lowerDesc = desc.toLowerCase();
					if (
						lowerDesc.includes("mercado") ||
						lowerDesc.includes("pao de acucar") ||
						lowerDesc.includes("ifood") ||
						lowerDesc.includes("restaurante")
					) {
						cat = "Alimentação & Mercado";
					} else if (
						lowerDesc.includes("uber") ||
						lowerDesc.includes("posto") ||
						lowerDesc.includes("gasolina") ||
						lowerDesc.includes("99")
					) {
						cat = "Transporte & Mobilidade";
					} else if (
						lowerDesc.includes("aluguel") ||
						lowerDesc.includes("luz") ||
						lowerDesc.includes("enel") ||
						lowerDesc.includes("sabesp") ||
						lowerDesc.includes("internet")
					) {
						cat = "Moradia & Contas";
					} else if (
						lowerDesc.includes("netflix") ||
						lowerDesc.includes("spotify") ||
						lowerDesc.includes("cinema") ||
						lowerDesc.includes("bar")
					) {
						cat = "Lazer & Entretenimento";
					} else if (
						lowerDesc.includes("farmacia") ||
						lowerDesc.includes("droga") ||
						lowerDesc.includes("medico") ||
						lowerDesc.includes("hospital")
					) {
						cat = "Saúde & Bem-estar";
					} else if (
						lowerDesc.includes("salario") ||
						lowerDesc.includes("pro labore") ||
						lowerDesc.includes("ted recebida") ||
						lowerDesc.includes("pix recebido")
					) {
						cat = "Salário & Faturamento";
					}

					parsedTransactions.push({
						description: desc || "Lançamento Importado",
						amount: absVal,
						type: (isExp ? "expense" : "income") as TransactionType,
						category: cat,
						date: dateStr.includes("-")
							? dateStr
							: new Date().toISOString().split("T")[0],
						paymentMethod: "PIX" as const,
						accountId: selectedAccountId,
						tags: ["Importado", "Extrato"],
					});
				}
			}
		}

		if (parsedTransactions.length > 0) {
			importTransactions(parsedTransactions);
			setSuccessMessage(true);
			setFileContent("");
			setPreviewCount(null);
		}
	};

	return (
		<div className="max-w-4xl space-y-6">
			<div>
				<h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#0d0d0d] display-hero">
					Importador de Extrato Bancário
				</h1>
				<p className="text-xs sm:text-sm text-black/50 mt-1">
					Importe extratos CSV ou OFX do Nubank, Itaú, Inter e categorize
					despesas automaticamente.
				</p>
			</div>

			{successMessage && (
				<div className="flex items-center gap-3 p-4 rounded-2xl bg-[#d4fae8] border border-[#18E299]/40 text-[#0fa76e] text-xs font-semibold animate-in fade-in">
					<CheckCircle2 className="h-4 w-4 shrink-0" />
					Transações importadas e categorizadas com sucesso no seu extrato!
				</div>
			)}

			<div className="rounded-3xl border border-black/[0.05] bg-white p-8 shadow-[0px_2px_4px_rgba(0,0,0,0.02)] space-y-6">
				{/* Escolha da Conta de Destino */}
				<div>
					<label
						htmlFor="target-acc"
						className="block text-xs font-semibold text-[#0d0d0d] mb-1.5"
					>
						Vincular Extrato à Conta:
					</label>
					<select
						id="target-acc"
						value={selectedAccountId}
						onChange={(e) => setSelectedAccountId(e.target.value)}
						className="w-full sm:max-w-xs rounded-xl border border-black/[0.08] px-3.5 py-2 text-xs bg-white focus:border-[#18E299] focus:outline-none focus:ring-1 focus:ring-[#18E299]"
					>
						{accounts.map((acc) => (
							<option key={acc.id} value={acc.id}>
								{acc.name}
							</option>
						))}
					</select>
				</div>

				{/* Drag and drop zone */}
				<div className="relative border-2 border-dashed border-black/[0.1] hover:border-[#18E299] rounded-3xl p-8 text-center transition-colors flex flex-col items-center justify-center bg-[#fafafa]/50 group">
					<div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm border border-black/[0.05] text-[#0fa76e] mb-3 group-hover:scale-105 transition-transform">
						<UploadCloud className="h-6 w-6" />
					</div>
					<p className="text-sm font-semibold text-[#0d0d0d]">
						Arraste seu arquivo de extrato ou clique para selecionar
					</p>
					<p className="text-xs text-black/40 mt-1">
						Formatos suportados: .CSV e .OFX (Extrato padrão de bancos
						brasileiros)
					</p>

					<input
						type="file"
						accept=".csv, .txt, .ofx"
						onChange={handleFileUpload}
						className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
					/>
				</div>

				{/* Resumo do Arquivo Carregado */}
				{previewCount !== null && (
					<div className="flex items-center justify-between p-4 rounded-2xl bg-black/[0.02] border border-black/[0.05]">
						<div className="flex items-center gap-2.5 text-xs text-black/70">
							<FileText className="h-4 w-4 text-[#0fa76e]" />
							<span>
								Extrato analisado:{" "}
								<strong>{previewCount} lançamentos detectados</strong>
							</span>
						</div>

						<button
							type="button"
							onClick={processImport}
							className="rounded-full bg-[#0d0d0d] px-5 py-2 text-xs font-semibold text-white hover:bg-black/90 shadow-sm transition-all focus:ring-2 focus:ring-[#18E299]"
						>
							Confirmar Importação
						</button>
					</div>
				)}

				<div className="border-t border-black/[0.04] pt-4 text-[11px] text-black/40 flex items-start gap-2">
					<AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
					<span>
						Segurança total: O processamento dos dados bancários ocorre
						inteiramente no seu navegador. Nenhum extrato é enviado para
						servidores externos.
					</span>
				</div>
			</div>
		</div>
	);
}
