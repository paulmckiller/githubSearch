import React, {Fragment} from 'react'
import spinner from './spinner.gif';

const Spinner = () => {
    return (
        <Fragment>
            <img src={spinner} alt="Loading" style={{width:'12rem', margin:'auto', display:'block', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)'}} />
        </Fragment>
    )
}

export default Spinner
