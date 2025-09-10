<template>
  <footer class="main-footer">
    <div class="footer-content">
      <div class="footer-section">
        <div class="footer-logo">
          <div class="logo-icon">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M13 10V3L4 14h7v7l9-11h-7z"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <span class="logo-text">TRACK&TRAIN</span>
        </div>
        <p class="footer-description">
          La plateforme qui connecte les coachs sportifs professionnels aux sportifs motivés.
          Atteignez vos objectifs avec les meilleurs outils de suivi.
        </p>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Navigation</h4>
        <ul class="footer-links">
          <li><router-link to="/about-us" class="footer-link">À propos</router-link></li>
          <li><router-link to="/become-coach" class="footer-link">Devenir coach</router-link></li>
          <li><router-link to="/find-coach" class="footer-link">Trouver un coach</router-link></li>
          <li><router-link to="/features" class="footer-link">Fonctionnalités</router-link></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Support</h4>
        <ul class="footer-links">
          <li><router-link to="/feedback" class="footer-link">Support technique</router-link></li>
          <li>
            <a href="mailto:contact@trackntrain.com" class="footer-link">contact@trackntrain.com</a>
          </li>
          <li><a href="tel:+33123456789" class="footer-link">01 23 45 67 89</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4 class="footer-title">Légal</h4>
        <ul class="footer-links">
          <li><router-link to="/cgu" class="footer-link">CGU</router-link></li>
          <li><router-link to="/privacy" class="footer-link">Confidentialité</router-link></li>
          <li><router-link to="/legal" class="footer-link">Mentions légales</router-link></li>
          <li><router-link to="/cookies" class="footer-link">Cookies</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="footer-copyright">
        <p>&copy; {{ currentYear }} TRACK&TRAIN. Tous droits réservés.</p>
        <p class="footer-creator">Créé avec ❤️ par <strong>Baptiste Ferrand</strong></p>
      </div>
      <div class="footer-badges">
        <div class="badge">
          <span class="badge-emoji">🏆</span>
          <span class="badge-text">Plateforme certifiée</span>
        </div>
        <div class="badge">
          <span class="badge-emoji">🔒</span>
          <span class="badge-text">Données sécurisées</span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'AppFooter',
  data() {
    return {
      currentYear: new Date().getFullYear(),
    }
  },
}
</script>

<style scoped>
.main-footer {
  position: relative;
  background: linear-gradient(135deg, rgb(20, 65, 60) 0%, rgb(15, 50, 45) 100%);
  color: #ffffff;
  border-top: 3px solid rgba(219, 126, 219, 0.3);
  width: 100%;
  flex-shrink: 0;
  z-index: 2000 !important;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 20px 40px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
}

.footer-section {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
}

.logo-icon {
  width: 40px;
  height: 40px;
  background: linear-gradient(135deg, #06b6d4 0%, #0891b2 100%);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-icon svg {
  width: 24px;
  height: 24px;
  color: white;
}

.logo-text {
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #db7edb 0%, #06b6d4 100%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-description {
  color: #cbd5e1;
  line-height: 1.6;
  font-size: 14px;
  margin: 0;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  text-decoration: none;
  color: #cbd5e1;
}

.social-link:hover {
  background: linear-gradient(135deg, #db7edb 0%, #06b6d4 100%);
  transform: translateY(-2px);
  color: white;
}

.social-link svg {
  width: 20px;
  height: 20px;
}

.footer-title {
  font-size: 18px;
  font-weight: 600;
  color: #db7edb;
  margin: 0 0 15px 0;
  position: relative;
}

.footer-title::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 30px;
  height: 2px;
  background: linear-gradient(135deg, #db7edb 0%, #06b6d4 100%);
  border-radius: 1px;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.footer-link {
  color: #cbd5e1;
  text-decoration: none;
  font-size: 14px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  padding: 5px 0;
}

.footer-link:hover {
  color: #06b6d4;
  transform: translateX(5px);
}

.footer-link::before {
  content: '→';
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.footer-link:hover::before {
  opacity: 1;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 30px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-copyright {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.footer-copyright p {
  margin: 0;
  font-size: 14px;
  color: #94a3b8;
}

.footer-creator {
  font-size: 13px !important;
}

.footer-creator strong {
  color: #db7edb;
}

.footer-badges {
  display: flex;
  gap: 20px;
}

.badge {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 12px;
  color: #cbd5e1;
}

.badge-emoji {
  font-size: 16px;
}

@media (max-width: 768px) {
  .footer-content {
    padding: 40px 20px 20px;
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-bottom {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .footer-badges {
    justify-content: center;
    flex-wrap: wrap;
  }

  .social-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .footer-content {
    padding: 30px 15px 15px;
  }

  .footer-logo {
    justify-content: center;
  }

  .footer-description {
    text-align: center;
  }

  .footer-section {
    text-align: center;
  }

  .footer-links {
    align-items: center;
  }

  .badge {
    padding: 6px 12px;
    font-size: 11px;
  }
}
</style>
