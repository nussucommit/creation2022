import React from 'react'
import { Link } from 'react-router-dom'
import challengesdetail from '../data/challenges_detail4.json'

export default class ChallengesDetail extends React.Component{
    scrollToTop() {
        window.scrollTo(0,0);
    }

    render() {
        return (
            <div className='mainBody challenge'>
                <h1 className='mainTitle challengeSecondaryTitle' style={{color:'#4DAAFF'}}>#4 Digital Poster to Raise Awareness of Ransomware</h1>
                <div className='challengeContent'>
                    <span>Create a poster for NUS IT with a theme of Ransomware. You are to design a poster on ransomware that is appealing, impactful and memorable to the NUS community. The poster will be circulated in the campus digitally and physically as part of the University’s security awareness campaign.</span>
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
                                    Ransomware is a type of malware that encrypts files and folders on a computer, resulting in the owner not being able to access them. It is often circulated by means of a malicious link or attachment within a phishing email. A ransom payment is demanded by the attackers in exchange for the key to decrypt the files to render them accessible again.
                                </span>
                                <br />
                                <br />
                                <span>
                                    NUS users store and handle large amounts of digital data such as personal data, examination grades and research papers. Should any of these be compromised through a ransomware attack, the impact could cause substantial reputation loss for the University. Hence, it is important to educate our users on this threat.
                                </span>
                                <br />
                                <br />
                                <span>
                                    Your poster should drive user awareness in the following areas:
                                </span>
                                <br />
                                <br />
                                <ul style={{marginLeft:'3vw'}}>
                                    <li>What is ransomware?</li>
                                    <li>How is it spread?</li>
                                    <li>How to protect yourself from ransomware?</li>
                                    <li>What are the impacts of ransomware?</li>
                                    <li>What should you do if you are infected?</li>
                                </ul>
                                <span>
                                    Your poster should convey an overall message which is easily understood by all NUS staff and students, and leave them with a clear understanding of the various concepts outlined.
                                </span>
                                <br />
                                <br />
                                <span>
                                    Please find the details needed to be incorporated in the poster{' '}
                                    <a
                                        href='https://docs.google.com/document/d/1pTq1AgAfIoMbHfw0lAImkLr8x6Prqw7T/edit?usp=sharing&ouid=117399904563563708660&rtpof=true&sd=true'
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

