import React from 'react'
import { Link } from 'react-router-dom'
import challenge from '../data/challenge.json'
import line1 from '../images/Challenge Statement Groups of line 1.png'
import line2 from '../images/Challenge Statement Groups of line 2.png'
import line3 from '../images/Challenge Statement Groups of line 3.png'
import num1 from '../images/Challenge Statement Number 1.png'
import num2 from '../images/Challenge Statement Number 2.png'
import num3 from '../images/Challenge Statement Number 3.png'

export default class Challenge extends React.Component {
    state = {
        lines:[line1,line2,line3],
        nums:[num1,num2,num3],
        color:['#3ED6CD','#FB8500','#E270FF']
    }

    scrollToTop() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className='mainBody challenge' style={{overflow:'hidden'}}>
                <h1 className='mainTitle challengeTitle' style={{ textShadow: "0px 0px 16px #00C2FF" }}>Challenge Statements</h1>
                <div>
                    {
                        challenge.map((section,index) => (
                            <div>
                                <div><img src={this.state.lines[index]} style={{width:'100vw',marginLeft:'-30px'}} alt='line'/></div>
                                <div className='challengeContent' style={{ lineHeight:"2vw" }}>
                                    <div><img className={index%2===0 ? 'challengeNumPicRight' : 'challengeNumPicLeft'} src={this.state.nums[index]} alt='number'/></div>
                                    <div className={index%2===0 ? 'challengeContentRight' : 'challengeContentLeft'}>
                                        <h1 className='secondaryTitle challengeSecondaryTitle' style={{color:this.state.color[index], lineHeight:"30px"}}>{section.title}</h1>
                                        {
                                            section.content.map((description) =>
                                                <div>    
                                                    <span>{description}</span>
                                                    <br/>
                                                    <br/>
                                                </div>
                                            )
                                        }
                                        <h3 className='challengeTertiaryTitle' style={{lineHeight: '34px', textDecoration: 'underline',fontFamily:'Nova Flat',margin:'0px'}}>{section.company}</h3>
                                        <span>{section.background}</span>
                                    </div>
                                    <h2 className='challengeTertiaryTitle'>
                                        <Link className='challengeFindMore' to='/challengesdetail' onClick={this.scrollToTop} style={{color:this.state.color[index]}}>Find Out More {'>>'}</Link>
                                    </h2>
                                </div>
                            </div>
                        )
                        )
                    }
                </div>
            </div>
        )
    }
}