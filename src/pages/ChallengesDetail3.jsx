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
                    <span>Create a poster for NUS IT with a theme of Business Email Compromise. You are to design a poster on BEC that is appealing, impactful and memorable to the NUS community. The poster will be circulated in the campus digitally and physically as part of the University’s security awareness campaign on social engineering.</span>
                    <br/>
                    <br/>
                    <br/>
                    <div>
                        {challengesdetail.map((details) =>
                        details.title === "Challenge Background" ? (
                            <div>
                            <h1
                              className='challengeTertiaryTitle'
                              style={{
                                textDecoration: 'underline',
                                textAlign: 'center',
                                fontFamily: 'Nova Flat',
                              }}
                            >
                              {details.title}
                            </h1>
                            <br />
                            <br />
                            <div>
                                <span>
                                    Business Email Compromise (BEC) is a social engineering technique where attackers impersonate a known individual, usually someone of importance within an organization, in an attempt to trick their victims into performing a fraudulent transaction.
                                </span>
                                <br />
                                <br />
                                <span>
                                    In NUS, the BEC cases we handled involved scammers impersonating a Head of Department using fake email addresses created on free webmail accounts, and reaching out to various staff from that department, trying to gain their trust through a series of email conversations that eventually led to a request for the unsuspecting staff to purchase iTunes gift cards on their behalf.
                                </span>
                                <br />
                                <br />
                                <span>
                                    For more information, please refer to our previous advisory on this subject at{' '}
                                <a
                                  href='https://nusit.nus.edu.sg/its/alerts/becjun2020/'
                                  style={{ color: '#fff' }}
                                >
                                  https://nusit.nus.edu.sg/its/alerts/becjun2020/
                                </a>
                                </span>
                                <br />
                                <br />
                                <span>
                                    Your poster should drive user awareness in the following areas:
                                </span>
                                <br />
                                <br />
                                <ul style={{marginLeft:'3vw'}}>
                                    <li>What is Business Email Compromise (BEC)?</li>
                                    <li>How to identify a BEC email?</li>
                                    <li>What are the impacts of falling prey?</li>
                                    <li>What should you do/not do if you receive a BEC email?</li>
                                </ul>
                                <span>
                                    Your poster should convey an overall message which is easily understood by all NUS staff and students, and leave them with a clear understanding of the various concepts outlined.
                                </span>
                                <br />
                                <br />
                                <span>
                                    For more details or clarifications, you can contact Lynn Mher at lynnmher@nus.edu.sg
                                </span>
                                <br />
                                <br />
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

