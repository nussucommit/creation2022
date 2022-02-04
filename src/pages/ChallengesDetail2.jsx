import React from 'react'
import { Link } from 'react-router-dom'
import challengesdetail from '../data/challenges_detail2.json'

export default class ChallengesDetail extends React.Component{
    scrollToTop() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className='mainBody challenge'>
                <h1 className='mainTitle challengeSecondaryTitle' style={{color:'#FB8500'}}>#2 Digital Poster for Phishing via Email, Calls and SMS</h1>
                <div className='challengeContent'>
                    <span>Create a poster for NUS IT with a theme of Phishing in its different forms (email, voice calls and SMS). You are to design a poster on phishing that is appealing, impactful and memorable to the NUS community. The poster will be circulated in the campus digitally and physically as part of the University’s security awareness campaign on social engineering.</span>
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
                                    Phishing is one of the most common cyberattacks used against organizations today to obtain sensitive information or to deploy malware. These attacks can originate from emails, SMS, Whatsapp (IM) messages or calls.
                                </span>
                                <br />
                                <br />
                                <span>
                                    NUS users receive a fair share of phishing attacks daily, and it remains as one of the cybersecurity threats we are most concerned with. Being a form of social engineering attack, phishing techniques are constantly evolving and getting more sophisticated. In response to this, we need to heighten our users’ awareness in tandem with the latest techniques used.
                                </span>
                                <br />
                                <br />
                                <span>
                                    Your design should be based on one or more of the following forms of phishing and reflect on the latest techniques used by attackers:
                                </span>
                                <br />
                                <br />
                                <ol type="a" style={{marginLeft:'3vw'}}>
                                    <li>Email phishing</li>
                                    <li>SMS phishing (SMShing)</li>
                                    <li>Voice phishing (vishing)</li>
                                </ol>
                                <span>
                                    Your poster should drive user awareness in the following areas:
                                </span>
                                <br />
                                <br />
                                <ul style={{marginLeft:'3vw'}}>
                                    <li>What is phishing?</li>
                                    <li>How to identify a phishing email?</li>
                                    <li>What are the impacts of falling prey?</li>
                                    <li>What should you do/not do if you receive a phishing email?</li>
                                </ul>
                                <span>
                                    Your poster should convey an overall message which is easily understood by all NUS staff and students, and leave them with a clear understanding of the various concepts outlined.
                                </span>
                                <br />
                                <br />
                                <span>
                                    Please find the details needed to be incorporated in the poster{' '}
                                    <a
                                        href='https://docs.google.com/document/d/1ZtOuP2iW8tfUe47o9hL8Y_ZFmu-6EAnI/edit?usp=sharing&ouid=117399904563563708660&rtpof=true&sd=true'
                                        style={{ color: '#fff' }}
                                    >
                                        here
                                    </a>
                                    , and you may still enhance it or use your own text as long as it meets the objective of the challenge statement.
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

