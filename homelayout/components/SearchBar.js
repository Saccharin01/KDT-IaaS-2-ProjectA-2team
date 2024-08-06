import React from 'react';
import styles from '../styles/SearchBar.module.css';

const SearchBar = ({ query, setQuery, onSearch }) => (
  <div className={styles.searchBar}>
    <input
      type="text"
      placeholder="Search for books..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
    <button onClick={onSearch}>Search</button>
  </div>
);

export default SearchBar;