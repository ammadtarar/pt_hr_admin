import { HTTP, URLS } from "../../network/http";
import React, { useState, useEffect, Suspense } from "react";
const BoxRecompense = React.lazy(() =>
  import("../../components/BoxRecompense")
);

function Recompenses(props) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [newRecompense, setNewRecompense] = useState({ titre: "", points: "" });
  const [errors, setErrors] = useState({ titre: "", points: "" });
  const [recompenses, setRecompenses] = useState([]);

  const dataToChange = (data, e) => {
    HTTP.patch(URLS.REWARD.BY_ID.replace(":id", data.id), {
      is_active: !data.is_active,
    })
      .then((response) => {
        getRewards();
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  };

  async function getRewards() {
    HTTP.get(`${URLS.REWARD.LIST_ALL}`)
      .then((response) => {
        setRecompenses(response.data.rows);
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  }

  const handleChangeText = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;

    setNewRecompense({
      ...newRecompense,
      [name]: value,
      points: isNaN(Number(value)) ? newRecompense.points : value,
    });
  };

  const publierRecompense = (e) => {
    e.preventDefault();

    switch (true) {
      case newRecompense.titre === "" && newRecompense.points === "":
        setErrors({ titre: "error", points: "error" });
        break;
      case newRecompense.titre === "" || newRecompense.titre === undefined:
        setErrors({ titre: "error" });
        break;
      case newRecompense.points === "":
        setErrors({ points: "error" });
        break;
      default:
        console.log("newRecompense");
        console.log(newRecompense);
        HTTP.post(URLS.REWARD.CREATE, {
          title: newRecompense.titre,
          points_required: newRecompense.points,
          is_active: true,
        })
          .then((response) => {
            setNewRecompense({});
            setPopupOpen(false);
            getRewards();
          })
          .catch((err) => {
            console.log("JOBS ERROR");
            console.log(err);
          });
    }
  };

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <div className="wrapper">
      {/* Popup */}
      <div
        onClick={(e) => setPopupOpen(false)}
        className={`overlay-popup ${popupOpen === true ? "open" : ""}`}
      />

      <div className={`popup ${popupOpen === true ? "open" : ""}`}>
        <img
          onClick={(e) => setPopupOpen(false)}
          type="image/svg+xml"
          className="close"
          src="/icons/fermer.svg"
          alt=""
        />
        <h3 tabIndex={8}>Créer une récompense</h3>
        <form onSubmit={(e) => publierRecompense(e)}>
          <label>Nom</label>
          <input
            tabIndex={9}
            type="text"
            name="titre"
            className={errors.titre}
            onChange={(e) => handleChangeText(e)}
            value={newRecompense.titre}
            placeholder="Nom de la récompense"
          />
          <label>Nombre de points</label>
          <input
            tabIndex={10}
            type="text"
            name="points"
            className={errors.points}
            onChange={(e) => handleChangeText(e)}
            value={newRecompense.points}
            placeholder="Nombre de points requis"
          />
          <button className="btn-primary" tabIndex={11}>
            Publier
          </button>
          <p className="note">
            Une fois publiée, cette récompense sera visible par tous les
            ambassadeurs.
          </p>
        </form>
      </div>
      {/* End popup */}

      <div className="tab-recompenses container">
        <div className="container">
          <div className="row-fluid">
            <div className="large-11 columns"></div>
            <div className="large-1 columns">
              <button
                tabIndex={8}
                onClick={(e) => setPopupOpen(true)}
                className="btn-primary"
              >
                <span>Créer</span>
              </button>
            </div>
          </div>
        </div>

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
          {recompenses.length > 0 ? (
            recompenses.map((item) => {
              return (
                <BoxRecompense
                  key={item.id}
                  tab={item}
                  data={item}
                  dataToChange={(e) => dataToChange(e)}
                />
              );
            })
          ) : (
            <div className="container empty">
              <img
                type="image/svg+xml"
                className="icon"
                src="/icons/recompense.svg"
                alt=""
              />
              <p className="text-center">Créez votre première récompense !</p>
              <p className="text-center">
                Vous pouvez dès à présent créer votre première récompense en
                cliquant sur le bouton “Créer” en haut à droite.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Recompenses;
