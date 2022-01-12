import faqs from '../data/faq.json';

function Faq() {
  return (
    <div className='mainBody'>
      <h1 className='mainTitle' style={{ textShadow: '0px 0px 16px #ED8F03' }}>
        Frequently Asked Questions
      </h1>
      <br />
      <ol className='mainContent' style={{ padding: '0 15vw' }}>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '80px' }}>
            <li className='secondaryTitle' style={{ fontWeight: '800' }}>
              <h2 className='secondaryTitle'>{faq.question}</h2>
              <p
                style={{
                  color: 'white',
                  lineHeight: '30px',
                  whiteSpace: 'pre-line',
                  fontSize: '1rem',
                  fontWeight: 'normal',
                }}
              >
                {faq.answer}
              </p>
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default Faq;
