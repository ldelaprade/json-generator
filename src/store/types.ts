import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;
export type A429RowState = ReturnType<typeof store.getState>;
