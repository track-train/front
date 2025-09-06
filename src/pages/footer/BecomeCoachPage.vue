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
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            ></path>
          </svg>
          Devenir Coach
        </h2>
      </div>

      <div class="card-content">
        <p class="greeting">Bonjour futur coach,</p>

        <p class="main-text">
          Vous souhaitez rejoindre notre équipe de coachs professionnels ? Nous sommes ravis de
          votre intérêt ! Pour garantir la qualité de nos services et la sécurité de nos
          utilisateurs, nous avons mis en place un processus de validation rigoureux.
        </p>

        <p class="main-text">
          Pour faire votre demande de certification coach sur TRACK&TRAIN, veuillez nous envoyer un
          email à l'adresse suivante avec les documents requis :
        </p>

        <div class="email-container">
          <a href="mailto:coach@trackntrain.com" class="email-link">
            <svg
              class="email-icon"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
              ></path>
            </svg>
            coach@trackntrain.com
          </a>
        </div>

        <div class="instructions">
          <h3>Documents requis pour votre candidature :</h3>
          <ul>
            <li>
              <strong>Diplôme de coach sportif</strong> - Certification reconnue dans votre domaine
              d'expertise
            </li>
            <li>
              <strong>Certification d'État</strong> - Carte professionnelle d'éducateur sportif en
              cours de validité
            </li>
            <li>
              <strong>SIRET d'entreprise</strong> - Justificatif de votre statut professionnel
              (auto-entrepreneur, société, etc.)
            </li>
            <li>
              <strong>Assurance responsabilité civile professionnelle</strong> - Attestation en
              cours de validité
            </li>
            <li><strong>Présentation personnelle</strong> - CV détaillé et lettre de motivation</li>
            <li>
              <strong>Portfolio (optionnel)</strong> - Photos de vos réalisations, témoignages
              clients, etc.
            </li>
          </ul>
        </div>

        <div class="requirements">
          <h3>Critères d'éligibilité :</h3>
          <div class="criteria-grid">
            <div class="criteria-item">
              <span class="criteria-icon">🎓</span>
              <div class="criteria-content">
                <h4>Formation certifiée</h4>
                <p>Diplôme reconnu par l'État français ou équivalence européenne</p>
              </div>
            </div>
            <div class="criteria-item">
              <span class="criteria-icon">📋</span>
              <div class="criteria-content">
                <h4>Statut légal</h4>
                <p>Déclaration officielle d'activité et statut professionnel à jour</p>
              </div>
            </div>
            <div class="criteria-item">
              <span class="criteria-icon">🛡️</span>
              <div class="criteria-content">
                <h4>Assurance</h4>
                <p>Couverture responsabilité civile professionnelle obligatoire</p>
              </div>
            </div>
            <div class="criteria-item">
              <span class="criteria-icon">⭐</span>
              <div class="criteria-content">
                <h4>Expérience</h4>
                <p>Minimum 1 an d'expérience dans le coaching sportif</p>
              </div>
            </div>
          </div>
        </div>

        <div class="commitment">
          <p><strong>Notre processus de validation :</strong></p>
          <p>
            Une fois votre dossier complet reçu, notre équipe procédera à une vérification
            approfondie de vos qualifications. Vous recevrez une réponse sous 5 à 7 jours ouvrés. Si
            votre candidature est acceptée, nous vous accompagnerons dans la création de votre
            profil coach.
          </p>
        </div>

        <div class="benefits">
          <h3>Pourquoi rejoindre TRACK&TRAIN ?</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <span class="benefit-emoji">💼</span>
              <span>Gestion simplifiée de vos clients et suivis</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">📊</span>
              <span>Outils d'analyse et de progression intégrés</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">🤝</span>
              <span>Mise en relation avec des sportifs motivés</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">📱</span>
              <span>Interface intuitive et responsive</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">🎯</span>
              <span>Système de recommandation intelligent</span>
            </div>
            <div class="benefit-item">
              <span class="benefit-emoji">💬</span>
              <span>Support technique dédié aux professionnels</span>
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Merci pour votre intérêt et à bientôt dans l'équipe TRACK&TRAIN !</p>
          <p class="signature">Sportivement,<br /><span class="team">L'équipe TRACK&TRAIN</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BecomeCoachPage',
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
  max-width: 800px;
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
  width: 32px;
  height: 32px;
}

