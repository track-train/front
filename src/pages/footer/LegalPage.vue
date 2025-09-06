<template>
  <div class="feedback-container">
    <div class="feedback-card">
      <div class="card-header">
        <h2 class="title">
          <svg
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v0"
            ></path>
          </svg>
          Mentions Légales
        </h2>
      </div>

      <div class="card-content">
        <div class="intro-section">
          <p class="greeting">Informations légales</p>
          <p class="main-text">
            Conformément aux dispositions de la loi n°2004-575 du 21 juin 2004 pour la confiance
            dans l'économie numérique, il est précisé aux utilisateurs du site TRACK&TRAIN
            l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">1. Édition du site</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Éditeur :</strong>
              <span>Baptiste Ferrand</span>
            </div>
            <div class="info-item">
              <strong>Statut :</strong>
              <span>Étudiant développeur</span>
            </div>
            <div class="info-item">
              <strong>Email :</strong>
              <span>contact@trackntrain.com</span>
            </div>
            <div class="info-item">
              <strong>Site web :</strong>
              <span>www.trackntrain.com</span>
            </div>
          </div>

          <div class="legal-note">
            <p>
              <strong>Note :</strong> TRACK&TRAIN est un projet étudiant développé dans le cadre
              d'une formation en informatique. Il s'agit d'une plateforme de démonstration des
              compétences acquises.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">2. Hébergement</h3>
          <div class="info-grid">
            <div class="info-item">
              <strong>Hébergeur :</strong>
              <span>À définir selon le déploiement</span>
            </div>
            <div class="info-item">
              <strong>Localisation :</strong>
              <span>Union Européenne</span>
            </div>
            <div class="info-item">
              <strong>Type :</strong>
              <span>Hébergement sécurisé</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">3. Propriété intellectuelle</h3>
          <p class="section-text">
            L'ensemble de ce site relève de la législation française et internationale sur le droit
            d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés,
            y compris pour les documents téléchargeables et les représentations iconographiques et
            photographiques.
          </p>

          <div class="ip-details">
            <div class="ip-item">
              <h4>Éléments protégés :</h4>
              <ul>
                <li>Logo et identité visuelle TRACK&TRAIN</li>
                <li>Interface utilisateur et design</li>
                <li>Textes et contenus rédactionnels</li>
                <li>Code source et fonctionnalités</li>
                <li>Base de données et structure</li>
              </ul>
            </div>

            <div class="ip-item">
              <h4>Utilisation autorisée :</h4>
              <ul>
                <li>Consultation personnelle et privée</li>
                <li>Navigation normale sur le site</li>
                <li>Reproduction pour usage personnel</li>
              </ul>
            </div>

            <div class="ip-item">
              <h4>Interdictions :</h4>
              <ul>
                <li>Reproduction commerciale</li>
                <li>Modification du contenu</li>
                <li>Extraction systématique</li>
                <li>Utilisation à des fins concurrentielles</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">4. Données personnelles</h3>
          <p class="section-text">
            Les données personnelles collectées sur ce site font l'objet d'un traitement
            informatique destiné au fonctionnement de la plateforme TRACK&TRAIN.
          </p>

          <div class="data-info">
            <div class="data-point">
              <span class="data-icon">📋</span>
              <div>
                <strong>Responsable du traitement :</strong>
                <p>Baptiste Ferrand - contact@trackntrain.com</p>
              </div>
            </div>

            <div class="data-point">
              <span class="data-icon">⚖️</span>
              <div>
                <strong>Base légale :</strong>
                <p>Consentement et exécution du contrat</p>
              </div>
            </div>

            <div class="data-point">
              <span class="data-icon">🔒</span>
              <div>
                <strong>Protection :</strong>
                <p>Mesures techniques et organisationnelles appropriées</p>
              </div>
            </div>
          </div>

          <p class="section-text">
            Pour plus d'informations, consultez notre
            <router-link to="/privacy" class="link">Politique de Confidentialité</router-link>.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">5. Cookies</h3>
          <p class="section-text">
            Le site peut être amené à vous demander l'acceptation des cookies pour des besoins de
            statistiques et d'affichage. Un cookie ne nous permet pas de vous identifier ; il sert
            uniquement à enregistrer des informations relatives à la navigation de votre ordinateur
            sur notre site.
          </p>

          <div class="cookies-info">
            <div class="cookie-type">
              <h4>🍪 Cookies techniques</h4>
              <p>Nécessaires au fonctionnement du site (obligatoires)</p>
            </div>
            <div class="cookie-type">
              <h4>📊 Cookies analytiques</h4>
              <p>Mesure d'audience et statistiques (avec consentement)</p>
            </div>
            <div class="cookie-type">
              <h4>🎯 Cookies fonctionnels</h4>
              <p>Amélioration de l'expérience utilisateur (avec consentement)</p>
            </div>
          </div>

          <p class="section-text">
            Plus d'informations dans notre
            <router-link to="/cookies" class="link">Politique des Cookies</router-link>.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">6. Limitation de responsabilité</h3>
          <div class="liability">
            <div class="liability-item">
              <h4>Contenu du site :</h4>
              <p>
                Les informations présentes sur ce site sont fournies à titre indicatif. Baptiste
                Ferrand s'efforce d'assurer l'exactitude et la mise à jour des informations, mais ne
                peut garantir leur exhaustivité et leur actualité.
              </p>
            </div>

            <div class="liability-item">
              <h4>Disponibilité :</h4>
              <p>
                L'accès au site peut être interrompu pour des raisons de maintenance, mise à jour ou
                difficultés techniques. Aucune indemnité ne pourra être réclamée.
              </p>
            </div>

            <div class="liability-item">
              <h4>Utilisation :</h4>
              <p>
                L'utilisateur est seul responsable de l'utilisation qu'il fait du site et des
                informations qu'il y consulte.
              </p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">7. Liens hypertextes</h3>
          <p class="section-text">
            Le site TRACK&TRAIN peut contenir des liens vers d'autres sites web. Baptiste Ferrand ne
            saurait être tenu responsable du contenu de ces sites externes.
          </p>

          <div class="links-policy">
            <div class="policy-point">
              <span class="policy-icon">🔗</span>
              <div>
                <strong>Liens sortants :</strong>
                <p>Vérifiés lors de leur ajout mais non contrôlés en permanence</p>
              </div>
            </div>

            <div class="policy-point">
              <span class="policy-icon">↩️</span>
              <div>
                <strong>Liens entrants :</strong>
                <p>Autorisés vers la page d'accueil avec mention de la source</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">8. Droit applicable</h3>
          <p class="section-text">
            Les présentes mentions légales sont régies par le droit français. En cas de litige, les
            tribunaux français seront seuls compétents.
          </p>

          <div class="jurisdiction">
            <div class="jurisdiction-item">
              <strong>Loi applicable :</strong>
              <span>Droit français</span>
            </div>
            <div class="jurisdiction-item">
              <strong>Juridiction :</strong>
              <span>Tribunaux français</span>
            </div>
            <div class="jurisdiction-item">
              <strong>Langue :</strong>
              <span>Français (version de référence)</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">9. Contact et réclamations</h3>
          <p class="section-text">
            Pour toute question concernant ces mentions légales ou le fonctionnement du site :
          </p>

          <div class="contact-options">
            <div class="contact-option">
              <span class="contact-icon">📧</span>
              <div>
                <strong>Email principal :</strong>
                <p>contact@trackntrain.com</p>
              </div>
            </div>

            <div class="contact-option">
              <span class="contact-icon">⚖️</span>
              <div>
                <strong>Questions juridiques :</strong>
                <p>legal@trackntrain.com</p>
              </div>
            </div>

            <div class="contact-option">
              <span class="contact-icon">🛡️</span>
              <div>
                <strong>Données personnelles :</strong>
                <p>privacy@trackntrain.com</p>
              </div>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Mentions légales mises à jour le {{ currentDate }}</p>
          <p class="signature">L'équipe juridique,<br /><span class="team">TRACK&TRAIN</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LegalPage',
  data() {
    return {
      currentDate: '6 septembre 2025',
    }
  },
}
</script>

