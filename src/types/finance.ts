export type TransactionType = "expense" | "income" | "transfer";

export type Category =
	| "Alimentação & Mercado"
	| "Moradia & Contas"
	| "Transporte & Mobilidade"
	| "Lazer & Entretenimento"
	| "Saúde & Bem-estar"
	| "Educação & Livros"
	| "Assinaturas & Software"
	| "Investimentos"
	| "Salário & Faturamento"
	| "Outros";

export type AccountType = "checking" | "credit_card" | "investment" | "cash";

export interface Account {
	id: string;
	name: string;
	type: AccountType;
	balance: number;
	color: string;
	iconName?: string;
	// Campos específicos para cartão de crédito
	closingDay?: number;
	dueDay?: number;
	creditLimit?: number;
}

export interface Transaction {
	id: string;
	description: string;
	amount: number;
	type: TransactionType;
	category: Category;
	date: string; // YYYY-MM-DD
	paymentMethod:
		| "Cartão de Crédito"
		| "PIX"
		| "Boleto"
		| "Débito"
		| "Dinheiro"
		| "Transferência";
	accountId?: string;
	tags?: string[];
	notes?: string;
	status?: "completed" | "pending";
}

export interface BudgetLimit {
	category: Category;
	limit: number;
	alertThreshold?: number; // percentual de aviso, ex: 80%
}
