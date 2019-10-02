import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import Aside from '../Aside';

class EditContrat extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    const defaultMessage = 'Je suis excité de travailler avec vous et suis dans l attente de votre réponse. S il vous plâit, contactez-moi à contact/julienlucas.com pour toutes questions. Bien à vous, Julien';

    return (
      <div>
        <Aside/>
        <div className="wrapper">
          <main className="contrat-edit">
            <section className="section-1 container transparent">
              <ul className="status-contrat">
                <li>Rédigé</li>
                <li>Signé</li>
                <li>Envoyé</li>
                <li>Accepté</li>
              </ul>

              <div className="row-fluid">
                <div className="large-6 columns">
                  <p className="m-size">Passez en revue le contrat. Vous ne pourrez plus l’éditer une fois qu’il sera signé. Cliquez sur le texte en sur-brillance pour l’éditer, <a href="" title="">ou regardez la liste de tout ce que vous pouvez éditer</a>.</p>
                </div>
                <div className="large-6 columns">
                  <button className="align-right" onClick={this.openModal}>Signer le contrat</button>
                  <button className="btn-fourth align-right">Plus d'options</button>
                </div>
              </div>
            </section>

            <section className="container shadows">
              <div className="container-contrat">
                <h2 className="headline cornflower-blue text-center">Contrat cadre<br/> mission développement web</h2>
                <p>This Contract is between <span className="editable">Sample Client</span> (the "Client") and <span className="editable">TIP</span>, an <span className="editable">Alaska limited liability</span> company (the "Developer").
                The Contract is dated [the date both parties sign].</p>

                <h2>1. Work and Payment.</h2>
                <p>
                  <strong>1.1 Project.</strong> The Client is hiring the Developer to do the following: <span className="editable">Details to be provided</span>.<br/><br/>
                  <strong>1.2 Schedule.</strong> The Developer will begin work on <span className="editable">September 25, 2018</span> and must finish the work by <span className="editable">October 25, 2018</span>.<br/><br/>
                  <strong>1.3 Payment.</strong> The Client will pay the Developer <span className="editable">a flat fee of $3,200.00 (USD)</span>. Of this, the Client will pay the Developer <span className="editable">$500.00</span> before work begins.<br/><br/>
                  <strong>1.4 Expenses.</strong> The Client <span className="editable">will</span> reimburse the Developer's expenses. Expenses <span className="editable">do not need to be pre-approved by the Client</span>.<br/><br/>
                  <strong>1.5 Invoices.</strong> The Developer will invoice the Client at the end of the project. The Client agrees to pay the amount owed within <span className="editable">15 days</span> of receiving the invoice. Payment after that date will incur a late fee of <span className="editable">0.0%</span> per month on the outstanding amount.<br/><br/>
                  <strong>1.6 Support.</strong> The Developer <span className="editable">will not</span> provide support for any deliverable once the Client accepts it, unless otherwise agreed in writing.<br/><br/>
                </p>
                <h2>2. Ownership and Licenses.</h2>
                <p>
                  <strong><span className="editable">2.1 Client Owns All Work Product</span>.</strong> As part of this job, the Developer is creating “work product” for the Client. To avoid confusion, work product is the finished product, as well as drafts, notes, materials, mockups, hardware, designs, inventions, patents, code, and anything else that the Developer works on—that is, conceives, creates, designs, develops, invents, works on, or reduces to practice—as part of this project, whether before the date of this Contract or after. The Developer hereby gives the Client this work product once the Client pays for it in full. This means the Developer is giving the Client all of its rights, titles, and interests in and to the work product (including intellectual property rights), and the Client will be the sole owner of it. The Client can use the work product however it wants or it can decide not to use the work product at all. The Client, for example, can modify, destroy, or sell it, as it sees fit.<br/><br/>
                  <strong>2.2 Developer’s Use Of Work Product.</strong> Once the Developer gives the work product to the Client, the Developer does not have any rights to it, except those that the Client explicitly gives the Developer here.<br/><br/>
                  <strong>2.3 Developer’s Help Securing Ownership.</strong> In the future, the Client may need the Developer’s help to show that the Client owns the work product or to complete the transfer. The Developer agrees to help with that. For example, the Developer may have to sign a patent application. The Client will pay any required expenses for this. If the Client can’t find the Developer, the Developer agrees that the Client can act on the Developer’s behalf to accomplish the same thing. The following language gives the Client that right: if the Client can’t find the Developer after spending reasonable effort trying to do so, the Developer hereby irrevocably designates and appoints the Client as the Developer’s agent and attorney-in-fact, which appointment is coupled with an interest, to act for the Developer and on the Developer’s behalf to execute, verify, and file the required documents and to take any other legal action to accomplish the purposes of paragraph <br/><br/>
                  <strong>2.4 Developer’s IP That Is Not Work Product.</strong> During the course of this project, the Developer might use intellectual property that the Developer owns or has licensed from a third party, but that does not qualify as “work product.” This is called “background IP.” Possible examples of background IP are pre-existing code, type fonts, properly-licensed stock photos, and web application tools. The Developer is not giving the Client this background IP. But, as part of the Contract, the Developer is giving the Client a right to use and license (with the right to sublicense) the background IP to develop, market, sell, and support the Client’s products and services. The Client may use this background IP worldwide and free of charge, but it cannot transfer its rights to the background IP (except as allowed in Section 11.1 (Assignment)). The Client cannot sell or license the background IP separately from its products or services. The Developer cannot take back this grant, and this grant does not end when the Contract is over.<br/><br/>
                  <strong>2.5 Developer’s Right To Use Client IP.</strong> The Developer may need to use the Client’s intellectual property to do its job. For example, if the Client is hiring the Developer to build a website, the Developer may have to use the Client’s logo. The Client agrees to let the Developer use the Client’s intellectual property and other intellectual property that the Client controls to the extent reasonably necessary to do the Developer’s job. Beyond that, the Client is not giving the Developer any intellectual property rights, unless specifically stated otherwise in this Contract.<br/><br/>
                </p>
                <h2>3. Competitive Engagements.</h2>
                <p>
                  The Developer won’t work for a competitor of the Client until this Contract ends. To avoid confusion, a competitor is any third party that develops, manufactures, promotes, sells, licenses, distributes, or provides products or services that are substantially similar to the Client’s products or services. A competitor is also a third party that plans to do any of those things. The one exception to this restriction is if the Developer asks for permission beforehand and the Client agrees to it in writing. If the Developer uses employees or subcontractors, the Developer must make sure they follow the obligations in this paragraph, as well.
                </p>
                <h2>4. Non-Solicitation.</h2>
                <p>
                  Until this Contract ends, the Developer won’t: (a) encourage Client employees or service providers to stop working for the Client; (b) encourage Client customers or clients to stop doing business with the Client; or (c) hire anyone who worked for the Client over the 12-month period before the Contract ended. The one exception is if the Developer puts out a general ad and someone who happened to work for the Client responds. In that case, the Developer may hire that candidate. The Developer promises that it won’t do anything in this paragraph on behalf of itself or a third party.
                </p>
                <h2>5. Representations.</h2>
                <p>
                <strong>5.1 Overview.</strong> This section contains important promises between the parties.<br/><br/>
                <strong>5.2 Authority To Sign.</strong> Each party promises to the other party that it has the authority to enter into this Contract and to perform all of its obligations under this Contract.<br/><br/>
                <strong>5.3 Developer Has Right To Give Client Work Product.</strong> The Developer promises that it owns the work product, that the Developer is able to give the work product to the Client, and that no other party will claim that it owns the work product. If the Developer uses employees or subcontractors, the Developer also promises that these employees and subcontractors have signed contracts with the Developer giving the Developer any rights that the employees or subcontractors have related to the Developer’s background IP and work product.<br/><br/>
                <strong>5.4 Developer Will Comply With Laws.</strong> The Developer promises that the manner it does this job, its work product, and any background IP it uses comply with applicable U.S. and foreign laws and regulations.<br/><br/>
                <strong>5.5 Work Product Does Not Infringe.</strong> The Developer promises that its work product does not and will not infringe on someone else’s intellectual property rights, that the Developer has the right to let the Client use the background IP, and that this Contract does not and will not violate any contract that the Developer has entered into or will enter into with someone else.<br/><br/>
                <strong>5.6 Client Will Review Work.</strong> The Client promises to review the work product, to be reasonably available to the Developer if the Developer has questions regarding this project, and to provide timely feedback and decisions.<br/><br/>
                <strong>5.7 Client-Supplied Material Does Not Infringe.</strong> If the Client provides the Developer with material to incorporate into the work product, the Client promises that this material does not infringe on someone else’s intellectual property rights.<br/><br/>
                <strong>6. Term and Termination.</strong> This Contract ends on <span className="editable">October 25, 2018</span>, unless the Client or the Developer ends the contract before that time. Either party may end this Contract for any reason by sending an email or letter to the other party, informing the recipient that the sender is ending the Contract and that the Contract will end in <span className="editable">7 days</span>. The Contract officially ends once that time has passed. The party that is ending the Contract must provide notice by taking the steps explained in Section 11.4. The Developer must immediately stop working as soon as it receives this notice, unless the notice says otherwise. <span className="editable">The Client will pay the Developer for the work done up until when the Contract ends and will reimburse the Developer for any agreed-upon, non-cancellable expenses</span>. The following sections don’t end even after the Contract ends: 2 (Ownership and Licenses); 3 (Competitive Engagements); 4 (Non-Solicitation); 5 (Representations); 8 (Confidential Information); 9 (Limitation of Liability); 10 (Indemnity); and 11 (General).
                </p>
                <h2>7. Independent Contractor.</h2>
                <p>
                  The Client is hiring the Developer as an independent contractor. The following statements accurately reflect their relationship:<br/><br/>
                  The Developer will use its own equipment, tools, and material to do the work. - The Client will not control how the job is performed on a day-to-day basis. Rather, the Developer is responsible for determining when, where, and how it will carry out the work. - The Client will not provide the Developer with any training. - The Client and the Developer do not have a partnership or employer-employee relationship. - The Developer cannot enter into contracts, make promises, or act on behalf of the Client. - The Developer is not entitled to the Client’s benefits (e.g., group insurance, retirement benefits, retirement plans, vacation days). - The Developer is responsible for its own taxes. - The Client will not withhold social security and Medicare taxes or make payments for disability insurance, unemployment insurance, or workers compensation for the Developer or any of the Developer’s employees or subcontractors.
                </p>
                <h2>8. Confidential Information.</h2>
                <p>
                  <strong>8.1 Overview.</strong> This Contract imposes special restrictions on how the Client and the Developer must handle confidential information. These obligations are explained in this section.<br/><br/>
                  <strong>8.2 The Client’s Confidential Information.</strong> While working for the Client, the Developer may come across, or be given, Client information that is confidential. This is information like customer lists, business strategies, research & development notes, statistics about a website, and other information that is private. The Developer promises to treat this information as if it is the Developer’s own confidential information. The Developer may use this information to do its job under this Contract, but not for anything else. For example, if the Client lets the Developer use a customer list to send out a newsletter, the Developer cannot use those email addresses for any other purpose. The one exception to this is if the Client gives the Developer written permission to use the information for another purpose, the Developer may use the information for that purpose, as well. When this Contract ends, the Developer must give back or destroy all confidential information, and confirm that it has done so. The Developer promises that it will not share confidential information with a third party, unless the Client gives the Developer written permission first. The Developer must continue to follow these obligations, even after the Contract ends. The Developer’s responsibilities only stop if the Developer can show any of the following: (i) that the information was already public when the Developer came across it; (ii) the information became public after the Developer came across it, but not because of anything the Developer did or didn’t do; (iii) the Developer already knew the information when the Developer came across it and the Developer didn’t have any obligation to keep it secret; (iv) a third party provided the Developer with the information without requiring that the Developer keep it a secret; or (v) the Developer created the information on its own, without using anything belonging to the Client.<br/><br/>
                  <strong>8.3 Third-Party Confidential Information.</strong> It’s possible the Client and the Developer each have access to confidential information that belongs to third parties. The Client and the Developer each promise that it will not share with the other party confidential information that belongs to third parties, unless it is allowed to do so. If the Client or the Developer is allowed to share confidential information with the other party and does so, the sharing party promises to tell the other party in writing of any special restrictions regarding that information.<br/><br/>
                  <strong>9. Limitation of Liability.</strong> Neither party is liable for breach-of-contract damages that the breaching party could not reasonably have foreseen when it entered this Contract.
                </p>
                <h2>10. Indemnity</h2>
                <p>
                  <strong>10.1 Overview.</strong> This section transfers certain risks between the parties if a third party sues or goes after the Client or the Developer or both. For example, if the Client gets sued for something that the Developer did, then the Developer may promise to come to the Client’s defense or to reimburse the Client for any losses.<br/><br/>
                  <strong>10.2 Client Indemnity.</strong> In this Contract, the Developer agrees to indemnify the Client (and its affiliates and its and their directors, officers, employees, and agents) from and against all liabilities, losses, damages, and expenses (including reasonable attorneys’ fees) related to a third-party claim or proceeding arising out of: (i) the work the Developer has done under this Contract; (ii) a breach by the Developer of its obligations under this Contract; or (iii) a breach by the Developer of the promises it is making in Section 5 (Representations).<br/><br/>
                  <strong>10.3 Developer Indemnity.</strong> In this Contract, the Client agrees to indemnify the Developer (and its affiliates and its and their directors, officers, employees, and agents) from and against liabilities, losses, damages, and expenses (including reasonable attorneys’ fees) related to a third-party claim or proceeding arising out of a breach by the Client of its obligations under this Contract.
                </p>
                <h2>11. General</h2>
                <p>
                  <strong>11.1 Assignment.</strong> This Contract applies only to the Client and the Developer. The Developer cannot assign its rights or delegate its obligations under this Contract to a third-party (other than by will or intestate), without first receiving the Client’s written permission. In contrast, the Client may assign its rights and delegate its obligations under this Contract without the Developer’s permission. This is necessary in case, for example, another Client buys out the Client or if the Client decides to sell the work product that results from this Contract.<br/><br/>
                  <strong>11.2 Arbitration.</strong> As the exclusive means of initiating adversarial proceedings to resolve any dispute arising under this Contract, a party may demand that the dispute be resolved by arbitration administered by the American Arbitration Association in accordance with its commercial arbitration rules.<br/><br/>
                  <strong>11.3 Modification; Waiver.</strong> To change anything in this Contract, the Client and the Developer must agree to that change in writing and sign a document showing their contract. Neither party can waive its rights under this Contract or release the other party from its obligations under this Contract, unless the waiving party acknowledges it is doing so in writing and signs a document that says so.<br/><br/>
                  <strong>11.4 Notices.</strong><br/>
                  (a) Over the course of this Contract, one party may need to send a notice to the other party. For the notice to be valid, it must be in writing and delivered in one of the following ways: personal delivery, email, or certified or registered mail (postage prepaid, return receipt requested). The notice must be delivered to the party’s address listed at the end of this Contract or to another address that the party has provided in writing as an appropriate address to receive notice.<br/><br/>
                  (b) The timing of when a notice is received can be very important. To avoid confusion, a valid notice is considered received as follows: (i) if delivered personally, it is considered received immediately; (ii) if delivered by email, it is considered received upon acknowledgement of receipt; (iii) if delivered by registered or certified mail (postage prepaid, return receipt requested), it is considered received upon receipt as indicated by the date on the signed receipt. If a party refuses to accept notice or if notice cannot be delivered because of a change in address for which no notice was given, then it is considered received when the notice is rejected or unable to be delivered. If the notice is received after 5:00pm on a business day at the location specified in the address for that party, or on a day that is not a business day, then the notice is considered received at 9:00am on the next business day.<br/><br/>
                  <strong>11.5 Severability.</strong> This section deals with what happens if a portion of the Contract is found to be unenforceable. If that’s the case, the unenforceable portion will be changed to the minimum extent necessary to make it enforceable, unless that change is not permitted by law, in which case the portion will be disregarded. If any portion of the Contract is changed or disregarded because it is unenforceable, the rest of the Contract is still enforceable.<br/><br/>
                  <strong>11.6 Signatures.</strong> The Client and the Developer must sign this document using Bonsai’s e-signing system. These electronic signatures count as originals for all purposes.<br/><br/>
                  <strong>11.7 Governing Law.</strong> The laws of <span className="editable">the state of Alaska</span> govern the rights and obligations of the Client and the Developer under this Contract, without regard to conflict of law principles of that state.<br/><br/>
                  <strong>11.8 Entire Contract.</strong> This Contract represents the parties’ final and complete understanding of this job and the subject matter discussed in this Contract. This Contract supersedes all other contracts (both written and oral) between the parties.<br/><br/>

                  <strong>THE PARTIES HERETO AGREE TO THE FOREGOING AS EVIDENCED BY THEIR SIGNATURES BELOW.</strong><br/><br/>

                  <p className="fait-le"><strong>Fait le 25/09/2018</strong></p>

                  <div className="row-fluid">
                    <div className="large-6 columns">
                      <p className="text-left"><strong>Nom du client</strong></p>
                    </div>
                    <div className="large-6 columns">
                      <p className="text-left"><strong>Signature du client</strong></p>
                      <img type="image/svg+xml" src="/images/signature-devis.png" alt=""/>
                    </div>
                    <div className="large-6 columns">
                      <p className="text-left"><strong>Nom du prestataire</strong></p>
                    </div>
                    <div className="large-6 columns">
                      <p><strong>Signature du prestataire</strong></p>
                      <img type="image/svg+xml" src="/images/signature-devis.png" alt=""/>
                    </div>
                  </div>
                </p>
              </div>
            </section>

          </main>
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            contentLabel="Example Modal"
            class="modal"
          >

            <h2 className="text-center">Envoyer le contrat pour signature</h2>
            <hr/>
            <form id="send-contrat-form">
              <div className="row-fluid">
                <div className="large-2 columns"><p>À:</p></div>
                <div className="large-10 columns"><input placeholder="contact@julienlucas.com" type="email" id="email"/></div>
              </div>
              <div className="row-fluid">
                <div className="large-2 columns"><p>Sujet:</p></div>
                <div className="large-10 columns"><input placeholder="Julien vous a envoyé un devis" type="text" id="sujet"/></div>
              </div>
              <label>MESSAGE</label>
              <textarea placeholder={defaultMessage} name="message" form="send-form" />
              <hr/>
              <input className="btn align-right" id="submit" type="submit"/>
              <button className="btn-fifth align-right" onClick={this.closeModal}>Annuler</button>
            </form>
          </Modal>
        </div>
      </div>
    );
  }
}

export default EditContrat;
