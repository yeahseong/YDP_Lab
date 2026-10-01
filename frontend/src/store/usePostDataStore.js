import { create } from "zustand";

const initialState = {
  householdIncome: null,
  leisurePurpose: null,
  leisurePurpose2: null,
  weekdayAvgLeisureTime: null,
  weekendAvgLeisureTime: null,
  restRecreationRate: null,
  hobbyRate: null,
  selfImprovementRate: null,
  socialRelationshipRate: null,
  leisureActivity1: null,
  leisureActivity2: null,
  leisureActivity3: null,
  leisureActivity4: null,
  leisureActivity5: null,
};

export const usePostDataStore = create((set) => ({
  postData: initialState,
  setPostData: (category, value) =>
    set((state) => ({
      postData: {
        ...state.postData,
        [category]: value === "" ? "" : Number(value),
      },
    })),
  resetPostData: () => set(() => ({ postData: { ...initialState } })),
}));
