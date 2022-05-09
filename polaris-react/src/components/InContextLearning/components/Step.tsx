import React from 'react';

interface Props {
    children: React.ReactElement;
}

export function Step({children}: Props) {
    return <>{children}</>
}
