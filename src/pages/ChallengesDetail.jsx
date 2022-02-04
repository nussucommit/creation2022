import React from 'react';
import { Link } from 'react-router-dom';
import challengesdetail from '../data/challenges_detail.json';

export default class ChallengesDetail extends React.Component {
  scrollToTop() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='mainBody challenge'>
        <h1
          className='mainTitle challengeSecondaryTitle'
          style={{ color: '#3ED6CD' }}
        >
          #1 Key Visual for NUS Commencement Class Giving 2023
        </h1>
        <div className='challengeContent'>
          <span>
            Create a new, refreshed key visual for Commencement Class Giving
            2023. The design should inspire pride in being affiliated with NUS,
            as well as encourage students to leave a legacy by making a gift in
            support of their juniors.
          </span>
          <br />
          <br />
          <br />
          <div>
            {challengesdetail.map((details) =>
              details.title === 'Challenge Background' ? (
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
                      Commencement Class Giving is an annual tradition in which
                      the graduating cohort of NUS comes together to celebrate
                      convocation by making a single gift ($20.23 for Class of
                      2023) in support of their juniors. By leaving a legacy
                      through their giving, the cohort contributes to current
                      and future students in financial need, as well as
                      activities that will enrich campus life.
                    </span>
                    <br />
                    <br />
                    <span>
                      Please refer to{' '}
                      <a
                        href='https://nus.edu.sg/nusgiving/news-and-events/video-gallery/videoview/detail/what-does-20-mean-to-you'
                        style={{ color: '#fff' }}
                      >
                        this video
                      </a>{' '}
                      and past Commencement Class Giving collaterals{' '}
                      <a
                        href='https://docs.google.com/document/d/1e7mCv8vJCLlC0S8_I1QLsaxBSq3PT1T5/edit?usp=sharing&ouid=117399904563563708660&rtpof=true&sd=true'
                        style={{ color: '#fff' }}
                      >
                        here
                      </a>{' '}
                      for more information.
                    </span>
                    <br />
                    <br />
                    <span>
                      The key visual should encapsulate a strong concept that is
                      different from recent years. It should include distinct
                      elements that are adaptable and scalable. Bear in mind
                      that the key visual is intended to be used across multiple
                      channels with various taglines/call-to-action (e.g. web
                      banners, emailers, campus banners, floor stickers, etc).
                    </span>
                    <br />
                    <br />
                    <span>
                      A key visual refers to an image motif used in campaigns in
                      order to enhance brand recognition. The message and
                      context of a campaign should be easily and quickly grasped
                      from the key visual.
                    </span>
                    <br />
                    <br />
                    <span>
                      There is no need to use NUS colours. Please refrain from
                      using predictable education or giving-related
                      symbols/icons/motifs (e.g. heart, hands, gift box, plant,
                      book, mortarboard, scroll, etc.). Please ensure that the
                      message and key visual are designed with careful
                      consideration of political and cultural sensitivity.
                    </span>
                    <br />
                    <br />
                  </div>
                  <br />
                  <br />
                </div>
              ) : details.title === 'Requirements of Artwork' ? (
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
                  <ul>
                    {details.content.map((paragraph) =>
                      typeof paragraph === 'string' ? (
                        <div style={{ marginLeft: '3vw' }}>
                          <li>{paragraph}</li>
                        </div>
                      ) : (
                        <ul>
                          {paragraph.map((point) => (
                            <div style={{ marginLeft: '6vw' }}>
                              <li>{point}</li>
                            </div>
                          ))}
                        </ul>
                      )
                    )}
                  </ul>
                  <br />
                  <span>
                    Failure to follow any of the guidelines above may result in
                    disqualification.
                  </span>
                  <br />
                  <br />
                  <br />
                </div>
              ) : (
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
                    {details.content.map((paragraph) =>
                      typeof paragraph === 'string' ? (
                        <div>
                          <span>{paragraph}</span>
                          <br />
                        </div>
                      ) : (
                        <ul>
                          {paragraph.map((prize) => (
                            <div style={{ marginLeft: '3vw' }}>
                              <li> {prize}</li>
                            </div>
                          ))}
                          <br />
                        </ul>
                      )
                    )}
                    <span>
                      Note that ONE Newcomer Award will be given to ONE eligible
                      participant whose design is the judges’ favorite among the
                      4 challenge statements. Eligibility criteria for Newcomer
                      Award can be found under{' '}
                      <Link
                        to='/rules'
                        onClick={this.scrollToTop}
                        style={{ color: '#fff' }}
                      >
                        Rules and Regulations
                      </Link>
                      .
                    </span>
                  </div>
                  <br />
                  <br />
                </div>
              )
            )}
          </div>
        </div>
        <div
          style={{
            width: '93px',
            height: '36px',
            lineHeight: '30px',
            textAlign: 'center',
            margin: '5vw auto',
            border: '3px #fff solid',
            borderRadius: '10px',
            fontFamily: 'Nova Flat',
            fontSize: '14px',
          }}
        >
          <Link
            to='/challenges'
            onClick={this.scrollToTop}
            style={{
              color: '#fff',
              textDecoration: 'none',
              width: '87px',
              height: '30px',
              display: 'block',
            }}
          >
            Back
          </Link>
        </div>
      </div>
    );
  }
}
