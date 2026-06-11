/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Ata, Categoria, Usuario, LogAuditoria, BackupItem, ConfigGeral, Notificacao, RolePermissions } from '../types';

export const COMPONENT_COLORS: Record<string, string> = {
  Financeiro: 'bg-indigo-50 border-indigo-200 text-indigo-700 dark:bg-indigo-950/40 dark:border-indigo-800 dark:text-indigo-300',
  Administrativo: 'bg-purple-50 border-purple-200 text-purple-700 dark:bg-purple-950/40 dark:border-purple-800 dark:text-purple-300',
  Licitações: 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-300',
  Contratos: 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-950/40 dark:border-amber-800 dark:text-amber-300',
  Reuniões: 'bg-blue-50 border-blue-200 text-blue-700 dark:bg-blue-950/40 dark:border-blue-800 dark:text-blue-300',
};

export const COLOR_MAP: Record<string, string> = {
  Financeiro: '#6366f1',
  Administrativo: '#a855f7',
  Licitações: '#10b981',
  Contratos: '#f59e0b',
  Reuniões: '#a855f7',
};

export const initialCategories: Categoria[] = [
  {
    id: 'cat-1',
    nome: 'Financeiro',
    cor: 'Financeiro',
    icone: 'DollarSign',
    descricao: 'Atas e decisões relacionadas a orçamentos, relatórios contábeis e aprovações de verbas',
    dataCriacao: '2024-01-10',
  },
  {
    id: 'cat-2',
    nome: 'Administrativo',
    cor: 'Administrativo',
    icone: 'FileText',
    descricao: 'Atas de reuniões institucionais, decisões estruturais e comunicados operacionais',
    dataCriacao: '2024-01-12',
  },
  {
    id: 'cat-3',
    nome: 'Licitações',
    cor: 'Licitações',
    icone: 'Gavel',
    descricao: 'Auditorias de pareceres licitatórios, documentação de concorrência pública e pregão',
    dataCriacao: '2024-01-15',
  },
  {
    id: 'cat-4',
    nome: 'Contratos',
    cor: 'Contratos',
    icone: 'Briefcase',
    descricao: 'Atas de acordos, assinaturas de serviços terceirizados e parcerias corporativas',
    dataCriacao: '2024-01-20',
  },
  {
    id: 'cat-5',
    nome: 'Reuniões',
    cor: 'Reuniões',
    icone: 'Users',
    descricao: 'Atas de reuniões gerais de alinhamento, comitê executivo e discussões de equipe',
    dataCriacao: '2024-01-22',
  },
];

export const initialUsuarios: Usuario[] = [
  {
    id: 'usr-1',
    nome: 'Administrador',
    email: 'admin@financeata.com',
    cargo: 'Diretor de Tecnologia e Governança',
    departamento: 'TI',
    perfil: 'Administrador',
    status: 'ativo',
  },
  {
    id: 'usr-2',
    nome: 'Maria Souza',
    email: 'maria@financeata.com',
    cargo: 'Analista de Compliance Sênior',
    departamento: 'Compliance',
    perfil: 'Editor',
    status: 'ativo',
  },
  {
    id: 'usr-3',
    nome: 'João Lima',
    email: 'joao@financeata.com',
    cargo: 'Secretário Governamental Geral',
    departamento: 'Secretariado',
    perfil: 'Secretário',
    status: 'ativo',
  },
  {
    id: 'usr-4',
    nome: 'Carlos Silva',
    email: 'carlos@financeata.com',
    cargo: 'Gerente Administrativo',
    departamento: 'Administração',
    perfil: 'Gestor',
    status: 'ativo',
  },
  {
    id: 'usr-5',
    nome: 'Ana Santos',
    email: 'ana@financeata.com',
    cargo: 'Leitor Governamental Colaborador',
    departamento: 'Jurídico',
    perfil: 'Leitor',
    status: 'ativo',
  },
];

