import { HTTP, URLS } from "../../network/http";
import React, { useState, useEffect, Suspense } from "react";
const BoxAnnonce = React.lazy(() => import("../../components/BoxAnnonce"));

const Annonces = (props) => {
  const [annonces, setAnnonces] = useState([]);

  useEffect(() => {
    getJobs();
  }, []);

  async function getJobs() {
    HTTP.get(`${URLS.JOBS.LIST_ALL}?page=1&limit=9999999`)
      .then((response) => {
        let jobs = response.data.rows;
        setAnnonces(jobs);

        var count = 0;
        jobs.forEach((element) => {
          if (element.is_active) {
            count++;
          }
        });
        localStorage.setItem("active_jobs_count", count);
        props.syncActiveJobsCount();
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  }

  function dataToChange(data, e) {
    HTTP.patch(URLS.JOBS.BY_ID.replace(":id", data.id), {
      is_active: !data.is_active,
    })
      .then((response) => {
        console.log("changed");
        getJobs();
      })
      .catch((err) => {
        console.log("STATUS CHANGE ERROR");
        console.log(err);
      });
  }

  return (
    <div className="wrapper">
      <div className="tab-annonces container">
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
          {annonces.length > 0 ? (
            annonces.map((job) => {
              return (
                <BoxAnnonce
                  key={job.id}
                  tab={job}
                  data={job}
                  dataToChange={(e) => dataToChange(e)}
                />
              );
            })
          ) : (
            <div className="container empty">
              <img
                type="image/svg+xml"
                className="icon"
                src="/icons/annonces.svg"
                alt=""
              />
              <p className="text-center">Aucune annonce disponible</p>
              <p className="text-center">
                Il semblerait qu’il n’y ait pas d’annonce à afficher ici.
              </p>
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
};

export default Annonces;
