import React from 'react'

export class BoxCandidat extends React.Component {
  render() {
    return (
      <div className="box-encart">
        <div className="icon">SM</div>
        <p>Randall Mckinney</p>
        <p>Frontend Developer React</p>
        <p>Coopté par <span>Samantha Leigh</span></p>
        <p className="date">Le 23 décembre 2019</p>
        <hr/>
        <p><a href="mailto:randallmck@mail.com" rel="noopener noreferrer" title="">randallmck@mail.com</a></p>
        <hr/>
        <img type="image/svg+xml" className="rejeter" src="/icons/rejeter.svg" alt=""/>
      </div>
    )
  }
}

export default BoxCandidat;
