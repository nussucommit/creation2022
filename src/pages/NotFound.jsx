import React from 'react'
import { Link } from 'react-router-dom'
import sadface from '../images/Sad Face.png'

export default class NotFound extends React.Component{
    render() {
        return (
            <div className='mainBody' style={{height:'100vh',color:'#fff'}}>
                <div className='notFoundContent'>
                    <div>
                        <div><img className='notFoundPic' src={sadface} alt='sad face'/></div>
                        <div className='notFoundTitle'>404 Page not found</div>
                    </div>
                    <div className='notFoundDescription'>The requested URL was not found on this server.</div>
                </div>
                <div style={{width:'93px',
                            height:'36px',
                            lineHeight: '30px',
                            textAlign: 'center',
                            margin:'5vw auto',
                            border:'3px #fff solid',
                            borderRadius: '10px',
                            fontFamily:'Nova Flat',
                            fontSize:'14px'
                }}>
                    <Link to='/home' style={{color:'#fff',textDecoration:'none',width:'87px',height:'30px',display:'block'}}>
                        Home
                    </Link>
                </div>
            </div>
        )
    }
}
