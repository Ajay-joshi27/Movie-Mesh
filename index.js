window.addEventListener('DOMContentLoaded', () => {
  let filmData = [];

  const xhr = new XMLHttpRequest();
  xhr.open('GET', './server.json');
  xhr.send();

  xhr.addEventListener('load', () => {
    if (xhr.status === 200) {
      try {
        filmData = JSON.parse(xhr.responseText);
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Failed to load data. Status:", xhr.statusText);
    }
  });

  xhr.addEventListener('error', () => {
    console.error("Network error while fetching the data.");
  });

  const input = document.getElementById('inputtext');
  const container = document.getElementById('container');

  input.addEventListener('input', () => {
    const search = input.value.toLowerCase();
    container.innerHTML = '';

    const results = filmData.filter(film =>
      film.film.toLowerCase().startsWith(search)
    );

    if (results.length === 0) {
      const noMatch = document.createElement('div');
      noMatch.classList.add('no-results');
      noMatch.textContent = "No matching actors found.";
      container.appendChild(noMatch);
      return;
    }

    results.forEach(film => {
      const card = document.createElement('div');
      card.classList.add('film-card');
      card.innerHTML = `
        <h4>${film.actor}</h4>
        <p><strong>Film:</strong> ${film.film}</p>
        <p><strong>Director:</strong> ${film.director}</p>
      `;
      container.appendChild(card);
    });
  });
});
