/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Bell, Search, Sun, Moon, LogOut, Check, ChevronDown, Laptop, Globe } from 'lucide-react';
import { Notificacao, Usuario } from '../types';

interface HeaderProps {
  onSearch: (term: string) => void;
  notificacoes: Notificacao[];
  onMarkAsRead: (id: string) => void;
  onLogout: () => void;
  currentUser: Usuario;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onNavigate: (view: string) => void;
}

export default function Header({
  onSearch,
  notificacoes,
  onMarkAsRead,
  onLogout,
  currentUser,
  isDarkMode,
  onToggleDarkMode,
  onNavigate,
}: HeaderProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const unreadCount = notificacoes.filter((n) => !n.lida).length;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <header className="sticky top-0 z-30 h-16 flex items-center justify-between px-8 bg-white dark:bg-[#0E1022] border-b border-slate-200 dark:border-slate-800 transition-colors flex-shrink-0">

      {/* Action Utilities & Settings */}
      <div className="flex items-center space-x-4">
        {/* Dark Mode Switcher */}
        <button
          onClick={onToggleDarkMode}
          title={isDarkMode ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
          className="p-2.5 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl transition-colors dark:text-slate-400"
        >
          {isDarkMode ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
        </button>

        {/* Real-time Notifications Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            id="notification-bell-btn"
            className="p-2.5 text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900 rounded-xl relative transition-colors focus:outline-none"
          >
            <Bell size={20} />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-slate-950 animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown Panel */}
          {showNotifications && (
            <div className="absolute right-0 mt-3 w-80 bg-white dark:bg-[#11132C] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-950/20">
                <span className="font-semibold text-sm text-slate-800 dark:text-slate-100">Notificações</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">Atalhos</span>
              </div>
              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800">
                {notificacoes.length === 0 ? (
                  <p className="p-4 text-xs text-center text-slate-400 dark:text-slate-500">Nenhuma notificação nova.</p>
                ) : (
                  notificacoes.map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-900/30 transition-colors flex flex-col ${item.lida ? 'opacity-70' : 'bg-indigo-50/20 dark:bg-indigo-950/10'}`}
                    >
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{item.titulo}</span>
                        {!item.lida && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              onMarkAsRead(item.id);
                            }}
                            className="p-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-all"
                            title="Marcar como lida"
                          >
                            <Check size={12} />
                          </button>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed">{item.descricao}</p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1">{item.data}</span>
                    </div>
                  ))
                )}
              </div>
              <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    onNavigate('configuracoes');
                  }}
                  className="w-full text-center py-1.5 text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
                >
                  Configurar Notificações
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Global Action Divider */}
        <span className="h-6 w-px bg-slate-200 dark:bg-slate-850" />

        {/* User Workspace Profile Widget matching reference */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            id="user-profile-btn"
            className="flex items-center space-x-3 text-left focus:outline-none hover:bg-slate-50 dark:hover:bg-slate-900 p-1.5 rounded-xl transition-all"
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
              {currentUser.nome[0]}
            </div>
            <div className="hidden md:block">
              <div className="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center">
                <span>{currentUser.nome}</span>
                <ChevronDown size={14} className="ml-1 text-slate-400" />
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono tracking-wide">{currentUser.email}</div>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-3 w-56 bg-white dark:bg-[#11132C] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-xl z-50 overflow-hidden py-1">
              <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20">
                <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{currentUser.cargo}</span>
                <span className="block text-[10px] text-indigo-500 font-semibold">{currentUser.perfil}</span>
              </div>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('usuarios');
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                Gerenciar Colegas
              </button>
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onNavigate('configuracoes');
                }}
                className="w-full text-left px-4 py-2 text-xs text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-900/40 transition-colors"
              >
                Configurações Gerais
              </button>
              <div className="h-px bg-slate-100 dark:bg-slate-800" />
              <button
                onClick={() => {
                  setShowProfileMenu(false);
                  onLogout();
                }}
                className="w-full text-left px-4 py-2.5 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors flex items-center"
              >
                <LogOut size={14} className="mr-2" />
                Desconectar Sessão
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
