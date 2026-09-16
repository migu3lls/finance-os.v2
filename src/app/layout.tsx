import type { Metadata } from "next";
import { Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
	display: "swap",
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Finance OS — Onde está indo o seu dinheiro",
	description:
		"Centralizador inteligente de gastos, controle financeiro pessoal e visualização orçamentária com design minimalista de alta precisão.",
	icons: {
		icon: "/logo.svg",
		shortcut: "/logo.svg",
		apple: "/logo.svg",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-BR"
			className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
		>
			<body className="min-h-full flex flex-col bg-white text-[#0d0d0d]">
				{children}
			</body>
		</html>
	);
}
