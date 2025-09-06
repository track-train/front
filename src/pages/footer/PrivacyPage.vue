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
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            ></path>
          </svg>
          Politique de Confidentialité
        </h2>
      </div>

      <div class="card-content">
        <div class="intro-section">
          <p class="greeting">Dernière mise à jour : {{ currentDate }}</p>
          <p class="main-text">
            Chez TRACK&TRAIN, nous nous engageons à protéger votre vie privée et vos données
            personnelles. Cette politique explique comment nous collectons, utilisons, stockons et
            protégeons vos informations conformément au Règlement Général sur la Protection des
            Données (RGPD).
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">1. Responsable du traitement</h3>
          <div class="company-info">
            <p><strong>Éditeur :</strong> Baptiste Ferrand</p>
            <p><strong>Plateforme :</strong> TRACK&TRAIN</p>
            <p><strong>Email :</strong> privacy@trackntrain.com</p>
            <p><strong>Contact DPO :</strong> dpo@trackntrain.com</p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">2. Données collectées</h3>
          <div class="data-categories">
            <div class="data-category">
              <h4>Données d'identification</h4>
              <ul>
                <li>Nom, prénom</li>
                <li>Adresse email</li>
                <li>Numéro de téléphone</li>
                <li>Date de naissance</li>
                <li>Photo de profil (optionnelle)</li>
              </ul>
            </div>

            <div class="data-category">
              <h4>Données de santé et fitness</h4>
              <ul>
                <li>Poids, taille, mensurations</li>
                <li>Objectifs sportifs</li>
                <li>Historique d'entraînement</li>
                <li>Données nutritionnelles</li>
                <li>Check-up quotidiens</li>
              </ul>
            </div>

            <div class="data-category">
              <h4>Données techniques</h4>
              <ul>
                <li>Adresse IP</li>
                <li>Informations sur l'appareil</li>
                <li>Données de navigation</li>
                <li>Cookies et traceurs</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">3. Finalités du traitement</h3>
          <div class="purposes">
            <div class="purpose-item">
              <span class="purpose-icon">🎯</span>
              <div>
                <h4>Fourniture du service</h4>
                <p>Fonctionnement de la plateforme, mise en relation coachs/sportifs</p>
              </div>
            </div>

            <div class="purpose-item">
              <span class="purpose-icon">📊</span>
              <div>
                <h4>Suivi et progression</h4>
                <p>Analyse des performances, recommandations personnalisées</p>
              </div>
            </div>

            <div class="purpose-item">
              <span class="purpose-icon">💬</span>
              <div>
                <h4>Communication</h4>
                <p>Support client, notifications importantes, newsletters</p>
              </div>
            </div>

            <div class="purpose-item">
              <span class="purpose-icon">⚖️</span>
              <div>
                <h4>Obligations légales</h4>
                <p>Respect des réglementations, sécurité, prévention de la fraude</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">4. Base légale</h3>
          <p class="section-text">Le traitement de vos données repose sur :</p>
          <ul class="legal-basis">
            <li><strong>Contrat :</strong> Exécution du contrat d'utilisation de TRACK&TRAIN</li>
            <li><strong>Consentement :</strong> Pour les données de santé et marketing</li>
            <li><strong>Intérêt légitime :</strong> Amélioration du service et sécurité</li>
            <li><strong>Obligation légale :</strong> Respect des réglementations en vigueur</li>
          </ul>
        </div>

        <div class="section">
          <h3 class="section-title">5. Conservation des données</h3>
          <div class="retention">
            <div class="retention-item">
              <h4>Comptes actifs</h4>
              <p>Durée de la relation contractuelle + 3 ans</p>
            </div>
            <div class="retention-item">
              <h4>Données de santé</h4>
              <p>Durée de la relation + 1 an ou jusqu'à suppression demandée</p>
            </div>
            <div class="retention-item">
              <h4>Données techniques</h4>
              <p>13 mois maximum (cookies) / 3 ans (logs)</p>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">6. Vos droits</h3>
          <div class="rights-grid">
            <div class="right-item">
              <span class="right-emoji">👁️</span>
              <div>
                <h4>Droit d'accès</h4>
                <p>Obtenir une copie de vos données</p>
              </div>
            </div>

            <div class="right-item">
              <span class="right-emoji">✏️</span>
              <div>
                <h4>Droit de rectification</h4>
                <p>Corriger vos informations</p>
              </div>
            </div>

            <div class="right-item">
              <span class="right-emoji">🗑️</span>
              <div>
                <h4>Droit à l'effacement</h4>
                <p>Supprimer vos données</p>
              </div>
            </div>

            <div class="right-item">
              <span class="right-emoji">⏸️</span>
              <div>
                <h4>Droit d'opposition</h4>
                <p>Vous opposer au traitement</p>
              </div>
            </div>

            <div class="right-item">
              <span class="right-emoji">📦</span>
              <div>
                <h4>Portabilité</h4>
                <p>Récupérer vos données</p>
              </div>
            </div>

            <div class="right-item">
              <span class="right-emoji">⛔</span>
              <div>
                <h4>Limitation</h4>
                <p>Limiter le traitement</p>
              </div>
            </div>
          </div>

          <div class="exercise-rights">
            <p><strong>Pour exercer vos droits :</strong></p>
            <p>
              Contactez-nous à <strong>privacy@trackntrain.com</strong> avec une pièce d'identité.
            </p>
            <p>Délai de réponse : 1 mois maximum</p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">7. Sécurité des données</h3>
          <div class="security-measures">
            <div class="security-item">
              <span class="security-icon">🔐</span>
              <span>Chiffrement des données sensibles</span>
            </div>
            <div class="security-item">
              <span class="security-icon">🛡️</span>
              <span>Serveurs sécurisés en Europe</span>
            </div>
            <div class="security-item">
              <span class="security-icon">👥</span>
              <span>Accès restreint aux données</span>
            </div>
            <div class="security-item">
              <span class="security-icon">🔄</span>
              <span>Sauvegardes régulières</span>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">8. Cookies</h3>
          <p class="section-text">
            Nous utilisons des cookies pour améliorer votre expérience. Consultez notre
            <router-link to="/cookies" class="link">Politique des Cookies</router-link>
            pour plus d'informations.
          </p>
        </div>

        <div class="contact-section">
          <h3 class="section-title">Contact</h3>
          <p class="section-text">
            Pour toute question concernant cette politique de confidentialité :
          </p>
          <div class="contact-info">
            <div class="contact-item"><strong>Email :</strong> privacy@trackntrain.com</div>
            <div class="contact-item"><strong>DPO :</strong> dpo@trackntrain.com</div>
            <div class="contact-item">
              <strong>CNIL :</strong> Droit de réclamation auprès de la CNIL
            </div>
          </div>
        </div>

        <div class="footer">
          <p>
            Cette politique peut être mise à jour. Nous vous informerons des changements importants.
          </p>
          <p class="signature">Cordialement,<br /><span class="team">L'équipe TRACK&TRAIN</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PrivacyPage',
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
  font-size: 24px;
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
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #bf79c9;
  font-style: italic;
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

