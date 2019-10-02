import React from 'react';
import ReactDOM from 'react-dom';
import DropzoneComponent from 'react-dropzone-component';
import database from '../../firebase/firebase';

export default class DragDropLogo extends React.Component {
  constructor(props) {
    super(props);
    this.djsConfig = {
      addRemoveLinks: true,
      acceptedFiles: "image/jpeg,image/png,image/gif",
      autoProcessQueue: false
    };

    this.componentConfig = {
      iconFiletypes: ['.jpg', '.png', '.gif'],
      showFiletypeIcon: true,
      postUrl: '/uploadHandler'
    };

    this.dropzone = null;
  }

  handleFileAdded(file) {
    console.log(file);
  }

  handlePost() {
    this.dropzone.processQueue();
  }

  render() {
    const config = this.componentConfig;
    const djsConfig = this.djsConfig;

    // For a list of all possible events (there are many), see README.md!
    const eventHandlers = {
        init: dz => this.dropzone = dz,
        addedfile: this.handleFileAdded.bind(this)
    }

    let logo;
    database.ref(`abonnement/configuration/entreprise/logo/upload/dataURL`).on('value', (snapshot) => {
      const val = snapshot.val();
      sessionStorage.setItem('logo', JSON.stringify(val));
      const dataURL = JSON.parse(sessionStorage.getItem('logo'));
      if (snapshot.exists()) {
        logo = <img type="image/svg+xml" src={dataURL} alt="" onmousedown="return false" onmousemove="return false"/>
      } else {
        logo = <DropzoneComponent className="dropzone" config={config} eventHandlers={eventHandlers} djsConfig={djsConfig} />
      }
    });

    return (
      <div>
        {logo}
      </div>
    );
  }
}
