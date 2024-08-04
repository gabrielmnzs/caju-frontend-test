export const Status = {
  REVIEW: 'REVIEW',
  APPROVED: 'APPROVED',
  REPROVED: 'REPROVED',
} as const;

export const Action = {
  ...Status,
  DELETE: 'DELETE',
};
