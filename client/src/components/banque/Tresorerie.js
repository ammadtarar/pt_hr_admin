import React from 'react'
import { Link } from 'react-router-dom'
import Aside from '../Aside'

export class Tresorerie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      historique: []
    }
  }

  callTransactions() {
    fetch('http://localhost:8081/tresorerie')
      .then(res => res.json())
      .then(res => {
        const historique = [];

        for (let item in res.data.resources) {
          const num = res.data.resources[item].amount;

          //Formatage data
          const date = new Date(res.data.resources[item].date);
          date.setDate(date.getDate());
          const mois = [
            "jan", "fév", "mars",
            "avr", "mai", "juin", "juil",
            "août", "sept", "oct",
            "nov", "déc"
          ];
          const dateReformat = date.getDate() + ' ' + mois[date.getMonth()] + ' ' + date.getFullYear();

          historique.push({
            montant: res.data.resources[item].amount,
            date: dateReformat,
            description: res.data.resources[item].description,
            nature: res.data.resources[item].resource_type,
            categorie: res.data.resources[item].category.id
          });
        }
        this.setState({
          historique: historique
        });
      })
      .catch(err => err);
  }

  callCompteCB() {
    fetch('http://localhost:8081/carte-bancaire')
      .then(res => res.json())
      .then(res => {
        this.setState({
          debit: res.data.balance
        });
      })
      .catch(err => err);
  }

  callCompteInfos() {
    fetch('http://localhost:8081/compte-infos')
      .then(res => res.json())
      .then(res => {
        this.setState({
          solde: res.data.balance,
          compte: res.data.name
        });
      })
      .catch(err => err);
  }

  deSynchBankin() {
    this.props.compteBankinID('')
  }

  componentWillMount() {
    this.callTransactions();
    this.callCompteInfos();
    this.callCompteCB();
  }

  render() {
    return (
      <div>
      <section className="section-1 container transparent">
        <div className="row-fluid">
          <div className="large-5 columns">
            <h1>Banque</h1>
          </div>
        </div>
      </section>

      <section className="section-2 container shadows">
        <div className="row-fluid">
          <div className="large-6 columns box-synthese">
            <h3 className="text-left">{this.state.compte}</h3>
            <p className="lynch text-left">Compte</p>
          </div>
          <div className="large-3 columns box-synthese">
            <h3 className="cornflower-blue">{this.state.solde}€</h3>
            <p className="lynch text-left">Solde</p>
          </div>
          <div className="large-3 columns box-synthese">
            <h3 className="text-right">{this.state.debit}€</h3>
            <p className="lynch text-right">Débit carte bancaire à venir</p>
          </div>
          <div className="large-12 columns">
            <button onClick={() => this.deSynchBankin()} className="align-center btn-fifth">Désynchroniser mon compte</button>
          </div>
        </div>
      </section>

      <section className="section-3 container transparent table" id="tableau-tresorerie-recettes">
        <div className="row-fluid">
          <div className="large-5 columns">
            <h2>Historique</h2>
          </div>
        </div>
        <div className="row_table header">
          <div className="cell">Date</div>
          <div className="cell">Montant TTC</div>
          <div className="cell">Description</div>
          <div className="cell">Catégorie</div>
        </div>

        {this.state.historique.map((item) => {
          return (
            <div className="row_table shadows" key={item.date + item.montant}>
              <div className="cell">{item.date}</div>
              <div className={`cell ${Math.sign(item.montant) === 1 ? 'recette' : 'depense'}`}>{item.montant}€</div>
              <div className="cell">{item.description}</div>
              <div className="cell">
                {item.categorie === 168 ? 'Food & Dining' : ''}
                  {item.categorie === 313 ? 'Coffee shop' : ''}
                  {item.categorie === 273 ? 'Supermarkets / Groceries' : ''}
                  {item.categorie === 260 ? 'Fast foods' : ''}
                  {item.categorie === 188 ? 'Fast - Others' : ''}
                  {item.categorie === 83 ? 'Restaurants' : ''}
                {item.categorie === 315 ? 'Personal care' : ''}
                  {item.categorie === 321 ? 'Beauty care' : ''}
                  {item.categorie === 317 ? 'Personnal care - others' : ''}
                  {item.categorie === 316 ? 'Spa & Massage' : ''}
                  {item.categorie === 248 ? 'Cosmetics' : ''}
                  {item.categorie === 235 ? 'hairdresser' : ''}
                {item.categorie === 170 ? 'Entertainement' : ''}
                  {item.categorie === 320 ? 'Eating out' : ''}
                  {item.categorie === 310 ? 'Winter sports' : ''}
                  {item.categorie === 269 ? 'Amusements' : ''}
                  {item.categorie === 263 ? 'Hotels' : ''}
                  {item.categorie === 249 ? 'Travel / Vacation' : ''}
                  {item.categorie === 244 ? 'Arts & Amusement' : ''}
                  {item.categorie === 242 ? 'Sports' : ''}
                  {item.categorie === 227 ? 'Bars & Clubs' : ''}
                  {item.categorie === 226 ? 'Hobies' : ''}
                  {item.categorie === 224 ? 'Pets' : ''}
                  {item.categorie === 223 ? 'Entertainement - Others' : ''}
                {item.categorie === 165 ? 'Auto & transport' : ''}
                  {item.categorie === 309 ? 'Tolls' : ''}
                  {item.categorie === 288 ? 'Car maintenance' : ''}
                  {item.categorie === 264 ? 'Car rental' : ''}
                  {item.categorie === 251 ? 'Parking' : ''}
                  {item.categorie === 247 ? 'Auto insurance' : ''}
                  {item.categorie === 198 ? 'Plane ticket' : ''}
                  {item.categorie === 197 ? 'Train ticket' : ''}
                  {item.categorie === 196 ? 'Public transportation' : ''}
                  {item.categorie === 87 ? 'Gas & fuel' : ''}
                  {item.categorie === 84 ? 'Auto & Transport - Others' : ''}
                {item.categorie === 303 ? 'Withdrawals, checks & transfer' : ''}
                  {item.categorie === 326 ? 'Internal transfer' : ''}
                  {item.categorie === 88 ? 'Checks' : ''}
                  {item.categorie === 85 ? 'Withdrawals' : ''}
                  {item.categorie === 78 ? 'Transfer' : ''}
                {item.categorie === 2 ? 'Incomes' : ''}
                  {item.categorie === 441894 ? 'Loans' : ''}
                  {item.categorie === 441893 ? 'Grants' : ''}
                  {item.categorie === 327 ? 'Pension' : ''}
                  {item.categorie === 289 ? 'Savings' : ''}
                  {item.categorie === 283 ? 'Business refunds' : ''}
                  {item.categorie === 282 ? 'Virement' : ''}
                  {item.categorie === 271 ? 'Deposit' : ''}
                  {item.categorie === 233 ? 'Extra incomes' : ''}
                  {item.categorie === 232 ? 'Services' : ''}
                  {item.categorie === 231 ? 'Sales' : ''}
                  {item.categorie === 230 ? 'Salaries' : ''}
                  {item.categorie === 80 ? 'Interest incomes' : ''}
                  {item.categorie === 3 ? 'Other incomes' : ''}
                {item.categorie === 159 ? 'Taxes' : ''}
                  {item.categorie === 441988 ? 'VAT' : ''}
                  {item.categorie === 302 ? 'Taxes' : ''}
                  {item.categorie === 209 ? 'Property taxes' : ''}
                  {item.categorie === 208 ? 'Incomes taxes' : ''}
                  {item.categorie === 207 ? 'Fine' : ''}
                  {item.categorie === 206 ? 'Taxes - others' : ''}
                {item.categorie === 167 ? 'Education & Children' : ''}
                  {item.categorie === 267 ? 'Baby-sitter & Daycare' : ''}
                  {item.categorie === 266 ? 'Toys' : ''}
                  {item.categorie === 259 ? 'Student loan' : ''}
                  {item.categorie === 241 ? 'Student housing' : ''}
                  {item.categorie === 240 ? 'Pension' : ''}
                  {item.categorie === 239 ? 'Tuition' : ''}
                  {item.categorie === 238 ? 'School supplies' : ''}
                  {item.categorie === 237 ? 'Education & Children - Others' : ''}
                {item.categorie === 160 ? 'Misc. expenses' : ''}
                  {item.categorie === 324 ? 'Laundry / Dry cleaning' : ''}
                  {item.categorie === 308 ? 'Tabaco' : ''}
                  {item.categorie === 294 ? 'Charity' : ''}
                  {item.categorie === 278 ? 'Insurance' : ''}
                  {item.categorie === 276 ? 'Others spending' : ''}
                  {item.categorie === 1 ? 'Non catégorisé' : ''}
                {item.categorie === 163 ? 'Health' : ''}
                  {item.categorie === 325 ? 'Dentist' : ''}
                  {item.categorie === 322 ? 'Optician / Eyecare' : ''}
                  {item.categorie === 268 ? 'Health - others' : ''}
                  {item.categorie === 261 ? 'Doctor' : ''}
                  {item.categorie === 245 ? 'Health insruance' : ''}
                  {item.categorie === 236 ? 'Pharmacy' : ''}
                {item.categorie === 161 ? 'Home' : ''}
                  {item.categorie === 328 ? 'Misc. utilities' : ''}
                  {item.categorie === 323 ? 'Lawn & Garden' : ''}
                  {item.categorie === 393 ? 'Water' : ''}
                  {item.categorie === 246 ? 'Home insurance' : ''}
                  {item.categorie === 222 ? 'Maintenance' : ''}
                  {item.categorie === 221 ? 'Office improvement' : ''}
                  {item.categorie === 220 ? 'Office - Others' : ''}
                  {item.categorie === 218 ? 'Gas' : ''}
                  {item.categorie === 217 ? 'Electricity' : ''}
                  {item.categorie === 216 ? 'Office Rent' : ''}
                {item.categorie === 166 ? 'Business services' : ''}
                  {item.categorie === 441900 ? 'Marketing' : ''}
                  {item.categorie === 441899 ? 'Legal Fees' : ''}
                  {item.categorie === 441898 ? 'Training taxes' : ''}
                  {item.categorie === 441897 ? 'Disability Insurance' : ''}
                  {item.categorie === 441896 ? 'Outsourcing' : ''}
                  {item.categorie === 441895 ? 'Consulting' : ''}
                  {item.categorie === 441892 ? 'Hiring fees' : ''}
                  {item.categorie === 441891 ? 'Salary of executives' : ''}
                  {item.categorie === 441890 ? 'Salaries' : ''}
                  {item.categorie === 441889 ? 'Accounting' : ''}
                  {item.categorie === 441886 ? 'Employer contributions' : ''}
                  {item.categorie === 274 ? 'Office supplies' : ''}
                  {item.categorie === 270 ? 'Online services' : ''}
                  {item.categorie === 265 ? 'Business expenses' : ''}
                  {item.categorie === 205 ? 'Printing' : ''}
                  {item.categorie === 204 ? 'Shipping' : ''}
                  {item.categorie === 203 ? 'Office services' : ''}
                  {item.categorie === 202 ? 'Advertising' : ''}
                  {item.categorie === 90 ? 'General expenses - Others' : ''}
                {item.categorie === 164 ? 'Bank' : ''}
                  {item.categorie === 306 ? 'Banking services' : ''}
                  {item.categorie === 195 ? 'Bank - Others' : ''}
                  {item.categorie === 194 ? 'Mortgage' : ''}
                  {item.categorie === 192 ? 'Savings' : ''}
                  {item.categorie === 191 ? 'Monthly Debit' : ''}
                  {item.categorie === 89 ? 'Monthly refund' : ''}
                  {item.categorie === 79 ? 'Banking fees and charges' : ''}
                {item.categorie === 171 ? 'Bills & Utilities' : ''}
                  {item.categorie === 280 ? 'Subscription - Others' : ''}
                  {item.categorie === 277 ? 'Mobile phone' : ''}
                  {item.categorie === 258 ? 'Home phone' : ''}
                  {item.categorie === 219 ? 'Cable TV' : ''}
                  {item.categorie === 180 ? 'Internet' : ''}
                {item.categorie === 162 ? 'Shopping' : ''}
                  {item.categorie === 441888 ? 'Licences' : ''}
                  {item.categorie === 319 ? 'Movies' : ''}
                  {item.categorie === 318 ? 'Music' : ''}
                  {item.categorie === 272 ? 'Clothing & Shoes' : ''}
                  {item.categorie === 262 ? 'Sporting goods' : ''}
                  {item.categorie === 243 ? 'Books' : ''}
                  {item.categorie === 186 ? 'Shopping & Others' : ''}
                  {item.categorie === 184 ? 'Hardware' : ''}
                  {item.categorie === 183 ? 'Gifts' : ''}
              </div>
            </div>
            )
        })}
      </section>
      </div>
    );
  }
}

export default Tresorerie;
