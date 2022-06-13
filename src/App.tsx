import React, { useState } from 'react';
import './App.css';

type Product = {
  category: string
  price: string
  stocked: boolean
  name: string
}

export declare interface FilterableProductTableProps {
  products: Product[]
}

function FilterableProductTable(props: FilterableProductTableProps) {
  const [filterText, setFilterText] = useState('');
  const [inStockOnly, setInStockOnly] = useState(false);

  return (
    <div>
      General Market Shop
      <SearchBar 
        filterText={filterText} 
        inStockOnly={inStockOnly}
        setFilterText={setFilterText}
        setInStockOnly={setInStockOnly} />
      <ProductTable 
        products={props.products} 
        filterText={filterText} 
        inStockOnly={inStockOnly} />
    </div>
  )
}

export declare interface SearchBarProps {
  filterText: string
  inStockOnly: boolean
  setFilterText: React.Dispatch<React.SetStateAction<string>>
  setInStockOnly: React.Dispatch<React.SetStateAction<boolean>>
}

function SearchBar(props: SearchBarProps) {
  return (
    <form>
      <input type="text" 
        placeholder="Search..." 
        value={props.filterText}
        onChange={e => props.setFilterText(e.target.value)} />
      <label>
        <input type="checkbox" 
          checked={props.inStockOnly}
          onChange={e => props.setInStockOnly(e.target.checked)} />
        {' '}
        Only show products in stock
      </label>
    </form>
  )
}

export declare interface ProductsProps {
  products: Product[]
  filterText: string
  inStockOnly: boolean
}

function ProductTable(props: ProductsProps) {
  const rows: Object[] = [];
  let lastCategory: string;

  props.products.forEach(product => {
    if (product.name.toLowerCase().indexOf(
          props.filterText.toLowerCase()
        ) === -1 ) {
          return;
    }

    if (props.inStockOnly && !product.stocked ){
      return;
    }

    if (lastCategory !== product.category) {
      rows.push(
        <ProductCategoryRow 
          category={product.category} 
          key={product.category} />
      );
    }
    rows.push(
      <ProductRow
        product={product}
        key={product.name} />
    );

    lastCategory = product.category;
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  )
}


export declare interface ProductCategoryProps {
  category: string;
}

function ProductCategoryRow(props: ProductCategoryProps) {
  return (
    <tr>
      <th colSpan={2}>
        {props.category}
      </th>
    </tr>
  );
}

export declare interface ProductRowProps {
  product: Product;
}

function ProductRow(props: ProductRowProps) {
  const name = props.product.stocked ? props.product.name :
    <span style={{color: 'Red'}}>{props.product.name}</span>;

  return (
    <tr>
      <td>{name}</td>
      <td>{props.product.price}</td>
    </tr>
  )
}

const PRODUCTS = [
  {category: "Fruits", price: "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price: "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price: "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price: "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price: "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price: "$1", stocked: true, name: "Peas"}
];

function App() {
  return (
    <FilterableProductTable products={PRODUCTS} />
  )
}

export default App;
