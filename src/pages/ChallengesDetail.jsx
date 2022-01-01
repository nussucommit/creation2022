import React from 'react'
import { Link } from 'react-router-dom'
import challengesdetail from '../data/challenges_detail.json'

export default class ChallengesDetail extends React.Component{
    scrollToTop() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className='mainBody challenge' onChange={this.getwidth}>
                <h1 className='mainTitle challengeSecondaryTitle' style={{color:'rgba(80, 255, 244, 0.8)'}}>#1 2020 NUSSU Welfare Diary</h1>
                <div className='challengeContent'>
                    <span>Design for the AY2020/21 Welfare Diary. The theme of the journal is jewel toned colours with writings in block letters style. The design of the journal should appeal to the NUS student community.</span>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        {challengesdetail.map((details) =>
                        details.title === "Context" ? (
                        <div>
                        <h1 className='challengeTertiaryTitle' style={{textDecoration:'underline',textAlign:'center',fontFamily:'Nova Flat'}}>{details.title}</h1>
                        <br/>
                        <br/>
                        <div>
                            {details.content.map((paragraph) =>
                            typeof paragraph === "string" ? (
                                <div>
                                    <span>{paragraph}</span>
                                    <br/>
                                    <br/>
                                </div>
                            ) : (
                                paragraph.map((point, index) => (
                                <div style={{marginLeft:'3vw'}}>
                                    <span>{index + 1}. {point.section}</span>
                                    <ol type='a' style={{marginLeft:'6vw'}}>
                                    {point.detail.map((smallpoint) => (
                                        <li>{smallpoint}</li>
                                    ))}
                                    </ol>
                                    <br />
                                </div>
                                ))
                            )
                            )}
                        </div>
                        <br />
                        </div>
                    ) : (
                        <div>
                        <h1 className='challengeTertiaryTitle' style={{textDecoration:'underline',textAlign:'center',fontFamily:'Nova Flat'}}>{details.title}</h1>
                        <br/>
                        <br/>
                        <div>
                            {details.content.map((paragraph) =>
                            typeof paragraph === "string" ? (
                                <div>
                                    <span>{paragraph}</span>
                                    <br/>
                                </div>
                            ) : (
                                <ul>
                                {paragraph.map((prize) => (
                                    <div style={{marginLeft:'3vw'}}>
                                        <li> {prize}</li>
                                    </div>
                                ))}
                                    <br/>
                                </ul>
                            )
                            )}
                        </div>
                        <br />
                        <br />
                        </div>
                    )
                    )}
                    </div>
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
                    <Link to='/challenges' onClick={this.scrollToTop} style={{color:'#fff',textDecoration:'none',width:'87px',height:'30px',display:'block'}}>Back</Link>
                </div>
            </div>
        )
    }
}

