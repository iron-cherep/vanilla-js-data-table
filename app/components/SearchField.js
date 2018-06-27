const SearchField = ({ search }) => `
  <input
    class="input input--search" 
    placeholder="поиск"
    id="search-field"
    name="search-field"
    type="search"
    autofocus
    value="${search || ''}"
  >
`;

export default SearchField;