export const initialAtas: Ata[] = [
  {
    id: 'ata-1537',
    numero: 'ATA - 1537/1423.726',
    titulo: 'Ata financeira referente à reunião ordinária',
    categoriaId: 'cat-1',
    descricao: 'Discussão detalhada sobre o orçamento do segundo semestre do ano fiscal, com revisão das projeções de receitas e aprovação de aportes para a infraestrutura tecnológica.',
    dataReuniao: '2025-05-15',
    horaReuniao: '14:00',
    localReuniao: 'Sala Executiva do Conselho',
    dataPublicacao: '2025-05-15',
    status: 'publicado',
    downloads: 437,
    presidente: 'Carlos Silva',
    secretario: 'João Lima',
    participantes: ['Carlos Silva', 'João Lima', 'Maria Souza', 'Eduardo Guimarães', 'Beatriz Castilho'],
    tags: ['Orçamento', 'Planejamento', 'Financeiro'],
    anexos: [
      { id: 'anx-1', nome: 'ATA - 1537/1423.726.pdf', tipo: 'pdf', tamanho: '2.4 MB', dataUpload: '2025-05-15' },
      { id: 'anx-2', nome: 'Anexo_Contas_Ativas.xlsx', tipo: 'xlsx', tamanho: '1.2 MB', dataUpload: '2025-05-15' }
    ],
    comentarios: [
      { id: 'com-1', autor: 'Carlos Silva', texto: 'Aprovado rito orçamentário com 4 votos a favor e 1 abstenção.', data: '2025-05-15 16:30', cargo: 'Gerente Administrativo', perfil: 'Gestor' },
      { id: 'com-2', autor: 'Maria Souza', texto: 'Revisados os dados de tesouraria. Tudo em conformidade.', data: '2025-05-15 17:00', cargo: 'Analista de Compliance Sênior', perfil: 'Editor' }
    ],
    historicoVersoes: [
      { id: 'ver-1.1', versao: 'v1.1', dataAlteracao: '2025-05-15 16:00', autor: 'João Lima', descricaoAlteracoes: 'Correção ortográfica do nome do participante Eduardo Guimarães e inserção de hash.' },
      { id: 'ver-1.0', versao: 'v1.0', dataAlteracao: '2025-05-15 15:30', autor: 'João Lima', descricaoAlteracoes: 'Criação inicial da ata pós-reunião ordinária.' }
    ],
    assinaturas: [
      { id: 'sgn-1', nome: 'Carlos Silva', cargo: 'Gerente Administrativo', status: 'concluido', dataAssinatura: '2025-05-15 16:45', hash: 'SHA256: 7f12e9b98ec3bf8...' },
      { id: 'sgn-2', nome: 'João Lima', cargo: 'Secretário Governamental Geral', status: 'concluido', dataAssinatura: '2025-05-15 16:40', hash: 'SHA256: ab29883f3ee9100...' },
      { id: 'sgn-3', nome: 'Maria Souza', cargo: 'Analista de Compliance Sênior', status: 'concluido', dataAssinatura: '2025-05-15 16:50', hash: 'SHA256: de11cc339fc2a29...' }
    ]
  },
  {
    id: 'ata-1536',
    numero: 'ATA - 1536/1423.725',
    titulo: 'Ata administrativa referente à reunião extraordinária',
    categoriaId: 'cat-2',
    descricao: 'Reunião para reestruturação dos departamentos internos e atualização do regulamento de conduta corporativa.',
    dataReuniao: '2025-05-10',
    horaReuniao: '09:00',
    localReuniao: 'Auditório Principal / Videoconferência',
    dataPublicacao: '2025-05-10',
    status: 'publicado',
    downloads: 312,
    presidente: 'Administrador',
    secretario: 'João Lima',
    participantes: ['Administrador', 'João Lima', 'Maria Souza', 'Roberto Alencar'],
    tags: ['Reestruturação', 'Regulamento', 'Administrativo'],
    anexos: [
      { id: 'anx-3', nome: 'ATA - 1536/1423.725.pdf', tipo: 'pdf', tamanho: '1.8 MB', dataUpload: '2025-05-10' }
    ],
    comentarios: [
      { id: 'com-3', autor: 'João Lima', texto: 'Aprovada alteração no artigo 12 do regimento institucional.', data: '2025-05-10 11:30', cargo: 'Secretário Governamental Geral', perfil: 'Secretário' }
    ],
    historicoVersoes: [
      { id: 'ver-2.0', versao: 'v1.0', dataAlteracao: '2025-05-10 11:00', autor: 'João Lima', descricaoAlteracoes: 'Publicação oficial do texto.' }
    ],
    assinaturas: [
      { id: 'sgn-4', nome: 'Administrador', cargo: 'Diretor de Tecnologia e Governança', status: 'concluido', dataAssinatura: '2025-05-10 11:15', hash: 'SHA256: ee292883fc910a...' },
      { id: 'sgn-5', nome: 'João Lima', cargo: 'Secretário Governamental Geral', status: 'concluido', dataAssinatura: '2025-05-10 11:20', hash: 'SHA256: 3c91238efb0021a...' }
    ]
  },
  {
    id: 'ata-1535',
    numero: 'ATA - 1535/1423.724',
    titulo: 'Ata de processo de licitação',
    categoriaId: 'cat-3',
    descricao: 'Homologação e concorrência sobre serviços de manutenção preventiva dos prédios corporativos federais.',
    dataReuniao: '2025-05-08',
    horaReuniao: '10:30',
    localReuniao: 'Sala de Pregão Virtual',
    dataPublicacao: '2025-05-08',
    status: 'publicado',
    downloads: 249,
    presidente: 'Administrador',
    secretario: 'João Lima',
    participantes: ['Administrador', 'João Lima', 'Sandra Marques', 'Sérgio Reis'],
    tags: ['Licitação', 'Concorrência', 'Manutenção'],
    anexos: [
      { id: 'anx-4', nome: 'ATA - 1535/1423.724.pdf', tipo: 'pdf', tamanho: '2.1 MB', dataUpload: '2025-05-08' }
    ],
    comentarios: [],
    historicoVersoes: [
      { id: 'ver-3.0', versao: 'v1.0', dataAlteracao: '2025-05-08 12:00', autor: 'João Lima', descricaoAlteracoes: 'Ata homologada e lançada em portal de transparência.' }
    ],
    assinaturas: [
      { id: 'sgn-6', nome: 'Administrador', cargo: 'Diretor de Tecnologia e Governança', status: 'concluido', dataAssinatura: '2025-05-08 12:15', hash: 'SHA256: ad399cd4eef110...' }
    ]
  },
  {
    id: 'ata-1534',
    numero: 'ATA - 1534/1423.723',
    titulo: 'Ata de reunião ordinária',
    categoriaId: 'cat-5',
    descricao: 'Reunião mensal ordinária para levantamento técnico de KPI de downloads, usuários integrados ao sistema institucional e metas estipuladas.',
    dataReuniao: '2025-05-05',
    horaReuniao: '15:00',
    localReuniao: 'Sala Corporativa Teams',
    dataPublicacao: '2025-05-05',
    status: 'publicado',
    downloads: 125,
    presidente: 'Maria Souza',
    secretario: 'João Lima',
    participantes: ['Maria Souza', 'João Lima', 'Eduardo Guimarães'],
    tags: ['Ordinária', 'Metas', 'Mensal'],
    anexos: [
      { id: 'anx-5', nome: 'ATA - 1534/1423.723.pdf', tipo: 'pdf', tamanho: '1.2 MB', dataUpload: '2025-05-05' }
    ],
    comentarios: [],
    historicoVersoes: [
      { id: 'ver-4.0', versao: 'v1.0', dataAlteracao: '2025-05-05 16:30', autor: 'João Lima', descricaoAlteracoes: 'Registro original do fechamento mensal.' }
    ],
    assinaturas: [
      { id: 'sgn-7', nome: 'Maria Souza', cargo: 'Analista de Compliance Sênior', status: 'concluido', dataAssinatura: '2025-05-05 16:40', hash: 'SHA256: cc455a12ce92305...' }
    ]
  },
  {
    id: 'ata-1533',
    numero: 'ATA - 1533/1423.722',
    titulo: 'Ata de contrato de prestação de serviço',
    categoriaId: 'cat-4',
    descricao: 'Rascunho de aprovação para contratação do novo data center redundante e contratação de servidores de cloud dedicados para resiliência dos arquivos oficiais.',
    dataReuniao: '2025-05-02',
    horaReuniao: '11:00',
    localReuniao: 'Sala de Board Executive',
    status: 'rascunho',
    downloads: 0,
    presidente: 'Carlos Silva',
    secretario: 'João Lima',
    participantes: ['Carlos Silva', 'João Lima', 'Administrador'],
    tags: ['Contrato', 'DataCenter', 'Infraestrutura'],
    anexos: [
      { id: 'anx-6', nome: 'Minuta_Contrato_Cloud.docx', tipo: 'docx', tamanho: '850 KB', dataUpload: '2025-05-02' }
    ],
    comentarios: [
      { id: 'com-4', autor: 'Administrador', texto: 'Aguardando parecer final de custos para assinar e publicar de fato.', data: '2025-05-02 14:00', cargo: 'Diretor de Tecnologia e Governança', perfil: 'Administrador' }
    ],
    historicoVersoes: [
      { id: 'ver-5.0', versao: 'v1.0', dataAlteracao: '2025-05-02 11:30', autor: 'João Lima', descricaoAlteracoes: 'Criação do rascunho de minuta contratual.' }
    ],
    assinaturas: [
      { id: 'sgn-8', nome: 'Carlos Silva', cargo: 'Gerente Administrativo', status: 'pendente' }
    ]
  }
];

