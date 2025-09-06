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
              d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"
            ></path>
          </svg>
          Contactez notre support
        </h2>
      </div>

      <div class="card-content">
        <p class="greeting">Bonjour,</p>

        <p class="main-text">
          Pour toutes réclamations liées à votre compte ou tous problèmes de l'application, nous
          vous invitons à envoyer un email à l'adresse suivante :
        </p>

        <div class="email-container">
          <a href="mailto:contact@trackntrain.com" class="email-link">
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
            contact@trackntrain.com
          </a>
        </div>

        <div class="instructions">
          <h3>Informations importantes :</h3>
          <ul>
            <li>Soyez précis dans votre message en expliquant le problème rencontré</li>
            <li>Fournissez si possible des captures d'écran ou des informations supplémentaires</li>
            <li>Ces détails nous aideront à résoudre votre problème rapidement</li>
          </ul>
        </div>

        <div class="commitment">
          <p><strong>Notre engagement :</strong></p>
          <p>
            Nous nous engageons à répondre dans les plus brefs délais et à faire le nécessaire pour
            résoudre votre problème.
          </p>
        </div>

        <div class="footer">
          <p>Merci de votre compréhension et de votre patience.</p>
          <p class="signature">Cordialement,<br /><span class="team">L'équipe de support</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackPage',
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
  max-width: 700px;
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
  margin-bottom: 8px;
  font-size: 15px;
  color: #ffffff;
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
  .commitment {
    padding: 15px;
  }
}
</style>
