export const SearchTables = {
  POST: 'post_fts',
  COMMENT: 'comment_fts',
} as const;

export type SearchTablesT = (typeof SearchTables)[keyof typeof SearchTables];