export const initialNotificacoes: Notificacao[] = [
  { id: 'not-1', titulo: 'Nova Ata Publicada', descricao: 'A ata fiscal ATA - 1537/1423.726 foi assinada e publicada por Carlos Silva.', data: 'Há 2 horas', lida: false, tipo: 'sucesso' },
  { id: 'not-2', titulo: 'Assinatura Pendente', descricao: 'Você possui uma assinatura pendente na Ata de contrato ATA - 1533/1423.722.', data: 'Há 5 horas', lida: false, tipo: 'alerta' },
  { id: 'not-3', titulo: 'Backup Executado', descricao: 'Backup automático completo diário executado com sucesso.', data: 'Há 1 dia', lida: true, tipo: 'sucesso' },
  { id: 'not-4', titulo: 'Comentário Adicionado', descricao: 'Administrador adicionou ponderação na ata ATA - 1533.', data: 'Há 1 dia', lida: true, tipo: 'info' }
];

export const initialAuditLogs: LogAuditoria[] = [
  { id: 'log-1', usuario: 'Administrador', acao: 'Ata publicada: ATA - 1537/1423.726', data: '15/05/2025', hora: '16:55', ip: '192.168.1.45', tipo: 'publicado' },
  { id: 'log-2', usuario: 'Maria Souza', acao: 'Edição realizada na ata: ATA - 1536/1423.725', data: '10/05/2025', hora: '11:10', ip: '192.168.1.102', tipo: 'edicao' },
  { id: 'log-3', usuario: 'João Lima', acao: 'Upload de arquivo: Minuta_Contrato_Cloud.docx', data: '02/05/2025', hora: '11:15', ip: '189.14.88.94', tipo: 'upload' },
  { id: 'log-4', usuario: 'Sistema', acao: 'Backup automático do banco de dados executado', data: '01/05/2025', hora: '02:00', ip: '127.0.0.1', tipo: 'backup' },
  { id: 'log-5', usuario: 'Carlos Silva', acao: 'Download efetuado da ata: ATA - 1535/1423.724', data: '28/04/2025', hora: '14:23', ip: '192.168.1.14', tipo: 'download' },
  { id: 'log-6', usuario: 'Administrador', acao: 'Login bem-sucedido', data: '15/05/2025', hora: '08:00', ip: '192.168.1.45', tipo: 'login' }
];

