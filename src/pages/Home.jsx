import Challenge from '../components/Layout/HomeChallenge';
import Timeline from '../components/Layout/CompetitionTimeline';
import Prize from '../components/Layout/Prize';

import logo from '../images/creation_logo_styled.png';

function Home() {
  return (
    <div>
      <div className='homeBody'>
        {/* Cover Photo */}
        <div className='coverPage'>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
            }}
          >
            <img src={logo} className='creationLogo' alt='Creation' />
          </div>
        </div>

        <div className='homeContent'>
          {/* Challenge */}
          <div className='challenge'>
            <h1
              className='mainTitle'
              style={{
                textShadow: '0px 4px 4px #370005',
                position: 'relative',
                zIndex: 1,
              }}
            >
              Overview of Challenges
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Challenge
                title={'Key Visual for NUS Commencement Class Giving 2023'}
                content={
                  'Create a new, refreshed key visual for Commencement Class Giving 2023. The design should inspire pride in being affiliated with NUS, as well as encourage students to leave a legacy by making a gift in support of their juniors.'
                }
              ></Challenge>
              <Challenge
                title={'Digital Poster for Phishing via Email, Calls and SMS'}
                content={
                  'Create a poster for NUS IT Security as part of the photoshop camp. The theme of the poster is about Phishing being targeted via email, call and SMS.'
                }
              ></Challenge>
              <Challenge
                title={'Digital Poster for Business Email Compromise'}
                content={
                  'Create a poster for NUS IT Security as part of the photoshop camp. The theme of the poster is about Business Email Compromise.'
                }
              ></Challenge>
              <Challenge
                title={'Digital Poster to Raise Awareness of Ransomware'}
                content={
                  'Create a poster for NUS IT Security as part of the photoshop camp. The theme of the poster is Ransomware which is a type of cyber-attack that encrypts files or the entire computer itself once infected.'
                }
              ></Challenge>
            </div>
          </div>

          {/* Timeline */}
          <div className='timeline'>
            <h1
              className={'mainTitle'}
              style={{ textShadow: '0px 4px 4px #370005' }}
            >
              Competition Timeline
            </h1>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                padding: '1rem 2rem',
              }}
            >
              <Timeline
                index={1}
                date={'17 Jan 2022'}
                title={'Challenge Statement Release'}
                content={
                  'The problem statements will be released on our website on 17 Jan 2022. Sign-up will open on this website from 17 Jan 2022 until the deadline of submission on 6 Mar 2022.'
                }
              ></Timeline>
              <Timeline
                index={2}
                date={'29 Jan 2022'}
                title={'Adobe Illustrator Workshop'}
                content={
                  'You can join our free Adobe Illustrator Workshop  conducted by the NUSSU commIT training team. The workshop will be held on 29 January 2022.'
                }
              ></Timeline>
              <Timeline
                index={3}
                date={'5 Feb 2022'}
                title={'Advanced Photoshop Workshop'}
                content={
                  'Once you have officially signed up as a participant, you can join our free workshop for advanced skills in Photoshop conducted by Acadia Training. The workshop will be on 5 February 2022.'
                }
              ></Timeline>
              <Timeline
                index={4}
                date={'6 Mar 2022'}
                title={'Deadline for Submission   '}
                content={
                  'Participants can submit their design through our website by logging in. Submissions must be done before 6 March 2022 at 18:00.'
                }
              ></Timeline>
              <Timeline
                index={5}
                date={'9 Mar 2022'}
                title={'Announcement of Finalists'}
                content={
                  'After the submission deadline (6th of March 2022), participants’ submissions for each challenge statement will be assessed by the CREATION 2022 Committee and shortlisted into the final round of the closing ceremony.'
                }
              ></Timeline>
              <Timeline
                index={6}
                date={'12 Mar 2022'}
                title={'Pitching Day & Closing Ceremony'}
                content={
                  'Finalists are invited  to our closing ceremony held  at the Auditorium 1 in Utown from 9 A.M to 4 P.M. Finalists will get a chance to pitch their designs to a panel of judges.'
                }
              ></Timeline>
            </div>
          </div>
        </div>

        {/* Prizes */}
        <div className='prizes'>
          <h1
            className={'mainTitle'}
            style={{ textShadow: '0px 0px 15px #7000FF' }}
          >
            Prizes
          </h1>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Prize
              imageURL={'iPad.png'}
              title={'Apple iPad'}
              awardType={'First Prize'}
            ></Prize>
            <Prize
              imageURL={'googleNestAudio.png'}
              title={'Google Nest Audio'}
              awardType={'Second Prize'}
            ></Prize>
            <Prize
              imageURL={'toshibaHardDrive.png'}
              title={'Toshiba Canvio 1TB External Hard Drive'}
              awardType={'Third Prize'}
            ></Prize>
            <Prize
              imageURL={'wacomIntuos.png'}
              title={'Wacom Intuos S'}
              awardType={'Newcomer Award'}
            ></Prize>
            <Prize
              imageURL={'prize_CV.png'}
              title={
                'CV to be shared with startups supported by NUS enterprise'
              }
              awardType={'CV Collection'}
            ></Prize>
          </div>
          <br />
          <br />
          <div style={{ margin: '50px' }}>
            <p style={{ color: 'white', lineHeight: '30px', padding: '30px' }}>
              Note that ONE Newcomer Award will be given to ONE eligible
              participant whose design is the judges’ favorite among the 4
              CHALLENGE STATEMENTS. Eligibility criteria for Newcomer Award can
              be found under{' '}
              <a
                href={'https://creation-2022.herokuapp.com/rules'}
                style={{ color: 'white' }}
              >
                Rules and Regulations
              </a>
              .
            </p>
            <p style={{ color: 'white', lineHeight: '30px', padding: '30px' }}>
              Note that All participants can voluntarily share their CVs with
              the startups supported by NUS Enterprise. CV collection is not a
              winning entry for any of the challenge statements. More
              information can be found under {' '}
              <a
                href={'https://creation-2022.herokuapp.com/rules'}
                style={{ color: 'white' }}
              >
                Rules and Regulations
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: 'white', padding: '40px 0px' }}>
        <h2
          className={'mainTitle'}
          style={{
            color: '#323232',
            margin: '40px',
          }}
        >
          Challenge Partners
        </h2>
        <img
          style={{ width: '100%' }}
          src={require(`../images/Challenge_Partners.png`)}
          alt={'challenge partners'}
        />
        <h2
          className={'mainTitle'}
          style={{
            color: '#323232',
            margin: '40px',
          }}
        >
          Ecosystem Partner
        </h2>
        <img
          style={{ width: '100%' }}
          src={require(`../images/Ecosystem_Partners.png`)}
          alt={'ecosystem partners'}
        />
        <h2
          className={'mainTitle'}
          style={{
            color: '#323232',
            margin: '40px',
          }}
        >
          Sponsors
        </h2>
        <img
          style={{ width: '100%' }}
          src={require(`../images/Sponsors.png`)}
          alt={'sponsors'}
        />
      </div>
    </div>
  );
}

export default Home;
