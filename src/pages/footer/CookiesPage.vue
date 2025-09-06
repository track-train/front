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
              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
            ></path>
          </svg>
          Politique des Cookies
        </h2>
      </div>

      <div class="card-content">
        <div class="intro-section">
          <p class="greeting">Dernière mise à jour : {{ currentDate }}</p>
          <p class="main-text">
            Cette politique explique comment TRACK&TRAIN utilise les cookies et technologies
            similaires pour améliorer votre expérience sur notre plateforme. En continuant à
            utiliser notre site, vous acceptez l'utilisation des cookies conformément à cette
            politique.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">1. Qu'est-ce qu'un cookie ?</h3>
          <p class="section-text">
            Un cookie est un petit fichier texte stocké sur votre appareil (ordinateur, tablette,
            smartphone) lorsque vous visitez un site web. Il permet au site de mémoriser vos
            préférences et actions pour améliorer votre expérience de navigation.
          </p>

          <div class="cookie-explanation">
            <div class="explanation-item">
              <span class="explanation-icon">💾</span>
              <div>
                <strong>Stockage local</strong>
                <p>Les cookies sont stockés dans votre navigateur web</p>
              </div>
            </div>

            <div class="explanation-item">
              <span class="explanation-icon">🔍</span>
              <div>
                <strong>Identification</strong>
                <p>Ils permettent de vous reconnaître lors de vos visites</p>
              </div>
            </div>

            <div class="explanation-item">
              <span class="explanation-icon">⚙️</span>
              <div>
                <strong>Fonctionnalités</strong>
                <p>Ils activent certaines fonctionnalités du site</p>
              </div>
            </div>

            <div class="explanation-item">
              <span class="explanation-icon">📊</span>
              <div>
                <strong>Analyse</strong>
                <p>Ils nous aident à comprendre l'utilisation du site</p>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">2. Types de cookies utilisés</h3>

          <div class="cookie-types">
            <div class="cookie-category essential">
              <div class="category-header">
                <span class="category-icon">⚡</span>
                <div class="category-info">
                  <h4>Cookies essentiels</h4>
                  <span class="required-badge">Obligatoires</span>
                </div>
              </div>
              <p class="category-description">
                Ces cookies sont nécessaires au fonctionnement du site et ne peuvent pas être
                désactivés.
              </p>
              <div class="cookie-list">
                <div class="cookie-item">
                  <strong>session_id</strong>
                  <div class="cookie-details">
                    <span>Durée : Session</span>
                    <span>But : Maintenir votre connexion</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>csrf_token</strong>
                  <div class="cookie-details">
                    <span>Durée : Session</span>
                    <span>But : Sécurité des formulaires</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>cookie_consent</strong>
                  <div class="cookie-details">
                    <span>Durée : 1 an</span>
                    <span>But : Mémoriser vos préférences de cookies</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="cookie-category functional">
              <div class="category-header">
                <span class="category-icon">🔧</span>
                <div class="category-info">
                  <h4>Cookies fonctionnels</h4>
                  <span class="optional-badge">Optionnels</span>
                </div>
              </div>
              <p class="category-description">
                Ces cookies améliorent les fonctionnalités du site et votre expérience utilisateur.
              </p>
              <div class="cookie-list">
                <div class="cookie-item">
                  <strong>language_preference</strong>
                  <div class="cookie-details">
                    <span>Durée : 6 mois</span>
                    <span>But : Mémoriser votre langue préférée</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>theme_preference</strong>
                  <div class="cookie-details">
                    <span>Durée : 1 an</span>
                    <span>But : Sauvegarder vos préférences d'affichage</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>workout_filters</strong>
                  <div class="cookie-details">
                    <span>Durée : 3 mois</span>
                    <span>But : Mémoriser vos filtres d'entraînement</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="cookie-category analytics">
              <div class="category-header">
                <span class="category-icon">📈</span>
                <div class="category-info">
                  <h4>Cookies analytiques</h4>
                  <span class="optional-badge">Optionnels</span>
                </div>
              </div>
              <p class="category-description">
                Ces cookies nous aident à comprendre comment vous utilisez le site pour l'améliorer.
              </p>
              <div class="cookie-list">
                <div class="cookie-item">
                  <strong>_ga</strong>
                  <div class="cookie-details">
                    <span>Durée : 2 ans</span>
                    <span>But : Google Analytics - Utilisateurs uniques</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>_gat</strong>
                  <div class="cookie-details">
                    <span>Durée : 1 minute</span>
                    <span>But : Google Analytics - Limitation du taux de requêtes</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>user_journey</strong>
                  <div class="cookie-details">
                    <span>Durée : 30 jours</span>
                    <span>But : Analyser le parcours utilisateur</span>
                  </div>
                </div>
              </div>
            </div>

            <div class="cookie-category marketing">
              <div class="category-header">
                <span class="category-icon">🎯</span>
                <div class="category-info">
                  <h4>Cookies marketing</h4>
                  <span class="optional-badge">Optionnels</span>
                </div>
              </div>
              <p class="category-description">
                Ces cookies permettent de vous proposer du contenu personnalisé et des publicités
                pertinentes.
              </p>
              <div class="cookie-list">
                <div class="cookie-item">
                  <strong>user_interests</strong>
                  <div class="cookie-details">
                    <span>Durée : 6 mois</span>
                    <span>But : Personnalisation du contenu</span>
                  </div>
                </div>
                <div class="cookie-item">
                  <strong>campaign_source</strong>
                  <div class="cookie-details">
                    <span>Durée : 30 jours</span>
                    <span>But : Suivi des campagnes marketing</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">3. Gestion de vos préférences</h3>
          <p class="section-text">
            Vous pouvez à tout moment modifier vos préférences concernant les cookies. Voici les
            différentes options disponibles :
          </p>

          <div class="preference-options">
            <div class="option-card">
              <div class="option-header">
                <span class="option-icon">🎛️</span>
                <h4>Paramètres du site</h4>
              </div>
              <p>Utilisez notre gestionnaire de cookies pour personnaliser vos préférences.</p>
              <button class="preference-btn primary" @click="openCookieSettings">
                Gérer les cookies
              </button>
            </div>

            <div class="option-card">
              <div class="option-header">
                <span class="option-icon">🌐</span>
                <h4>Paramètres du navigateur</h4>
              </div>
              <p>Configurez les cookies directement dans votre navigateur web.</p>
              <button
                class="preference-btn secondary"
                @click="showBrowserGuide = !showBrowserGuide"
              >
                Guide navigateurs
              </button>
            </div>
          </div>

          <div v-if="showBrowserGuide" class="browser-guide">
            <h4>Configuration par navigateur :</h4>
            <div class="browser-list">
              <div class="browser-item">
                <strong>Chrome :</strong>
                <span
                  >Paramètres > Confidentialité et sécurité > Cookies et autres données de
                  site</span
                >
              </div>
              <div class="browser-item">
                <strong>Firefox :</strong>
                <span>Préférences > Vie privée et sécurité > Cookies et données de site</span>
              </div>
              <div class="browser-item">
                <strong>Safari :</strong>
                <span>Préférences > Confidentialité > Gérer les données de site web</span>
              </div>
              <div class="browser-item">
                <strong>Edge :</strong>
                <span
                  >Paramètres > Cookies et autorisations du site > Cookies et données de site</span
                >
              </div>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">4. Cookies tiers</h3>
          <p class="section-text">
            Nous utilisons des services tiers qui peuvent placer leurs propres cookies sur votre
            appareil. Voici la liste de nos partenaires :
          </p>

          <div class="third-party-cookies">
            <div class="partner-item">
              <div class="partner-header">
                <span class="partner-icon">📊</span>
                <div>
                  <strong>Google Analytics</strong>
                  <span class="partner-purpose">Analyse d'audience</span>
                </div>
              </div>
              <p>Nous aide à comprendre comment vous utilisez notre site.</p>
              <a href="https://policies.google.com/privacy" target="_blank" class="partner-link">
                Politique de confidentialité →
              </a>
            </div>

            <div class="partner-item">
              <div class="partner-header">
                <span class="partner-icon">💬</span>
                <div>
                  <strong>Intercom</strong>
                  <span class="partner-purpose">Chat support</span>
                </div>
              </div>
              <p>Service de chat en ligne pour le support client.</p>
              <a href="https://www.intercom.com/legal/privacy" target="_blank" class="partner-link">
                Politique de confidentialité →
              </a>
            </div>

            <div class="partner-item">
              <div class="partner-header">
                <span class="partner-icon">🎥</span>
                <div>
                  <strong>YouTube</strong>
                  <span class="partner-purpose">Vidéos intégrées</span>
                </div>
              </div>
              <p>Affichage de vidéos de démonstration et tutoriels.</p>
              <a href="https://policies.google.com/privacy" target="_blank" class="partner-link">
                Politique de confidentialité →
              </a>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">5. Impact de la désactivation</h3>
          <p class="section-text">
            Voici ce qui se passe si vous désactivez certains types de cookies :
          </p>

          <div class="impact-grid">
            <div class="impact-item warning">
              <h4>🚫 Cookies essentiels désactivés</h4>
              <ul>
                <li>Impossibilité de se connecter</li>
                <li>Perte des paramètres de session</li>
                <li>Fonctionnalités de base indisponibles</li>
                <li>Problèmes de sécurité</li>
              </ul>
            </div>

            <div class="impact-item info">
              <h4>⚙️ Cookies fonctionnels désactivés</h4>
              <ul>
                <li>Perte des préférences personnelles</li>
                <li>Langue réinitialisée à chaque visite</li>
                <li>Filtres et paramètres non sauvegardés</li>
                <li>Expérience utilisateur dégradée</li>
              </ul>
            </div>

            <div class="impact-item neutral">
              <h4>📈 Cookies analytiques désactivés</h4>
              <ul>
                <li>Pas d'impact sur l'utilisation</li>
                <li>Anonymat complet de navigation</li>
                <li>Moins d'améliorations personnalisées</li>
                <li>Statistiques d'usage incomplètes</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">6. Durée de conservation</h3>
          <p class="section-text">
            Les cookies ont des durées de vie différentes selon leur fonction :
          </p>

          <div class="duration-chart">
            <div class="duration-item">
              <div class="duration-bar session" style="width: 20%"></div>
              <div class="duration-info">
                <strong>Session</strong>
                <span>Supprimés à la fermeture du navigateur</span>
              </div>
            </div>

            <div class="duration-item">
              <div class="duration-bar short" style="width: 40%"></div>
              <div class="duration-info">
                <strong>1-30 jours</strong>
                <span>Cookies temporaires et de campagne</span>
              </div>
            </div>

            <div class="duration-item">
              <div class="duration-bar medium" style="width: 60%"></div>
              <div class="duration-info">
                <strong>3-12 mois</strong>
                <span>Préférences et paramètres utilisateur</span>
              </div>
            </div>

            <div class="duration-item">
              <div class="duration-bar long" style="width: 100%"></div>
              <div class="duration-info">
                <strong>1-2 ans</strong>
                <span>Analyse et statistiques de long terme</span>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h3 class="section-title">Contact</h3>
          <p class="section-text">Pour toute question concernant notre utilisation des cookies :</p>
          <div class="contact-info">
            <div class="contact-item"><strong>Email :</strong> privacy@trackntrain.com</div>
            <div class="contact-item"><strong>Support :</strong> contact@trackntrain.com</div>
          </div>
        </div>

        <div class="footer">
          <p>
            Cette politique des cookies peut être mise à jour. Consultez régulièrement cette page.
          </p>
          <p class="signature">L'équipe technique,<br /><span class="team">TRACK&TRAIN</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CookiesPage',
  data() {
    return {
      currentDate: '6 septembre 2025',
      showBrowserGuide: false,
    }
  },
  methods: {
    openCookieSettings() {
      console.log('Ouverture du gestionnaire de cookies')
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
  max-width: 1000px;
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

.cookie-explanation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.explanation-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  background: rgba(255, 255, 255, 0.05);
  padding: 15px;
  border-radius: 8px;
}

.explanation-icon {
  font-size: 24px;
  flex-shrink: 0;
}

.explanation-item strong {
  color: #06b6d4;
  display: block;
  margin-bottom: 5px;
  font-size: 14px;
}

.explanation-item p {
  margin: 0;
  font-size: 13px;
}

.cookie-types {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.cookie-category {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 20px;
  border: 2px solid rgba(191, 121, 201, 0.2);
}

.cookie-category.essential {
  border-color: rgba(239, 68, 68, 0.5);
}

.cookie-category.functional {
  border-color: rgba(59, 130, 246, 0.5);
}

.cookie-category.analytics {
  border-color: rgba(16, 185, 129, 0.5);
}

.cookie-category.marketing {
  border-color: rgba(245, 158, 11, 0.5);
}

.category-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.category-icon {
  font-size: 28px;
}

.category-info h4 {
  margin: 0;
  font-size: 18px;
  color: #ffffff;
}

.required-badge {
  background: rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.optional-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #93c5fd;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.category-description {
  margin-bottom: 15px;
  font-size: 14px;
  color: #cbd5e1;
}

.cookie-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.cookie-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 12px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.cookie-item strong {
  color: #06b6d4;
  font-size: 14px;
}

.cookie-details {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
}

.cookie-details span {
  font-size: 12px;
  color: #94a3b8;
}

.preference-options {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin: 20px 0;
}

.option-card {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 12px;
  text-align: center;
}

.option-header {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
}

.option-icon {
  font-size: 32px;
}

.option-card h4 {
  margin: 0;
  color: #ffffff;
  font-size: 16px;
}

.option-card p {
  margin-bottom: 15px;
  font-size: 14px;
  color: #cbd5e1;
}

.preference-btn {
  padding: 10px 20px;
  border-radius: 25px;
  border: none;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preference-btn.primary {
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  color: white;
}

.preference-btn.secondary {
  background: transparent;
  color: #bf79c9;
  border: 2px solid #bf79c9;
}

.preference-btn:hover {
  transform: translateY(-2px);
}

.browser-guide {
  background: rgba(6, 182, 212, 0.1);
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
}

.browser-guide h4 {
  margin: 0 0 15px 0;
  color: #06b6d4;
}

.browser-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.browser-item {
  font-size: 14px;
}

.browser-item strong {
  color: #bf79c9;
  margin-right: 8px;
}

.third-party-cookies {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.partner-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
}

.partner-header {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 10px;
}

.partner-icon {
  font-size: 24px;
}

.partner-header strong {
  color: #06b6d4;
  font-size: 16px;
  display: block;
}

.partner-purpose {
  font-size: 12px;
  color: #94a3b8;
}

.partner-item p {
  margin-bottom: 10px;
  font-size: 14px;
}

.partner-link {
  color: #bf79c9;
  text-decoration: none;
  font-size: 14px;
}

.partner-link:hover {
  text-decoration: underline;
}

.impact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
}

.impact-item {
  background: rgba(255, 255, 255, 0.05);
  padding: 20px;
  border-radius: 8px;
  border-left: 4px solid;
}

.impact-item.warning {
  border-left-color: #ef4444;
}

.impact-item.info {
  border-left-color: #3b82f6;
}

.impact-item.neutral {
  border-left-color: #10b981;
}

.impact-item h4 {
  margin: 0 0 10px 0;
  font-size: 14px;
}

.impact-item ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.impact-item li {
  font-size: 13px;
  padding: 3px 0;
  position: relative;
  padding-left: 15px;
}

.impact-item li:before {
  content: '•';
  position: absolute;
  left: 0;
  color: #bf79c9;
}

.duration-chart {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}

.duration-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.duration-bar {
  height: 8px;
  background: linear-gradient(135deg, #06b6d4 0%, #bf79c9 100%);
  border-radius: 4px;
  min-width: 100px;
}

.duration-info {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.duration-info strong {
  color: #06b6d4;
  font-size: 14px;
}

.duration-info span {
  font-size: 12px;
  color: #94a3b8;
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

  .cookie-explanation,
  .preference-options,
  .impact-grid {
    grid-template-columns: 1fr;
  }

  .cookie-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
