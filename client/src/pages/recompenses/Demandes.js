import { HTTP, URLS } from "../../network/http";
import React, { useState, useEffect, Suspense } from "react";
const BoxDemande = React.lazy(() => import("../../components/BoxDemande"));

function Demandes(props) {
  const [recompenses, setRecompenses] = useState([]);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupData, setPopupData] = useState([]);
  const demandes = recompenses;

  const popup = (data, e) => {
    setPopupOpen(true);
    setPopupData(data);
  };

  async function getRedeemRequests() {
    HTTP.get(`${URLS.REWARD.REDEEM_LIST}`)
      .then((response) => {
        setRecompenses(response.data.rows);
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  }

  useEffect(() => {
    // getData()
    getRedeemRequests();
  }, []);

  const traiterDemande = (e) => {
    HTTP.post(
      `${URLS.REWARD.APPROVE_REDEEM_REQUEST.replace(":id", popupData.id)}`
    )
      .then((response) => {
        setPopupOpen(false);
        getRedeemRequests();
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  };

  return (
    <div className="wrapper">
      {/* Popup */}
      <div
        onClick={(e) => setPopupOpen(false)}
        className={`overlay-popup ${popupOpen === true ? "open" : ""}`}
      />

      <div className={`wrapper-popup ${popupOpen === true ? "open" : ""}`}>
        <div className={`popup center ${popupOpen === true ? "open" : ""}`}>
          <h4 className="text-center">
            Etes-vous sûr de vouloir accepter la demande de récompenses de{" "}
            <span>
              {popupData.employee
                ? popupData.employee.first_name +
                  " " +
                  popupData.employee.last_name
                : ""}
            </span>{" "}
            ?
          </h4>
          <p className="text-center">Cette action est irréversible.</p>
          <button onClick={(e) => traiterDemande(e)} className="btn-primary">
            Confirmer
          </button>
          <button
            onClick={(e) => setPopupOpen(false)}
            className="btn-secondary"
          >
            Annuler
          </button>
        </div>
      </div>
      {/* End popup */}

      <div className="tab-demandes container">
        <Suspense
          fallback={
            <div className="container-suspense">
              <div className="loader" id="loader">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          }
        >
          {demandes.length > 0 ? (
            demandes.map((item) => {
              return (
                <BoxDemande
                  key={item.id}
                  tab={item}
                  data={item}
                  popup={(e) => popup(e)}
                />
              );
            })
          ) : (
            <div className="container empty">
              <img
                type="image/svg+xml"
                className="icon"
                src="/icons/demandes.svg"
                alt=""
              />
              <p className="text-center">Aucune demande en attente</p>
              <p className="text-center">
                Il semblerait qu’il n’y ait pas de demande de récompense en
                attente.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Demandes;
