"use client";

import {
	ChevronLeft,
	ChevronRight,
	FileSpreadsheet,
	LayoutDashboard,
	PieChart,
	Plus,
	Receipt,
	ShieldCheck,
	Target,
	Wallet,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { useFinance } from "@/context/FinanceContext";

interface AppSidebarProps {
	onOpenAddModal: () => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({ onOpenAddModal }) => {
	const pathname = usePathname();
	const [collapsed, setCollapsed] = useState(false);
	const { totalBalance } = useFinance();

	const navItems = [
		{ label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
		{ label: "Transações", href: "/transactions", icon: Receipt },
		{ label: "Tetos & Metas", href: "/budgets", icon: Target },
		{ label: "Diagnóstico de Gastos", href: "/analytics", icon: PieChart },
		{ label: "Importador Bancário", href: "/import", icon: FileSpreadsheet },
	];

	const formatCurrency = (val: number) => {
		return new Intl.NumberFormat("pt-BR", {
			style: "currency",
			currency: "BRL",
		}).format(val);
	};

	return (
		<aside
			className={`relative flex flex-col border-r border-black/[0.05] bg-white transition-all duration-300 ${
				collapsed ? "w-20" : "w-64"
			}`}
		>
			{/* Brand Header */}
			<div className="flex h-16 items-center justify-between px-4 border-b border-black/[0.05]">
				<Link
					href="/dashboard"
					className="flex items-center gap-3 overflow-hidden"
				>
					<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black/[0.02] p-1.5 border border-black/[0.05]">
						<Image
							src="/logo.svg"
							alt="Logo"
							width={26}
							height={26}
							className="object-contain"
						/>
					</div>
					{!collapsed && (
						<div className="flex flex-col">
							<span className="text-sm font-semibold tracking-tight text-[#0d0d0d]">
								Finance <span className="text-[#0fa76e]">OS</span>
							</span>
							<span className="font-mono text-[9px] uppercase tracking-wider text-black/40">
								Workspace Ativo
							</span>
						</div>
					)}
				</Link>

				<button
					type="button"
					onClick={() => setCollapsed(!collapsed)}
					aria-label={collapsed ? "Expandir menu" : "Recolher menu"}
					className="rounded-lg p-1 text-black/40 hover:bg-black/[0.04] hover:text-black transition-colors"
				>
					{collapsed ? (
						<ChevronRight className="h-4 w-4" />
					) : (
						<ChevronLeft className="h-4 w-4" />
					)}
				</button>
			</div>

			{/* Botão de Registro Rápido */}
			<div className="p-3">
				<button
					type="button"
					onClick={onOpenAddModal}
					className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0d0d0d] px-3 py-2.5 text-xs font-medium text-white shadow-sm transition-all hover:bg-black/90 active:scale-95 focus:ring-2 focus:ring-[#18E299]"
				>
					<Plus className="h-4 w-4 text-[#18E299] shrink-0" />
					{!collapsed && <span>Novo Lançamento</span>}
				</button>
			</div>

			{/* Links de Navegação */}
			<nav className="flex-1 space-y-1 px-3 py-2">
				{navItems.map((item) => {
					const Icon = item.icon;
					const isActive = pathname === item.href;

					return (
						<Link
							key={item.href}
							href={item.href}
							title={collapsed ? item.label : undefined}
							className={`flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all ${
								isActive
									? "bg-[#d4fae8]/60 text-[#0fa76e] font-semibold"
									: "text-black/60 hover:bg-black/[0.03] hover:text-[#0d0d0d]"
							}`}
						>
							<Icon
								className={`h-4 w-4 shrink-0 ${
									isActive ? "text-[#0fa76e]" : "text-black/50"
								}`}
							/>
							{!collapsed && <span>{item.label}</span>}
						</Link>
					);
				})}
			</nav>

			{/* Widget de Patrimônio / Saldo Geral */}
			{!collapsed && (
				<div className="m-3 rounded-2xl border border-black/[0.05] bg-[#fafafa] p-3.5">
					<div className="flex items-center gap-2 text-black/50 text-[11px]">
						<Wallet className="h-3.5 w-3.5 text-[#0fa76e]" />
						<span>Patrimônio Total</span>
					</div>
					<p className="mt-1 font-mono text-sm font-semibold text-[#0d0d0d]">
						{formatCurrency(totalBalance)}
					</p>
				</div>
			)}

			{/* Rodapé da Sidebar */}
			<div className="border-t border-black/[0.05] p-3">
				<Link
					href="/"
					className="flex items-center gap-3 rounded-xl px-3 py-2 text-xs text-black/50 hover:bg-black/[0.03] hover:text-black transition-colors"
				>
					<ShieldCheck className="h-4 w-4 shrink-0 text-[#0fa76e]" />
					{!collapsed && <span>Ver Landing Page</span>}
				</Link>
			</div>
		</aside>
	);
};
