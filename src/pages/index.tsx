import React, { FormEvent, useCallback, useState } from "react"

import { SearchResults } from "../components/SearchResults";

type Product = {
  id: number;
  price: number;
  priceFormatted: string;
  title: string;
}

type ResultsProps = {
  totalPrice: number;
  data: Product[];
}

export default function Home() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<ResultsProps>({
    totalPrice: 0,
    data: []
  });

  async function handleSearch(event: FormEvent) {
    event.preventDefault();

    if (!search.trim()) {
      return;
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data: Product[] = await response.json();

    const formatter = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })

    const products = data.map(product => {
      return {
        id: product.id,
        title: product.title,
        price: product.price,
        priceFormatted: formatter.format(product.price)
      }
    })

    const totalPrice = data.reduce((total: number, product: Product) => {
        return total + product.price
      }, 0)

    setResults({ totalPrice, data: products });
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

      <SearchResults
        results={results.data}
        totalPrice={results.totalPrice}
        onAddToWishlist={onAddToWishlist} 
      />
    </div>
  )
}
