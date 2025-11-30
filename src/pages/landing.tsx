import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  CheckCircle,
  Brain,
  ShieldCheck,
  Clock,
  Users,
  ChevronRight,
  Star,
  ArrowRight,
  Menu,
  X,
  Play,
  Zap,
  Layout,
  Lock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Image from "next/image";
import DashboardImage from "../public/Dashboard.png";
import AIPanelImage from "../public/AI_Panel.png";
import ReceptionImage from "../public/Reception.png";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Head>
        <title>ClinicFlow - Gestão Inteligente para Clínicas</title>
        <meta
          name="description"
          content="O sistema de gestão de clínicas mais avançado do mercado, com IA integrada."
        />
      </Head>

      {/* Navbar */}
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Layout className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
                ClinicFlow
              </span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="#features"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Funcionalidades
              </Link>
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Preços
              </Link>
              <Link
                href="#faq"
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                FAQ
              </Link>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-0.5"
              >
                Começar Grátis
              </Link>
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 focus:outline-none"
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-b border-gray-100">
            <div className="px-4 pt-2 pb-6 space-y-2">
              <Link
                href="#features"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Funcionalidades
              </Link>
              <Link
                href="#pricing"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Preços
              </Link>
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="block w-full text-center mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
              >
                Começar Grátis
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-transparent to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-100/50 via-transparent to-transparent" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-100 rounded-full px-4 py-1.5 mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
              <span className="text-sm font-medium text-blue-800">
                Nova versão 2.0 com IA Integrada
              </span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-gray-900 mb-8 leading-tight">
              A Revolução da <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Gestão Clínica com IA
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
              Deixe a burocracia com a nossa Inteligência Artificial e foque no
              que realmente importa: seus pacientes. O ClinicFlow é o copiloto
              que sua clínica precisava.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Link
                href="/register"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 hover:shadow-blue-600/40 transform hover:-translate-y-1 flex items-center justify-center"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                href="#demo"
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all flex items-center justify-center group"
              >
                <Play className="mr-2 w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                Ver Demonstração
              </Link>
            </div>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mt-20 relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl opacity-20 blur-2xl"></div>
            <div className="relative bg-gray-900 rounded-xl shadow-2xl overflow-hidden border border-gray-800 flex items-center justify-center group">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/10 z-10 pointer-events-none"></div>
              <Image
                src={DashboardImage}
                alt="Interface do Dashboard ClinicFlow"
                className="w-full h-auto transform group-hover:scale-[1.02] transition-transform duration-700 object-contain"
                quality={100}
                placeholder="blur"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Sua clínica está perdendo dinheiro e você nem sabe
            </h2>
            <p className="text-lg text-gray-600">
              Recepção lotada, glosas de convênio e falta de tempo para analisar
              históricos. Esses são os sintomas de uma gestão ultrapassada.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Clock,
                title: "Tempo Perdido",
                desc: "Médicos gastam 40% do tempo preenchendo papelada em vez de cuidar de pacientes.",
              },
              {
                icon: Users,
                title: "Recepção Caótica",
                desc: "Filas de espera desorganizadas e erros de cadastro geram estresse e reclamações.",
              },
              {
                icon: ShieldCheck,
                title: "Riscos de Segurança",
                desc: "Dados sensíveis expostos e falta de controle sobre quem acessa o quê.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center mb-6">
                  <item.icon className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tudo o que você precisa para crescer
            </h2>
            <p className="text-xl text-gray-600">
              Tecnologia de ponta simplificada para o seu dia a dia.
            </p>
          </div>

          <div className="space-y-24">
            {/* Feature 1 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="absolute -inset-4 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 aspect-video group">
                  <Image
                    src={AIPanelImage}
                    alt="Painel de Insights com IA"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    quality={100}
                    placeholder="blur"
                  />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Zap className="w-4 h-4" />
                  <span>Exclusivo ClinicFlow</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Seu Copiloto Clínico com IA
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Nossa IA analisa o histórico do paciente antes mesmo dele
                  entrar na sala. Receba sugestões de diagnóstico, alertas de
                  alergias e resumos clínicos automáticos.
                </p>
                <ul className="space-y-4">
                  {[
                    "Análise preditiva de histórico",
                    "Sugestões de tratamento baseadas em evidências",
                    "Resumo automático de consultas anteriores",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-6">
                  <Clock className="w-4 h-4" />
                  <span>Smart Check-in</span>
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Recepção Ágil e Sem Filas
                </h3>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Cadastro ultra-rápido com busca automática de CEP. Organize a
                  fila de espera com painéis digitais e reduza o tempo de espera
                  em até 60%.
                </p>
                <ul className="space-y-4">
                  {[
                    "Preenchimento automático via CEP",
                    "Painel de senha e chamada por voz",
                    "Triagem digital integrada",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-purple-100 rounded-full opacity-50 blur-3xl"></div>
                <div className="relative bg-gray-900 rounded-2xl shadow-2xl overflow-hidden border border-gray-800 aspect-video group">
                  <Image
                    src={ReceptionImage}
                    alt="Recepção Inteligente"
                    className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-700"
                    quality={100}
                    placeholder="blur"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-24 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Quem usa, recomenda</h2>
            <p className="text-gray-400 text-lg">
              Junte-se a centenas de clínicas que modernizaram sua gestão.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Dr. Ricardo Silva",
                role: "Cardiologista",
                content:
                  "O painel de IA mudou minha rotina. Consigo atender com mais qualidade e menos pressa, pois o sistema já me entrega tudo mastigado.",
                stars: 5,
              },
              {
                name: "Dra. Ana Paula",
                role: "Gestora da Clínica Saúde+",
                content:
                  "A gestão financeira e o controle de repasses eram meu pesadelo. Com o ClinicFlow, resolvo tudo em 2 cliques. A equipe de suporte é fantástica.",
                stars: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700"
              >
                <div className="flex space-x-1 mb-4">
                  {[...Array(testimonial.stars)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-lg text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-gray-500 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Planos que cabem no seu bolso
            </h2>
            <p className="text-xl text-gray-600">
              Sem taxas escondidas. Cancele quando quiser.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Plan Solo */}
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:border-blue-200 transition-colors relative overflow-hidden">
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Consultório Solo
                </h3>
                <p className="text-gray-500">
                  Ideal para profissionais liberais
                </p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">R$ 149</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "1 Profissional de Saúde",
                  "2 Usuários Administrativos",
                  "Prontuário Eletrônico Completo",
                  "Agendamento Online",
                  "50 Consultas IA/mês",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                    <span className="text-gray-600">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register?plan=solo"
                className="block w-full py-4 text-center bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-colors"
              >
                Escolher Plano Solo
              </Link>
            </div>

            {/* Plan Multi */}
            <div className="bg-white p-8 rounded-3xl shadow-xl border-2 border-blue-600 relative overflow-hidden transform md:-translate-y-4">
              <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
                MAIS POPULAR
              </div>
              <div className="mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Policlínica
                </h3>
                <p className="text-gray-500">Para clínicas em crescimento</p>
              </div>
              <div className="mb-8">
                <span className="text-5xl font-bold text-gray-900">R$ 299</span>
                <span className="text-gray-500">/mês</span>
                <p className="text-sm text-gray-500 mt-2">
                  Inclui 2 profissionais
                </p>
              </div>
              <ul className="space-y-4 mb-8">
                {[
                  "Profissionais Adicionais: R$ 89/cada",
                  "Usuários Administrativos Ilimitados",
                  "Gestão Financeira Avançada (Repasses)",
                  "Painel de Senha e Fila de Espera",
                  "IA Ilimitada",
                  "Gestão de Múltiplas Agendas",
                ].map((item, i) => (
                  <li key={i} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/register?plan=multi"
                className="block w-full py-4 text-center bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
              >
                Começar Agora
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perguntas Frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "É difícil migrar meus dados de outro sistema?",
                a: "Não! Temos uma ferramenta de importação inteligente que aceita planilhas Excel/CSV. Além disso, nossa equipe de suporte auxilia em todo o processo de migração no plano Policlínica.",
              },
              {
                q: "Meus dados estão seguros?",
                a: "Absolutamente. Utilizamos criptografia de ponta a ponta, backups diários automáticos e servidores em nuvem de alta disponibilidade. Seus dados são seus e de mais ninguém.",
              },
              {
                q: "A IA substitui o médico?",
                a: "Jamais. A IA do ClinicFlow atua como um 'copiloto', sugerindo informações e organizando dados para que você tome a decisão final com mais embasamento e rapidez.",
              },
              {
                q: "Posso cancelar a qualquer momento?",
                a: "Sim. Não exigimos fidelidade nos planos mensais. Você pode cancelar quando quiser sem multas.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors text-left"
                >
                  <span className="font-semibold text-gray-900">{item.q}</span>
                  {activeFaq === index ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="p-6 pt-0 bg-white text-gray-600 border-t border-gray-100">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Layout className="w-6 h-6 text-blue-500" />
                <span className="text-2xl font-bold text-white">
                  ClinicFlow
                </span>
              </div>
              <p className="max-w-xs">
                Transformando a saúde com tecnologia e inteligência artificial.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Produto</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Funcionalidades
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Preços
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Atualizações
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Termos de Uso
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-blue-400">
                    Contato
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>
              &copy; {new Date().getFullYear()} ClinicFlow. Todos os direitos
              reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
