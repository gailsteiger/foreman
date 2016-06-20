import React from 'react';
import Loading from 'react-loading';

const CenteredLoader = (props) => {
    let centered = {
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center'
    };

    return (
        <div styles={centered}>
            <Loading type={props.type} color='#e3e3e3' />
        </div>
    );
};

export default CenteredLoader;
