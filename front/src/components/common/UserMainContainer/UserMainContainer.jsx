/**@jsxImportSource @emotion/react */
import * as s from './style';
import React from 'react';

function UserMainContainer({children}) {
    return (
        <div css={s.container}>
            {children}
        </div>
    );
}

export default UserMainContainer;