
# 🎲 QuiziFun

Bienvenue dans le projet **QuiziFun**, un jeu éducatif et divertissant combinant électronique, programmation et design ! Conçu pour 1 à 4 joueurs, ce jeu repose sur un système interactif intégrant des manettes Bluetooth autonomes, un écran pour afficher les scores le mode de jeux etc..., et des enceintes pour une immersion sonore.

## 🛠️ Caractéristiques du Projet

- **Écran** : Affiche les scores, instructions messages, et choisir le mode de jeu.
- **Boutons Poussoirs à LED** : Indiquent les options de réponse (nombre de LEDs allumées selon les choix disponibles).
- **Manettes Bluetooth sur Batterie** : Se connectent sans fil au système et détectent automatiquement le nombre de joueurs.
- **Système de Points** : Les scores sont affichés sur l’écran . Le premier joueur à répondre correctement gagne **1000 points**, le second **900 points**, et ainsi de suite.
- **Personnalisation des Questions** : Branchez la raspberry au site web officiel pour créer vos propres questions et réponses et prendre des quiz fait par la communauté.
- **Enceintes** : Diffusent vocalement les questions et les sons d'ambiance.
- **Mode Unique** : Questions flash où le plus rapide à répondre est récompensé.

---

## 📋 Règles du Jeu

1. **Mise en Place** :
   - Allumez les manettes et connectez-les via Bluetooth au système.
   - Chargez ou créez un ensemble de questions via le site web dédié.
2. **Déroulement** :
   - La raspberry pose une question via les enceintes.
   - Les LEDs des boutons poussoirs s’allument pour représenter les options (1, 2, 3 ou 4 choix).
   - Les joueurs répondent en appuyant sur le bouton correspondant à leur réponse.
3. **Attribution des Points** :
   - **1000 points** pour le premier joueur à répondre correctement.
   - **900 points** pour le deuxième, et ainsi de suite.
   - Pas de points pour les mauvaises réponses.
4. **Fin de Partie** :
   - Le joueur avec le score le plus élevé à la fin remporte la partie.

---

## 🔧 Matériel Nécessaire

- **Raspberry** pour l'interface les images les sons les questions.
- **Écran** (tactile).
- **Manettes Bluetooth** avec boutons poussoirs et LEDs intégrées.
- **Batteries rechargeables** pour les manettes.
- **Enceintes** ou un module de sortie audio.

---

## 🚀 Installation et Utilisation

1. **Cloner le Répertoire :**
   ```bash
   git clone https://github.com/sixtartix/QuiziFun.git
   ```

2. **Téléverser le Code sur la raspberry :**
   - Ouvrez le fichier `.py` dans un éditeur de code.
   - Dans le terminal lancer votre propre projet issu de QuiziFun.

3. **Configurer les Manettes :**
   - Assurez-vous que les manettes sont chargées.
   - Synchronisez-les via Bluetooth avec le système Raspberry.

4. **Personnaliser les Questions :**
   - Branchez la raspberry à votre PC.
   - Accédez au site web fourni dans le projet.
   - Ajoutez ou modifiez vos questions et réponses directement en ligne.

5. **Jouer :**
   - Allumez le système et suivez les instructions affichées sur l’écran.

---

## 📂 Structure du Projet

```
quiz-interactif-arduino/
├── code/
│   ├── quiz.ino
│   ├── libraries/
├── schematics/
│   ├── wiring-diagram.png
├── web/
│   ├── index.html
│   ├── scripts.js
│   ├── styles.css
├── README.md
└── LICENSE
```

---

## 🖼️ Aperçus

### Schéma du Câblage
_(Bientôt disponible)_

### Interface Web
_(Bientôt disponible)_

---

## 🤝 Contributeurs

- **Dorian**, **Augustin**, **Nathan**, **Wesley** - Concepteurs et développeurs principaux.
- **Équipe Lycée Tocqueville STI2D** - Partenaires du projet.

---

## 📜 Licence

Ce projet est sous licence [MIT](LICENSE). Vous êtes libre de le modifier et de l’utiliser, mais veuillez créditer les auteurs originaux.
