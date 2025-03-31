import React, { useEffect } from 'react';
/**@jsxImportSource @emotion/react */
import * as s from './style';
import { disabledCategoriesState } from '../../atoms/disabledCategories/disabledCategories';
import { useRecoilState } from 'recoil';
import menuForUser from '../../hooks/menu/menuForUser';
import { orderedCategoriesState } from '../../atoms/orderedCategoriesState/orderedCategoriesState';

function AdminCategoryPage() {
    const [disabledCategories, setDisabledCategories] = useRecoilState(disabledCategoriesState);
    const { data: menuData } = menuForUser();
    const [categories, setCategories] = useRecoilState(orderedCategoriesState);

    useEffect(() => {
        if (menuData && categories.length === 0) {
            const uniqueCategories = [...new Set(menuData.map(menu => menu.menuCategory))];
            setCategories(prevCategories => [
                ...prevCategories,
                ...uniqueCategories.filter(category => !prevCategories.includes(category))
            ]);
        }
    }, [menuData, categories]);

    const handleToggleCategory = (category) => {
        setDisabledCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const handleMoveUp = (index) => {
        if (index === 0) return;
        setCategories(prev => {
            const newCategories = [...prev];
            [newCategories[index - 1], newCategories[index]] = [newCategories[index], newCategories[index - 1]];
            return newCategories;
        });
    };

    const handleMoveDown = (index) => {
        if (index === categories.length - 1) return;
        setCategories(prev => {
            const newCategories = [...prev];
            [newCategories[index], newCategories[index + 1]] = [newCategories[index + 1], newCategories[index]];
            return newCategories;
        });
    };

    return (
        <div css={s.container}>
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
                        <tr key={category} style={{ opacity: disabledCategories.includes(category) ? 0.5 : 1 }}>
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