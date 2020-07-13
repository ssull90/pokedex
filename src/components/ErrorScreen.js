import React from 'react';
import pikachuOhNo from '../img/pikachuohno.jpg';



const ErrorScreen = (props) => {
    return(
        <div style={{textAlign: "center"}}>
            <img src={pikachuOhNo} alt='LoadingImage' />
            <p>{props.errorMessage}</p>
        </div>
    );
}

export default ErrorScreen;