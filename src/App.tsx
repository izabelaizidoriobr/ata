/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { Ata, Categoria, Usuario, LogAuditoria, BackupItem, ConfigGeral, Notificacao, AtaStatus } from './types';
import { 
  initialAtas, 
  initialCategories, 
  initialUsuarios, 
  initialNotificacoes, 
  initialAuditLogs, 
  initialBackups, 
  defaultConfig 
} from './data/mockData';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import AtasView from './components/AtasView';
import NovaAtaView from './components/NovaAtaView';
import VisualizarAtaView from './components/VisualizarAtaView';
import EditarAtaView from './components/EditarAtaView';
import { 
  CategoriesView, 
  UploadsView, 
  LixeiraView, 
  UsersView, 
  PermissionsView, 
  AuditoriaView, 
  BackupView, 
  ConfigurationView, 
  LoginPage, 
  DocumentosCentral, 
  AssinaturasQueueView, 
  AprovacoesView, 
  ReportsView 
} from './components/AdminComponents';

export default function App() {
  // Session Access
  const [currentUser, setCurrentUser] = useState<Usuario | null>(() => {
    const saved = localStorage.getItem('oficial_docs_user');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return null; }
    }
    // Default logged in user matching custom specs
    return {
      id: 'usr-1',
      nome: 'Administrador',
      email: 'admin@financeata.com',
      cargo: 'Diretor de Tecnologia e Governança',
      departamento: 'TI',
      perfil: 'Administrador',
      status: 'ativo'
    };
  });

  // Dark Mode states
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('oficial_docs_theme');
    return saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  // App navigation state
  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Core Data models
  const [atas, setAtas] = useState<Ata[]>(() => {
    const saved = localStorage.getItem('oficial_docs_atas');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialAtas; }
    }
    return initialAtas;
  });

  const [categorias, setCategorias] = useState<Categoria[]>(() => {
    const saved = localStorage.getItem('oficial_docs_categories');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialCategories; }
    }
    return initialCategories;
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>(() => {
    const saved = localStorage.getItem('oficial_docs_usuarios');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialUsuarios; }
    }
    return initialUsuarios;
  });

  const [notificacoes, setNotificacoes] = useState<Notificacao[]>(() => {
    const saved = localStorage.getItem('oficial_docs_notifications');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialNotificacoes; }
    }
    return initialNotificacoes;
  });

  const [auditLogs, setAuditLogs] = useState<LogAuditoria[]>(() => {
    const saved = localStorage.getItem('oficial_docs_audits');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialAuditLogs; }
    }
    return initialAuditLogs;
  });

  const [backups, setBackups] = useState<BackupItem[]>(() => {
    const saved = localStorage.getItem('oficial_docs_backups');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return initialBackups; }
    }
    return initialBackups;
  });

  const [config, setConfig] = useState<ConfigGeral>(() => {
    const saved = localStorage.getItem('oficial_docs_config');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) { return defaultConfig; }
    }
    return defaultConfig;
  });

  // Selection states
  const [selectedAtaId, setSelectedAtaId] = useState<string | null>(null);
  const [editingAtaId, setEditingAtaId] = useState<string | null>(null);

  // Search filter
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // Apply dark mode theme
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('oficial_docs_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('oficial_docs_theme', 'light');
    }
  }, [isDarkMode]);

  // Persist states helper
  useEffect(() => {
    localStorage.setItem('oficial_docs_atas', JSON.stringify(atas));
  }, [atas]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_categories', JSON.stringify(categorias));
  }, [categorias]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_usuarios', JSON.stringify(usuarios));
  }, [usuarios]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_notifications', JSON.stringify(notificacoes));
  }, [notificacoes]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_audits', JSON.stringify(auditLogs));
  }, [auditLogs]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_backups', JSON.stringify(backups));
  }, [backups]);

  useEffect(() => {
    localStorage.setItem('oficial_docs_config', JSON.stringify(config));
  }, [config]);

  // Create audit helper
  const addAuditLog = (acao: string, tipo: string) => {
    const newLog: LogAuditoria = {
      id: 'log-' + Math.random().toString(36).substr(2, 9),
      usuario: currentUser?.nome || 'Sistema',
      acao,
      data: new Date().toLocaleDateString('pt-BR'),
      hora: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      ip: '192.168.1.' + Math.floor(Math.random() * 254 + 1),
      tipo
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Create notification helper
  const addNotification = (titulo: string, des: string, type: Notificacao['tipo']) => {
    const newNot: Notificacao = {
      id: 'not-' + Math.random().toString(36).substr(2, 9),
      titulo,
      descricao: des,
      data: 'Agora mesmo',
      lida: false,
      tipo: type
    };
    setNotificacoes(prev => [newNot, ...prev]);
  };

  // Nav actions
  const navigateTo = (view: string) => {
    setCurrentView(view);
    setSelectedAtaId(null);
    setEditingAtaId(null);
  };

  // Authentication trigger
  const handleLoginSuccess = (usr: Usuario) => {
    setCurrentUser(usr);
    localStorage.setItem('oficial_docs_user', JSON.stringify(usr));
    addAuditLog('Login de segurança bem-sucedido', 'login');
  };

  const handleLogout = () => {
    addAuditLog('Encerrada sessão de usuário', 'logout');
    setCurrentUser(null);
    localStorage.removeItem('oficial_docs_user');
  };

  // Category modifiers
  const handleAddCategory = (newCat: Omit<Categoria, 'id' | 'dataCriacao'>) => {
    const newId = 'cat-' + (categorias.length + 1);
    const cat: Categoria = {
      ...newCat,
      id: newId,
      dataCriacao: new Date().toISOString().split('T')[0]
    };
    setCategorias([...categorias, cat]);
    addAuditLog(`Categoria criada: ${newCat.nome}`, 'categoria');
    addNotification('Categoria Adicionada', `A pasta temática "${newCat.nome}" foi integrada com sucesso.`, 'sucesso');
  };

  const handleDeleteCategory = (id: string) => {
    const catName = categorias.find(c => c.id === id)?.nome || '';
    setCategorias(categorias.filter(c => c.id !== id));
    addAuditLog(`Categoria excluída: ${catName}`, 'categoria');
  };

  // Atas modifiers
  const handleSaveNewAta = (
    newAta: Omit<Ata, 'id' | 'downloads' | 'comentarios' | 'historicoVersoes' | 'assinaturas'>, 
    publishImmediately: boolean
  ) => {
    const randId = 'ata-' + Math.floor(Math.random() * 10000);
    const hist: Ata['historicoVersoes'] = [
      {
        id: 'ver-1.0',
        versao: 'v1.0',
        dataAlteracao: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
        autor: currentUser?.nome || 'Sistema',
        descricaoAlteracoes: publishImmediately ? 'Publicada ata de forma em diário oficial.' : 'Criação original em rascunho.'
      }
    ];

    // Build signature requirements representation
    const signatures: Ata['assinaturas'] = [
      { id: 'sgn-1', nome: newAta.presidente, cargo: 'Presidente Designado', status: 'pendente' },
      { id: 'sgn-2', nome: newAta.secretario, cargo: 'Secretário do Expediente', status: 'pendente' }
    ];

    const compositeAta: Ata = {
      ...newAta,
      id: randId,
      downloads: 0,
      comentarios: [],
      historicoVersoes: hist,
      assinaturas: signatures,
      status: publishImmediately ? 'publicado' : 'rascunho',
      favorito: false,
      excluido: false
    };

    setAtas([compositeAta, ...atas]);
    addAuditLog(`Nova ata gerada: ${newAta.numero}`, 'criacao');
    addNotification(
      publishImmediately ? 'Ata Lançada' : 'Ata Salva',
      `O documento ${newAta.numero} foi adicionado à base de dados de governança.`,
      publishImmediately ? 'sucesso' : 'info'
    );
    navigateTo('datas');
  };

  const handleUpdateAta = (id: string, updatedFields: Partial<Ata>, updateLog: string) => {
    setAtas(prev => prev.map(ata => {
      if (ata.id === id) {
        const nextVersionNumber = `v1.${ata.historicoVersoes.length}`;
        const newHist = {
          id: 'ver-' + nextVersionNumber,
          versao: nextVersionNumber,
          dataAlteracao: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          autor: currentUser?.nome || 'Sistema',
          descricaoAlteracoes: updateLog
        };

        return {
          ...ata,
          ...updatedFields,
          historicoVersoes: [newHist, ...ata.historicoVersoes]
        };
      }
      return ata;
    }));

    addAuditLog(`Ata atualizada: ${atas.find(a => a.id === id)?.numero}`, 'edicao');
    addNotification('Documento Atualizado', `Novas emendas foram acopladas no identificador.`, 'info');
    navigateTo('datas');
  };

  const handleDeleteAta = (id: string) => {
    setAtas(prev => prev.map(a => a.id === id ? { ...a, excluido: true, dataExclusao: new Date().toLocaleDateString('pt-BR') } : a));
    addAuditLog(`Ata enviada para lixeira: ${atas.find(a => a.id === id)?.numero}`, 'exclusao');
    addNotification('Ata Descartada', `O documento foi movido temporariamente para a lixeira institucional.`, 'alerta');
  };

  const handleRestoreAta = (id: string) => {
    setAtas(prev => prev.map(a => a.id === id ? { ...a, excluido: false } : a));
    addAuditLog(`Ata restaurada da lixeira: ${atas.find(a => a.id === id)?.numero}`, 'restauracao');
    addNotification('Ata Recuperada', `O documento retornou aos arquivos gerais com integridade ativa.`, 'sucesso');
  };

  const handlePurgeAta = (id: string) => {
    const num = atas.find(a => a.id === id)?.numero || '';
    setAtas(atas.filter(a => a.id !== id));
    addAuditLog(`Ata expulsa permanentemente: ${num}`, 'expurgo');
  };

  // Bulk operation actions
  const handleBulkStatusChange = (ids: string[], newStatus: AtaStatus) => {
    setAtas(prev => prev.map(a => ids.includes(a.id) ? { ...a, status: newStatus } : a));
    addAuditLog(`Modificados status em lote para ${newStatus}`, 'lote');
  };

  const handleBulkDelete = (ids: string[]) => {
    setAtas(prev => prev.map(a => ids.includes(a.id) ? { ...a, excluido: true, dataExclusao: new Date().toLocaleDateString('pt-BR') } : a));
    addAuditLog('Exclusão em lote executada', 'lote');
  };

  // Inner features
  const handleAddComment = (ataId: string, texto: string) => {
    setAtas(prev => prev.map(a => {
      if (a.id === ataId) {
        const comment: Ata['comentarios'][0] = {
          id: 'com-' + Math.random().toString(36).substr(2, 9),
          autor: currentUser?.nome || 'Anônimo',
          texto,
          data: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          cargo: currentUser?.cargo || 'Colaborador',
          perfil: currentUser?.perfil || 'Leitor'
        };
        return {
          ...a,
          comentarios: [...a.comentarios, comment]
        };
      }
      return a;
    }));
    addAuditLog(`Observação ponderada na ata ID: ${ataId}`, 'comentario');
  };

  const handleSignDocument = (ataId: string) => {
    setAtas(prev => prev.map(a => {
      if (a.id === ataId) {
        const updatedSigs = a.assinaturas.map(sig => {
          if (sig.nome === currentUser?.nome) {
            return {
              ...sig,
              status: 'concluido' as const,
              dataAssinatura: new Date().toLocaleDateString('pt-BR') + ' ' + new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
              hash: 'SHA256: ' + Math.random().toString(36).substr(2, 12) + Math.random().toString(36).substr(2, 12)
            };
          }
          return sig;
        });

        // If all signed, immediately move to 'publicado'
        const allSigned = updatedSigs.every(s => s.status === 'concluido');

        return {
          ...a,
          assinaturas: updatedSigs,
          status: allSigned ? 'publicado' as const : a.status
        };
      }
      return a;
    }));

    addAuditLog(`Assinado eletronicamente pelo certificado de ${currentUser?.nome}`, 'assinatura');
    addNotification('Firma colhida', `Ata assinada digitalmente com ICP-Brasil.`, 'sucesso');
  };

  const handleRestoreVersion = (ataId: string, versionId: string) => {
    const targetAta = atas.find(a => a.id === ataId);
    const targetVersion = targetAta?.historicoVersoes.find(v => v.id === versionId);
    if (targetAta && targetVersion) {
      alert(`Restaurada a versão ${targetVersion.versao}: ${targetVersion.descricaoAlteracoes}`);
      addAuditLog(`Versão restaurada na ata: ${targetAta.numero}`, 'versionamento');
    }
  };

  // Staff roles actions
  const handleAddUser = (newUsr: Omit<Usuario, 'id'>) => {
    const nextId = 'usr-' + (usuarios.length + 1);
    setUsuarios([...usuarios, { ...newUsr, id: nextId }]);
    addAuditLog(`Staff cadastrado: ${newUsr.nome}`, 'usuarios');
  };

  const handleUpdateUserStatus = (id: string, status: 'ativo' | 'desativado') => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, status } : u));
    addAuditLog(`Status do staff integrado ID ${id} modificado para ${status}`, 'usuarios');
  };

  const handleUpdateUserRole = (id: string, perfil: Usuario['perfil']) => {
    setUsuarios(prev => prev.map(u => u.id === id ? { ...u, perfil } : u));
    addAuditLog(`Atribuição de papel modificado para Usuário ID ${id}`, 'usuarios');
  };

  // Backups modifiers
  const handleTriggerBackup = () => {
    const fileNum = backups.length + 1;
    const newBak: BackupItem = {
      id: 'bak-' + Math.random().toString(36).substr(2, 9),
      nome: `backup_regimento_manual_${new Date().toISOString().split('T')[0].replace(/-/g,'')}_v${fileNum}.sql`,
      data: new Date().toLocaleDateString('pt-BR'),
      tamanho: '45.1 MB',
      tipo: 'manual'
    };
    setBackups([newBak, ...backups]);
    addAuditLog('Backup manual consolidado', 'backup');
    addNotification('Backup Concluído', 'Cópia de redundância do banco de dados gerada com integridade absoluta.', 'sucesso');
  };

  const handleStatusAprovacaoUpdate = (id: string, newStatus: AtaStatus) => {
    setAtas(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
    addAuditLog(`Trâmite atualizado da ata para ${newStatus}`, 'aprovacoes');
  };

  const handleClearNotifications = (id: string) => {
    setNotificacoes(prev => prev.map(n => n.id === id ? { ...n, lida: true } : n));
  };

  // Global searching scope
  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
  };

  // Resolve matching display
  const singleSelectedAta = selectedAtaId ? atas.find(a => a.id === selectedAtaId) : null;
  const singleEditingAta = editingAtaId ? atas.find(a => a.id === editingAtaId) : null;

  // Root authentication layout check
  if (!currentUser) {
    return <LoginPage onSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="flex h-screen bg-[#F8FAFC] dark:bg-[#070814] text-slate-800 dark:text-slate-100 font-sans transition-colors overflow-hidden">
      
      {/* Sidebar drawer handles */}
      <Sidebar 
        currentView={currentView}
        onNavigate={navigateTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main app panel */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Header toolbar */}
        <Header 
          onSearch={handleGlobalSearch}
          notificacoes={notificacoes}
          onMarkAsRead={handleClearNotifications}
          onLogout={handleLogout}
          currentUser={currentUser}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          onNavigate={navigateTo}
        />

        {/* Dynamic scrollable body containing active views */}
        <main className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-slate-200">
          
          {/* Hamburger trigger for small monitors */}
          <div className="lg:hidden pb-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="p-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-650 dark:text-slate-250 flex items-center justify-center transition"
            >
              <Menu size={20} className="mr-1.5" />
              <span className="text-xs font-semibold">Exibir Menu</span>
            </button>
          </div>

          {/* Router dispatcher switcher */}
          {singleSelectedAta ? (
            <VisualizarAtaView 
              ata={singleSelectedAta}
              categoria={categorias.find(c => c.id === singleSelectedAta.categoriaId)}
              onBack={() => setSelectedAtaId(null)}
              onAddComment={handleAddComment}
              onSignDocument={handleSignDocument}
              onRestoreVersion={handleRestoreVersion}
              currentUser={currentUser}
            />
          ) : singleEditingAta ? (
            <EditarAtaView 
              ata={singleEditingAta}
              categorias={categorias}
              onSave={handleUpdateAta}
              onCancel={() => setEditingAtaId(null)}
            />
          ) : (() => {
            switch (currentView) {
              case 'dashboard':
                return (
                  <DashboardView 
                    atas={atas}
                    categorias={categorias}
                    audits={auditLogs}
                    onNavigate={navigateTo}
                    onSelectAta={(a) => setSelectedAtaId(a.id)}
                    onEditAta={(id) => setEditingAtaId(id)}
                    onDeleteAta={handleDeleteAta}
                    isDarkMode={isDarkMode}
                  />
                );
              case 'datas':
                return (
                  <AtasView 
                    atas={atas}
                    categorias={categorias}
                    onSelectAta={(a) => setSelectedAtaId(a.id)}
                    onEditAta={(id) => setEditingAtaId(id)}
                    onDeleteAta={handleDeleteAta}
                    onAddAtaTrigger={() => navigateTo('nova-ata')}
                    onBulkStatusUpdate={handleBulkStatusChange}
                    onBulkDelete={handleBulkDelete}
                  />
                );
              case 'nova-ata':
                return (
                  <NovaAtaView 
                    categorias={categorias}
                    onSave={handleSaveNewAta}
                    onCancel={() => navigateTo('datas')}
                  />
                );
              case 'categories':
                return (
                  <CategoriesView 
                    categorias={categorias}
                    atas={atas}
                    onAddCategory={handleAddCategory}
                    onDeleteCategory={handleDeleteCategory}
                  />
                );
              case 'uploads':
                return <UploadsView />;
              case 'central':
                return (
                  <DocumentosCentral 
                    atas={atas}
                    categorias={categorias}
                    onSelectAta={(a) => setSelectedAtaId(a.id)}
                  />
                );
              case 'lixeira':
                return (
                  <LixeiraView 
                    atas={atas}
                    onRestore={handleRestoreAta}
                    onPurge={handlePurgeAta}
                  />
                );
              case 'usuarios':
                return (
                  <UsersView 
                    usuarios={usuarios}
                    onAddUser={handleAddUser}
                    onUpdateUserStatus={handleUpdateUserStatus}
                    onUpdateUserRole={handleUpdateUserRole}
                  />
                );
              case 'permissoes':
                return <PermissionsView />;
              case 'assinaturas':
                return (
                  <AssinaturasQueueView 
                    atas={atas}
                    onSign={handleSignDocument}
                    currentUser={currentUser}
                  />
                );
              case 'aprovacoes':
                return (
                  <AprovacoesView 
                    atas={atas}
                    onUpdateStatus={handleStatusAprovacaoUpdate}
                  />
                );
              case 'relatorios':
                return (
                  <ReportsView 
                    atas={atas}
                    categorias={categorias}
                  />
                );
              case 'auditoria':
                return <AuditoriaView logs={auditLogs} />;
              case 'backup':
                return (
                  <BackupView 
                    backups={backups}
                    onTriggerBackup={handleTriggerBackup}
                  />
                );
              case 'configuracoes':
                return (
                  <ConfigurationView 
                    config={config}
                    onSaveConfig={setConfig}
                  />
                );
              default:
                return (
                  <DashboardView 
                    atas={atas}
                    categorias={categorias}
                    audits={auditLogs}
                    onNavigate={navigateTo}
                    onSelectAta={(a) => setSelectedAtaId(a.id)}
                    onEditAta={(id) => setEditingAtaId(id)}
                    onDeleteAta={handleDeleteAta}
                    isDarkMode={isDarkMode}
                  />
                );
            }
          })()}
          
        </main>

      </div>
    </div>
  );
}
