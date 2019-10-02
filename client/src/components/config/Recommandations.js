import React from 'react';
import Aside from '../Aside';

export class Recommandations extends React.Component {
  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="recommandations">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-7 columns">
                  <h1>Parrainages</h1>
                </div>
              </div>
            </section>

            <section className="section-2 container shadows">
              <h2 className="headline text-center cornflower-blue">Recommandez Wemind à un ami, et gagnez 1 mois gratuit</h2>
              <p className="text-center">Pour chaque référent qui s’abonne à Wefree, vous recevez tous les deux <strong className="cornflower-blue">1 mois gratuit.</strong></p>
              <form>
                <input type="email" placeholder="À"/>
                <input type="email" placeholder="contact@julienlucas.com"/>
                <input type="submit" value="Envoyer"/>
              </form>
              <p className="anti-spam">Anti-spam: votre email et celui de votre ami ne seront jamais divulgués à un tiers</p>
              <br/>
              <br/>
              <p className="text-center">Votre lien à partager par email, médias sociaux, pigeons voyageurs ...</p>
              <form>
                <input type="text" className="lien-recommandation" value="http://fbuy.me/mrvb"/>
                <button className="btn-copy">Copier</button>
              </form>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default Recommandations;
