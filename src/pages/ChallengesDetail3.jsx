import React from 'react'
import { Link } from 'react-router-dom'
import challengesdetail from '../data/challenges_detail3.json'

export default class ChallengesDetail extends React.Component{
    scrollToTop() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className='mainBody challenge'>
                <h1 className='mainTitle challengeSecondaryTitle' style={{color:'#E270FF'}}>#3 Digital Poster for Business Email Compromise</h1>
                <div className='challengeContent'>
                    <span>Create a poster about Business Email Compromise. The poster that is impactful, catchy and memorable to the NUS audience. The poster will be circulated in NUS digitally and physically (subject to return to the premise) as part of the university’s security awareness campaign on social engineering.</span>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        {challengesdetail.map((details) =>
                        details.title === "Challenge Background" ? (
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
                                paragraph.map((point) => (
                                <ul style={{marginLeft:'3vw'}}>
                                    <li>{point}</li>
                                </ul>
                                ))
                            )
                            )}
                        </div>
                        <br/>
                        <br/>
                        </div>
                    ) : (
                    details.title === "Requirements of Artwork" ? (
                        <div>
                            <h1 className='challengeTertiaryTitle' style={{textDecoration:'underline',textAlign:'center',fontFamily:'Nova Flat'}}>{details.title}</h1>
                            <br/>
                            <br/>
                            <ul>
                                {details.content.map((paragraph) =>
                                typeof paragraph === "string" ? (
                                    <div style={{marginLeft:'3vw'}}>
                                        <li>{paragraph}</li>
                                    </div>
                                ) : (
                                    <ul>
                                        {paragraph.map((point) => (
                                            <div style={{marginLeft:'6vw'}}>
                                                <li>{point}</li>
                                            </div>
                                        ))}
                                    </ul>
                                )
                                )}
                            </ul>
                            <br/>
                            <span>Failure to follow any of the guidelines above may result in disqualification.</span>
                            <br/>
                            <br/>
                            <br/>
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
                            <span>Note that ONE Newcomer Award will be given to ONE eligible participant whose design is the judges’ favorite among the 4 CHALLENGE STATEMENTS. Eligibility criteria for Newcomer Award can be found under <Link to='/rules' onClick={this.scrollToTop} style={{color:'#fff'}}>Rules and Regulations</Link>.</span>
                        </div>
                        <br/>
                        <br/>
                        </div>
                    )
                    ))}
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

