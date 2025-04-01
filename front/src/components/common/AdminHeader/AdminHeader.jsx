/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function AdminHeader({title, rightElement}) {
    return (
        <div css={s.container}>
            <h1>{title}</h1>
            <div>
                {rightElement}
            </div>
        </div>
    );
}

export default AdminHeader;