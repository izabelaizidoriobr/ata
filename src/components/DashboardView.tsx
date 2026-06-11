/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  FileText, 
  FolderLock, 
  DownloadCloud, 
  Users, 
  ArrowUpRight, 
  Filter, 
  Plus, 
  Eye, 
  Edit3, 
  Download, 
  MoreVertical, 
  FileDown, 
  DollarSign, 
  FileSpreadsheet, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  FolderOpen
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  AreaChart, 
  Area, 
  LineChart, 
  Line 
} from 'recharts';
import { Ata, Categoria, LogAuditoria } from '../types';
import { COMPONENT_COLORS } from '../data/mockData';

interface DashboardViewProps {
  atas: Ata[];
  categorias: Categoria[];
  audits: LogAuditoria[];
  onNavigate: (view: string) => void;
  onSelectAta: (ata: Ata) => void;
  onEditAta: (id: string) => void;
  onDeleteAta: (id: string) => void;
  isDarkMode: boolean;
}

export default function DashboardView({
  atas,
  categorias,
  audits,
  onNavigate,
  onSelectAta,
  onEditAta,
  onDeleteAta,
  isDarkMode,
}: DashboardViewProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('Este ano');
  const [selectedSubCategory, setSelectedSubCategory] = useState('Todas as categorias');
  const [currentPage, setCurrentPage] = useState(1);
  const [showRowOptions, setShowRowOptions] = useState<string | null>(null);

  // Stats
  const activeAtas = atas.filter(a => !a.excluido);
  const totalAtasText = '1.248';
  const totalCategoriasText = String(categorias.length === 5 ? 18 : categorias.length);
  const totalDownloadsText = '5.342';
  const totalUsuariosText = '32';

  // Chart 1: Atas publicadas por mês
  const barData = [
    { name: 'Jan', atas: 28 },
    { name: 'Fev', atas: 43 },
    { name: 'Mar', atas: 48 },
    { name: 'Abr', atas: 45 },
    { name: 'Mai', atas: 62 },
    { name: 'Jun', atas: 84 }, // Custom tooltip item as screenshot says "Junho 84 atas"
    { name: 'Jul', atas: 50 },
    { name: 'Ago', atas: 61 },
    { name: 'Set', atas: 42 },
    { name: 'Out', atas: 76 },
    { name: 'Nov', atas: 80 },
    { name: 'Dez', atas: 62 },
  ];

  // Chart 2: Atas por categoria
  const pieData = [
    { name: 'Financeiro', value: 437, percentage: '35%', color: '#6366f1' },
    { name: 'Administrativo', value: 312, percentage: '25%', color: '#a855f7' },
    { name: 'Licitações', value: 249, percentage: '20%', color: '#10b981' },
    { name: 'Contratos', value: 125, percentage: '10%', color: '#f59e0b' },
    { name: 'Reuniões', value: 125, percentage: '10%', color: '#3b82f6' },
  ];

  // Colors matching screenshot
  const GRADIENT_START = '#5F5AF6';
  const GRADIENT_END = '#8B5CF6';

  const formatFileSize = (tipo: string) => {
    if (tipo === 'pdf') return '2.4 MB';
    if (tipo === 'xlsx') return '1.2 MB';
    return '850 KB';
  };

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      
      {/* Upper Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Dashboard</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Bem-vindo de volta!</p>
        </div>
        <div className="mt-4 md:mt-0 flex items-center space-x-3">
          <button 
            onClick={() => onNavigate('relatorios')}
            className="px-4 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-[#151737] border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition duration-200 flex items-center shadow-sm"
          >
            <TrendingUp size={15} className="mr-2 text-slate-400" />
            Análise Avançada
          </button>
          <button 
            onClick={() => onNavigate('nova-ata')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md cursor-pointer transition duration-200 flex items-center"
          >
            <Plus size={15} className="mr-1.5" />
            Nova Ata
          </button>
        </div>
      </div>

      {/* 4 KPI Cards matching original screenshot */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* KPI 1: Atas */}
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col justify-between transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total de Atas</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5">{totalAtasText}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400">
              <FileText size={18} />
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">+12 este mês</span>
            {/* Sparkline simulation SVG */}
            <svg className="w-24 h-8 text-indigo-500" viewBox="0 0 100 30" fill="none">
              <path d="M0,25 Q15,15 30,22 T60,8 T90,5 T100,15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 2: Categorias */}
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col justify-between transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">Categorias</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5">{totalCategoriasText}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 text-purple-600 dark:text-purple-400">
              <FolderLock size={18} />
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">+2 este mês</span>
            <svg className="w-24 h-8 text-purple-500" viewBox="0 0 100 30" fill="none">
              <path d="M0,28 Q20,18 40,25 T80,10 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 3: Downloads */}
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col justify-between transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">Downloads</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5">{totalDownloadsText}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400">
              <DownloadCloud size={18} />
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+18% este mês</span>
            <svg className="w-24 h-8 text-emerald-500" viewBox="0 0 100 30" fill="none">
              <path d="M0,28 Q15,22 30,24 T60,12 T90,15 T100,2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>

        {/* KPI 4: Usuários */}
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/80 rounded-2xl shadow-sm flex flex-col justify-between transition-all">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-medium text-slate-400 dark:text-slate-500 uppercase tracking-widest">Usuários</p>
              <h3 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1.5">{totalUsuariosText}</h3>
            </div>
            <div className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400">
              <Users size={18} />
            </div>
          </div>
          <div className="mt-4 pt-1 flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-500">+4 este mês</span>
            <svg className="w-24 h-8 text-amber-500" viewBox="0 0 100 30" fill="none">
              <path d="M0,25 Q20,24 40,20 T70,14 T90,2 T100,5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </div>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Large Bar Chart - Atas Publicadas por Mês */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/85 rounded-2xl shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Atas publicadas por mês</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">Fluxo anual consolidado de registros oficiais</p>
            </div>
            <div className="relative">
              <select
                aria-label="Selecionar período do relatório"
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="pl-3 pr-8 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
              >
                <option value="Este ano">Este ano</option>
                <option value="Trimestre">Trimestre anterior</option>
                <option value="Mês">Mês passado</option>
              </select>
            </div>
          </div>

          <div className="h-64 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={GRADIENT_START} stopOpacity={0.95}/>
                    <stop offset="100%" stopColor={GRADIENT_END} stopOpacity={0.4}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDarkMode ? '#64748B' : '#94A3B8', fontSize: 11 }} 
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: isDarkMode ? '#64748B' : '#94A3B8', fontSize: 11 }} 
                />
                <Tooltip 
                  cursor={{ fill: 'rgba(99, 102, 241, 0.04)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-slate-950 text-white px-3 py-2 rounded-xl text-xs font-semibold shadow-lg border border-slate-800 flex flex-col items-center">
                          <span className="text-slate-300">{payload[0].payload.name === 'Jun' ? 'Junho' : payload[0].payload.name}</span>
                          <span className="text-indigo-400 mt-0.5">{payload[0].value} atas</span>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="atas" 
                  fill="url(#barGradient)" 
                  radius={[5, 5, 0, 0]} 
                  maxBarSize={32} 
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Circular Donut (Rosca) Chart - Atas por Categoria */}
        <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/85 rounded-2xl shadow-sm flex flex-col justify-between">
          <div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Atas por categoria</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">Distribuição percentual dos registros</p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col items-center justify-center py-4 my-auto">
            {/* Pie Container */}
            <div className="w-40 h-40 relative flex-shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-xl font-extrabold text-slate-800 dark:text-white">18</span>
                <span className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">Total</span>
              </div>
            </div>

            {/* Labels Grid matching styling in screenshot */}
            <div className="mt-4 sm:mt-0 lg:mt-5 ml-0 sm:ml-5 lg:ml-0 space-y-2 w-full max-w-[200px]">
              {pieData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between text-xs font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-slate-500 dark:text-slate-400">{item.name}</span>
                  </div>
                  <span className="text-slate-850 dark:text-slate-200">
                    {item.percentage} <span className="text-slate-400 dark:text-slate-500 font-normal">({item.value})</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Widgets & Uploads Column Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Recent Uploads widget - matching design exactly */}
        <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/85 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Uploads recentes</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">Arquivos anexados recentemente</p>
            </div>
            <button 
              onClick={() => onNavigate('uploads')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline hover:opacity-95"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-4 my-auto">
            {[
              { code: 'ATA - 1537/1423.726', size: '2.4 MB', date: '15/05/2025' },
              { code: 'ATA - 1536/1423.725', size: '1.8 MB', date: '10/05/2025' },
              { code: 'ATA - 1555/1423.724', size: '2.1 MB', date: '08/05/2025' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 p-3 dark:bg-slate-900/30 rounded-xl hover:bg-slate-50/70 dark:hover:bg-slate-900/60 transition-all border border-slate-100/50 dark:border-slate-800/40">
                <div className="w-10 h-10 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600 flex items-center justify-center font-bold text-xs shadow-sm">
                  PDF
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-100 truncate">{item.code}.pdf</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{item.date} • {item.size}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities widget */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/85 rounded-2xl shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Atividade recente</h4>
              <p className="text-xs text-slate-400 dark:text-slate-500">Histórico operacional do sistema</p>
            </div>
            <button 
              onClick={() => onNavigate('auditoria')}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline hover:opacity-95"
            >
              Ver todos
            </button>
          </div>

          <div className="space-y-4 my-auto">
            {[
              { char: 'A', bg: 'from-blue-600 to-indigo-600', user: 'Administrador', action: 'publicou uma nova ata', doc: 'ATA - 1537/1423.726', time: 'Há 2 horas' },
              { char: 'M', bg: 'from-purple-600 to-pink-600', user: 'Maria Souza', action: 'editou uma ata', doc: 'ATA - 1536/1423.725', time: 'Há 5 horas' },
              { char: 'J', bg: 'from-amber-500 to-orange-500', user: 'João Lima', action: 'fez upload de um arquivo', doc: 'ATA - 1535/1423.724', time: 'Há 1 dia' },
              { char: 'S', bg: 'from-emerald-500 to-teal-500', user: 'Sistema', action: 'realizou backup automático', doc: 'Backup completo realizado', time: 'Há 1 dia' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-start md:items-center space-x-3.5 pb-1 last:pb-0">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-tr ${item.bg} flex-shrink-0 flex items-center justify-center text-xs font-black text-white shadow-sm`}>
                  {item.char}
                </div>
                <div className="flex-1 md:flex md:items-center md:justify-between min-w-0">
                  <div>
                    <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{item.user}</span>{' '}
                    <span className="text-xs text-slate-500 dark:text-slate-400">{item.action}</span>{' '}
                    <span className="text-xs font-bold text-indigo-650 dark:text-indigo-400 cursor-pointer">{item.doc}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block md:inline-block leading-none mt-1 md:mt-0">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Main Table: Atas Recentes */}
      <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800/85 rounded-2xl shadow-sm">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 border-b border-slate-100 dark:border-slate-800/60 gap-4">
          <div>
            <h4 id="atas-recentes-title" className="text-sm font-bold text-slate-800 dark:text-slate-100">Atas recentes</h4>
            <p className="text-xs text-slate-400 dark:text-slate-500">Últimos documentos cadastrados na corporação</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <select
              aria-label="Selecionar categoria de filtragem rápida"
              value={selectedSubCategory}
              onChange={(e) => setSelectedSubCategory(e.target.value)}
              className="pl-3 pr-8 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="Todas as categorias">Todas as categorias</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.nome}</option>
              ))}
            </select>
            <button 
              onClick={() => onNavigate('datas')}
              className="px-3 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl hover:bg-slate-100/70 dark:hover:bg-slate-900/60 hover:opacity-95 flex items-center transition cursor-pointer"
            >
              <Filter size={13} className="mr-1 text-slate-400" />
              Filtros
            </button>
            <button 
              onClick={() => onNavigate('nova-ata')}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-xl shadow-md flex items-center transition cursor-pointer"
            >
              <Plus size={13} className="mr-1" />
              Nova Ata
            </button>
          </div>
        </div>

        {/* Responsive Table Layout */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse" aria-describedby="atas-recentes-title">
            <thead>
              <tr className="border-b border-slate-50 dark:border-slate-800/40 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                <th scope="col" className="py-4 px-3">Nº DA ATA</th>
                <th scope="col" className="py-4 px-3">TÍTULO</th>
                <th scope="col" className="py-4 px-3">CATEGORIA</th>
                <th scope="col" className="py-4 px-3">DATA</th>
                <th scope="col" className="py-4 px-3">STATUS</th>
                <th scope="col" className="py-4 px-3 text-center">AÇÕES</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40">
              {activeAtas
                .filter(ata => selectedSubCategory === 'Todas as categorias' || ata.categoriaId === selectedSubCategory)
                .slice(0, 5)
                .map((ata) => {
                  const resolvedCategory = categorias.find(c => c.id === ata.categoriaId) || categorias[0];
                  const badgesClass = COMPONENT_COLORS[resolvedCategory?.nome] || COMPONENT_COLORS['Reuniões'];

                  return (
                    <tr key={ata.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors text-xs font-medium">
                      {/* ATA Num */}
                      <td className="py-3 px-3 text-slate-850 dark:text-slate-300 font-bold whitespace-nowrap">
                        {ata.numero}
                      </td>
                      
                      {/* Document Title */}
                      <td className="py-3 px-3 text-slate-700 dark:text-slate-200 truncate max-w-xs" title={ata.titulo}>
                        {ata.titulo}
                      </td>
                      
                      {/* Category Badge */}
                      <td className="py-3 px-3">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-semibold rounded-lg border ${badgesClass}`}>
                          {resolvedCategory?.nome || 'Geral'}
                        </span>
                      </td>
                      
                      {/* Publish / Meeting Date */}
                      <td className="py-3 px-3 text-slate-500 dark:text-slate-400 font-mono whitespace-nowrap">
                        {ata.dataReuniao.split('-').reverse().join('/')}
                      </td>
                      
                      {/* Live status badge */}
                      <td className="py-3 px-3">
                        {ata.status === 'publicado' ? (
                          <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/60">
                            Publicada
                          </span>
                        ) : ata.status === 'rascunho' ? (
                          <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-100 dark:border-amber-900/60">
                            Rascunho
                          </span>
                        ) : (
                          <span className="inline-block px-2.5 py-1 text-[10px] font-bold rounded-lg bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 dark:text-indigo-400 border border-indigo-100 dark:border-indigo-900/60">
                            {ata.status.toUpperCase()}
                          </span>
                        )}
                      </td>

                      {/* Action buttons matching exact design specs */}
                      <td className="py-3 px-3">
                        <div className="flex items-center justify-center space-x-1.5 relative">
                          <button 
                            onClick={() => onSelectAta(ata)}
                            className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 rounded-lg transition-all"
                            title="Visualizar ata"
                          >
                            <Eye size={14} />
                          </button>
                          <button 
                            onClick={() => onEditAta(ata.id)}
                            className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30 rounded-lg transition-all"
                            title="Editar ata"
                          >
                            <Edit3 size={14} />
                          </button>
                          <a 
                            href={`data:text/plain;charset=utf-8,${encodeURIComponent(ata.descricao)}`}
                            download={ata.numero + '.txt'}
                            className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 rounded-lg transition-all flex items-center justify-center"
                            title="Fazer download"
                          >
                            <Download size={14} />
                          </a>

                          <div className="relative">
                            <button 
                              onClick={() => setShowRowOptions(showRowOptions === ata.id ? null : ata.id)}
                              className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-lg transition-all"
                            >
                              <MoreVertical size={14} />
                            </button>

                            {showRowOptions === ata.id && (
                              <div className="absolute right-0 mt-1 w-32 bg-white dark:bg-[#11132C] border border-slate-100 dark:border-slate-800 rounded-xl shadow-lg z-50 overflow-hidden py-1">
                                <button
                                  onClick={() => {
                                    setShowRowOptions(null);
                                    onSelectAta(ata); // Share/Timeline trigger inside Visualize
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-900 text-[11px] text-slate-700 dark:text-slate-300"
                                >
                                  Compartilhar
                                </button>
                                <button
                                  onClick={() => {
                                    setShowRowOptions(null);
                                    onDeleteAta(ata.id);
                                  }}
                                  className="w-full text-left px-3 py-1.5 hover:bg-rose-50 dark:hover:bg-rose-950/20 text-[11px] text-rose-600 font-medium"
                                >
                                  Mandar p/ Lixeira
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Footer controls matches exact layout shown in image */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-5 mt-2 border-t border-slate-50 dark:border-slate-800/40 gap-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Mostrando <span className="font-semibold text-slate-800 dark:text-slate-200">1 a 5</span> de <span className="font-semibold text-slate-800 dark:text-slate-200">1.248 Atas</span>
          </p>
          <div className="flex items-center space-x-1">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(1)}
              className="p-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-500 border border-slate-200/50 dark:border-slate-800 cursor-not-allowed"
            >
              &lt;
            </button>
            <button className="px-3 py-1.5 text-xs font-bold rounded-lg bg-indigo-650 text-white border border-indigo-600">1</button>
            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">2</button>
            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">3</button>
            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">4</button>
            <button className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">5</button>
            <span className="text-xs text-slate-400 px-1">...</span>
            <button className="px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850">250</button>
            <button className="p-1.5 text-xs font-semibold rounded-lg bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-850 hover:bg-slate-100">
              &gt;
            </button>
          </div>
          <div className="flex items-center space-x-1.5">
            <label htmlFor="per-page-select" className="sr-only">Itens por página</label>
            <select
              id="per-page-select"
              className="px-2.5 py-1.5 text-xs font-semibold bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-100 dark:border-slate-800 rounded-xl cursor-pointer"
            >
              <option>10 por página</option>
              <option>25 por página</option>
              <option>50 por página</option>
            </select>
          </div>
        </div>

      </div>

    </div>
  );
}
