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
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            ></path>
          </svg>
          Conditions Générales d'Utilisation
        </h2>
      </div>

      <div class="card-content">
        <div class="intro-section">
          <p class="greeting">Dernière mise à jour : {{ currentDate }}</p>
          <p class="main-text">
            Les présentes Conditions Générales d'Utilisation (CGU) régissent l'utilisation de la
            plateforme TRACK&TRAIN, éditée par Baptiste Ferrand. En accédant à notre service, vous
            acceptez sans réserve les présentes conditions.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">1. Présentation du service</h3>
          <p class="section-text">
            TRACK&TRAIN est une plateforme numérique qui met en relation les coachs sportifs
            professionnels et les sportifs souhaitant bénéficier d'un accompagnement personnalisé.
            Le service propose également des outils de gestion et de suivi pour faciliter le travail
            des professionnels du sport.
          </p>
        </div>

        <div class="section">
          <h3 class="section-title">2. Acceptation des conditions</h3>
          <div class="subsection">
            <p class="section-text">
              L'utilisation de TRACK&TRAIN implique l'acceptation pleine et entière des présentes
              CGU. Ces conditions peuvent être modifiées à tout moment. Les utilisateurs seront
              informés de toute modification par email et/ou notification sur la plateforme.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">3. Inscription et comptes utilisateurs</h3>
          <div class="subsection">
            <h4 class="subsection-title">3.1 Conditions d'inscription</h4>
            <ul class="section-list">
              <li>Être âgé de 16 ans minimum (autorisation parentale requise pour les mineurs)</li>
              <li>Fournir des informations exactes et à jour lors de l'inscription</li>
              <li>Choisir un mot de passe sécurisé et le maintenir confidentiel</li>
              <li>Ne créer qu'un seul compte par personne</li>
            </ul>

            <h4 class="subsection-title">3.2 Comptes coachs</h4>
            <p class="section-text">
              Les coachs doivent fournir les justificatifs suivants pour être validés :
            </p>
            <ul class="section-list">
              <li>Diplôme de coach sportif reconnu par l'État</li>
              <li>Carte professionnelle d'éducateur sportif en cours de validité</li>
              <li>SIRET d'entreprise ou statut d'auto-entrepreneur</li>
              <li>Attestation d'assurance responsabilité civile professionnelle</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">4. Utilisation de la plateforme</h3>
          <div class="subsection">
            <h4 class="subsection-title">4.1 Usage autorisé</h4>
            <p class="section-text">
              Les utilisateurs s'engagent à utiliser TRACK&TRAIN uniquement dans le cadre
              d'activités de coaching sportif légales et conformes aux présentes CGU.
            </p>

            <h4 class="subsection-title">4.2 Comportements interdits</h4>
            <ul class="section-list">
              <li>Publier des contenus offensants, discriminatoires ou illégaux</li>
              <li>Harceler, menacer ou intimider d'autres utilisateurs</li>
              <li>Utiliser la plateforme à des fins commerciales non autorisées</li>
              <li>Tenter de contourner les mesures de sécurité</li>
              <li>Usurper l'identité d'autrui</li>
              <li>Diffuser des virus ou codes malveillants</li>
            </ul>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">5. Données personnelles et confidentialité</h3>
          <div class="subsection">
            <p class="section-text">
              La collecte et le traitement des données personnelles sont régis par notre Politique
              de Confidentialité, conforme au RGPD. Les utilisateurs disposent d'un droit d'accès,
              de rectification et de suppression de leurs données personnelles.
            </p>
            <p class="section-text">
              Contact pour les demandes relatives aux données :
              <strong>privacy@trackntrain.com</strong>
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">6. Propriété intellectuelle</h3>
          <div class="subsection">
            <p class="section-text">
              TRACK&TRAIN et l'ensemble de ses éléments (design, textes, images, logos,
              fonctionnalités) sont protégés par les droits de propriété intellectuelle. Toute
              reproduction, représentation ou diffusion, même partielle, sans autorisation expresse
              est interdite.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">7. Responsabilités</h3>
          <div class="subsection">
            <h4 class="subsection-title">7.1 Responsabilité de TRACK&TRAIN</h4>
            <p class="section-text">
              TRACK&TRAIN s'efforce d'assurer la disponibilité et la sécurité de sa plateforme.
              Cependant, nous ne garantissons pas un fonctionnement ininterrompu et déclinons toute
              responsabilité en cas de dysfonctionnements techniques.
            </p>

            <h4 class="subsection-title">7.2 Responsabilité des utilisateurs</h4>
            <p class="section-text">
              Les utilisateurs sont seuls responsables de leurs actions sur la plateforme et des
              conséquences de leurs interactions. Les coachs sont responsables de leurs prestations
              et de leur conformité avec la réglementation en vigueur.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">8. Tarifs et paiements</h3>
          <div class="subsection">
            <p class="section-text">
              L'inscription sur TRACK&TRAIN est gratuite. Les éventuels frais de service ou
              commissions sur les transactions entre coachs and sportifs seront clairement affichés
              avant validation de toute opération.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">9. Suspension et résiliation</h3>
          <div class="subsection">
            <p class="section-text">
              TRACK&TRAIN se réserve le droit de suspendre ou supprimer tout compte en cas de
              non-respect des présentes CGU, sans préavis ni indemnité. Les utilisateurs peuvent
              supprimer leur compte à tout moment depuis les paramètres de leur profil.
            </p>
          </div>
        </div>

        <div class="section">
          <h3 class="section-title">10. Droit applicable et litiges</h3>
          <div class="subsection">
            <p class="section-text">
              Les présentes CGU sont régies par le droit français. En cas de litige, les parties
              s'efforceront de trouver une solution amiable. À défaut, les tribunaux français seront
              compétents.
            </p>
          </div>
        </div>

        <div class="contact-section">
          <h3 class="section-title">Contact</h3>
          <p class="section-text">
            Pour toute question relative aux présentes CGU, vous pouvez nous contacter :
          </p>
          <div class="contact-info">
            <div class="contact-item"><strong>Email :</strong> contact@trackntrain.com</div>
            <div class="contact-item"><strong>Éditeur :</strong> Baptiste Ferrand</div>
            <div class="contact-item">
              <strong>TRACK&TRAIN</strong> - Plateforme de coaching sportif
            </div>
          </div>
        </div>

        <div class="footer">
          <p>Ces conditions sont effectives à compter du {{ currentDate }}</p>
          <p class="signature">L'équipe juridique,<br /><span class="team">TRACK&TRAIN</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CGUPage',
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

.subsection {
  margin-bottom: 20px;
}

.subsection-title {
  font-size: 16px;
  font-weight: 600;
  color: #bf79c9;
  margin-bottom: 10px;
  margin-top: 20px;
}

.section-text {
  font-size: 15px;
  margin-bottom: 15px;
  text-align: justify;
  line-height: 1.6;
}

.section-list {
  margin: 15px 0;
  padding-left: 20px;
}

.section-list li {
  margin-bottom: 8px;
  font-size: 14px;
  line-height: 1.5;
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

  .title {
    font-size: 20px;
  }

  .section {
    padding: 20px;
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
    font-size: 18px;
    flex-direction: column;
    gap: 8px;
  }

  .section {
    padding: 15px;
  }

  .section-title {
    font-size: 16px;
  }

  .subsection-title {
    font-size: 14px;
  }
}
</style>
