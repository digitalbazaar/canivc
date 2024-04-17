import {createApp, reactive} from "https://unpkg.com/petite-vue?module";

const store = reactive({
  searchTerm: "",
  searchResults: [],
  paginationNumber: 5,
  loadingResults: false,
  get resultText() {
    return `${this.searchResults.length} results from '${this.searchTerm}'`;
  },
  showMoreResults() {
    this.paginationNumber = this.paginationNumber + 5;
  },
  toggleLoading() {
    this.loadingResults = !this.loadingResults;
  },
  async updateResults() {
    if(!this.loadingResults) {
      this.toggleLoading();
    }
    const pagefind = await import("/pagefind/pagefind.js");
    const search = await pagefind.debouncedSearch(this.searchTerm);
    if(search !== null) {
      this.paginationNumber = 5;
      this.searchResults = await Promise.all(
        search.results.map(r => r.data())
      );
      if(this.loadingResults) {
        this.toggleLoading();
      }
    }
  },
});

// Make global state available with app scopes
createApp({store}).mount();