export const initialBackups: BackupItem[] = [
  { id: 'bak-1', nome: 'backup_completo_15052025.sql', data: '15/05/2025', tamanho: '42.8 MB', tipo: 'manual' },
  { id: 'bak-2', nome: 'backup_auto_diario_14052025.zip', data: '14/05/2025', tamanho: '39.5 MB', tipo: 'automatico' },
  { id: 'bak-3', nome: 'backup_auto_diario_13052025.zip', data: '13/05/2025', tamanho: '39.4 MB', tipo: 'automatico' }
];

export const defaultConfig: ConfigGeral = {
  nomeOrganizacao: 'Finanças S.A. Atas Governamentais',
  logotipo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=120&auto=format&fit=crop&q=80',
  cores: {
    primaria: '#5F5AF6',
    secundaria: '#3c24b5',
    sidebarGradientStart: 'from-slate-900',
    sidebarGradientEnd: 'to-indigo-950',
  },
  timezone: 'GMT-3 (Horário de Brasília)',
  idioma: 'pt-BR',
  formatoData: 'DD/MM/YYYY HH:mm',
  numeracaoAutomatica: true,
};

export const defaultPermissions: Record<string, RolePermissions> = {
  Administrador: {
    atas: { criar: true, editar: true, excluir: true, publicar: true },
    usuarios: { criar: true, editar: true, excluir: true },
    relatorios: { visualizar: true, exportar: true },
    configuracoes: { acessoTotal: true }
  },
  Gestor: {
    atas: { criar: true, editar: true, excluir: false, publicar: true },
    usuarios: { criar: false, editar: false, excluir: false },
    relatorios: { visualizar: true, exportar: true },
    configuracoes: { acessoTotal: false }
  },
  Secretário: {
    atas: { criar: true, editar: true, excluir: false, publicar: false },
    usuarios: { criar: false, editar: false, excluir: false },
    relatorios: { visualizar: true, exportar: false },
    configuracoes: { acessoTotal: false }
  },
  Editor: {
    atas: { criar: true, editar: true, excluir: false, publicar: false },
    usuarios: { criar: false, editar: false, excluir: false },
    relatorios: { visualizar: false, exportar: false },
    configuracoes: { acessoTotal: false }
  },
  Leitor: {
    atas: { criar: false, editar: false, excluir: false, publicar: false },
    usuarios: { criar: false, editar: false, excluir: false },
    relatorios: { visualizar: true, exportar: false },
    configuracoes: { acessoTotal: false }
  }
};
