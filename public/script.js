document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-question-form');
    const optionsSelect = document.getElementById('options');
    const answersSection = document.getElementById('answers-section');
    const questionsTableBody = document.getElementById('questions-table-body');
    const arduinoStatus = document.getElementById('arduino-status');

    const updateAnswersSection = (numOptions) => {
        answersSection.innerHTML = '';
        if (numOptions === 2) {
            const trueLabel = document.createElement('label');
            trueLabel.textContent = 'Vrai :';
            const trueInput = document.createElement('input');
            trueInput.type = 'radio';
            trueInput.name = 'answer';
            trueInput.value = 'Vrai';
            trueInput.classList.add('answer-input');
            trueInput.required = true;
            answersSection.appendChild(trueLabel);
            answersSection.appendChild(trueInput);

            const falseLabel = document.createElement('label');
            falseLabel.textContent = 'Faux :';
            const falseInput = document.createElement('input');
            falseInput.type = 'radio';
            falseInput.name = 'answer';
            falseInput.value = 'Faux';
            falseInput.classList.add('answer-input');
            falseInput.required = true;
            answersSection.appendChild(falseLabel);
            answersSection.appendChild(falseInput);
        } else {
            for (let i = 0; i < numOptions; i++) {
                const label = document.createElement('label');
                label.textContent = `Réponse ${i + 1} :`;
                const input = document.createElement('input');
                input.type = 'text';
                input.name = `answer${i + 1}`;
                input.id = `answer${i + 1}`;
                input.classList.add('answer-input');
                input.required = true;
                answersSection.appendChild(label);
                answersSection.appendChild(input);
            }
        }
    };

    optionsSelect.addEventListener('change', (event) => {
        const numOptions = parseInt(event.target.value);
        updateAnswersSection(numOptions);
    });

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const theme = document.getElementById('theme').value;
        const question = document.getElementById('question').value;
        const numOptions = parseInt(document.getElementById('options').value);
        const answers = [];
        let correctOption = null;

        if (numOptions === 2) {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (selectedAnswer) {
                correctOption = selectedAnswer.value;
            }
        } else {
            for (let i = 0; i < numOptions; i++) {
                const answerInput = document.getElementById(`answer${i + 1}`);
                answers.push(answerInput.value);
                if (answerInput.classList.contains('correct')) {
                    correctOption = i + 1;
                }
            }
        }

        if (correctOption === null) {
            alert('Veuillez sélectionner la réponse correcte.');
            return;
        }

        // Envoyer les données au serveur
        fetch('/add-question', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ theme, question, answers, correctOption })
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log('Success:', data);
            // Ajouter la question au tableau
            const row = document.createElement('tr');
            const themeCell = document.createElement('td');
            themeCell.textContent = theme;
            const questionCell = document.createElement('td');
            questionCell.textContent = question;
            const answersCell = document.createElement('td');
            answersCell.textContent = numOptions === 2 ? correctOption : answers.join(', ');
            row.appendChild(themeCell);
            row.appendChild(questionCell);
            row.appendChild(answersCell);
            questionsTableBody.appendChild(row);
            // Réinitialiser le formulaire
            form.reset();
            updateAnswersSection(numOptions);
        }).catch(error => {
            console.error('Error:', error);
        });
    });

    answersSection.addEventListener('click', (event) => {
        if (event.target.classList.contains('answer-input')) {
            document.querySelectorAll('.answer-input').forEach(input => {
                input.classList.remove('correct');
            });
            event.target.classList.add('correct');
        }
    });

    // Initialiser la section des réponses avec 2 options par défaut
    updateAnswersSection(2);

    // Vérifier la connexion de l'Arduino
    fetch('/arduino-status')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.connected) {
                arduinoStatus.textContent = 'Statut de l\'Arduino : Connecté';
                arduinoStatus.style.color = '#00ff00';
            } else {
                arduinoStatus.textContent = 'Statut de l\'Arduino : Non connecté';
                arduinoStatus.style.color = '#ff0000';
            }
        })
        .catch(error => {
            console.error('Error checking Arduino status:', error);
        });
});