<style scoped>
.feedback-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  padding: 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.feedback-card {
  background: rgb(20, 65, 60);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  width: 100%;
  overflow: hidden;
  animation: fadeInUp 0.6s ease-out;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card-header {
  background: linear-gradient(135deg, #db7edb 0%, #8b5cf6 100%);
  padding: 30px;
  text-align: center;
}

.title {
  color: white;
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}

.icon {
  width: 28px;
  height: 28px;
}

.card-content {
  padding: 40px;
  line-height: 1.7;
  color: #ffffff;
}

.intro-section {
  margin-bottom: 40px;
  padding-bottom: 30px;
  border-bottom: 2px solid rgba(191, 121, 201, 0.3);
}

.greeting {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #bf79c9;
}

.main-text {
  font-size: 16px;
  margin-bottom: 25px;
  text-align: justify;
}

.section {
  margin-bottom: 35px;
  padding: 25px;
  background: rgba(99, 102, 241, 0.05);
  border-left: 4px solid #bf79c9;
  border-radius: 8px;
}

.section-title {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
  margin-top: 0;
}

.section-text {
  font-size: 15px;
  margin-bottom: 15px;
  text-align: justify;
  line-height: 1.6;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.info-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.info-item strong {
  color: #bf79c9;
  font-size: 14px;
}

.info-item span {
  font-size: 14px;
}

.legal-note {
  background: rgba(6, 182, 212, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.legal-note p {
  margin: 0;
  font-size: 14px;
  font-style: italic;
}

.legal-note strong {
  color: #06b6d4;
}

.ip-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.ip-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
}

.ip-item h4 {
  color: #06b6d4;
  margin: 0 0 10px 0;
  font-size: 16px;
}

.ip-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.ip-item li {
  padding: 4px 0;
  font-size: 14px;
  position: relative;
  padding-left: 15px;
}

.ip-item li:before {
  content: '•';
  color: #bf79c9;
  position: absolute;
  left: 0;
}

.data-info {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin: 15px 0;
}

.data-point {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.data-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.data-point strong {
  color: #06b6d4;
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
}

.data-point p {
  margin: 0;
  font-size: 14px;
}

.cookies-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin: 15px 0;
}

.cookie-type {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.cookie-type h4 {
  color: #06b6d4;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.cookie-type p {
  margin: 0;
  font-size: 12px;
}

.liability {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.liability-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
}

.liability-item h4 {
  color: #bf79c9;
  margin: 0 0 10px 0;
  font-size: 16px;
}

.liability-item p {
  margin: 0;
  font-size: 14px;
  line-height: 1.5;
}

.links-policy {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.policy-point {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.policy-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.policy-point strong {
  color: #06b6d4;
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
}

.policy-point p {
  margin: 0;
  font-size: 14px;
}

.jurisdiction {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.jurisdiction-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.jurisdiction-item strong {
  color: #bf79c9;
  font-size: 14px;
}

.jurisdiction-item span {
  font-size: 14px;
}

.contact-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.contact-option {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.contact-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.contact-option strong {
  color: #06b6d4;
  display: block;
  margin-bottom: 5px;
  font-size: 15px;
}

.contact-option p {
  margin: 0;
  font-size: 14px;
}

.link {
  color: #06b6d4;
  text-decoration: underline;
}

.link:hover {
  color: #bf79c9;
}

.footer {
  text-align: center;
  margin-top: 40px;
  padding-top: 30px;
  border-top: 2px solid #bf79c9;
}

.footer p:first-child {
  font-style: italic;
  color: #bdbfc4;
  margin-bottom: 20px;
  font-size: 14px;
}

.signature {
  font-weight: 600;
  color: #fcfcfc;
  margin: 0;
}

.team {
  color: #ffffff;
  font-weight: 700;
}

@media (max-width: 768px) {
  .feedback-container {
    padding: 15px;
  }

  .card-content {
    padding: 25px;
  }

  .info-grid,
  .ip-details,
  .cookies-info,
  .links-policy,
  .jurisdiction,
  .contact-options {
    grid-template-columns: 1fr;
  }
}
</style>
