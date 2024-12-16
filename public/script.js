document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('add-question-form');
    const optionsSelect = document.getElementById('options');
    const answersSection = document.getElementById('answers-section');
    const questionsTableBody = document.getElementById('questions-table-body');

    const updateAnswersSection = (numOptions) => {
        answersSection.innerHTML = '';
        for (let i = 0; i < numOptions; i++) {
            const label = document.createElement('label');
            label.textContent = `Réponse ${i + 1} :`;
            const input = document.createElement('input');
            input.type = 'text';
            input.name = `answer${i + 1}`;
            input.id = `answer${i + 1}`;
            input.classList.add('answer-input');
            answersSection.appendChild(label);
            answersSection.appendChild(input);
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

        for (let i = 0; i < numOptions; i++) {
            const answerInput = document.getElementById(`answer${i + 1}`);
            answers.push(answerInput.value);
            if (answerInput.classList.contains('correct')) {
                correctOption = i + 1;
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
        }).then(response => response.json())
          .then(data => {
              console.log('Success:', data);
              // Ajouter la question au tableau
              const row = document.createElement('tr');
              const themeCell = document.createElement('td');
              themeCell.textContent = theme;
              const questionCell = document.createElement('td');
              questionCell.textContent = question;
              const answersCell = document.createElement('td');
              answersCell.textContent = answers.join(', ');
              row.appendChild(themeCell);
              row.appendChild(questionCell);
              row.appendChild(answersCell);
              questionsTableBody.appendChild(row);
              // Réinitialiser le formulaire
              form.reset();
              updateAnswersSection(numOptions);
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
});
