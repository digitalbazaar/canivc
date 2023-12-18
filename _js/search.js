(function(document) {
  'use strict';

  /**
   * All data.
   */
  const data = [
    {id: '1', title: 'Lord of the Rings', description: 'A great movie'}
  ];

  /**
   * Create result list item on document.
   *
   * @param {Array} result - List of results.
   * @param {object} resultsEl - Dom element to add results.
   */
  const createListItem = (result, resultsEl) => {
    // List item
    const el = document.createElement('li');
    resultsEl.appendChild(el);
    // Title
    const h3 = document.createElement('h3');
    el.appendChild(h3);
    // Set id
    const a = document.createElement('a');
    a.setAttribute('href', result.id);
    a.textContent = result.title;
    h3.appendChild(a);
    // Add description
    const p = document.createElement('p');
    p.textContent = result.description;
    el.appendChild(p);
  };

  /**
   * Filter data with search term.
   *
   * @param {object} e - Search input event.
   */
  const search = e => {
    // Constants
    const searchInput = e.target.value || ''.toLowerCase();
    const resultsEl = document.getElementById('searchResults');
    const noResultsEl = document.getElementById('noResultsFound');
    const results = data.filter(movie => {
      return movie.title.toLowerCase().includes(searchInput);
    });
    // Clear results
    resultsEl.innerHTML = '';
    // If searchInput is empty, clear results
    if(!searchInput) {
      resultsEl.style.display = 'none';
      noResultsEl.style.display = 'none';
    // If results exist, add to document
    } else if(results.length) {
      resultsEl.style.display = 'block';
      noResultsEl.style.display = 'none';
      results.map(result => createListItem(result, resultsEl));
    // If no results, show no results element
    } else {
      resultsEl.style.display = 'none';
      noResultsEl.style.display = 'block';
    }
  };

  // Add document listener
  document.getElementById('searchField').addEventListener('input', search);
})(document);
