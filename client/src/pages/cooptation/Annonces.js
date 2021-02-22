import { HTTP, URLS } from "../../network/http";

import React, { Component, Suspense } from "react";
const BoxAnnonce = React.lazy(() => import("../../components/BoxAnnonce"));

export default class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      annonces: [],
    };
  }

  componentDidMount() {
    this.getJobs();
  }

  getJobs = () => {
    HTTP.get(URLS.JOBS.LIST_ALL)
      .then((response) => {
        let jobs = response.data.rows;
        this.setState({
          annonces: jobs
        });
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
  };

  dataToChange = (data, e) => {
    console.log("dataToChange");
    console.log(data);
    console.log(e);
    HTTP.patch(URLS.JOBS.BY_ID.replace(":id" , data.id) , {
      is_active : !data.is_active
    })
    .then(response => {
      console.log("STATUS CHANGE RESPONE");
      console.log(response);
      this.getJobs();
    })
    .catch(err =>{
      console.log("STATUS CHANGE ERROR");
      console.log(err);
    })
  };

  render() {
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
            {this.state.annonces.length > 0
              ? this.state.annonces
                  .map((job) => {
                    return (
                      <BoxAnnonce
                        key={job.id}
                        tab={job}
                        data={job}
                        dataToChange={(e) => this.dataToChange(e)}
                      />
                    );
                  })
              : this.state.annonces.length === 0
              ? setTimeout(() => {
                  return (
                    <div className="container empty">
                      <img
                        type="image/svg+xml"
                        className="icon"
                        src="/icons/annonces.svg"
                        alt=""
                      />
                      <p className="text-center">Aucune annonce disponible</p>
                      <p className="text-center">
                        Il semblerait qu’il n’y ait pas d’annonce à afficher
                        ici.
                      </p>
                    </div>
                  );
                }, 500)
              : ""}
          </Suspense>
        </div>
      </div>
    );
  }
}
