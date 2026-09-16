"use client";

import { Cookie, X } from "lucide-react";
import Link from "next/link";
import type React from "react";
import { useEffect, useState } from "react";

export const CookieBanner: React.FC = () => {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const consent = localStorage.getItem("finance_os_cookie_consent");
		if (!consent) {
			const timer = setTimeout(() => setIsVisible(true), 800);
			return () => clearTimeout(timer);
		}
	}, []);

	const handleAccept = () => {
		localStorage.setItem("finance_os_cookie_consent", "accepted");
		setIsVisible(false);
	};

	const handleDecline = () => {
		localStorage.setItem("finance_os_cookie_consent", "declined");
		setIsVisible(false);
	};

	if (!isVisible) return null;

	return (
		<aside
			aria-label="Consentimento de Cookies e Privacidade"
			className="fixed bottom-5 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-50 rounded-2xl border border-black/[0.08] bg-white/95 p-5 shadow-lg backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-5 duration-300"
		>
			<div className="flex items-start gap-3">
				<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#d4fae8] text-[#0fa76e]">
					<Cookie className="h-5 w-5" />
				</div>
				<div className="flex-1 text-xs text-black/70 leading-relaxed">
					<p className="font-semibold text-[#0d0d0d] mb-1">
						Privacidade e Gestão de Dados
					</p>
					Utilizamos armazenamento local e cookies estritamente necessários para
					manter seus dados financeiros seguros em seu dispositivo, conforme as
					normas da LGPD. Conheça nossa{" "}
					<Link
						href="/privacy"
						className="font-medium text-[#0d0d0d] underline decoration-[#18E299] underline-offset-2 hover:text-[#0fa76e]"
					>
						Política de Privacidade
					</Link>
					.
				</div>
				<button
					type="button"
					onClick={handleDecline}
					aria-label="Fechar"
					className="text-black/40 hover:text-black transition-colors"
				>
					<X className="h-4 w-4" />
				</button>
			</div>

			<div className="mt-4 flex items-center justify-end gap-2">
				<button
					type="button"
					onClick={handleDecline}
					className="rounded-full border border-black/[0.08] px-3.5 py-1.5 text-xs font-medium text-black/70 hover:bg-black/[0.02] transition-all"
				>
					Apenas Essenciais
				</button>
				<button
					type="button"
					onClick={handleAccept}
					className="rounded-full bg-[#0d0d0d] px-4 py-1.5 text-xs font-medium text-white hover:bg-black/85 transition-all shadow-sm focus:ring-2 focus:ring-[#18E299]"
				>
					Concordar e Fechar
				</button>
			</div>
		</aside>
	);
};
