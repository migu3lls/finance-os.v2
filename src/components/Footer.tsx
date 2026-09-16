import Image from "next/image";
import Link from "next/link";
import type React from "react";

export const Footer: React.FC = () => {
	return (
		<footer className="border-t border-black/[0.05] bg-white py-12">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex flex-col md:flex-row items-center justify-between gap-6">
					<div className="flex items-center gap-3">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black/[0.02] p-1 border border-black/[0.05]">
							<Image
								src="/logo.svg"
								alt="Finance OS"
								width={22}
								height={22}
								className="object-contain"
							/>
						</div>
						<div className="flex flex-col">
							<span className="text-sm font-semibold text-[#0d0d0d]">
								Finance OS
							</span>
							<span className="font-mono text-[10px] text-black/40 uppercase">
								Mintlify Design Engineering
							</span>
						</div>
					</div>

					<div className="flex flex-wrap items-center gap-6 text-xs text-black/60">
						<Link
							href="/privacy"
							className="hover:text-black transition-colors"
						>
							Política de Privacidade (LGPD)
						</Link>
						<a href="#dashboard" className="hover:text-black transition-colors">
							Visão Geral
						</a>
						<a href="#onde-vai" className="hover:text-black transition-colors">
							Diagnóstico de Gastos
						</a>
						<a
							href="#orcamentos"
							className="hover:text-black transition-colors"
						>
							Tetos Orçamentários
						</a>
					</div>

					<div className="font-mono text-[11px] text-black/40">
						© {new Date().getFullYear()} Finance OS. Todos os direitos
						reservados.
					</div>
				</div>
			</div>
		</footer>
	);
};
