/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  UploadCloud, 
  ArrowLeft, 
  FileText, 
  Users, 
  Calendar, 
  MapPin, 
  Heading, 
  Link,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Ata, Categoria, Anexo } from '../types';

interface NovaAtaViewProps {
  categorias: Categoria[];
  onSave: (ata: Omit<Ata, 'id' | 'downloads' | 'comentarios' | 'historicoVersoes' | 'assinaturas'>, publishImmediately: boolean) => void;
  onCancel: () => void;
}

export default function NovaAtaView({ categorias, onSave, onCancel }: NovaAtaViewProps) {
  // Fields state
  const [numero, setNumero] = useState('ATA - 1538/1423.727');
  const [titulo, setTitulo] = useState('');
  const [categoriaId, setCategoriaId] = useState(categorias[0]?.id || '');
  const [descricao, setDescricao] = useState('');
  const [dataReuniao, setDataReuniao] = useState('2026-06-11');
  const [horaReuniao, setHoraReuniao] = useState('10:00');
  const [localReuniao, setLocalReuniao] = useState('Sala de Board Virtual');
  const [presidente, setPresidente] = useState('Administrador');
  const [secretario, setSecretario] = useState('João Lima');
  
  // Dynamic lists
  const [newParticipant, setNewParticipant] = useState('');
  const [participantes, setParticipantes] = useState<string[]>([
    'Administrador',
    'João Lima',
    'Maria Souza'
  ]);

  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(['Diretoria', 'Planejamento']);

  // File Upload State
  const [anexos, setAnexos] = useState<Anexo[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Participant modifiers
  const addParticipant = () => {
    if (newParticipant.trim() && !participantes.includes(newParticipant.trim())) {
      setParticipantes([...participantes, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (name: string) => {
    setParticipantes(participantes.filter(p => p !== name));
  };

  // Tag modifiers
  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  // File Attach Simulators
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const simulateFileUpload = (fileName: string, type: 'pdf'|'docx'|'xlsx'|'zip') => {
    const sizeMap = { pdf: '1.4 MB', docx: '940 KB', xlsx: '2.1 MB', zip: '4.8 MB' };
    const randId = 'anx-' + Math.random().toString(36).substr(2, 9);
    const newAnexo: Anexo = {
      id: randId,
      nome: fileName,
      tipo: type,
      tamanho: sizeMap[type],
      dataUpload: new Date().toISOString().split('T')[0]
    };
    setAnexos([...anexos, newAnexo]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      const ext = file.name.split('.').pop()?.toLowerCase();
      const resolvedType = (['pdf', 'docx', 'xlsx', 'zip'].includes(ext || '') ? ext : 'pdf') as 'pdf'|'docx'|'xlsx'|'zip';
      simulateFileUpload(file.name, resolvedType);
    }
  };

  const selectMockFile = (type: 'pdf' | 'docx' | 'xlsx' | 'zip') => {
    const names = {
      pdf: 'Relatorio_Consolidado_Auditoria.pdf',
      docx: 'Minuta_Acordo_Prestacao.docx',
      xlsx: 'Orcamento_Semestral_Previsao.xlsx',
      zip: 'Evidencias_Fotograficas_E_Termos.zip'
    };
    simulateFileUpload(names[type], type);
  };

  const handleFormSubmit = (publish: boolean) => {
    if (!titulo.trim()) {
      alert('Por favor, informe o título da ata.');
      return;
    }
    onSave({
      numero,
      titulo,
      categoriaId,
      descricao,
      dataReuniao,
      horaReuniao,
      localReuniao,
      presidente,
      secretario,
      participantes,
      tags,
      anexos,
      status: publish ? 'publicado' : 'rascunho'
    }, publish);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header back bar */}
      <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <button 
          onClick={onCancel}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gerar Nova Ata de Reunião</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Formalize debates, anexe pareceres técnicos e colha assinaturas eletrônicas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left main form body */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Section 1: General descriptors */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-indigo-500 uppercase tracking-widest flex items-center">
              <FileText size={14} className="mr-2" />
              Informações Principais
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Número Identificador</label>
                <input
                  type="text"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-550"
                  placeholder="Ex: ATA - 1538/1423.727"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Categoria Temática</label>
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Título Oficial da Ata</label>
              <input
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-550"
                placeholder="Ex: Ata referente à aprovação de despesas estruturais de TI etc..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Pauta integral / Descrição detalhada dos debates</label>
              <textarea
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={8}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-550 font-sans leading-relaxed"
                placeholder="Insira as decisões da reunião, votos contrários, revisões e observações pontuais..."
              />
            </div>
          </div>

          {/* Section 2: Meeting Logistics */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-purple-500 uppercase tracking-widest flex items-center">
              <Calendar size={14} className="mr-2" />
              Logística & Agendamento
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Data do Evento</label>
                <input
                  type="date"
                  value={dataReuniao}
                  onChange={(e) => setDataReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Hora de Início</label>
                <input
                  type="time"
                  value={horaReuniao}
                  onChange={(e) => setHoraReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2 font-sans">Canal ou Local físico</label>
                <input
                  type="text"
                  value={localReuniao}
                  onChange={(e) => setLocalReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                  placeholder="Ex: Teams / Sala do Conselho II"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right side form column / Roles & File attachments */}
        <div className="space-y-6">
          
          {/* Section: President & Secretary role configuration */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center">
              <Users size={14} className="mr-2" />
              Equipe do Expediente
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5">Presidente</label>
              <input
                type="text"
                value={presidente}
                onChange={(e) => setPresidente(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-550"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-1.5 font-sans">Secretário</label>
              <input
                type="text"
                value={secretario}
                onChange={(e) => setSecretario(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-550"
              />
            </div>

            {/* Multiple Participants manager */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase mb-2">Adicionar Participantes</label>
              <div className="flex space-x-1.5">
                <input
                  type="text"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                  placeholder="Nome do integrante..."
                />
                <button
                  type="button"
                  onClick={addParticipant}
                  className="px-3 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Participants chips listing */}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {participantes.map(p => (
                  <span key={p} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-700 dark:text-slate-300">
                    <span>{p}</span>
                    <button 
                      onClick={() => removeParticipant(p)}
                      className="text-slate-400 hover:text-slate-650"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Section: Tag tags */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center">
              <Sparkles size={14} className="mr-2" />
              Tags & Indexação
            </h4>

            <div className="flex space-x-1.5">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Ex: Transparência..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl transition"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Tags chips */}
            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => (
                <span key={t} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-bold border border-indigo-100/60 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400">
                  <span>{t}</span>
                  <button 
                    onClick={() => removeTag(t)}
                    className="text-indigo-500 hover:text-indigo-700"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Section: Drag & Drop File Upload Module */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-blue-500 uppercase tracking-widest flex items-center">
              <UploadCloud size={14} className="mr-2" />
              Pareceres & Anexos
            </h4>

            {/* Drop Zone Box */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`
                border-2 border-dashed rounded-2xl p-5 text-center transition-all cursor-pointer flex flex-col items-center justify-center
                ${isDragging 
                  ? 'border-indigo-500 bg-indigo-500/5 dark:bg-indigo-500/10' 
                  : 'border-slate-200 dark:border-slate-800 hover:border-slate-350 dark:hover:border-slate-700'
                }
              `}
            >
              <UploadCloud size={32} className="text-slate-400 dark:text-slate-500 mb-2" />
              <p className="text-[11px] font-semibold text-slate-700 dark:text-slate-350">Arraste e solte o arquivo aqui</p>
              <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1 leading-snug">Suporta PDFs, DOCX, XLSX e ZIP até 15MB</p>
              
              {/* Fake Selector Trigger */}
              <div className="mt-3.5 flex flex-wrap gap-1 justify-center">
                <button 
                  type="button" 
                  onClick={() => selectMockFile('pdf')}
                  className="px-2 py-1 text-[9px] font-bold bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-650 dark:text-slate-400 rounded-lg border border-slate-200/50 dark:border-slate-800"
                >
                  Anexar PDF
                </button>
                <button 
                  type="button" 
                  onClick={() => selectMockFile('xlsx')}
                  className="px-2 py-1 text-[9px] font-bold bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-slate-650 dark:text-slate-400 rounded-lg border border-slate-200/50 dark:border-slate-800"
                >
                  Anexar Excel
                </button>
              </div>
            </div>

            {/* Attachment rows list */}
            {anexos.length > 0 && (
              <div className="pt-2 divide-y divide-slate-50 dark:divide-slate-850/40">
                {anexos.map(anx => (
                  <div key={anx.id} className="py-2.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <span className="text-[10px] font-black uppercase text-indigo-600 dark:text-indigo-400 px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40">
                        {anx.tipo}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-250 truncate block max-w-[130px]">
                        {anx.nome}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <span className="text-[9px] text-slate-400 font-mono">{anx.tamanho}</span>
                      <button
                        onClick={() => setAnexos(anexos.filter(a => a.id !== anx.id))}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remover anexo"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

      {/* Main Save action strip at bottom */}
      <div className="p-4 bg-slate-50 dark:bg-[#0E1022] border border-slate-200/60 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <button
          onClick={onCancel}
          className="text-xs font-bold text-slate-600 dark:text-slate-400 hover:underline"
        >
          Cancelar e Sair
        </button>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleFormSubmit(false)}
            className="px-4 py-2.5 bg-slate-200/80 hover:bg-slate-250 dark:bg-slate-900 dark:hover:bg-slate-850 dark:text-slate-350 text-slate-800 text-xs font-bold rounded-xl transition duration-150"
          >
            Salvar em Rascunho
          </button>
          <button
            onClick={() => handleFormSubmit(true)}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-650 to-violet-650 hover:opacity-95 text-xs text-white font-extrabold rounded-xl shadow-md transition duration-150"
          >
            Publicar Imediatamente
          </button>
        </div>
      </div>

    </div>
  );
}
