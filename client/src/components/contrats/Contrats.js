import React from 'react';
import { Link } from 'react-router-dom';
import CheckBox from '../modules/CheckBox';
import Aside from '../Aside';

export class Contrats extends React.Component {
  constructor() {
    super();
    this.state = {
      year: new Date().getFullYear(),
      order: '',
      currentPage: 1,
      todosPerPage: 9,
      contrats: []
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.onSortYear()
    // fetch('/data')
    //   .then(res => res.json())
    //   .then(res => {var contrats = res.contrats; this.callContrats(contrats)})
  }

  callContrats(contrats) {
    this.setState({
      'contrats': contrats
    })
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  preventDragHandler = (e) => {
    e.preventDefault();
  }

  onSortChange(e) {
    e.persist()
    const contrats = this.state.contrats;
    if (contrats) {
      const order = this.state.order
      const sorted = Object.values(contrats).sort(function(a, b) {
          return a[order] > b[order] ? 1 : (a[order] < b[order] ? -1 : 0)
      })
      const sortedDate = Object.values(contrats).sort(function(a, b) {
          return new Date(a.date) > new Date(b.date) ? 1 : (new Date(a.date) < new Date(b.date) ? -1 : 0)
      })
      if(order === 'date') {
        this.setState({
          'contrats': this.state.previousOrder === order ? Object.values(contrats).sort(function(a, b) {
              return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
          }) : sortedDate
        });
      } else {
        this.setState({
          'contrats': this.state.previousOrder === order ? Object.values(contrats).sort(function(a, b) {
              return a[order] < b[order] ? 1 : (a[order] > b[order] ? -1 : 0)
          }) : sorted
        });
      }
      this.state.previousOrder === order ? this.setState({previousOrder: ''}) : this.setState({previousOrder: order})
    }
  }

  onSortYear(e) {
    fetch('/data')
      .then(res => res.json())
      .then(res => {
        var ed = new Date(`${this.state.year}-12-01T00:00:00.000Z`),
            sd = new Date(`${this.state.year}-01-01T00:00:00.000Z`),
            result = Object.values(res.contrats).filter(d => {var date = new Date(d.date);
              return (sd < date && date < ed);
            })
        this.setState({
          'contrats': result
        })
      })
  }

  years() {
    let years = [];
    const date = new Date();
    for (var i = 0; i < 5; i++) {
      const year = date.getFullYear()-i;
      years.push(<li onClick={(e) => this.setState({'year': year}, () => {this.onSortYear(e)})} className={this.state.year === year ? 'current' : ''}>{year}</li>);
    }
    return <ul className="year">{years}</ul>
  }

  render() {
    const contrats = this.state.contrats;
    const { currentPage, todosPerPage } = this.state;
    // Logic for pagination
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(contrats.length / todosPerPage); i++) {
      pageNumbers.push(i);
    }

    return (
      <div>
        <Aside/>
        <div className="wrapper" onDragStart={this.preventDragHandler}>
          <main className="contrats">
            <section className="section-1 container transparent">
              <div className="row-fluid">
                <div className="large-6 columns">
                  <h1>Contrats</h1>
                  {this.years()}
                </div>
                <div className="large-6 columns">
                  <Link to="/contrats/creer"><button className="align-right">Créer un contrat</button></Link>
                </div>
              </div>
            </section>

            <section className="container transparent table" id="tableau-contrats">
              {Object.keys(contrats).slice(indexOfFirstTodo, indexOfLastTodo).length !== 0 ?
              <div className="row_table header">
                <div className="cell order"><CheckBox/></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'description'}, () => {this.onSortChange(e)})} className={this.state.order === 'description' ? 'checked' : ''}>Contrat</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'client'}, () => {this.onSortChange(e)})} className={this.state.order === 'client' ? 'checked' : ''}>Client</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'date'}, () => {this.onSortChange(e)})} className={this.state.order === 'date' ? 'checked' : ''}>Date</span></div>
                <div className="cell order"><span onClick={(e) => this.setState({order: 'status'}, () => {this.onSortChange(e)})} className={this.state.order === 'status' ? 'checked' : ''}>Status</span></div>
              </div> :
              <p className="text-center lynch" style={{marginTop: '30px'}}>Pas de contrats créent cette année</p>}

              {Object.keys(contrats).slice(indexOfFirstTodo, indexOfLastTodo).map((key, item, i) => {

                const date = new Date(contrats[key].date);
                date.setDate(date.getDate() + 0);
                // const mois = [
                //   "jan", "fév", "mars",
                //   "avr", "mai", "juin", "juil",
                //   "août", "sept", "oct",
                //   "nov", "déc"
                // ];
                // const dateReformat = date.getDate() + ' ' + mois[date.getMonth()];
                const dateReformat = ('0' + date.getDate()).slice(-2) + '-' + ('0' + (date.getMonth()+1)).slice(-2)

                return (
                  <Link to={{pathname: "/contrats/edit", numero: key, titre: contrats[key].description}} key={key}>
                    <div className="row_table shadows">
                      <div className="cell"><CheckBox/></div>
                      <div className="cell">{contrats[key].description}</div>
                      <div className="cell">{contrats[key].client}</div>
                      <div className="cell">{dateReformat}</div>
                      <div className="cell"><h5 className={contrats[key].status}>{contrats[key].status}</h5></div>
                    </div>
                  </Link>
                )
              })}

              {pageNumbers.length > 1 ?
              <ul className="pagination">
                {pageNumbers.map(number => {
                  return (
                    <li
                      key={number}
                      id={number}
                      onClick={this.handleClick}
                    >
                      {number}
                    </li>
                  );
                })}
              </ul> : ''}
            </section>

          </main>
        </div>
      </div>
    );
  }
}

export default Contrats;
