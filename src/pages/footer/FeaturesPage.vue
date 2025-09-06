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
              d="M13 10V3L4 14h7v7l9-11h-7z"
            ></path>
          </svg>
          Fonctionnalités
        </h2>
      </div>

      <div class="card-content">
        <div class="intro-section">
          <p class="greeting">Découvrez TRACK&TRAIN</p>
          <p class="main-text">
            Notre plateforme révolutionnaire offre un écosystème complet pour les coachs sportifs et
            leurs clients. Chaque fonctionnalité a été pensée pour optimiser le suivi, la
            progression et l'atteinte des objectifs.
          </p>
        </div>

        <div class="features-section coach-section">
          <h3 class="section-title">
            <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              />
            </svg>
            Pour les Coachs
          </h3>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon coach-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <h4>Gestion des suivis</h4>
              <p>
                Centralisez tous vos clients en un seul endroit. Suivez leurs progressions, leurs
                statistiques et adaptez vos recommandations en temps réel.
              </p>
              <ul class="feature-list">
                <li>Tableau de bord personnalisé</li>
                <li>Historique complet des performances</li>
                <li>Alertes et notifications intelligentes</li>
                <li>Rapports détaillés automatisés</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon coach-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h4>Création de programmes d'entraînement</h4>
              <p>
                Concevez des programmes sur-mesure adaptés aux objectifs de chaque client.
                Bibliothèque d'exercices complète et outils de planification avancés.
              </p>
              <ul class="feature-list">
                <li>Bibliothèque de 500+ exercices</li>
                <li>Templates personnalisables</li>
                <li>Planification sur plusieurs semaines</li>
                <li>Ajustements automatiques basés sur les retours</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon coach-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4>Plans nutritionnels personnalisés</h4>
              <p>
                Élaborez des régimes alimentaires adaptés aux besoins spécifiques de vos clients.
                Calculateurs automatiques et suggestions d'aliments.
              </p>
              <ul class="feature-list">
                <li>Calcul automatique des macros</li>
                <li>Base de données nutritionnelle</li>
                <li>Recettes suggérées</li>
                <li>Suivi des allergies et préférences</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon coach-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h4>Adaptation intelligente</h4>
              <p>
                Analysez les performances et adaptez automatiquement les programmes. Intelligence
                artificielle pour optimiser les résultats.
              </p>
              <ul class="feature-list">
                <li>Ajustements basés sur les données</li>
                <li>Détection des plateaux</li>
                <li>Suggestions d'amélioration</li>
                <li>Prédictions de progression</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="features-section client-section">
          <h3 class="section-title">
            <svg class="section-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            Pour les Sportifs
          </h3>

          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon client-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h4>Suivi des entraînements</h4>
              <p>
                Complétez vos séances directement depuis l'application. Enregistrez vos
                performances, ressentis et progressions.
              </p>
              <ul class="feature-list">
                <li>Interface simple et intuitive</li>
                <li>Chronomètre et compteurs intégrés</li>
                <li>Photos avant/après</li>
                <li>Notes personnelles</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon client-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"
                  />
                </svg>
              </div>
              <h4>Gestion nutritionnelle</h4>
              <p>
                Suivez votre alimentation au quotidien. Scanner de codes-barres, calcul automatique
                des calories et conseils personnalisés.
              </p>
              <ul class="feature-list">
                <li>Journal alimentaire digital</li>
                <li>Scanner de produits</li>
                <li>Rappels de repas</li>
                <li>Graphiques nutritionnels</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon client-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                  />
                </svg>
              </div>
              <h4>Check-up quotidien</h4>
              <p>
                Remplissez votre bilan journalier : poids, forme, sommeil, stress. Données
                précieuses pour votre coach et votre progression.
              </p>
              <ul class="feature-list">
                <li>Questionnaire personnalisé</li>
                <li>Suivi du poids et mensurations</li>
                <li>Qualité du sommeil</li>
                <li>Niveau d'énergie et motivation</li>
              </ul>
            </div>

            <div class="feature-card">
              <div class="feature-icon client-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                  />
                </svg>
              </div>
              <h4>Progression visuelle</h4>
              <p>
                Visualisez vos progrès avec des graphiques détaillés et des statistiques. Restez
                motivé grâce au suivi de vos achievements.
              </p>
              <ul class="feature-list">
                <li>Graphiques de progression</li>
                <li>Badges et récompenses</li>
                <li>Historique complet</li>
                <li>Partage avec votre coach</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="cta-section">
          <h3>Prêt à transformer votre expérience fitness ?</h3>
          <p>
            Rejoignez des milliers de coachs et sportifs qui ont déjà choisi TRACK&TRAIN pour
            atteindre leurs objectifs plus efficacement.
          </p>
          <div class="cta-buttons">
            <button class="btn-primary" @click="navigateToBecomeCoach">Devenir coach</button>
            <button class="btn-secondary" @click="navigateToSignUp">Commencer gratuitement</button>
          </div>
        </div>

        <div class="footer">
          <p>Une question sur nos fonctionnalités ?</p>
          <p class="signature">
            Contactez-nous,<br /><span class="team">L'équipe TRACK&TRAIN</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeaturesPage',
  methods: {
    navigateToBecomeCoach() {
      this.$router.push('/become-coach')
    },
    navigateToSignUp() {
      this.$router.push('/register')
    },
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
  max-width: 1200px;
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

.intro-section {
  text-align: center;
  margin-bottom: 50px;
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
}

.features-section {
  margin-bottom: 60px;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 30px;
  padding-bottom: 15px;
  border-bottom: 2px solid rgba(191, 121, 201, 0.3);
}

.section-icon {
  width: 28px;
  height: 28px;
  color: #bf79c9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 25px;
}

.feature-card {
  background: rgba(99, 102, 241, 0.05);
  padding: 30px;
  border-radius: 15px;
  border: 2px solid rgba(191, 121, 201, 0.2);
  transition: all 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
  border-color: #bf79c9;
  box-shadow: 0 10px 30px rgba(191, 121, 201, 0.2);
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

.feature-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.coach-icon {
  background: linear-gradient(135deg, #db7edb 0%, #bf79c9 100%);
}

.client-icon {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
}

.feature-card h4 {
  font-size: 18px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
}

.feature-card p {
  font-size: 14px;
  color: #ffffff;
  margin-bottom: 20px;
  line-height: 1.6;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  font-size: 13px;
  color: #bf79c9;
  margin-bottom: 8px;
  padding-left: 20px;
  position: relative;
}

.feature-list li:before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #06b6d4;
  font-weight: bold;
}

.cta-section {
  text-align: center;
  background: rgba(6, 182, 212, 0.1);
  padding: 40px;
  border-radius: 20px;
  margin: 50px 0 30px;
  border: 2px solid rgba(191, 121, 201, 0.3);
}

.cta-section h3 {
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 15px;
}

.cta-section p {
  font-size: 16px;
  color: #ffffff;
  margin-bottom: 30px;
}

.cta-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  padding: 15px 30px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
}

.btn-primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: rgb(253, 253, 253);
  box-shadow: 0 4px 15px rgba(155, 201, 209, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(34, 218, 141, 0.4);
  background: linear-gradient(135deg, #b8c7ca 0%, #db22d2 100%);
}

.btn-secondary {
  background: transparent;
  color: #bf79c9;
  border: 2px solid #bf79c9;
}

.btn-secondary:hover {
  background: #bf79c9;
  color: white;
  transform: translateY(-2px);
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

  .features-grid {
    grid-template-columns: 1fr;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
}

@media (max-width: 480px) {
  .feature-card {
    padding: 20px;
  }

  .cta-section {
    padding: 25px;
  }
}
</style>
