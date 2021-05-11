import { HTTP, URLS } from "../network/http";

import React, { useState, useEffect } from "react";
import Header from "../components/Header";

function Dashboard(props) {
  const [communication, setCommunication] = useState([]);
  const [cooptation, setCooptation] = useState([]);
  const [formations, setFormations] = useState([]);
  const [demandes, setDemandes] = useState([]);
  const [ambassadeurs, setAmbassadeurs] = useState([]);

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  async function getDashboardData() {
    HTTP.get(`${URLS.DASHBOARD}`)
      .then((response) => {
        console.log("DASHBOARD RESPONE");
        let dashData = response.data;
        if (dashData.article) {
          setCommunication({
            actifs: dashData.article.count.active || 0,
            total: dashData.article.count.total || 0,
            totalViews: dashData.article.views_counts || 0,
          });
        } else {
          setCommunication({
            actifs: 0,
            total: 0,
            totalViews: 0,
          });
        }

        if (dashData.quiz) {
          setFormations({
            formationsDispo: dashData.quiz.total || 0,
            tauxBonneReponse: dashData.quiz.average_score || 0,
          });
        } else {
          setFormations({
            formationsDispo: 0,
            tauxBonneReponse: 0,
          });
        }

        if (dashData.jobs) {
          localStorage.setItem(
            "active_jobs_count",
            dashData.jobs.count.active || 0
          );
          setCooptation({
            annoncesActives: dashData.jobs.count.active || 0,
            totalAnnonces: dashData.jobs.count.total || 0,
            totalViewsAnnonces: dashData.jobs.views_counts || 0,
            totalCandidats: dashData.jobs.candidates.total || 0, //Profils identifiés
            totalCandidatsCooptes: dashData.jobs.candidates.under_review || 0, //Candidats cooptés
          });
        } else {
          localStorage.setItem(
            "active_jobs_count",
            dashData.jobs.count.active || 0
          );
          setCooptation({
            annoncesActives: 0,
            totalAnnonces: 0,
            totalViewsAnnonces: 0,
            totalCandidats: 0,
            totalCandidatsCooptes: 0,
          });
        }

        if (dashData.users) {
          setAmbassadeurs({
            total: dashData.users.count.total || 0,
            actifs: dashData.users.count.active || 0,
            points: dashData.users.total_points_earned || 0,
          });
        } else {
          setAmbassadeurs({
            total: 0,
            actifs: 0,
            points: 0,
          });
        }

        if (dashData.reward) {
          localStorage.setItem(
            "redeem_requests_counts",
            dashData.reward.redeem_requests_counts.redeem_requests_counts || 0
          );
          setDemandes(dashData.reward.redeem_requests_counts.requested || 0);
        } else {
          setDemandes(0);
        }
      })
      .catch((err) => {
        console.log("DASHBOARD ERROR");
        console.log(err);
        setCommunication({
          actifs: 0,
          total: 0,
          totalViews: 0,
        });
        setFormations({
          formationsDispo: 0,
          tauxBonneReponse: 0,
        });
        setCooptation({
          annoncesActives: 0,
          totalAnnonces: 0,
          totalViewsAnnonces: 0,
          totalCandidats: 0,
          totalCandidatsCooptes: 0,
        });
        setAmbassadeurs({
          total: 0,
          actifs: 0,
          points: 0,
        });
        setDemandes(0);
      });
  }

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header />
      <main className="dashboard">
        <div className="container">
          <div className="row-fluid">
            <h3>Tableau de bord</h3>
            <div className="columns">
              <div className="box-note">
                <p>
                  Pilotez l’activité de 
                  <br /> votre{" "}
                  <span>
                    communauté
                    <br />
                      d’ambassadeurs
                  </span>
                </p>
              </div>
            </div>
            <div className="columns">
              <div className="box-item">
                <h4>Engagement des ambassadeurs</h4>
                <div className="icon iceberg">
                  <img src="/icons/ambassadeurs.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Ambassadeurs actifs</p>
                  <p>
                    <span>{ambassadeurs.actifs}</span> /
                    <span>{ambassadeurs.total}</span>
                  </p>
                </div>
                <hr />
                <div className="icon iceberg">
                  <img src="/icons/points.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Points gagnés par les ambassadeurs</p>
                  <p>
                    <span>{ambassadeurs.points}</span>
                  </p>
                </div>
                <hr />
                <div className="icon iceberg">
                  <img src="/icons/recompenses.svg" alt="" />
                </div>
                <div className="box-text demandes-recompenses">
                  <p>Demandes de récompenses</p>
                  <p>
                    <span>{demandes}</span>
                  </p>
                </div>
                <button
                  onClick={(e) =>
                    props.history.push({
                      pathname: "/recompenses",
                      checkedTab: 1,
                    })
                  }
                  className="btn-primary"
                  tabIndex={6}
                >
                  Voir
                </button>
              </div>
            </div>
            <div className="columns">
              <div className="box-item cooptation">
                <h4>Cooptation</h4>
                <button
                  onClick={(e) =>
                    props.history.push({ pathname: "/cooptation" })
                  }
                  className="btn-primary"
                  tabIndex={7}
                >
                  Voir
                </button>
                <div className="box-views">
                  <div>
                    <p>{cooptation.totalViewsAnnonces}</p>
                    <p>visiteurs sur les annonces</p>
                  </div>
                </div>
                <div className="icon half-spanish-white">
                  <img src="/icons/annonces-actives.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Annonces actives</p>
                  <p>
                    <span>{cooptation.annoncesActives}</span> /
                    <span>{cooptation.totalAnnonces}</span>
                  </p>
                </div>
                <hr />
                <div className="icon half-spanish-white">
                  <img src="/icons/nouveaux-candidats.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Candidats cooptés</p>
                  <p>
                    <span>{cooptation.totalCandidatsCooptes}</span>
                  </p>
                </div>
                <hr />
                <div className="icon half-spanish-white">
                  <img src="/icons/profils-identifies.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Profils identifiés</p>
                  <p>
                    <span>{cooptation.totalCandidats}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="box-item communication">
                <h4>Communication</h4>
                <button
                  onClick={(e) =>
                    props.history.push({ pathname: "/communication" })
                  }
                  className="btn-primary"
                  tabIndex={8}
                >
                  Voir
                </button>
                <div className="box-views">
                  <div>
                    <p>{communication.totalViews}</p>
                    <p>visiteurs sur les contenus</p>
                  </div>
                </div>
                <div className="icon link-water">
                  <img src="/icons/contenus-actifs.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Contenus actifs</p>
                  <p>
                    <span>{communication.actifs}</span> /
                    <span>{communication.total}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="columns">
              <div className="box-item communication">
                <h4>Micro-formation</h4>
                <div className="icon iron">
                  <img src="/icons/micro-formation.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Micro-formations disponibles</p>
                  <p>
                    <span>{formations.formationsDispo}</span>
                  </p>
                </div>
                <hr />
                <div className="icon iron">
                  <img src="/icons/score.svg" alt="" />
                </div>
                <div className="box-text">
                  <p>Taux moyen de bonne réponse</p>
                  <p>
                    <span>{formations.tauxBonneReponse}%</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="columns"></div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
