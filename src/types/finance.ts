export type TransactionType = "expense" | "income";

export type Category =
	| "Alimentação & Mercado"
	| "Moradia & Contas"
	| "Transporte & Mobilidade"
	| "Lazer & Entretenimento"
	| "Saúde & Bem-estar"
	| "Educação & Livros"
	| "Assinaturas & Software"
	| "Investimentos"
	| "Outros";

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	type: TransactionType;
	category: Category;
	date: string; // ISO string YYYY-MM-DD
	paymentMethod: "Cartão de Crédito" | "PIX" | "Boleto" | "Débito" | "Dinheiro";
	notes?: string;
}

export interface BudgetLimit {
	category: Category;
	limit: number;
}
