/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  FolderLock, 
  UploadCloud, 
  Trash2, 
  Users, 
  ShieldCheck, 
  BarChart3, 
  FileSignature, 
  NotebookTabs,
  Eye, 
  Database, 
  Settings, 
  Binary,
  FolderOpen,
  Menu,
  X
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ currentView, onNavigate, isOpen, onClose }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Painel geral', icon: LayoutDashboard, category: 'NÚCLEO' },
    
    { id: 'datas', label: 'Atas', icon: FileText, category: 'DOCUMENTOS' },
    { id: 'categories', label: 'Categorias', icon: FolderLock, category: 'DOCUMENTOS' },
    { id: 'uploads', label: 'Uploads', icon: UploadCloud, category: 'DOCUMENTOS' },
    { id: 'central', label: 'Central de Docs', icon: FolderOpen, category: 'DOCUMENTOS' },
    { id: 'lixeira', label: 'Lixeira', icon: Trash2, category: 'DOCUMENTOS' },

    { id: 'usuarios', label: 'Usuários', icon: Users, category: 'CREDENCIAMENTO' },
    { id: 'permissoes', label: 'Permissões', icon: ShieldCheck, category: 'CREDENCIAMENTO' },
    { id: 'assinaturas', label: 'Assinaturas', icon: FileSignature, category: 'CREDENCIAMENTO' },
    { id: 'aprovacoes', label: 'Aprovações', icon: NotebookTabs, category: 'CREDENCIAMENTO' },
    { id: 'relatorios', label: 'Relatórios', icon: BarChart3, category: 'CREDENCIAMENTO' },
    
    { id: 'auditoria', label: 'Auditoria', icon: Binary, category: 'SISTEMA' },
    { id: 'backup', label: 'Backup', icon: Database, category: 'SISTEMA' },
    { id: 'configuracoes', label: 'Configurações', icon: Settings, category: 'SISTEMA' },
  ];

  // Group items by category
  const categories = ['NÚCLEO', 'DOCUMENTOS', 'CREDENCIAMENTO', 'SISTEMA'];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          onClick={onClose} 
          className="fixed inset-0 bg-slate-950/60 z-40 lg:hidden backdrop-blur-sm transition-opacity"
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 flex flex-col w-72 
        bg-gradient-to-b from-[#1E293B] to-[#4C1D95] 
        text-white border-r border-white/5
        transform transition-all duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen lg:flex-shrink-0
        ${isOpen ? 'translate-x-0 font-sans shadow-2xl' : '-translate-x-full'}
      `}>
        {/* Header Logo */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white rounded-sm"></div>
            </div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">
                ATA GESTÃO
              </h1>
              <p className="text-[10px] text-white/50 font-medium tracking-widest uppercase">Oficial Docs</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-lg bg-white/10 text-white/70 hover:text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Nav Items */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-6 scrollbar-thin scrollbar-thumb-white/10">
          {categories.map(cat => {
            const filteredItems = menuItems.filter(item => item.category === cat);
            return (
              <div key={cat} className="space-y-1.5">
                {cat !== 'NÚCLEO' && (
                  <h3 className="px-3 text-[10px] font-bold tracking-widest text-white/40 uppercase">
                    {cat}
                  </h3>
                )}
                <div className="space-y-1">
                  {filteredItems.map(item => {
                    const Icon = item.icon;
                    const isActive = currentView === item.id;
                    return (
                      <button
                        key={item.id}
                        id={`sidebar-item-${item.id}`}
                        onClick={() => {
                          onNavigate(item.id);
                          onClose();
                        }}
                        className={`
                          w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-sm font-medium
                          transition-all duration-200 group relative
                          ${isActive 
                            ? 'bg-white/10 text-white font-semibold' 
                            : 'text-white/70 hover:text-white hover:bg-white/5 hover:translate-x-1'
                          }
                        `}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-white rounded-r-full" />
                        )}
                        <Icon size={18} className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-white/60 group-hover:text-white'}`} />
                        <span className="truncate">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* Sidebar Footer Info */}
        <div className="p-4 border-t border-white/10 bg-black/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-indigo-400 text-slate-900 flex items-center justify-center font-bold text-sm shadow-md">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold truncate text-white">Administrador</p>
              <p className="text-[11px] truncate text-white/60 font-mono">admin@financeata.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
