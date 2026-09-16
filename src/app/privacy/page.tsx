import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export const metadata = {
	title: "Política de Privacidade — Finance OS",
	description:
		"Declaração de privacidade, proteção de dados e governança LGPD do Finance OS.",
};

export default function PrivacyPage() {
	return (
		<div className="min-h-screen bg-white">
			<header className="border-b border-black/[0.05] bg-white/80 backdrop-blur-md sticky top-0 z-30">
				<div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
					<Link
						href="/"
						className="inline-flex items-center gap-2 text-xs font-medium text-black/60 hover:text-black transition-colors rounded-full border border-black/[0.06] px-3.5 py-1.5"
					>
						<ArrowLeft className="h-3.5 w-3.5" />
						Voltar ao Finance OS
					</Link>
					<span className="font-mono text-xs text-black/40 uppercase">
						Governança LGPD
					</span>
				</div>
			</header>

			<main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
				<div className="inline-flex items-center gap-2 rounded-full bg-[#d4fae8] px-3.5 py-1 text-xs font-semibold text-[#0fa76e] mb-6">
					<Shield className="h-3.5 w-3.5" />
					Transparência e Soberania de Dados
				</div>

				<h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0d0d0d] display-hero mb-6">
					Política de Privacidade do Finance OS
				</h1>

				<div className="prose prose-neutral max-w-none text-sm text-black/70 space-y-6 leading-relaxed">
					<p>
						O <strong>Finance OS</strong> foi projetado segundo o princípio de{" "}
						<em>Privacy by Design</em> e conformidade com a Lei Geral de
						Proteção de Dados (Lei nº 13.709/2018 - LGPD).
					</p>

					<h2 className="text-lg font-semibold text-[#0d0d0d] mt-8">
						1. Armazenamento Local e Soberania
					</h2>
					<p>
						Por padrão operacional, todas as transações, valores monetários e
						notas financeiras cadastradas nesta aplicação são processadas e
						armazenadas{" "}
						<strong>
							exclusivamente na memória local (LocalStorage) do seu navegador
						</strong>
						. Nenhum dado bancário ou quantia é comercializado, leiloado ou
						transmitido a servidores de publicidade de terceiros.
					</p>

					<h2 className="text-lg font-semibold text-[#0d0d0d] mt-8">
						2. Uso de Cookies e Preferências
					</h2>
					<p>
						Utilizamos apenas identificadores estritamente necessários para
						preservar suas preferências de layout, estado de consentimento do
						banner e modo de visualização. Não usamos cookies para rastreamento
						comportamental cruzado entre domínios.
					</p>

					<h2 className="text-lg font-semibold text-[#0d0d0d] mt-8">
						3. Direitos do Titular (Art. 18 LGPD)
					</h2>
					<p>
						Você possui total autonomia para consultar, corrigir, exportar ou
						deletar de forma imediata e irreversível qualquer registro
						financeiro através da interface ou simplesmente limpando o cache e
						dados do navegador.
					</p>

					<h2 className="text-lg font-semibold text-[#0d0d0d] mt-8">
						4. Segurança de Aplicação
					</h2>
					<p>
						Aplicamos práticas modernas de segurança de software, incluindo
						higienização contra XSS, cabeçalhos de segurança HTTP e revisões
						automatizadas de código via Biome e pipelines de CI/CD.
					</p>
				</div>
			</main>
		</div>
	);
}