.card-content {
  padding: 40px;
  line-height: 1.7;
  color: #ffffff;
}

.greeting {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #ffffff;
}

.main-text {
  font-size: 16px;
  margin-bottom: 25px;
  text-align: justify;
}

.email-container {
  text-align: center;
  margin: 30px 0;
}

.email-link {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: rgb(253, 253, 253);
  text-decoration: none;
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(155, 201, 209, 0.3);
}

.email-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 218, 141, 0.4);
  background: linear-gradient(135deg, #b8c7ca 0%, #db22d2 100%);
}

.email-icon {
  width: 20px;
  height: 20px;
}

.instructions {
  background: rgba(99, 102, 241, 0.1);
  border-left: 4px solid #bf79c9;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
}

.instructions h3 {
  margin-top: 0;
  margin-bottom: 15px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 600;
}

.instructions ul {
  margin: 0;
  padding-left: 20px;
}

.instructions li {
  margin-bottom: 12px;
  font-size: 15px;
  color: #ffffff;
  line-height: 1.5;
}

.instructions li strong {
  color: #bf79c9;
}

.requirements {
  background: rgba(6, 182, 212, 0.1);
  border-left: 4px solid #bf79c9;
  padding: 25px;
  border-radius: 8px;
  margin: 25px 0;
}

.requirements h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 600;
}

.criteria-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
}

.criteria-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
}

.criteria-icon {
  font-size: 24px;
  flex-shrink: 0;
  margin-top: 2px;
}

.criteria-content h4 {
  margin: 0 0 5px 0;
  color: #ffffff;
  font-size: 14px;
  font-weight: 600;
}

.criteria-content p {
  margin: 0;
  color: #ffffff;
  font-size: 12px;
  line-height: 1.4;
}

.commitment {
  background: rgba(6, 182, 212, 0.1);
  border-left: 4px solid #bf79c9;
  padding: 20px;
  border-radius: 8px;
  margin: 25px 0;
}

.commitment p:first-child {
  font-weight: 600;
  margin-bottom: 10px;
  color: #ffffff;
}

.commitment p:last-child {
  margin: 0;
  font-size: 15px;
  color: #ffffff;
}

.benefits {
  background: rgba(99, 102, 241, 0.1);
  border-left: 4px solid #bf79c9;
  padding: 25px;
  border-radius: 8px;
  margin: 30px 0;
}

.benefits h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: rgb(255, 255, 255);
  font-size: 16px;
  font-weight: 600;
}

.benefits-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 12px;
}

.benefit-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 6px;
  color: #ffffff;
  font-size: 14px;
}

.benefit-emoji {
  font-size: 18px;
  flex-shrink: 0;
}

.footer {
  text-align: center;
  margin-top: 35px;
  padding-top: 30px;
  border-top: 2px solid #bf79c9;
}

.footer p:first-child {
  font-style: italic;
  color: #bdbfc4;
  margin-bottom: 20px;
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

  .title {
    font-size: 24px;
  }

  .email-link {
    padding: 12px 25px;
    font-size: 14px;
  }

  .criteria-grid {
    grid-template-columns: 1fr;
  }

  .benefits-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .card-header {
    padding: 20px;
  }

  .card-content {
    padding: 20px;
  }

  .title {
    font-size: 20px;
    flex-direction: column;
    gap: 8px;
  }

  .instructions,
  .commitment,
  .requirements,
  .benefits {
    padding: 15px;
  }
}
</style>
