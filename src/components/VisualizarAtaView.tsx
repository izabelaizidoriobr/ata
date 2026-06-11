/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  QrCode, 
  Download, 
  Share2, 
  MessageSquare, 
  CheckCircle2, 
  History, 
  FileSignature, 
  Printer, 
  Send,
  AlertTriangle,
  Lock,
  Stamp,
  Copy,
  Plus
} from 'lucide-react';
import { Ata, Categoria, Comentario } from '../types';

interface VisualizarAtaViewProps {
  ata: Ata;
  categoria?: Categoria;
  onBack: () => void;
  onAddComment: (ataId: string, text: string) => void;
  onSignDocument: (ataId: string) => void;
  onRestoreVersion: (ataId: string, versionId: string) => void;
  currentUser: any;
}

export default function VisualizarAtaView({
  ata,
  categoria,
  onBack,
  onAddComment,
  onSignDocument,
  onRestoreVersion,
  currentUser,
}: VisualizarAtaViewProps) {
  const [commentText, setCommentText] = useState('');
  const [shareFeedback, setShareFeedback] = useState(false);

  // Checks
  const isPendingMySignature = ata.assinaturas.some(s => s.nome === currentUser.nome && s.status === 'pendente');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      onAddComment(ata.id, commentText.trim());
      setCommentText('');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href + '#/atas/' + ata.id);
    setShareFeedback(true);
    setTimeout(() => setShareFeedback(false), 2500);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Top back & action strip */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800 gap-4">
        <div className="flex items-center space-x-3">
          <button 
            onClick={onBack}
            className="p-2 text-slate-500 hover:text-indigo-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <span className="text-[10px] uppercase font-mono tracking-widest text-indigo-500 font-bold">Registro Oficial Ativos</span>
            <h2 className="text-xl font-black text-slate-950 dark:text-white leading-tight">{ata.numero}</h2>
          </div>
        </div>

        {/* Quick action triggers */}
        <div className="flex flex-wrap items-center gap-2">
          <button 
            onClick={() => window.print()}
            className="p-2 px-3 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition text-xs font-bold flex items-center"
          >
            <Printer size={14} className="mr-1.5" />
            Imprimir Certidão
          </button>
          <button 
            onClick={handleCopyLink}
            className="p-2 px-3 text-slate-600 dark:text-slate-350 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 transition text-xs font-bold flex items-center"
          >
            <Share2 size={14} className="mr-1.5" />
            {shareFeedback ? 'Atalho Copiado!' : 'Compartilhar Link'}
          </button>
          <a 
            href={`data:text/plain;charset=utf-8,${encodeURIComponent(ata.descricao)}`}
            download={`${ata.numero}.txt`}
            className="p-2 px-3 text-white bg-indigo-600 hover:bg-indigo-500 rounded-xl text-xs font-bold flex items-center transition"
          >
            <Download size={14} className="mr-1.5" />
            Download Arquivo
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Stylized Documents Live Preview & Information Details */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Main Visual PDF Preview Frame */}
          <div className="p-8 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-900 rounded-2xl shadow-sm relative overflow-hidden print:border-none print:shadow-none print:p-0">
            {/* Stamp seal for verified official minutes */}
            <div className="absolute right-5 top-5 opacity-10 pointer-events-none select-none dark:invert">
              <Stamp size={120} className="text-indigo-900" />
            </div>

            {/* Official Header */}
            <div className="text-center pb-6 border-b-2 border-slate-900/10 dark:border-slate-800/80 mb-6 flex flex-col items-center">
              <div className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center font-serif text-xl font-bold mb-3 dark:bg-indigo-600">
                F
              </div>
              <h3 className="text-xs font-bold tracking-widest text-slate-500 uppercase">REPÚBLICA FEDERATIVA DO BRASIL</h3>
              <h4 className="text-sm font-black text-slate-900 dark:text-white tracking-normal mt-0.5">ESTADO DA ALIANÇA - DEPARTAMENTO DE COMPLIANCE</h4>
              <p className="text-[10px] text-slate-400 mt-1 font-mono tracking-wider">REGISTRO GERAL DE ATAS DE JÚRI • REGORD - {ata.id.toUpperCase()}</p>
            </div>

            {/* Simulated Live Document Elements */}
            <div className="space-y-6 text-slate-800 dark:text-slate-300 font-serif leading-relaxed text-sm print:text-black">
              <div>
                <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1">TÍTULO DA PAUTA EXTRA</span>
                <p className="text-lg font-bold font-sans text-slate-900 dark:text-white leading-tight">{ata.titulo}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Coordenadas da Reunião</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">{ata.localReuniao}</p>
                  <p className="text-slate-500 mt-0.5 font-mono">{ata.dataReuniao.split('-').reverse().join('/')} às {ata.horaReuniao}h</p>
                </div>
                <div>
                  <span className="font-bold text-slate-400 uppercase tracking-wider block">Secretariado Responsável</span>
                  <p className="font-semibold text-slate-700 dark:text-slate-200 mt-1">Presidente: {ata.presidente}</p>
                  <p className="text-slate-500 mt-0.5">Secretário: {ata.secretario}</p>
                </div>
              </div>

              <div className="border-t border-slate-100 dark:border-slate-900 pt-5 pr-4">
                <span className="font-sans text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-2">Pauta Consolidada Integral</span>
                <p className="whitespace-pre-line text-sm text-slate-700 dark:text-slate-350 leading-relaxed indent-6">
                  {ata.descricao}
                </p>
              </div>

              {/* Verified Signatures List */}
              <div className="border-t border-slate-100 dark:border-slate-900 pt-5 space-y-3 font-sans">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">Quórum de Firmas e Assinaturas Eletrônicas Incorporadas</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  {ata.assinaturas.map(sig => (
                    <div key={sig.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-100 dark:border-slate-800/60 flex items-start space-x-2">
                      <div className="mt-0.5 p-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600">
                        <CheckCircle2 size={13} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-bold text-slate-800 dark:text-slate-100">{sig.nome}</p>
                        <p className="text-[10px] text-slate-450 dark:text-slate-500 truncate">{sig.cargo}</p>
                        {sig.status === 'concluido' ? (
                          <div className="mt-1">
                            <span className="inline-block px-1.5 py-0.2 text-[8px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 rounded">
                              Assinado com ICP-Brasil
                            </span>
                            {sig.hash && (
                              <p className="text-[8px] text-slate-400 dark:text-slate-500 font-mono mt-0.5 truncate max-w-[190px]" title={sig.hash}>{sig.hash}</p>
                            )}
                          </div>
                        ) : (
                          <span className="inline-block px-1.5 py-0.2 text-[8px] font-bold bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 rounded mt-1">
                            Pendente
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Certifications Footer with QR Code */}
            <div className="mt-8 pt-6 border-t border-slate-150 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center space-x-3">
                {/* SVG mock QR Code */}
                <div className="p-1.5 bg-white border border-slate-200 dark:border-slate-800 rounded-lg">
                  <svg className="w-16 h-16 text-slate-900" viewBox="0 0 100 100">
                    <rect width="100" height="100" fill="white" />
                    <rect x="5" y="5" width="25" height="25" fill="black" />
                    <rect x="10" y="10" width="15" height="15" fill="white" />
                    <rect x="70" y="5" width="25" height="25" fill="black" />
                    <rect x="75" y="10" width="15" height="15" fill="white" />
                    <rect x="5" y="70" width="25" height="25" fill="black" />
                    <rect x="10" y="75" width="15" height="15" fill="white" />
                    <rect x="40" y="40" width="20" height="20" fill="black" />
                    <rect x="45" y="45" width="10" height="10" fill="white" />
                    {/* Tiny random dots */}
                    <rect x="35" y="10" width="10" height="10" fill="black" />
                    <rect x="55" y="20" width="10" height="10" fill="black" />
                    <rect x="20" y="35" width="5" height="15" fill="black" />
                    <rect x="75" y="45" width="15" height="10" fill="black" />
                    <rect x="40" y="75" width="15" height="15" fill="black" />
                    <rect x="70" y="70" width="25" height="10" fill="black" />
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-slate-800 dark:text-slate-150">Validação Blockchain Federal</h5>
                  <p className="text-[10px] text-slate-450 dark:text-slate-500 max-w-[220px] leading-snug">Rito autenticado. Escaneie o QR Code sobre papel timbrado para verificar integridade e chaves criptográficas.</p>
                </div>
              </div>
              <div className="text-right sm:text-right text-[10px] font-mono text-slate-400 dark:text-slate-500">
                <p>Nª Registro: REG-{ata.id}</p>
                <p className="mt-0.5">Hash Assinado: SHA256-b9e8d3...</p>
              </div>
            </div>

          </div>

          {/* Pending signature banner */}
          {isPendingMySignature && (
            <div className="p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-250 dark:border-amber-900 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/40 text-amber-600 rounded-xl">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-amber-800 dark:text-amber-300">Sua assinatura nesta ata é necessária</h5>
                  <p className="text-xs text-amber-600 dark:text-amber-400 leading-snug">Você foi designado como participante ativo de quórum.</p>
                </div>
              </div>
              <button
                onClick={() => onSignDocument(ata.id)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow transition duration-150"
              >
                Assinar com Certificado ICP
              </button>
            </div>
          )}

        </div>

        {/* Right column: Comments box, timeline audits, dynamic versions */}
        <div className="space-y-6">
          
          {/* Timeline workflow metadata */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Linha do Tempo / Workflow</h4>

            <div className="space-y-4">
              {[
                { title: 'Iniciação e Rascunho', subtitle: `João Lima em ${ata.dataReuniao}`, done: true },
                { title: 'Revisão Jurídico/Compliance', subtitle: 'Maria Souza em 12/05/2026', done: true },
                { title: 'Assinaturas de Quórum', subtitle: 'Atendimento e chaves colhidas', done: ata.status === 'publicado' },
                { title: 'Publicado no Diário Oficial', subtitle: ata.dataPublicacao ? `Lançamento em ${ata.dataPublicacao}` : 'Em andamento', done: ata.status === 'publicado' }
              ].map((step, idx) => (
                <div key={idx} className="flex space-x-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${step.done ? 'bg-indigo-600 border-indigo-650 text-white' : 'border-slate-200 text-slate-400'}`}>
                      {idx + 1}
                    </div>
                    {idx < 3 && <div className={`w-0.5 h-8 ${step.done ? 'bg-indigo-650' : 'bg-slate-200 dark:bg-slate-800'}`} />}
                  </div>
                  <div className="pt-0.5 min-w-0">
                    <p className={`text-xs font-extrabold ${step.done ? 'text-slate-800 dark:text-slate-200' : 'text-slate-400'}`}>{step.title}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">{step.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action-Versions History List */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
                <History size={14} className="mr-2" />
                Histórico de Versões
              </h4>
              <span className="text-[10px] text-indigo-500 font-bold">Rastreável</span>
            </div>

            <div className="space-y-4 max-h-56 overflow-y-auto pr-1">
              {ata.historicoVersoes.map((ver, idx) => (
                <div key={ver.id} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-xl hover:bg-slate-100/50 dark:hover:bg-slate-900/80 transition-all border border-slate-100/60 dark:border-slate-800/80">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-indigo-600 dark:text-indigo-400">{ver.versao}</span>
                    <span className="text-[9px] text-slate-400 dark:text-slate-500 font-mono">{ver.dataAlteracao}</span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1.5"><span className="font-bold text-slate-750 dark:text-slate-250">{ver.autor}</span>: {ver.descricaoAlteracoes}</p>
                  {idx > 0 && (
                    <button
                      onClick={() => onRestoreVersion(ata.id, ver.id)}
                      className="mt-2 text-[9px] font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center"
                    >
                      Restaurar esta versão
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* User Comments log section */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center">
              <MessageSquare size={14} className="mr-2" />
              Observações & Pareceres ({ata.comentarios.length})
            </h4>

            {/* Render loop */}
            <div className="space-y-3.5 max-h-72 overflow-y-auto pr-1">
              {ata.comentarios.length === 0 ? (
                <p className="text-[11px] text-slate-400 text-center py-4">Nenhum comentário anexador até o momento.</p>
              ) : (
                ata.comentarios.map(c => (
                  <div key={c.id} className="text-xs space-y-1">
                    <div className="flex justify-between leading-none">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{c.autor} <span className="text-[9px] text-indigo-500 font-bold font-sans">({c.perfil})</span></span>
                      <span className="text-[9px] text-slate-400 font-mono">{c.data}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 font-sans leading-relaxed bg-slate-50 dark:bg-slate-900 p-2.5 rounded-xl border border-slate-100/50 dark:border-slate-800/40">
                      {c.texto}
                    </p>
                  </div>
                ))
              )}
            </div>

            {/* Comment adding box */}
            <form onSubmit={handleCommentSubmit} className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center space-x-2">
              <label htmlFor="pauta-comment-input" className="sr-only">Adicionar observação na pauta</label>
              <input
                id="pauta-comment-input"
                type="text"
                placeholder="Adicionar observação na pauta..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-850 dark:text-slate-200 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
              />
              <button
                type="submit"
                className="p-2 bg-indigo-600 hover:bg-indigo-550 text-white rounded-xl transition"
                title="Enviar comentário"
              >
                <Send size={14} />
              </button>
            </form>
          </div>

        </div>

      </div>

    </div>
  );
}
