/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type AtaStatus = 'rascunho' | 'revisao' | 'aprovado' | 'publicado' | 'arquivado';

export interface Anexo {
  id: string;
  nome: string;
  tipo: 'pdf' | 'docx' | 'xlsx' | 'zip' | 'image';
  tamanho: string;
  dataUpload: string;
}

export interface Comentario {
  id: string;
  autor: string;
  texto: string;
  data: string;
  cargo: string;
  perfil: string;
}

export interface Versao {
  id: string;
  versao: string;
  dataAlteracao: string;
  autor: string;
  descricaoAlteracoes: string;
  camposAlterados?: string[];
}

export interface Assinatura {
  id: string;
  nome: string;
  cargo: string;
  status: 'pendente' | 'concluido';
  dataAssinatura?: string;
  hash?: string;
}

export interface Ata {
  id: string;
  numero: string;
  titulo: string;
  categoriaId: string;
  descricao: string;
  dataReuniao: string;
  horaReuniao: string;
  localReuniao: string;
  dataPublicacao?: string;
  status: AtaStatus;
  downloads: number;
  presidente: string;
  secretario: string;
  participantes: string[];
  tags: string[];
  anexos: Anexo[];
  comentarios: Comentario[];
  historicoVersoes: Versao[];
  assinaturas: Assinatura[];
  favorito?: boolean;
  excluido?: boolean;
  dataExclusao?: string;
}

export interface Categoria {
  id: string;
  nome: string;
  cor: string; // Tailwind class background/text color representation
  icone: string; // Lucide icon name
  descricao: string;
  dataCriacao: string;
}

export interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  perfil: 'Administrador' | 'Gestor' | 'Secretário' | 'Editor' | 'Leitor';
  status: 'ativo' | 'desativado';
}

export interface Notificacao {
  id: string;
  titulo: string;
  descricao: string;
  data: string;
  lida: boolean;
  tipo: 'sucesso' | 'info' | 'alerta' | 'erro';
}

export interface LogAuditoria {
  id: string;
  usuario: string;
  acao: string;
  data: string;
  hora: string;
  ip: string;
  tipo: string;
}

export interface BackupItem {
  id: string;
  nome: string;
  data: string;
  tamanho: string;
  tipo: 'manual' | 'automatico';
}

export interface ConfigGeral {
  nomeOrganizacao: string;
  logotipo: string;
  cores: {
    primaria: string;
    secundaria: string;
    sidebarGradientStart: string;
    sidebarGradientEnd: string;
  };
  timezone: string;
  idioma: 'pt-BR' | 'en' | 'es';
  formatoData: string;
  numeracaoAutomatica: boolean;
}

export interface RolePermissions {
  atas: {
    criar: boolean;
    editar: boolean;
    excluir: boolean;
    publicar: boolean;
  };
  usuarios: {
    criar: boolean;
    editar: boolean;
    excluir: boolean;
  };
  relatorios: {
    visualizar: boolean;
    exportar: boolean;
  };
  configuracoes: {
    acessoTotal: boolean;
  };
}
