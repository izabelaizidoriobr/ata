/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import {
  Plus,
  Trash2,
  FolderLock,
  Settings,
  Users,
  ShieldCheck,
  Database,
  Binary,
  Eye,
  RotateCcw,
  FileDown,
  Award,
  Lock,
  Clock,
  LayoutGrid,
  List,
  Star,
  Search,
  FileText,
  CheckCircle,
  AlertTriangle,
  UploadCloud,
  Check,
  Building,
  RefreshCw
} from 'lucide-react';
import { Categoria, Usuario, LogAuditoria, BackupItem, ConfigGeral, Notificacao, RolePermissions, Ata } from '../types';
import { COMPONENT_COLORS } from '../data/mockData';

// ==========================================
// 1. CATEGORIES VIEW
// ==========================================
interface CategoriesViewProps {
  categorias: Categoria[];
  atas: Ata[];
  onAddCategory: (cat: Omit<Categoria, 'id' | 'dataCriacao'>) => void;
  onDeleteCategory: (id: string) => void;
}

export function CategoriesView({ categorias, atas, onAddCategory, onDeleteCategory }: CategoriesViewProps) {
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [cor, setCor] = useState('Financeiro');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim()) {
      onAddCategory({
        nome: nome.trim(),
        descricao: descricao.trim(),
        cor,
        icone: 'FolderLock',
      });
      setNome('');
      setDescricao('');
    }
  };

  const colorsOption = ['Financeiro', 'Administrativo', 'Licitações', 'Contratos', 'Reuniões'];

  return (
    <div className="space-y-6 animate-fade-in font-sans">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gerenciamento de Categorias</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Classifique atas corporativas e organize permissões de pastas institucionais</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Create form */}
        <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm self-start">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <Plus size={16} className="mr-1.5 text-indigo-500" />
            Nova Categoria
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="cat-name-input" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nome da Categoria</label>
              <input
                id="cat-name-input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Ex: Recursos Humanos"
              />
            </div>
            <div>
              <label htmlFor="cat-desc-textarea" className="block text-xs font-bold text-slate-500 uppercase mb-1.5 font-sans">Descrição do Escopo</label>
              <textarea
                id="cat-desc-textarea"
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                rows={3}
                placeholder="Escopo das atas vinculadas..."
              />
            </div>
            <div>
              <label htmlFor="cat-color-select" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Acento Visual</label>
              <select
                id="cat-color-select"
                value={cor}
                onChange={(e) => setCor(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
              >
                {colorsOption.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:opacity-95 text-xs text-white font-extrabold rounded-xl shadow-md transition"
            >
              Criar Categoria
            </button>
          </form>
        </div>

        {/* Listings */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Categorias Cadastradas</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left font-sans" aria-label="Tabela de categorias">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3">
                  <th scope="col" className="pb-3 px-2">NOME / COR</th>
                  <th scope="col" className="pb-3 px-2">DIRETRIZ DA PAUTA</th>
                  <th scope="col" className="pb-3 px-2 text-center">VÍNCULOS (ATAS)</th>
                  <th scope="col" className="pb-3 px-2 text-center">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 text-xs">
                {categorias.map(cat => {
                  const linkedAtasCount = atas.filter(a => a.categoriaId === cat.id && !a.excluido).length;
                  const badgesClass = COMPONENT_COLORS[cat.nome] || COMPONENT_COLORS['Reuniões'];

                  return (
                    <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                      <td className="py-3 px-2 font-bold whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-0.5 text-[9px] font-bold rounded-lg border ${badgesClass}`}>
                          {cat.nome}
                        </span>
                      </td>
                      <td className="py-3 px-2 text-slate-550 dark:text-slate-400 max-w-sm truncate" title={cat.descricao}>
                        {cat.descricao}
                      </td>
                      <td className="py-3 px-2 text-center font-bold text-slate-700 dark:text-slate-300">
                        {linkedAtasCount}
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={() => onDeleteCategory(cat.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 transition"
                          title="Excluir Categoria"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. UPLOADS CENTER (DRAG & DROP LIST)
// ==========================================
export function UploadsView() {
  const [uploads, setUploads] = useState([
    { id: '1', nome: 'Parecer_Financeiro_Execucao.xlsx', tipo: 'xlsx', tamanho: '2.4 MB', status: 'Concluído', progresso: 100 },
    { id: '2', nome: 'Contrato_Nuvem_Amazon_Federal.pdf', tipo: 'pdf', tamanho: '5.1 MB', status: 'Processando', progresso: 65 },
    { id: '3', nome: 'Termos_Pactuados_Auditoria.docx', tipo: 'docx', tamanho: '1.8 MB', status: 'Falhou', progresso: 30 }
  ]);

  const handleSimulateReprocess = (id: string) => {
    setUploads(uploads.map(u => u.id === id ? { ...u, status: 'Concluído', progresso: 100 } : u));
  };

  const handleDropSimulate = () => {
    const newId = String(uploads.length + 1);
    const newUpload = {
      id: newId,
      nome: 'Arquivo_Arrastado_Auditoria.pdf',
      tipo: 'pdf',
      tamanho: '1.2 MB',
      status: 'Concluído',
      progresso: 100
    };
    setUploads([newUpload, ...uploads]);
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Central de Uploads</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Arraste múltiplos arquivos complementares de pauta de uma vez só</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Upload Zone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); handleDropSimulate(); }}
          className="lg:col-span-1 p-8 bg-white dark:bg-[#0E1022] border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-indigo-500 transition-all"
        >
          <UploadCloud size={48} className="text-slate-400 mb-3" />
          <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200">Arraste múltiplos arquivos de pauta</h4>
          <p className="text-[10px] text-slate-450 dark:text-slate-500 mt-1 max-w-[190px]">Suporta anexos PDF, DOCX, XLSX e ZIP simultaneamente</p>
          <button
            onClick={handleDropSimulate}
            className="mt-4 px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 text-[10px] font-bold rounded-xl border border-slate-200 dark:border-slate-800 dark:text-slate-450"
          >
            Escolher do Notebook
          </button>
        </div>

        {/* Listing Upload Queue */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100">Fila de Upload do Expediente</h3>

          <div className="space-y-3">
            {uploads.map(file => (
              <div key={file.id} className="p-4 bg-slate-50/70 dark:bg-slate-900/30 rounded-xl border border-slate-200/50 dark:border-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">

                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-650 flex items-center justify-center font-bold text-[10px] uppercase">
                    {file.tipo}
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-100">{file.nome}</p>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 font-mono mt-0.5">{file.tamanho} • Responsável: admin@financeata.com</p>
                  </div>
                </div>

                {/* Progress & Actions */}
                <div className="flex-1 max-w-xs space-y-1 sm:px-3">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className={`font-bold ${file.status === 'Concluído' ? 'text-emerald-600' : file.status === 'Falhou' ? 'text-rose-500' : 'text-indigo-500 animate-pulse'}`}>{file.status}</span>
                    <span className="text-slate-400 font-mono">{file.progresso}%</span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${file.status === 'Concluído' ? 'bg-emerald-500' : file.status === 'Falhou' ? 'bg-rose-500' : 'bg-indigo-650'}`}
                      style={{ width: `${file.progresso}%` }}
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-1">
                  {file.status === 'Falhou' && (
                    <button
                      onClick={() => handleSimulateReprocess(file.id)}
                      className="p-1 px-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 text-[9px] font-bold rounded-lg text-slate-700 dark:text-slate-400 flex items-center"
                    >
                      <RotateCcw size={10} className="mr-1" /> Reenviar
                    </button>
                  )}
                  <button
                    onClick={() => setUploads(uploads.filter(u => u.id !== file.id))}
                    className="p-1.5 text-slate-400 hover:text-rose-600 transition"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}

// ==========================================
// 3. LIXEIRA (RECYCLE BIN VIEW)
// ==========================================
interface LixeiraViewProps {
  atas: Ata[];
  onRestore: (id: string) => void;
  onPurge: (id: string) => void;
}

export function LixeiraView({ atas, onRestore, onPurge }: LixeiraViewProps) {
  const deletedAtas = atas.filter(a => a.excluido);

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gerenciamento da Lixeira</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Restaure atas excluídas temporariamente ou execute purgas definitivas</p>
      </div>

      <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
        {deletedAtas.length === 0 ? (
          <div className="py-12 text-center text-slate-400 dark:text-slate-500 text-xs">
            A lixeira da sua corporação está inteiramente vazia.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left" aria-label="Atas deletadas">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3">
                  <th scope="col" className="pb-3 px-2">DOCUMENTO EXCLUÍDO</th>
                  <th scope="col" className="pb-3 px-2">TÍTULO</th>
                  <th scope="col" className="pb-3 px-2">QUEM EXCLUIU</th>
                  <th scope="col" className="pb-3 px-2">DATA DE EXCLUSÃO</th>
                  <th scope="col" className="pb-3 px-2 text-center">AÇÕES</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 text-xs">
                {deletedAtas.map(ata => (
                  <tr key={ata.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="py-3 px-2 font-bold text-slate-850 dark:text-slate-200">{ata.numero}</td>
                    <td className="py-3 px-2 text-slate-550 dark:text-slate-400 max-w-sm truncate">{ata.titulo}</td>
                    <td className="py-3 px-2 text-slate-650 dark:text-slate-350">Administrador (admin@)</td>
                    <td className="py-3 px-2 text-slate-500 dark:text-slate-400 font-mono">{ata.dataExclusao || '26/06/2026'}</td>
                    <td className="py-3 px-2 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => onRestore(ata.id)}
                          className="px-2 py-1 bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-[10px] font-bold rounded-lg flex items-center transition"
                          title="Restaurar às atas"
                        >
                          <RotateCcw size={10} className="mr-1" /> Restaurar
                        </button>
                        <button
                          onClick={() => onPurge(ata.id)}
                          className="px-2 py-1 bg-rose-50 dark:bg-rose-950 text-rose-600 dark:text-rose-400 hover:bg-rose-100 text-[10px] font-bold rounded-lg flex items-center transition"
                          title="Expulso definitivo do storage"
                        >
                          <Trash2 size={10} className="mr-1" /> Excluir de vez
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 4. USERS (STAFF MANAGEMENT VIEW)
// ==========================================
interface UsersViewProps {
  usuarios: Usuario[];
  onAddUser: (u: Omit<Usuario, 'id'>) => void;
  onUpdateUserStatus: (id: string, st: 'ativo' | 'desativado') => void;
  onUpdateUserRole: (id: string, r: Usuario['perfil']) => void;
}

export function UsersView({ usuarios, onAddUser, onUpdateUserStatus, onUpdateUserRole }: UsersViewProps) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cargo, setCargo] = useState('');
  const [perfil, setPerfil] = useState<Usuario['perfil']>('Editor');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome.trim() && email.trim()) {
      onAddUser({
        nome: nome.trim(),
        email: email.trim(),
        cargo: cargo.trim() || 'Colaborador Técnico',
        departamento: 'Compliance',
        perfil,
        status: 'ativo'
      });
      setNome('');
      setEmail('');
      setCargo('');
    }
  };

  return (
    <div className="space-y-6 font-sans">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Gestão corporativa de Colaboradores</h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">Atribua perfis, mude cargos institucionais e conceda acessos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Register Colleague form */}
        <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm self-start">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4 flex items-center">
            <Plus size={16} className="mr-1.5 text-indigo-550" />
            Cadastrar Colaborador
          </h3>
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label htmlFor="user-name-input" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Nome Completo</label>
              <input
                id="user-name-input"
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Ex: João Ferreira Santos"
              />
            </div>
            <div>
              <label htmlFor="user-email-input" className="block text-xs font-bold text-slate-500 uppercase mb-1.5 font-sans">E-mail de Trabalho</label>
              <input
                id="user-email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="ex: joao.santos@financeata.com"
              />
            </div>
            <div>
              <label htmlFor="user-cargo-input" className="block text-xs font-bold text-slate-500 uppercase mb-1.5 font-sans">Cargo / Função</label>
              <input
                id="user-cargo-input"
                type="text"
                value={cargo}
                onChange={(e) => setCargo(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none"
                placeholder="Ex: Consultor Sênior"
              />
            </div>
            <div>
              <label htmlFor="user-profile-select" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Perfil de Usuário (RBAC)</label>
              <select
                id="user-profile-select"
                value={perfil}
                onChange={(e) => setPerfil(e.target.value as Usuario['perfil'])}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-900 text-slate-705 dark:text-slate-350 border border-slate-200 dark:border-slate-800 rounded-xl cursor-pointer"
              >
                <option value="Administrador">Administrador</option>
                <option value="Gestor">Gestor</option>
                <option value="Secretário">Secretário</option>
                <option value="Editor">Editor</option>
                <option value="Leitor">Leitor</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-indigo-650 to-violet-600 hover:opacity-95 text-xs text-white font-extrabold rounded-xl shadow transition"
            >
              Convidar Colaborador
            </button>
          </form>
        </div>

        {/* Colleagues table */}
        <div className="lg:col-span-2 p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Equipe do Sistema</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left" aria-label="Usuários do sistema">
              <thead>
                <tr className="border-b border-slate-50 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest pb-3">
                  <th scope="col" className="pb-3 px-2">NOME / EMAILS</th>
                  <th scope="col" className="pb-3 px-2">RESPONSABILIDADE</th>
                  <th scope="col" className="pb-3 px-2 text-center">PERFIL RBAC</th>
                  <th scope="col" className="pb-3 px-2 text-center">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 text-xs">
                {usuarios.map(u => (
                  <tr key={u.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="py-3.5 px-2">
                      <p className="font-bold text-slate-850 dark:text-slate-200">{u.nome}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-505 font-mono leading-tight mt-0.5">{u.email}</p>
                    </td>
                    <td className="py-3.5 px-2 text-slate-600 dark:text-slate-400 font-sans">{u.cargo}</td>
                    <td className="py-3.5 px-2 text-center font-bold">
                      <select
                        aria-label="Alterar perfil"
                        value={u.perfil}
                        onChange={(e) => onUpdateUserRole(u.id, e.target.value as Usuario['perfil'])}
                        className="px-2 py-1 text-[10px] bg-slate-50 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 focus:outline-none rounded font-sans font-bold cursor-pointer"
                      >
                        <option value="Administrador">Administrador</option>
                        <option value="Gestor">Gestor</option>
                        <option value="Secretário">Secretário</option>
                        <option value="Editor">Editor</option>
                        <option value="Leitor">Leitor</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-2 text-center">
                      <button
                        onClick={() => onUpdateUserStatus(u.id, u.status === 'ativo' ? 'desativado' : 'ativo')}
                        className={`px-2 py-0.5 rounded text-[10px] font-bold border transition ${u.status === 'ativo' ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-rose-50 border-rose-200 text-rose-700'}`}
                        title="Desativar ou Ativar acesso"
                      >
                        {u.status === 'ativo' ? 'Ativo' : 'Inativo'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

    </div>
  );
}

// ==========================================
// 5. PERMISSIONS (RBAC COMPLETO MATRIX)
// ==========================================
export function PermissionsView() {
  const [permissions, setPermissions] = useState<Record<string, any>>({
    Administrador: { atas: { criar: true, editar: true, excluir: true, publicar: true }, usuarios: { total: true }, relatorios: { total: true } },
    Gestor: { atas: { criar: true, editar: true, excluir: false, publicar: true }, usuarios: { total: false }, relatorios: { total: true } },
    Secretário: { atas: { criar: true, editar: true, excluir: false, publicar: false }, usuarios: { total: false }, relatorios: { total: false } },
    Editor: { atas: { criar: true, editar: true, excluir: false, publicar: false }, usuarios: { total: false }, relatorios: { total: false } },
    Leitor: { atas: { criar: false, editar: false, excluir: false, publicar: false }, usuarios: { total: false }, relatorios: { total: true } }
  });

  const [feedback, setFeedback] = useState(false);

  const handleToggle = (role: string, field: string, sub: string) => {
    const updated = { ...permissions };
    if (sub) {
      updated[role][field][sub] = !updated[role][field][sub];
    } else {
      updated[role][field] = !updated[role][field];
    }
    setPermissions(updated);
    setFeedback(true);
    setTimeout(() => setFeedback(false), 2000);
  };

  const roles = ['Administrador', 'Gestor', 'Secretário', 'Editor', 'Leitor'];

  return (
    <div className="space-y-6 font-sans">
      <div className="flex justify-between items-center pb-2 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Matriz de Permissões (RBAC)</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Configure perfis de segurança e limite ações para proteção de atas sigilosas</p>
        </div>
        {feedback && (
          <span className="p-1 px-3 bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-450 text-[10px] font-bold border border-emerald-250 animate-pulse rounded-lg">
            Diretrizes Atualizadas!
          </span>
        )}
      </div>

      <div className="bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-sans border-collapse" aria-label="Permissões por perfil">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/20 text-[10px] font-bold text-slate-400 tracking-wider">
                <th scope="col" className="p-4 uppercase w-48">Perfil de Cargo</th>
                <th scope="col" className="p-4 text-center">Atas (Criar)</th>
                <th scope="col" className="p-4 text-center">Atas (Editar)</th>
                <th scope="col" className="p-4 text-center">Atas (Excluir)</th>
                <th scope="col" className="p-4 text-center">Atas (Publicar)</th>
                <th scope="col" className="p-4 text-center">Usuários (Geral)</th>
                <th scope="col" className="p-4 text-center">Acesso Relatórios</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 text-xs">
              {roles.map(role => (
                <tr key={role} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="p-4 font-black text-slate-850 dark:text-slate-200">{role}</td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'atas', 'criar')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].atas.criar ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].atas.criar ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'atas', 'editar')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].atas.editar ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].atas.editar ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'atas', 'excluir')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].atas.excluir ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].atas.excluir ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'atas', 'publicar')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].atas.publicar ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].atas.publicar ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'usuarios', '')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].usuarios.total ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].usuarios.total ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                  <td className="p-4 text-center">
                    <button
                      onClick={() => handleToggle(role, 'relatorios', '')}
                      className={`w-6 h-6 rounded-lg mx-auto flex items-center justify-center border transition-all ${permissions[role].relatorios.total ? 'bg-indigo-600 text-white border-indigo-650 shadow' : 'bg-slate-50 dark:bg-slate-900 border-slate-200'}`}
                    >
                      {permissions[role].relatorios.total ? <Check size={12} strokeWidth={4} /> : null}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 9. REQUISITES SECURITY LOGIN WITH 2FA
// ==========================================
interface LoginProps {
  onSuccess: (usr: Usuario) => void;
}

export function LoginPage({ onSuccess }: LoginProps) {
  const [email, setEmail] = useState('admin@financeata.com');
  const [password, setPassword] = useState('password');
  const [recoveryMode, setRecoveryMode] = useState(false);
  const [show2FA, setShow2FA] = useState(false);
  const [code2fa, setCode2fa] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setFeedback('Insira e-mail e senha de equipe.');
      return;
    }

    // Simulate 2FA prompt
    setShow2FA(true);
  };

  const handleVerify2FA = (e: React.FormEvent) => {
    e.preventDefault();
    const verifiedUser: Usuario = {
      id: 'usr-1',
      nome: 'Administrador',
      email: 'admin@financeata.com',
      cargo: 'Diretor de Tecnologia e Governança',
      departamento: 'TI',
      perfil: 'Administrador',
      status: 'ativo'
    };
    onSuccess(verifiedUser);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F5F6FA] dark:bg-[#070814] px-4 font-sans selection:bg-indigo-550/30 selection:text-white transition-colors">
      <div className="w-full max-w-md p-8 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-3xl shadow-xl space-y-6">

        {/* Company Stamp */}
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-2xl flex items-center justify-center font-bold text-white text-xl mx-auto shadow-md">
            A
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">Atas e Documentos Oficiais</h2>
          <p className="text-xs text-slate-450 dark:text-slate-500 mt-1 leading-snug">Portal restrito a servidores e quórum autenticado</p>
        </div>

        {feedback && (
          <div className="p-3 bg-rose-50/70 border border-rose-200 text-rose-600 font-bold text-[10px] rounded-xl flex items-center space-x-2">
            <AlertTriangle size={15} /> <span>{feedback}</span>
          </div>
        )}

        {/* 2FA input simulated UI */}
        {show2FA ? (
          <form onSubmit={handleVerify2FA} className="space-y-4">
            <div className="p-4 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-150/60 rounded-2xl space-y-2 text-xs">
              <h4 className="text-xs font-bold text-indigo-700 dark:text-indigo-400">Verificação de Segurança Activa</h4>
              <p className="text-slate-600 dark:text-slate-450 leading-relaxed text-[11px]">Enviamos um token para o seu app autenticador cadastrado. Digite o código de 6 dígitos abaixo.</p>
            </div>
            <div>
              <label htmlFor="code-2fa" className="block text-xs font-bold text-slate-500 uppercase mb-2">Token Autenticador / 2FA</label>
              <input
                id="code-2fa"
                type="text"
                maxLength={6}
                value={code2fa}
                onChange={(e) => setCode2fa(e.target.value.replace(/\D/g, ''))}
                className="w-full px-4 py-3 text-center tracking-[0.5em] text-lg font-bold bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="123456"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs text-white font-extrabold rounded-xl shadow-lg transition"
            >
              Autenticar e Entrar
            </button>
          </form>
        ) : recoveryMode ? (
          <form onSubmit={(e) => { e.preventDefault(); setFeedback('Link de recuperação enviado ao seu e-mail corporativo!'); }} className="space-y-4">
            <div>
              <label htmlFor="recovery-email" className="block text-xs font-bold text-slate-500 uppercase mb-2">E-mail corporativo cadastrado</label>
              <input
                id="recovery-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-805 dark:text-slate-100 border border-slate-205 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1"
                placeholder="nome@empresa.com"
              />
            </div>
            <button
              type="submit"
              className="w-full py-2.5 bg-indigo-650 hover:bg-indigo-600 text-xs text-white font-extrabold rounded-xl shadow transition"
            >
              Enviar link de redefinição
            </button>
            <button
              type="button"
              onClick={() => { setRecoveryMode(false); setFeedback(''); }}
              className="block w-full text-center text-xs text-slate-450 hover:underline"
            >
              Voltar ao Login Seguro
            </button>
          </form>
        ) : (
          <form onSubmit={handleEntry} className="space-y-4">
            <div>
              <label htmlFor="email-input" className="block text-xs font-bold text-slate-500 uppercase mb-1.5">Endereço de E-mail</label>
              <input
                id="email-input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-805 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label htmlFor="password-input" className="block text-xs font-bold text-slate-500 uppercase">Senha de Acesso</label>
                <button
                  type="button"
                  onClick={() => { setRecoveryMode(true); setFeedback(''); }}
                  className="text-[10px] text-indigo-500 hover:underline"
                >
                  Esqueci minha senha?
                </button>
              </div>
              <input
                id="password-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 text-xs bg-slate-50 dark:bg-slate-900 text-slate-805 dark:text-slate-100 border border-slate-200 dark:border-slate-800 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/30"
              />
            </div>

            <div className="flex items-center space-x-2 py-0.5">
              <input
                id="remember-me"
                type="checkbox"
                defaultChecked
                className="w-4 h-4 text-indigo-650 rounded border-slate-300 pointer-events-auto"
              />
              <label htmlFor="remember-me" className="text-xs text-slate-500 mt-px">Lembrar meu login seguro neste notebook</label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 mt-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-xs text-white font-extrabold rounded-xl shadow-lg shadow-indigo-600/10 cursor-pointer"
            >
              Verificar Credenciais
            </button>
          </form>
        )}

      </div>
    </div>
  );
}

// ==========================================
// 10. CENTRAL DE DOCUMENTOS (DOCS CABINET)
// ==========================================
interface DocumentosProps {
  atas: Ata[];
  categorias: Categoria[];
  onSelectAta: (a: Ata) => void;
}

export function DocumentosCentral({ atas, categorias, onSelectAta }: DocumentosProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);

  const activeAtas = atas.filter(a => !a.excluido);

  // Toggle favorite flags simulated as key of item
  const [favoriteIds, setFavoriteIds] = useState<string[]>(['ata-1537']);

  const toggleSimulateFavorite = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (favoriteIds.includes(id)) {
      setFavoriteIds(favoriteIds.filter(fid => fid !== id));
    } else {
      setFavoriteIds([...favoriteIds, id]);
    }
  };

  const filteredDocs = activeAtas.filter(a => {
    const isFavMatch = !favoritesOnly || favoriteIds.includes(a.id);
    const isFolderMatch = !selectedFolder || a.categoriaId === selectedFolder;
    return isFavMatch && isFolderMatch;
  });

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Central de Documentos Oficiais</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Classificação por pastas estruturais, favoritos e busca integrada</p>
        </div>

        {/* Grid or list selector and folder clearing filter */}
        <div className="flex items-center space-x-2">
          {selectedFolder && (
            <button
              onClick={() => setSelectedFolder(null)}
              className="text-xs text-indigo-600 font-bold border-b border-indigo-500"
            >
              Limpar Filtro Pasta
            </button>
          )}

          <button
            onClick={() => setFavoritesOnly(!favoritesOnly)}
            className={`p-2 rounded-xl border flex items-center space-x-1.5 text-xs font-bold transition-all ${favoritesOnly ? 'bg-amber-50 dark:bg-amber-950 text-amber-600 border-amber-200' : 'bg-white dark:bg-slate-900 text-slate-550 dark:text-slate-350 border-slate-200 dark:border-slate-800'}`}
          >
            <Star size={14} className={favoritesOnly ? 'fill-amber-400 text-amber-500' : ''} />
            <span>Favoritos</span>
          </button>

          <span className="h-5 w-px bg-slate-200" />

          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl border ${viewMode === 'grid' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-650' : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800'}`}
            title="Visualização em Grade"
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-xl border ${viewMode === 'list' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-650' : 'bg-white dark:bg-slate-900 border-slate-200/60 dark:border-slate-800'}`}
            title="Visualização em Lista"
          >
            <List size={15} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* Dynamic folders directory index */}
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm self-start space-y-4">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">Pastas Estruturais</h3>

          <div className="space-y-1.5 text-xs font-sans">
            <button
              onClick={() => setSelectedFolder(null)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold transition ${!selectedFolder ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900'}`}
            >
              <span>Todos os Arquivos</span>
              <span className="font-mono">{activeAtas.length}</span>
            </button>

            {categorias.map(cat => {
              const matchedCount = activeAtas.filter(a => a.categoriaId === cat.id).length;
              const isSelected = selectedFolder === cat.id;

              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedFolder(cat.id)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-xl font-semibold transition ${isSelected ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-650 dark:text-indigo-400' : 'text-slate-650 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-900/50'}`}
                >
                  <span className="truncate">{cat.nome}</span>
                  <span className="font-mono text-[10px] bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-slate-500">{matchedCount}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content body based on selection */}
        <div className="lg:col-span-3 space-y-4">
          {filteredDocs.length === 0 ? (
            <div className="py-20 text-center bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-slate-400 text-xs">
              Nenhum documento encontrado na segmentação aplicada.
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredDocs.map(doc => {
                const isFavorite = favoriteIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectAta(doc)}
                    className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100/80 dark:border-slate-800/80 rounded-2xl shadow-sm hover:translate-y-[-2px] transition-all cursor-pointer flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex justify-between items-start mb-3">
                        <span className="p-2 rounded-xl bg-orange-50 dark:bg-orange-950/20 text-orange-600">
                          <FileText size={18} />
                        </span>
                        <button
                          onClick={(e) => toggleSimulateFavorite(e, doc.id)}
                          className="p-1.5 text-slate-400 hover:text-amber-500 transition-colors"
                        >
                          <Star size={16} className={isFavorite ? 'fill-amber-400 text-amber-500' : ''} />
                        </button>
                      </div>
                      <h4 className="text-sm font-bold text-slate-850 dark:text-slate-150 truncate leading-snug">{doc.numero}</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed">{doc.titulo}</p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-50 dark:border-slate-850 flex items-center justify-between text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                      <span>{doc.dataReuniao.split('-').reverse().join('/')}</span>
                      <span className="font-mono text-[10px]">{doc.downloads} downloads</span>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm divide-y divide-slate-100">
              {filteredDocs.map(doc => {
                const isFavorite = favoriteIds.includes(doc.id);
                return (
                  <div
                    key={doc.id}
                    onClick={() => onSelectAta(doc)}
                    className="p-4 flex items-center justify-between cursor-pointer hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition text-xs font-semibold"
                  >
                    <div className="flex items-center space-x-3 truncate">
                      <span className="p-2 rounded-lg bg-orange-50 dark:bg-orange-950/20 text-orange-600 flex-shrink-0">
                        <FileText size={16} />
                      </span>
                      <div className="truncate">
                        <h4 className="font-bold text-slate-850 dark:text-slate-150">{doc.numero}</h4>
                        <p className="text-slate-400 truncate max-w-md">{doc.titulo}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 flex-shrink-0 text-slate-400">
                      <span>{doc.dataReuniao.split('-').reverse().join('/')}</span>
                      <button
                        onClick={(e) => toggleSimulateFavorite(e, doc.id)}
                        className="p-1 hover:text-amber-500"
                      >
                        <Star size={15} className={isFavorite ? 'fill-amber-400 text-amber-500' : ''} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </div>

    </div>
  );
}

// ==========================================
// 13. RELATÓRIOS (REPORT COMPONENT WITH SEVERAL CHARTS)
// ==========================================
interface ReportsProps {
  atas: Ata[];
  categorias: Categoria[];
}

export function ReportsView({ atas, categorias }: ReportsProps) {
  const activeAtas = atas.filter(a => !a.excluido);

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">Relatórios e Estatísticas Avançadas</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">Gere auditorias anuais e exporte relatórios consolidados em Diário Oficial</p>
        </div>
        <button
          onClick={() => window.print()}
          className="p-2 px-4 bg-indigo-650 hover:opacity-95 text-xs text-white font-extrabold rounded-xl shadow transition"
        >
          Imprimir Quadro Geral
        </button>
      </div>

      {/* KPI summaries */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs space-y-1">
          <p className="font-bold text-slate-400 uppercase tracking-widest">Produção Semestral</p>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">{activeAtas.length} Atas Ativas</h4>
          <span className="text-[10px] text-emerald-600 font-bold">+5% em relação ao semestre anterior</span>
        </div>
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs space-y-1">
          <p className="font-bold text-slate-400 uppercase tracking-widest">Adesão ICP-Brasil</p>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">100% Digital</h4>
          <span className="text-[10px] text-slate-450">Toda governança assinada em conformidade eletrônica</span>
        </div>
        <div className="p-5 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm text-xs space-y-1">
          <p className="font-bold text-slate-400 uppercase tracking-widest">Metas Governamentais</p>
          <h4 className="text-2xl font-black text-slate-900 dark:text-white">Atingido</h4>
          <span className="text-[10px] text-emerald-600 font-bold">Resiliência de backups ativa redundante</span>
        </div>
      </div>

      {/* Visual tables of reports summary */}
      <div className="p-6 bg-white dark:bg-[#0E1022] border border-slate-100 dark:border-slate-800 rounded-2xl shadow-sm">
        <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mb-4">Relatório Consolidado de Atas por Categoria</h3>

        <div className="overflow-x-auto text-xs font-sans">
          <table className="w-full text-left" aria-label="Adesão por categoria">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                <th scope="col" className="pb-3 px-2">CATEGORIA</th>
                <th scope="col" className="pb-3 px-2 text-center">QUANTIDADE DE ATAS</th>
                <th scope="col" className="pb-3 px-2 text-center">DOWNLOADS EFETUADOS</th>
                <th scope="col" className="pb-3 px-2 text-center">QUÓRUM ASSINADO</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 dark:divide-slate-800/40 font-semibold text-slate-650">
              {categorias.map(cat => {
                const count = activeAtas.filter(a => a.categoriaId === cat.id).length;
                const totalDls = activeAtas.filter(a => a.categoriaId === cat.id).reduce((acc, current) => acc + current.downloads, 0);

                return (
                  <tr key={cat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                    <td className="py-3 px-2">
                      <span className="font-bold text-slate-900 dark:text-slate-205">{cat.nome}</span>
                    </td>
                    <td className="py-3 px-2 text-center text-slate-850 dark:text-slate-300">{count} atas</td>
                    <td className="py-3 px-2 text-center text-slate-500 font-mono">{totalDls || '120'} downloads</td>
                    <td className="py-3 px-2 text-center">
                      <span className="inline-block px-2 py-0.5 text-[9px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100 rounded-lg">100% Conclúido</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
