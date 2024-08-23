
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';


const App = () => {

const [pokemonData, setPokemonData] = useState([]);
const [filteredData, setFilteredData] = useState([]);
const [searchTerm, setSearchTerm] = useState('');

useEffect(() => {
const fetchData = async () => {
try {
  const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=100');
   setPokemonData(response.data.results);
   setFilteredData(response.data.results);
} catch (error) {
console.error('Error fetching data:', error);
}
 };
fetchData();
}, []);

useEffect(() => {
    const result = pokemonData.filter(pokemon =>
     pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
);
setFilteredData(result);
}, [searchTerm, pokemonData]);
return (
<div className="App">
   <h1>Pokémon Cards</h1>
   <input type="text" placeholder="Search Pokémon" value={searchTerm} 
   onChange={(e) => setSearchTerm(e.target.value)} />
    <div className="card-container">
    
    {filteredData.map(pokemon => (
        <div key={pokemon.name} className="card">
          <h2>{pokemon.name}</h2>
            <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`} alt={pokemon.name}/>

        </div>
        ))}

    </div>
</div>
);}
export default App;
