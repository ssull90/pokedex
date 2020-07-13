import React from 'react';
import pikachuLoading from '../img/pikachuLoading.png';



const Loading = () => {
    return(
        <div style={{textAlign: "center"}}>
            <img src={pikachuLoading} alt='LoadingImage' />
            <p>Loading...</p>
        </div>
    )
}

export default Loading;