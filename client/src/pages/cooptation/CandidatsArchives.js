import { HTTP, URLS } from "../../network/http";

import React, { Component, Suspense } from "react";
const CardCandidat = React.lazy(() => import("../../components/CardCandidat"));
export default class Annonces extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidats: [],
    };
  }

  componentDidMount() {
    this.getArchivedReferrals();
  }

  getArchivedReferrals = () => {
    HTTP.get(`${URLS.JOBS.REFERRALS_LIST_ALL}?archive=${true}`)
      .then((response) => {
        this.setState({
          candidats: response.data,
        });
      })
      .catch((err) => {
        console.log("CANDIDATES ERROR");
        console.log(err);
      });
  };

  render() {
    return (
      <div className="wrapper">
        {this.state.candidats.length > 0 ? (
          <div className="wrapper">
            <div className="tab-candidats-archives container">
              <div className="row-fluid">
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
                  {this.state.candidats.map((item) =>
                    item.archive === true ? (
                      <div key={item.id} className="columns">
                        <CardCandidat data={item} />
                      </div>
                    ) : (
                      ""
                    )
                  )}
                </Suspense>
              </div>
            </div>
          </div>
        ) : (
          <div className="wrapper">
            <div className="tab-annonces container">
              <div className="container empty">
                <img
                  type="image/svg+xml"
                  className="icon"
                  src="/icons/archives.svg"
                  alt=""
                />
                <p className="text-center">Aucun candidat archivé</p>
                <p className="text-center">
                  Vous n’avez pas encore archivé de candidat.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
