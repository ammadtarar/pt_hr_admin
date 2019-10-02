import React from 'react';
import Aside from '../Aside';
import database from '../../firebase/firebase';
import Switch from "react-switch";

export class ProfileEntreprise extends React.Component {
  constructor() {
    super();
    this.state = { checked: false };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  componentDidMount() {
    database.ref('abonnement/configuration').on('value', (snapshot) => {
      const val = snapshot.val();

      this.setState({
        entreprise: val.entreprise.nom,
        rue: val.entreprise.rue,
        complementAdresse: val.entreprise.complementAdresse,
        ville: val.entreprise.ville,
        cp: val.entreprise.cp,
        pays: val.entreprise.pays,
        telephone: val.entreprise.telephone,
        siteweb: val.entreprise.siteweb,
        tarifHoraire: val.entreprise.tarifHoraire,
        siret: val.entreprise.siret,
        rcs: val.entreprise.rcs
      });
    });
  }

  render() {
    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="profile-entreprise">
            <section className="container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Profile Entreprise</h1>
                </div>
              </div>
            </section>

            <section className="container shadows">
              <form>
                <div className="row-fluid">
                  <div className="small-12 large-2 columns">
                    <label>Nom de l'entreprise</label>
                  </div>
                  <div className="small-12 large-10 columns">
                    <input type="text" className="full-width" value={this.state.entreprise} placeholder="Votre entreprise"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label className="adresse">Adresse</label>
                  </div>
                  <div className="large-10 columns">
                    <input type="text" className="full-width" value={this.state.rue} placeholder="Rue"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <input type="text" className="half-width" value={this.state.cp} placeholder="Code postale"/>
                    <input type="text" className="half-width" value={this.state.ville} placeholder="Ville"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns"></div>
                  <div className="large-10 columns">
                    <input type="text" className="half-width" value={this.state.pays} placeholder="Pays"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Téléphone</label>
                  </div>
                  <div className="large-4 columns">
                    <input type="text" className="full-width" value={this.state.telephone} placeholder="Votre numéro"/>
                  </div>
                  <div className="large-2 columns">
                    <label>Site web</label>
                  </div>
                  <div className="large-4 columns">
                    <input type="text" className="full-width" value={this.state.siteweb} placeholder="Votre site web"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Fuseau horaire</label>
                  </div>
                  <div className="large-4 columns">
                    <select id="custom-select" class="filters" name="forma" onchange="location = this.value;">
                      <option class="checked" value="Lisbon">+00:00 Lisbon</option>
                      <option value="London">+00:00 Londres</option>
                      <option value="Monrovia">+00:00 Monrovia</option>
                      <option value="UTC">+00:00 UTC</option>
                      <option value="Amsterdam">+01:00 Amsterdam</option>
                      <option value="Belgrade">+01:00 Belgrade</option>
                      <option value="Berlin">+01:00 Berlin</option>
                      <option value="Bern">+01:00 Bern</option>
                      <option value="Bratislava">+01:00 Bratislava</option>
                      <option value="Brussels">+01:00 Brussels</option>
                      <option value="Budapest">+01:00 Budapest</option>
                      <option value="Casablanca">+01:00 Casablanca</option>
                      <option value="Copenhagen">+01:00 Copenhagen</option>
                      <option value="Dublin">+01:00 Dublin</option>
                      <option value="Ljubljana">+01:00 Ljubljana</option>
                      <option value="Madrid">+01:00 Madrid</option>
                      <option value="Paris">+01:00 Paris</option>
                      <option value="Prague">+01:00 Prague</option>
                      <option value="Rome">+01:00 Rome</option>
                      <option value="Sarajevo">+01:00 Sarajevo</option>
                      <option value="Skopje">+01:00 Skopje</option>
                      <option value="Stockholm">+01:00 Stockholm</option>
                      <option value="Vienna">+01:00 Vienna</option>
                      <option value="Warsaw">+01:00 Warsaw</option>
                      <option value="West Central Africa">+01:00 West Central Africa</option>
                      <option value="Zagreb">+01:00 Zagreb</option>
                      <option value="Zurich">+01:00 Zurich</option>
                      <option value="Athens">+02:00 Athens</option>
                      <option value="Bucharest">+02:00 Bucharest</option>
                      <option value="Cairo">+02:00 Cairo</option>
                      <option value="Harare">+02:00 Harare</option>
                      <option value="Helsinki">+02:00 Helsinki</option>
                      <option value="Jerusalem">+02:00 Jerusalem</option>
                      <option value="Kaliningrad">+02:00 Kaliningrad</option>
                      <option value="Kyiv">+02:00 Kyiv</option>
                      <option value="Pretoria">+02:00 Pretoria</option>
                      <option value="Riga">+02:00 Riga</option>
                      <option value="Sofia">+02:00 Sofia</option>
                      <option value="Tallinn">+02:00 Tallinn</option>
                      <option value="Vilnius">+02:00 Vilnius</option>
                      <option value="Baghdad">+03:00 Baghdad</option>
                      <option value="Istanbul">+03:00 Istanbul</option>
                      <option value="Kuwait">+03:00 Kuwait</option>
                      <option value="Minsk">+03:00 Minsk</option>
                      <option value="Moscow">+03:00 Moscow</option>
                      <option value="Nairobi">+03:00 Nairobi</option>
                      <option value="Riyadh">+03:00 Riyadh</option>
                      <option value="St. Petersburg">+03:00 St. Petersburg</option>
                      <option value="Tehran">+03:30 Tehran</option>
                      <option value="Abu Dhabi">+04:00 Abu Dhabi</option>
                      <option value="Baku">+04:00 Baku</option>
                      <option value="Muscat">+04:00 Muscat</option>
                      <option value="Samara">+04:00 Samara</option>
                      <option value="Tbilisi">+04:00 Tbilisi</option>
                      <option value="Volgograd">+04:00 Volgograd</option>
                      <option value="Yerevan">+04:00 Yerevan</option>
                      <option value="Kabul">+04:30 Kabul</option>
                      <option value="Ekaterinburg">+05:00 Ekaterinburg</option>
                      <option value="Islamabad">+05:00 Islamabad</option>
                      <option value="Karachi">+05:00 Karachi</option>
                      <option value="Tashkent">+05:00 Tashkent</option>
                      <option value="Chennai">+05:30 Chennai</option>
                      <option value="Kolkata">+05:30 Kolkata</option>
                      <option value="Mumbai">+05:30 Mumbai</option>
                      <option value="New Delhi">+05:30 New Delhi</option>
                      <option value="Sri Jayawardenepura">+05:30 Sri Jayawardenepura</option>
                      <option value="Kathmandu">+05:45 Kathmandu</option>
                      <option value="Almaty">+06:00 Almaty</option>
                      <option value="Astana">+06:00 Astana</option>
                      <option value="Dhaka">+06:00 Dhaka</option>
                      <option value="Urumqi">+06:00 Urumqi</option>
                      <option value="Rangoon">+06:30 Rangoon</option>
                      <option value="Bangkok">+07:00 Bangkok</option>
                      <option value="Hanoi">+07:00 Hanoi</option>
                      <option value="Jakarta">+07:00 Jakarta</option>
                      <option value="Krasnoyarsk">+07:00 Krasnoyarsk</option>
                      <option value="Novosibirsk">+07:00 Novosibirsk</option>
                      <option value="Beijing">+08:00 Beijing</option>
                      <option value="Chongqing">+08:00 Chongqing</option>
                      <option value="Hong Kong">+08:00 Hong Kong</option>
                      <option value="Irkutsk">+08:00 Irkutsk</option>
                      <option value="Kuala Lumpur">+08:00 Kuala Lumpur</option>
                      <option value="Perth">+08:00 Perth</option>
                      <option value="Singapore">+08:00 Singapore</option>
                      <option value="Taipei">+08:00 Taipei</option>
                      <option value="Ulaanbaatar">+08:00 Ulaanbaatar</option>
                      <option value="Osaka">+09:00 Osaka</option>
                      <option value="Sapporo">+09:00 Sapporo</option>
                      <option value="Seoul">+09:00 Seoul</option>
                      <option value="Tokyo">+09:00 Tokyo</option>
                      <option value="Yakutsk">+09:00 Yakutsk</option>
                      <option value="Adelaide">+09:30 Adelaide</option>
                      <option value="Darwin">+09:30 Darwin</option>
                      <option value="Brisbane">+10:00 Brisbane</option>
                      <option value="Canberra">+10:00 Canberra</option>
                      <option value="Guam">+10:00 Guam</option>
                      <option value="Hobart">+10:00 Hobart</option>
                      <option value="Melbourne">+10:00 Melbourne</option>
                      <option value="Port Moresby">+10:00 Port Moresby</option>
                      <option value="Sydney">+10:00 Sydney</option>
                      <option value="Vladivostok">+10:00 Vladivostok</option>
                      <option value="Magadan">+11:00 Magadan</option>
                      <option value="New Caledonia">+11:00 New Caledonia</option>
                      <option value="Solomon Is.">+11:00 Solomon Is.</option>
                      <option value="Srednekolymsk">+11:00 Srednekolymsk</option>
                      <option value="Auckland">+12:00 Auckland</option>
                      <option value="Fiji">+12:00 Fiji</option>
                      <option value="Kamchatka">+12:00 Kamchatka</option>
                      <option value="Marshall Is.">+12:00 Marshall Is.</option>
                      <option value="Wellington">+12:00 Wellington</option>
                      <option value="Chatham Is.">+12:45 Chatham Is.</option>
                      <option value="Nuku&#39;alofa">+13:00 Nuku&#39;alofa</option>
                      <option value="Samoa">+13:00 Samoa</option>
                      <option value="Tokelau Is.">+13:00 Tokelau Is.</option>
                      <option value="Azores">-01:00 Azores</option>
                      <option value="Cape Verde Is.">-01:00 Cape Verde Is.</option>
                      <option value="Mid-Atlantic">-02:00 Mid-Atlantic</option>
                      <option value="Brasilia">-03:00 Brasilia</option>
                      <option value="Buenos Aires">-03:00 Buenos Aires</option>
                      <option value="Greenland">-03:00 Greenland</option>
                      <option value="Montevideo">-03:00 Montevideo</option>
                      <option value="Newfoundland">-03:30 Newfoundland</option>
                      <option value="Atlantic Time (Canada)">-04:00 Atlantic Time (Canada)</option>
                      <option value="Caracas">-04:00 Caracas</option>
                      <option value="Georgetown">-04:00 Georgetown</option>
                      <option value="La Paz">-04:00 La Paz</option>
                      <option value="Puerto Rico">-04:00 Puerto Rico</option>
                      <option value="Santiago">-04:00 Santiago</option>
                      <option value="Bogota">-05:00 Bogota</option>
                      <option value="Eastern Time (US &amp; Canada)">-05:00 Eastern Time (US &amp; Canada)</option>
                      <option value="Indiana (East)">-05:00 Indiana (East)</option>
                      <option value="Lima">-05:00 Lima</option>
                      <option value="Quito">-05:00 Quito</option>
                      <option value="Central America">-06:00 Central America</option>
                      <option value="Central Time (US &amp; Canada)">-06:00 Central Time (US &amp; Canada)</option>
                      <option value="Guadalajara">-06:00 Guadalajara</option>
                      <option value="Mexico City">-06:00 Mexico City</option>
                      <option value="Monterrey">-06:00 Monterrey</option>
                      <option value="Saskatchewan">-06:00 Saskatchewan</option>
                      <option value="Arizona">-07:00 Arizona</option>
                      <option value="Chihuahua">-07:00 Chihuahua</option>
                      <option value="Mazatlan">-07:00 Mazatlan</option>
                      <option value="Mountain Time (US &amp; Canada)">-07:00 Mountain Time (US &amp; Canada)</option>
                      <option value="Pacific Time (US &amp; Canada)">-08:00 Pacific Time (US &amp; Canada)</option>
                      <option value="Tijuana">-08:00 Tijuana</option>
                      <option value="Alaska">-09:00 Alaska</option>
                      <option value="Hawaii">-10:00 Hawaii</option>
                      <option value="American Samoa">-11:00 American Samoa</option>
                      <option value="Midway Island">-11:00 Midway Island</option>
                      <option value="International Date Line West">-12:00 International Date Line West</option>
                    </select>
                  </div>
                  <div className="large-2 columns">
                    <label>Tarif horaire</label>
                  </div>
                  <div className="large-4 columns">
                    <input type="text" className="full-width" value={this.state.tarifHoraire + '€/heure'} placeholder="0.00€/heure"/>
                  </div>
                </div>

                <div className="row-fluid">
                  <div className="large-12 columns">
                    <p>Adresse personnalisée : <a href="http://localhost:8080/profile-entreprise" title="">http://localhost:8080/profile-entreprise</a></p>
                  </div>
                </div>
              </form>
            </section>

            <section className="container transparent">
              <h2>Identification pour paiement des cotisations</h2>
            </section>

            <section className="container shadows">
              <form>
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Numéro de siret</label>
                  </div>
                  <div className="large-4 columns">
                    <input type="text" className="full-width" value={this.state.siret} placeholder="Votre numéro de siret"/>
                  </div>
                  <div className="large-3 columns">
                    <label>Numéro de RCS</label>
                  </div>
                  <div className="large-3 columns">
                    <input type="text" className="full-width" value={this.state.rcs} placeholder="Votre numéro de RCS"/>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Status d'entreprise</label>
                  </div>
                  <div className="large-10 columns">
                    <select id="custom-select" class="filters" name="forma" onchange="location = this.value;">
                      <option class="checked" value="Tout voir">Auto-entrepreneur</option>
                      <option value="EIRL – Entreprise Individuelle à Responsabilité Limitée">EIRL – Entreprise Individuelle à Responsabilité Limitée</option>
                      <option value="EURL – Entreprise Unipersonnelle à Responsabilité Limitée">EURL – Entreprise Unipersonnelle à Responsabilité Limitée</option>
                      <option value="SASU – Société par Actions Simplifiée Unipersonnelle">SASU – Société par Actions Simplifiée Unipersonnelle</option>
                    </select>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Cotisations</label>
                  </div>
                  <div className=" large-10 columns">
                    <p>22.6%</p>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Passage à la TVA</label>
                  </div>
                  <div className="large-10 columns">
                    <button className="align-left">Je passe à la TVA !</button>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="large-2 columns">
                    <label>Déclaration CA</label>
                  </div>
                  <div className="large-10 columns">
                    <ul className="switcher align-left">
                      <li className="selected">Trimestrielle</li>
                      <li>Mensuelle</li>
                    </ul>
                  </div>
                </div>
              </form>
            </section>

            <section className="container transparent">
              <h2>Type d'entreprise</h2>
            </section>

            <section className="container shadows">
              <form>
                <div className="row-fluid">
                  <div className="large-3 columns">
                    <label>Professions libérales</label>
                  </div>
                  <div className="large-9 columns">
                    <label htmlFor="material-switch">
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        onColor="#7a5cec"
                        onHandleColor="#7a5cec"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                      />
                    </label>
                  </div>
                </div>
                <div className="row-fluid">
                  <div className="large-3 columns">
                    <label>Prestations de services</label>
                  </div>
                  <div className="large-9 columns">
                    <label htmlFor="material-switch">
                      <Switch
                        checked={this.state.checked}
                        onChange={this.handleChange}
                        onColor="#7a5cec"
                        onHandleColor="#7a5cec"
                        handleDiameter={25}
                        uncheckedIcon={false}
                        checkedIcon={false}
                        boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
                        height={20}
                        width={48}
                        className="react-switch"
                        id="material-switch"
                      />
                    </label>
                  </div>
                </div>
              </form>
            </section>
          </main>
        </div>
      </div>
    );
  }
}

export default ProfileEntreprise;
