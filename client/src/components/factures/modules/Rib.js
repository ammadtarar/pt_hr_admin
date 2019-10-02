import React from 'react'

export class RIB extends React.Component {
  render() {
    const rib = this.props.data
    return (
      <form>
        <p className="cornflower-blue">Le RIB où effectuer votre virement bancaire</p>
        <div className="row-fluid">
          <div className="large-12 columns">
            <label>Nom de la banque</label>
            <input type="text" className="full-width" placeholder="Boursorama" value={rib.nomBanque}/>
          </div>
        </div>

        <div className="row-fluid">
          <div className="large-12 columns">
            <label>Domiciliation de la banque</label>
            <textarea
              style={{minHeight: 90}}
              name="description"
              placeholder="Boursorama Banque 44 rue Traversière 92772 BOULOGNE-BILLANCOURT CEDEX"
              value={rib.domiciliation}
            />
          </div>
        </div>

        <div className="row-fluid">
          <div className="large-6 columns">
            <label>BIC</label>
            <input type="text" placeholder="BANQUE FRPP XXX" value={rib.bic}/>
          </div>
          <div className="large-6 columns">
            <label>IBAN</label>
            <input type="text" placeholder="FR76 4000 0298 7920 5400 0234 883" value={rib.iban}/>
          </div>
        </div>

        <div className="row-fluid">
          <div className="large-12 columns">
            <label>RIB</label>
            <input type="number" className="quarter-width" placeholder="Code Banque" value={rib.codeBanque}/>
            <input type="number" className="quarter-width" placeholder="Code Guichet" value={rib.codeGuichet}/>
            <input type="number" className="quarter-width" placeholder="N° compte" value={rib.numeroCompte}/>
            <input type="number" className="quarter-width" placeholder="Clé RIB" value={rib.cleRIB}/>
          </div>
        </div>
      </form>
    );
  }
}

export default RIB;
