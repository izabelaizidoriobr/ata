/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Trash2, 
  Eye, 
  Edit3, 
  Download, 
  Archive, 
  CheckSquare, 
  Square, 
  Filter, 
  Plus, 
  FileSpreadsheet, 
  FileDown, 
  FileText,
  X,
  Share2,
  Trash
} from 'lucide-react';
import { Ata, Categoria, AtaStatus } from '../types';
import { COMPONENT_COLORS } from '../data/mockData';

interface AtasViewProps {
  atas: Ata[];
  categorias: Categoria[];
  onSelectAta: (ata: Ata) => void;
  onEditAta: (id: string) => void;
  onDeleteAta: (id: string) => void;
  onAddAtaTrigger: () => void;
  onBulkStatusUpdate: (ids: string[], newStatus: AtaStatus) => void;
  onBulkDelete: (ids: string[]) => void;
}

export default function AtasView({
  atas,
  categorias,
  onSelectAta,
  onEditAta,
  onDeleteAta,
  onAddAtaTrigger,
  onBulkStatusUpdate,
  onBulkDelete,
}: AtasViewProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedStatus, setSelectedStatus] = useState('todos');
  const [selectedAuthor, setSelectedAuthor] = useState('todos');
  const [selectedTag, setSelectedTag] = useState('todos');
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const activeAtas = useMemo(() => atas.filter(a => !a.excluido), [atas]);

  // Unique listing of authors/presidents
  const authorsList = useMemo(() => {
    const list = new Set(activeAtas.map(a => a.presidente));
    return Array.from(list);
  }, [activeAtas]);

  // Unique tags list
  const tagsList = useMemo(() => {
    const set = new Set<string>();
    activeAtas.forEach(a => a.tags?.forEach(t => set.add(t)));
    return Array.from(set);
  }, [activeAtas]);

  // Filtering logic
  const filteredAtas = useMemo(() => {
    return activeAtas.filter(ata => {
      const matchSearch = 
        ata.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ata.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ata.presidente.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ata.descricao.toLowerCase().includes(searchTerm.toLowerCase());

      const matchCategory = selectedCategory === 'todos' || ata.categoriaId === selectedCategory;
      const matchStatus = selectedStatus === 'todos' || ata.status === selectedStatus;
      const matchAuthor = selectedAuthor === 'todos' || ata.presidente === selectedAuthor;
      const matchTag = selectedTag === 'todos' || ata.tags?.includes(selectedTag);

      return matchSearch && matchCategory && matchStatus && matchAuthor && matchTag;
    });
  }, [activeAtas, searchTerm, selectedCategory, selectedStatus, selectedAuthor, selectedTag]);

  // Toggle single selection
  const toggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  };

  // Toggle all selection
  const toggleSelectAll = () => {
    if (selectedIds.length === filteredAtas.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredAtas.map(a => a.id));
    }
  };

  // Batch action executions
  const handleBulkPublish = () => {
    onBulkStatusUpdate(selectedIds, 'publicado');
    setSelectedIds([]);
  };

  const handleBulkArchive = () => {
    onBulkStatusUpdate(selectedIds, 'arquivado');
    setSelectedIds([]);
  };

  const handleBulkDeleteAction = () => {
    onBulkDelete(selectedIds);
    setSelectedIds([]);
  };

  // Export functions (PDF, Excel, CSV)
  const exportToCSV = () => {
    const headers = ['Numero', 'Titulo', 'Presidente', 'Secretario', 'Data Reuniao', 'Status', 'Downloads'];
    const rows = filteredAtas.map(a => [
      a.numero,
      `"${a.titulo.replace(/"/g, '""')}"`,
      a.presidente,
      a.secretario,
      a.dataReuniao,
      a.status,
      a.downloads
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "relatorio_atas.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportFakeExcel = () => {
    // Generate mock XLSX plain text content
    const excelContent = "Numero\tTitulo\tPresidente\tSecretario\tData\tStatus\tDownloads\n" +
      filteredAtas.map(a => `${a.numero}\t${a.titulo}\t${a.presidente}\t${a.secretario}\t${a.dataReuniao}\t${a.status}\t${a.downloads}`).join('\n');
    
    const blob = new Blob([excelContent], { type: 'application/vnd.ms-excel' });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "relatorio_atas.xls";
    link.click();
  };

  const exportFakePDF = () => {
    // Print-friendly mock trigger
    window.print();
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Upper header action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão Unificada de Atas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Pesquise, filtre, assine eletronicamente e gerencie rascunhos e publicações</p>
        </div>
        <div className="mt-4 md:mt-0 flex flex-wrap gap-2">
          {/* Export suite */}
          <button 
            onClick={exportFakePDF}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition duration-200 flex items-center shadow-sm"
          >
            <FileDown size={14} className="mr-2 text-rose-500" />
            Exportar PDF / Imprimir
          </button>
          <button 
            onClick={exportFakeExcel}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition duration-200 flex items-center shadow-sm"
          >
            <FileSpreadsheet size={14} className="mr-2 text-emerald-500" />
            Excel
          </button>
          <button 
            onClick={exportToCSV}
            className="px-3.5 py-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 rounded-xl transition duration-200 flex items-center shadow-sm"
          >
            <FileText size={14} className="mr-2 text-blue-500" />
            CSV UTF-8
          </button>
          <button 
            onClick={onAddAtaTrigger}
            className="px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-indigo-650 to-violet-600 hover:opacity-95 rounded-xl shadow transition duration-200 flex items-center"
          >
            <Plus size={14} className="mr-1.5" />
            Nova Ata
          </button>
        </div>
      </div>

      {/* Advanced search and filters toolbar */}
      <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm space-y-4">
        
        {/* Row 1: Search and Tags filter */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Filtro rápido (Ex: número, título, redator, pauta da ata...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-550 transition-all"
            />
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="absolute right-3 top-3.5 p-0.5 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="w-full md:w-52">
            <select
              aria-label="Selecionar tag de filtragem"
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
            >
              <option value="todos">Todas as Tags</option>
              {tagsList.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Row 2: Select drop menus for categorization */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Categoria</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="todos">Todas as Categorias</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Status</label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos os Status</option>
              <option value="rascunho">Rascunho</option>
              <option value="revisao">Em Revisão</option>
              <option value="aprovado">Aprovado</option>
              <option value="publicado">Publicado</option>
              <option value="arquivado">Arquivado</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1.5">Autor/Presidente</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="todos">Todos os Autores</option>
              {authorsList.map(author => (
                <option key={author} value={author}>{author}</option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Main Grid/Table representation */}
      <div className="bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm overflow-hidden">
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-label="Tabela global de atas">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/20 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th scope="col" className="py-4 px-4 w-10 text-center">
                  <button 
                    onClick={toggleSelectAll}
                    className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                  >
                    {selectedIds.length === filteredAtas.length && filteredAtas.length > 0 ? (
                      <CheckSquare size={16} className="text-indigo-600" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th scope="col" className="py-4 px-3 w-52">NÚMERO DA ATA</th>
                <th scope="col" className="py-4 px-3">TÍTULO</th>
                <th scope="col" className="py-4 px-3">CATEGORIA</th>
                <th scope="col" className="py-4 px-3">RESPONSÁVEL (PRESIDENTE)</th>
                <th scope="col" className="py-4 px-3 w-28">DATA REUNIÃO</th>
                <th scope="col" className="py-4 px-3 w-28 text-center font-bold">STATUS</th>
                <th scope="col" className="py-4 px-4 text-center w-36">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
              {filteredAtas.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400 dark:text-slate-500 font-sans text-xs">
                    Nenhuma ata encontrada correspondente aos filtros aplicados.
                  </td>
                </tr>
              ) : (
                filteredAtas.map(ata => {
                  const resolvedCategory = categorias.find(c => c.id === ata.categoriaId) || categorias[0];
                  const badgesClass = COMPONENT_COLORS[resolvedCategory?.nome] || COMPONENT_COLORS['Reuniões'];
                  const isChecked = selectedIds.includes(ata.id);

                  return (
                    <tr 
                      key={ata.id} 
                      className={`hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors text-xs font-semibold ${isChecked ? 'bg-indigo-50/10 dark:bg-indigo-950/5' : ''}`}
                    >
                      {/* Checkbox selector */}
                      <td className="py-3 px-4 text-center">
                        <button 
                          onClick={() => toggleSelect(ata.id)}
                          className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-white"
                        >
                          {isChecked ? (
                            <CheckSquare size={16} className="text-indigo-600" />
                          ) : (
                            <Square size={16} />
                          )}
                        </button>
                      </td>

                      {/* ATA Number */}
                      <td className="py-3 px-3 text-slate-900 dark:text-slate-200 font-bold whitespace-nowrap">
                        {ata.numero}
                      </td>

                      {/* Title */}
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-300 truncate max-w-xs" title={ata.titulo}>
                        {ata.titulo}
                      </td>

                      {/* Category Badge */}
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold rounded-lg border ${badgesClass}`}>
                          {resolvedCategory?.nome || 'Geral'}
                        </span>
                      </td>

                      {/* Responsible (Presidente) */}
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-400 font-medium">
                        {ata.presidente}
                      </td>

                      {/* Meeting date */}
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">
                        {ata.dataReuniao.split('-').reverse().join('/')}
                      </td>

                      {/* Status */}
                      <td className="py-3 px-3 text-center">
                        {ata.status === 'publicado' ? (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/40">
                            Publicado
                          </span>
                        ) : ata.status === 'rascunho' ? (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/40">
                            Rascunho
                          </span>
                        ) : ata.status === 'revisao' ? (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-black rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/40">
                            Revisão
                          </span>
                        ) : (
                          <span className="inline-block px-2 py-0.5 text-[9px] font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200">
                            {ata.status.toUpperCase()}
                          </span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <button 
                            onClick={() => onSelectAta(ata)}
                            className="p-1.5 text-slate-400 hover:text-indigo-650 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all"
                            title="Visualizar documento"
                          >
                            <Eye size={13} />
                          </button>
                          <button 
                            onClick={() => onEditAta(ata.id)}
                            className="p-1.5 text-slate-400 hover:text-amber-550 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all"
                            title="Editar ata"
                          >
                            <Edit3 size={13} />
                          </button>
                          <a 
                            href={`data:text/plain;charset=utf-8,${encodeURIComponent(ata.descricao)}`}
                            download={ata.numero + '.txt'}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all flex items-center justify-center"
                            title="Download documento"
                          >
                            <Download size={13} />
                          </a>
                          <button 
                            onClick={() => onDeleteAta(ata.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all"
                            title="Mandar para lixeira"
                          >
                            <Trash size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

      </div>

      {/* Bulk actions sticky panel at bottom if row selected */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 lg:left-80 z-40 bg-slate-950 text-white px-5 py-4 rounded-2xl shadow-2xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 animate-slide-up">
          <div className="flex items-center space-x-3">
            <span className="w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center text-[11px] font-bold">
              {selectedIds.length}
            </span>
            <p className="text-xs font-medium text-slate-300">itens selecionados da listagem</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleBulkPublish}
              className="px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:opacity-90 rounded-xl text-xs font-bold transition flex items-center"
            >
              <CheckSquare size={13} className="mr-1.5" />
              Publicar Lote
            </button>
            <button
              onClick={handleBulkArchive}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700/80 rounded-xl text-xs font-semibold text-slate-350 transition flex items-center"
            >
              <Archive size={13} className="mr-1.5" />
              Arquivar
            </button>
            <button
              onClick={handleBulkDeleteAction}
              className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-550 rounded-xl text-xs font-bold transition flex items-center"
            >
              <Trash2 size={13} className="mr-1.5" />
              Descartar Lote
            </button>
            <button
              onClick={() => setSelectedIds([])}
              className="p-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg transition"
              title="Cancelar seleção"
            >
              <X size={14} />
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
