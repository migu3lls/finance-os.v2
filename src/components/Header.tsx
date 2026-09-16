"use client";

import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

interface HeaderProps {
	onOpenAddModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenAddModal }) => {
	return (
		<header className="sticky top-0 z-40 w-full border-b border-black/[0.05] bg-white/80 backdrop-blur-md transition-all">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<Link href="/" className="flex items-center gap-3 group">
					<div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.02] p-1.5 border border-black/[0.05] transition-transform group-hover:scale-105">
						<Image
							src="/logo.svg"
							alt="Finance OS Logo"
							width={28}
							height={28}
							className="object-contain"
							priority
						/>
					</div>
					<div className="flex flex-col">
						<span className="text-base font-semibold tracking-tight text-[#0d0d0d]">
							Finance <span className="text-[#0fa76e]">OS</span>
						</span>
						<span className="font-mono text-[10px] tracking-wider text-black/40 uppercase">
							Mintlify Taste Engine
						</span>
					</div>
				</Link>

				<nav className="hidden md:flex items-center gap-6 text-sm font-medium text-black/70">
					<a
						href="#dashboard"
						className="transition-colors hover:text-[#18E299]"
					>
						Visão Geral
					</a>
					<a
						href="#onde-vai"
						className="transition-colors hover:text-[#18E299]"
					>
						Para Onde Vai?
					</a>
					<a
						href="#transacoes"
						className="transition-colors hover:text-[#18E299]"
					>
						Extrato Centralizado
					</a>
					<a
						href="#orcamentos"
						className="transition-colors hover:text-[#18E299]"
					>
						Tetos de Gastos
					</a>
				</nav>

				<div className="flex items-center gap-2 sm:gap-3">
					{onOpenAddModal && (
						<button
							type="button"
							onClick={onOpenAddModal}
							className="flex items-center gap-1.5 rounded-full border border-black/[0.1] bg-white px-3 py-1.5 text-xs font-semibold text-[#0d0d0d] shadow-sm hover:bg-black/[0.02] active:scale-95 transition-all"
						>
							<Plus className="h-3.5 w-3.5 text-[#18E299]" />
							<span>Lançar Gasto</span>
						</button>
					)}

					<Link
						href="/dashboard"
						className="inline-flex items-center gap-2 rounded-full bg-[#0d0d0d] px-4 py-2 text-xs sm:text-sm font-medium text-white shadow-sm transition-all hover:bg-black/90 active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#18E299]"
					>
						<span>Entrar no App</span>
						<ArrowRight className="h-3.5 w-3.5 text-[#18E299]" />
					</Link>
				</div>
			</div>
		</header>
	);
};
