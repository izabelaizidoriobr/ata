/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ArrowLeft, FileText, Calendar, Users, Sparkles, UploadCloud, Trash2 } from 'lucide-react';
import { Ata, Categoria, Anexo } from '../types';

interface EditarAtaViewProps {
  ata: Ata;
  categorias: Categoria[];
  onSave: (id: string, updatedFields: Partial<Ata>, updateLog: string) => void;
  onCancel: () => void;
}

export default function EditarAtaView({ ata, categorias, onSave, onCancel }: EditarAtaViewProps) {
  const [titulo, setTitulo] = useState(ata.titulo);
  const [categoriaId, setCategoriaId] = useState(ata.categoriaId);
  const [descricao, setDescricao] = useState(ata.descricao);
  const [dataReuniao, setDataReuniao] = useState(ata.dataReuniao);
  const [horaReuniao, setHoraReuniao] = useState(ata.horaReuniao || '10:00');
  const [localReuniao, setLocalReuniao] = useState(ata.localReuniao || 'Sala de Reunião Principal');
  const [presidente, setPresidente] = useState(ata.presidente);
  const [secretario, setSecretario] = useState(ata.secretario);

  // Versions change description
  const [versaoDescricao, setVersaoDescricao] = useState('Atualização de redação jurídica e anexação de chaves criptográficas.');

  // Participants & tags
  const [newParticipant, setNewParticipant] = useState('');
  const [participantes, setParticipantes] = useState<string[]>(ata.participantes || []);

  const [newTag, setNewTag] = useState('');
  const [tags, setTags] = useState<string[]>(ata.tags || []);

  const [anexos, setAnexos] = useState<Anexo[]>(ata.anexos || []);

  // Multi modifications trigger
  const addParticipant = () => {
    if (newParticipant.trim() && !participantes.includes(newParticipant.trim())) {
      setParticipantes([...participantes, newParticipant.trim()]);
      setNewParticipant('');
    }
  };

  const removeParticipant = (name: string) => {
    setParticipantes(participantes.filter(p => p !== name));
  };

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const simulateFileUpload = () => {
    const randomId = 'anx-' + Math.random().toString(36).substr(2, 9);
    const newAnexo: Anexo = {
      id: randomId,
      nome: `Documento_Adicional_V${ata.historicoVersoes.length + 1}.pdf`,
      tipo: 'pdf',
      tamanho: '1.2 MB',
      dataUpload: new Date().toISOString().split('T')[0]
    };
    setAnexos([...anexos, newAnexo]);
  };

  const handleUpdate = () => {
    if (!titulo.trim()) {
      alert('A ata necessita de um título válido.');
      return;
    }
    onSave(ata.id, {
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
      anexos
    }, versaoDescricao.trim() || 'Modificação dos parâmetros textuais e diretoria.');
  };

  return (
    <div className="space-y-6 font-sans">

      {/* Header */}
      <div className="flex items-center space-x-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={onCancel}
          className="p-2 text-slate-500 hover:text-indigo-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition animate-fade-in"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Modificar Regimento da Ata</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Modifique campos, adicione pareceres complementares e salve nova versão de redundância</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fade-in mt-2">

        {/* Left Column Fields */}
        <div className="lg:col-span-2 space-y-6">

          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-5">
            <h4 className="text-xs font-bold text-indigo-550 uppercase tracking-widest flex items-center">
              <FileText size={14} className="mr-2" />
              Redação Principal
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Número da Ata (Imutável)</label>
                <input
                  type="text"
                  value={ata.numero}
                  disabled
                  className="w-full px-3 py-2 text-xs bg-slate-100 dark:bg-slate-900 text-slate-500 border border-slate-200 dark:border-slate-850 rounded-xl cursor-not-allowed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Categoria Temática</label>
                <select
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer focus:outline-none"
                >
                  {categorias.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.nome}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="edit-title-input" className="block text-xs font-bold text-slate-500 uppercase mb-2">Título do Documento</label>
              <input
                id="edit-title-input"
                type="text"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label htmlFor="edit-desc-textarea" className="block text-xs font-bold text-slate-500 uppercase mb-2 font-sans">Conteúdo da Pauta</label>
              <textarea
                id="edit-desc-textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                rows={10}
                className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-805 dark:text-slate-150 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:border-indigo-500 font-sans leading-relaxed"
              />
            </div>
          </div>

          {/* Logistics */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-purple-600 uppercase tracking-widest flex items-center">
              <Calendar size={14} className="mr-2" />
              Logística da Reunião
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Data da Reunião</label>
                <input
                  type="date"
                  value={dataReuniao}
                  onChange={(e) => setDataReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Hora do Rito</label>
                <input
                  type="time"
                  value={horaReuniao}
                  onChange={(e) => setHoraReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Espaço / Vídeo</label>
                <input
                  type="text"
                  value={localReuniao}
                  onChange={(e) => setLocalReuniao(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* Right column: Version snaps, tags, files */}
        <div className="space-y-6">

          {/* Version Snap details */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-rose-500 uppercase tracking-widest flex items-center">
              Snapshot de Versionamento
            </h4>
            <p className="text-[11px] text-slate-450 leading-relaxed font-semibold">
              Gere redundância controlável. O preenchimento abaixo se acoplará à linha histórica das versões no Visualizador de atas.
            </p>
            <div>
              <label htmlFor="version-desc-textarea" className="block text-xs font-bold text-slate-500 uppercase mb-2">Resumo das Alterações Realizadas</label>
              <textarea
                id="version-desc-textarea"
                rows={3}
                value={versaoDescricao}
                onChange={(e) => setVersaoDescricao(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Explicite as correções efetuadas para fins de auditoria..."
              />
            </div>
          </div>

          {/* Staff list */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
            <h4 className="text-xs font-bold text-amber-500 uppercase tracking-widest flex items-center">
              <Users size={14} className="mr-2" />
              Equipe do Expediente
            </h4>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Presidente</label>
              <input
                type="text"
                value={presidente}
                onChange={(e) => setPresidente(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Secretário</label>
              <input
                type="text"
                value={secretario}
                onChange={(e) => setSecretario(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
              />
            </div>

            <div className="pt-2 border-t border-slate-105">
              <label className="block text-xs font-bold text-slate-50h uppercase mb-1.5">Inserir Participante</label>
              <div className="flex space-x-1.5">
                <input
                  type="text"
                  value={newParticipant}
                  onChange={(e) => setNewParticipant(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addParticipant()}
                  className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                  placeholder="Nome do integrante..."
                />
                <button
                  type="button"
                  onClick={addParticipant}
                  className="px-3 bg-slate-50 dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-400 font-bold"
                >
                  +
                </button>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {participantes.map(p => (
                  <span key={p} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-900 text-[10px] font-bold text-slate-700 dark:text-slate-350">
                    <span>{p}</span>
                    <button onClick={() => removeParticipant(p)} className="text-slate-400 hover:text-slate-600">×</button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4 font-sans">
            <h4 className="text-xs font-bold text-emerald-500 uppercase tracking-widest flex items-center">
              <Sparkles size={14} className="mr-2" />
              Indexadores (Tags)
            </h4>

            <div className="flex space-x-1.5">
              <input
                type="text"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && addTag()}
                className="flex-1 px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Ex: Compliance..."
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 bg-slate-100 dark:bg-slate-900 rounded-xl border border-slate-200 text-slate-700 dark:text-slate-400 font-black"
              >
                +
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {tags.map(t => (
                <span key={t} className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-[10px] font-bold border border-indigo-100 dark:border-indigo-900 text-indigo-700 dark:text-indigo-400">
                  <span>{t}</span>
                  <button onClick={() => removeTag(t)} className="text-indigo-500 hover:text-indigo-700">×</button>
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Action Strip */}
      <div className="p-4 bg-slate-50 dark:bg-[#0E1022] border border-slate-200 dark:border-slate-800 rounded-2xl flex items-center justify-between">
        <button
          onClick={onCancel}
          className="text-xs font-bold text-slate-500 hover:underline"
        >
          Descartar Alterações
        </button>
        <button
          onClick={handleUpdate}
          className="px-5 py-2.5 bg-indigo-650 hover:bg-indigo-600 text-xs text-white font-extrabold rounded-xl shadow"
        >
          Gravar Nova Versão da Ata
        </button>
      </div>

    </div>
  );
}
