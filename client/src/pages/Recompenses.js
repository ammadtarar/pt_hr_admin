import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Recompenses from "./recompenses/Recompenses";
import Demandes from "./recompenses/Demandes";
import { triDemandesRecompenses } from "../functions/CompteDemandes.js";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

function PageRecompenses(props) {
  const [data, setData] = useState([]);
  const [redeemCount, setRedeemCount] = useState([0]);

  const preventDragHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    setRedeemCount(localStorage.getItem("redeem_requests_counts") || 0);
  }, []);

  const syncPendingRequestsCount = () => {
    setRedeemCount(localStorage.getItem("redeem_requests_counts") || 0);
  };

  //Compter nombre de demandes non-traités (les demandes en attente)
  const demandes = triDemandesRecompenses(data);
  const demandesAttente = Object.keys(demandes).reduce((item, e) => {
    let value = [false];
    if (value.includes(demandes[e].traite)) item[e] = demandes[e];
    return item;
  }, {});

  const compteDemandesAttente = (e) => {
    setData(demandesAttente);
  };

  const HandleEnterKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      e.target.click();
    }
  };

  return (
    <div className="wrapper" onDragStart={(e) => preventDragHandler(e)}>
      <Header />

      <main className="recompenses">
        <Tabs
          defaultIndex={
            props.location.checkedTab ? props.location.checkedTab : 0
          }
        >
          <TabList>
            <Tab
              tabIndex={"6"}
              onKeyPress={(e: KeyboardEvent) => {
                HandleEnterKeyPress(e);
              }}
            >
              Récompenses
            </Tab>
            <Tab
              tabIndex={"7"}
              onKeyPress={(e: KeyboardEvent) => {
                HandleEnterKeyPress(e);
              }}
            >
              Demandes en attente ({redeemCount})
            </Tab>
          </TabList>

          <TabPanel>
            <Recompenses />
          </TabPanel>
          <TabPanel>
            <Demandes
              compteDemandesAttente={(e) => compteDemandesAttente(e)}
              syncPendingRequestsCount={() => syncPendingRequestsCount()}
            />
          </TabPanel>
        </Tabs>
      </main>
    </div>
  );
}

export default PageRecompenses;
