import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

export const orderedCategoriesState = atom({
  key: 'orderedCategoriesState',
  default: [], 
  effects_UNSTABLE: [persistAtom],
});