.company-info p {
  margin-bottom: 8px;
  font-size: 14px;
}

.company-info strong {
  color: #bf79c9;
}

.data-categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.data-category {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
}

.data-category h4 {
  color: #06b6d4;
  margin-bottom: 10px;
  font-size: 16px;
}

.data-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.data-category li {
  padding: 4px 0;
  font-size: 14px;
  position: relative;
  padding-left: 15px;
}

.data-category li:before {
  content: '•';
  color: #bf79c9;
  position: absolute;
  left: 0;
}

.purposes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.purpose-item {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.purpose-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.purpose-item h4 {
  margin: 0 0 5px 0;
  color: #06b6d4;
  font-size: 16px;
}

.purpose-item p {
  margin: 0;
  font-size: 14px;
}

.legal-basis {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.legal-basis li {
  padding: 8px 0;
  font-size: 14px;
}

.legal-basis strong {
  color: #bf79c9;
}

.retention {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.retention-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  text-align: center;
}

.retention-item h4 {
  color: #06b6d4;
  margin: 0 0 8px 0;
  font-size: 14px;
}

.retention-item p {
  margin: 0;
  font-size: 13px;
}

.rights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
}

.right-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.right-emoji {
  font-size: 24px;
  margin-bottom: 8px;
}

.right-item h4 {
  margin: 0 0 5px 0;
  font-size: 14px;
  color: #06b6d4;
}

.right-item p {
  margin: 0;
  font-size: 12px;
}

.exercise-rights {
  background: rgba(6, 182, 212, 0.1);
  padding: 15px;
  border-radius: 8px;
  margin-top: 20px;
}

.exercise-rights p {
  margin: 5px 0;
  font-size: 14px;
}

.exercise-rights strong {
  color: #06b6d4;
}

.security-measures {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.security-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
}

.security-icon {
  font-size: 20px;
  flex-shrink: 0;
}

.link {
  color: #06b6d4;
  text-decoration: underline;
}

.link:hover {
  color: #bf79c9;
}

.contact-section {
  background: rgba(6, 182, 212, 0.1);
  border-left: 4px solid #bf79c9;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
}

.contact-info {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  margin-top: 15px;
}

.contact-item {
  margin-bottom: 10px;
  font-size: 15px;
}

.contact-item:last-child {
  margin-bottom: 0;
}

.contact-item strong {
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

  .data-categories,
  .rights-grid,
  .security-measures {
    grid-template-columns: 1fr;
  }
}
</style>
