import React, { useState } from 'react';
import Select from 'react-select';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
//helpers
import getTypeString from '../helpers/GetTypeString';
//components
import Loading from '../components/Loading';
//css
import styles from '../css/pages/PokeList.module.css';

const PokeList = () => {
    const pokemonList = useSelector(state => state.AppReducer.pokemonList);

    const [searchString, setsearchString] = useState('');
    const [selectedWeaknesses, setselectedWeaknesses] = useState([]);
    const [selectedType, setselectedType] = useState([]);
    const types = [
        { value: 'Normal', label: 'Normal' },
        { value: 'Fighting', label: 'Fighting' },
        { value: 'Flying', label: 'Flying' },
        { value: 'Poison', label: 'Poison' },
        { value: 'Ground', label: 'Ground' },
        { value: 'Rock', label: 'Rock' },
        { value: 'Bug', label: 'Bug' },
        { value: 'Ghost', label: 'Ghost' },
        { value: 'Steel', label: 'Steel' },
        { value: 'Fire', label: 'Fire' },
        { value: 'Water', label: 'Water' },
        { value: 'Grass', label: 'Grass' },
        { value: 'Electric', label: 'Electric' },
        { value: 'Psychic', label: 'Psychic' },
        { value: 'Ice', label: 'Ice' },
        { value: 'Dragon', label: 'Dragon' },
        { value: 'Dark', label: 'Dark' },
        { value: 'Fairy', label: 'Fairy' }
    ]
    const filterPokemonList = () => {
        let filteredList = pokemonList;
        //Filter Search Because it is the least expensive in O(n) time
        // Search finds any pokemon with the substring in it's name.
        if (searchString) {
            let lowerCaseSearch = searchString.toLowerCase()
            filteredList = filteredList.filter((listItem) => {
                if (listItem.name.toLowerCase().includes(lowerCaseSearch)) {
                    return true;
                }
                return false;
            })
        }
        //Filter Type Would be O(n^2) if a search happened the n value (151) of pokemon is reduced for each run through 
        //of types 151 should be filtered so next run is reduced (filter what's alreay filtered)
        if (selectedType && selectedType.length > 0) {
            selectedType.forEach((type) => {
                filteredList = filteredList.filter((listItem) => {
                    if (listItem.type.includes(type.value)) {
                        return true;
                    }
                    return false;
                })
            })
        }
        //Filter Weakness after Type so it's O(n^2) but the 151 should be reduced
        if (selectedWeaknesses && selectedWeaknesses.length > 0) {
            selectedWeaknesses.forEach((weakness) => {
                filteredList = filteredList.filter((listItem) => {
                    if (listItem.weaknesses.includes(weakness.value)) {
                        return true;
                    }
                    return false;
                })
            })
        }

        return filteredList;
    }

    const handleWeaknessChange = (result) => {
        // Due to react-select returning null when emptied we need to change this to an empt array to properly 
        //affect state
        if (!result) {
            result = []
        }
        setselectedWeaknesses(result);
    };

    const handleTypeChange = (result) => {
        // Due to react-select returning null when emptied we need to change this to an empt array to properly 
        //affect state
        if (!result) {
            result = []
        }
        setselectedType(result);
    };

    const handleSearchChange = (event) => {
        setsearchString(event.target.value);
    };

    let filteredPokemon = [];
    if (pokemonList && pokemonList.length > 0 && Array.isArray(selectedWeaknesses)) {
        filteredPokemon = filterPokemonList();
        return (
            <div>
                <div>
                    <div>
                        <span>Pokémon Search: </span><input className={styles.SearchBar} onPasteCapture={handleSearchChange} onKeyUp={handleSearchChange}></input>
                    </div>
                    <div className={styles.FilterDiv}>
                        <span className={styles.FilterText}>Filter by: </span>
                        <div className={styles.TextAndSelect}>
                            <span className={styles.FilterText}>Type: </span>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={types}
                                className={styles.DropDown}
                                onChange={handleTypeChange}
                            />
                        </div>
                        <div className={styles.TextAndSelect}>
                            <span className={styles.FilterText}>Weakness: </span>
                            <Select
                                closeMenuOnSelect={false}
                                isMulti
                                options={types}
                                className={styles.DropDown}
                                onChange={handleWeaknessChange}
                            />
                        </div>
                    </div>
                </div>
                {filteredPokemon.length > 0 ? filteredPokemon.map((pokemon) => (
                    <div key={pokemon.id}>
                        <Link to={`/${pokemon.name}`} style={{ color: 'inherit', textDecoration: 'inherit' }}><div className={styles.ListItem}>
                            <div className={styles.NumberText}>{pokemon.id}</div>
                            <div className={styles.ImageContainer}>
                                <img src={pokemon.img} alt={pokemon.name + 'Image'} className={styles.PokemonImage} />
                            </div>
                            <div className={styles.Details}>
                                <div className={styles.NameText}>
                                    <p>{pokemon.name}</p>
                                </div>
                                <div className={styles.TypeWeakness}>
                                    <span className={styles.TypeText}>
                                        Type: {getTypeString(pokemon.type)}
                                    </span>
                                    <span className={styles.WeaknessText}>
                                        Weakness: {getTypeString(pokemon.weaknesses)}
                                    </span>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </div>
                )) :
                    <div className={styles.NoneFound}>
                        <p>No Pokemon Found!</p>
                    </div>}
            </div>
        );
    } else {
        return (
            <Loading />
        )
    }

}

export default PokeList;