import React, { useEffect } from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style'; // 스타일 파일 import
import { disabledCategoriesState } from '../../../atoms/disabledCategories/disabledCategories';
import { useRecoilState } from 'recoil';
import menuForUser from '../../../hooks/menu/menuForUser';
import { orderedCategoriesState } from '../../../atoms/orderedCategoriesState/orderedCategoriesState';
import AdminHeader from '../../../components/common/AdminHeader/AdminHeader';

function AdminCategoryPage() {
    // 비활성화된 카테고리 상태 관리
    const [disabledCategories, setDisabledCategories] = useRecoilState(disabledCategoriesState);
    // 메뉴 데이터를 가져오는 custom hook
    const { data: menuData } = menuForUser();
    // 정렬된 카테고리 상태 관리
    const [categories, setCategories] = useRecoilState(orderedCategoriesState);

    // 메뉴 데이터가 존재하고, categories가 비어있을 때 초기 카테고리 설정
    useEffect(() => {
        if (menuData) {
            const uniqueCategories = [...new Set(menuData.map(menu => menu.menuCategory))];
            setCategories(uniqueCategories); // 기존 카테고리를 유지하지 않고 덮어씀
        }
    }, [menuData]);
    console.log(menuData);

    // 카테고리 활성/비활성 토글
    const handleToggleCategory = (category) => {
        setDisabledCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) // 선택 해제하면 목록에서 제거
                : [...prev, category] // 선택하면 목록에 추가
        );

    };

    // 카테고리 순서를 위로 이동
    const handleMoveUp = (index) => {
        if (index === 0) return; // 첫 번째 항목이면 이동 불가
        setCategories(prev => {
            const newCategories = [...prev];
            [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
            return newCategories;
        });
    };

    // 카테고리 순서를 아래로 이동
    const handleMoveDown = (index) => {
        if (index === categories.length - 1) return; // 마지막 항목이면 이동 불가
        setCategories(prev => {
            const newCategories = [...prev];
            [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
            return newCategories;
        });
    };

    return (
        <div css={s.container}>
            <AdminHeader title={"키오스크 카테고리 관리"} />
            <h1 css={s.title}>카테고리 관리</h1>
            <table css={s.table}>
                <thead>
                    <tr>
                        <th>활성화</th>
                        <th>카테고리</th>
                        <th>순서</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={category}>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={!disabledCategories.includes(category)} 
                                    onChange={() => handleToggleCategory(category)} 
                                />
                            </td>
                            <td>{category}</td>
                            <td>
                                <button css={s.button} onClick={() => handleMoveUp(index)}>⬆️</button>
                                <button css={s.button} onClick={() => handleMoveDown(index)}>⬇️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminCategoryPage;