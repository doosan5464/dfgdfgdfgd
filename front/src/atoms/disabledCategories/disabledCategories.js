import { atom } from 'recoil';
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist(); // persist 기능 추가

export const disabledCategoriesState = atom({
  key: 'disabledCategoriesState',  // atom 고유 ID
    default: [],  // 기본값은 빈 배열로 설정
    effects_UNSTABLE: [persistAtom], // 상태를 유지하도록 설정
});
