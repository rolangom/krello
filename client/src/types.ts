export const STATUSES = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  DONE: 'DONE',
} as const;

export const statusesLabels = {
  [STATUSES.TODO]: 'To Do',
  [STATUSES.IN_PROGRESS]: 'In Progress',
  [STATUSES.DONE]: 'Done',
} as const;

export type CardStatus = typeof STATUSES[keyof typeof STATUSES];

export interface Card {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  status: CardStatus;
}
