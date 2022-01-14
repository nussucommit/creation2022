import deco from '../../images/book.png';

function Prize({ imageURL, title, awardType }) {
  return (
    <div className='prize'>
      <div className={'hexagonShadow'}>
        <span
          style={{
            color: 'white',
            fontSize: '30px',
            fontFamily: 'Raider Crusader',
          }}
        >
          {awardType}
        </span>

        <div
          style={{
            marginTop: '1rem',
            animation: 'float 4s ease-in-out infinite',
          }}
        >
          <img
            src={require(`../../images/${imageURL}`)}
            alt={'prize'}
            style={{ height: '150px', position: 'relative', zIndex: 2 }}
          />
        </div>
        <div>
          <img
            src={deco}
            alt=''
            height='100px'
            style={{ marginTop: '-4rem' }}
          />
        </div>

        <span
          style={{ color: 'white', whiteSpace: 'pre-line', lineHeight: '30px' }}
        >
          {title}
        </span>
      </div>
    </div>
  );
}

export default Prize;
