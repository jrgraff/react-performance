import React, { FormEvent, useCallback, useState } from "react"

import { SearchResults } from "../components/SearchResults";

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState([]);

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json();

    setResults(data);
  }

  const onAddToWishlist = useCallback(async (id: number) => {
    console.log(id)
  }, [])

  /** When to use useCallback
   * 1. Referential equality (when passing function to a child component)
   */

  return (
    <div>
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input 
          type="text" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results} onAddToWishlist={onAddToWishlist} />
    </div>
  )
}
