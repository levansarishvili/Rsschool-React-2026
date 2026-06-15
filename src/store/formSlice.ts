import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { COUNTRIES_LIST } from '../schemas/validation';

export interface SavedSubmission {
  id: string;
  name: string;
  age: number;
  email: string;
  gender: string;
  country: string;
  imageBase64: string;
  submittedAt: number;
}

interface FormState {
  countries: string[];
  submissions: SavedSubmission[];
}

const initialState: FormState = {
  countries: COUNTRIES_LIST,
  submissions: [],
};

const formSlice = createSlice({
  name: 'forms',
  initialState,
  reducers: {
    addSubmission: (
      state,
      action: PayloadAction<Omit<SavedSubmission, 'id' | 'submittedAt'>>
    ) => {
      state.submissions.unshift({
        ...action.payload,
        id: crypto.randomUUID(),
        submittedAt: Date.now(),
      });
    },
  },
});

export const { addSubmission } = formSlice.actions;
export default formSlice.reducer;
