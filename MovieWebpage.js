document.addEventListener('DOMContentLoaded', () => {

  const list = document.querySelector('#movie-list ul');
  const form = document.getElementById('add-movie');
  const input = form.querySelector('input');

  let movies = JSON.parse(localStorage.getItem('movies')) || [];

  // render movies
  function renderMovies() {
    list.innerHTML = "";
    movies.forEach((movie, index) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <span class="name">${movie}</span>
        <span class="delete" data-index="${index}">delete</span>
      `;
      list.appendChild(li);
    });
  }

  // save to localStorage
  function saveMovies() {
    localStorage.setItem("movies", JSON.stringify(movies));
  }

  // add movie
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (input.value === "") return;

    movies.push(input.value);
    saveMovies();
    renderMovies();
    input.value = "";
  });

  // delete movie
  list.addEventListener('click', e => {
    if (e.target.classList.contains('delete')) {
      const index = e.target.dataset.index;
      movies.splice(index, 1);
      saveMovies();
      renderMovies();
    }
  });

  renderMovies();
});
