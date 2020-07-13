import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import getTypeString from '../helpers/GetTypeString';
//css
import styles from '../css/pages/PokemonDetails.module.css';
//Loading
import ErrorScreen from '../components/ErrorScreen';


const DetailsPage = () => {
    const pokemonList = useSelector(state => state.AppReducer.pokemonList);
    const { pokemon } = useParams();

    let pokemonObject;
    let prev_evolution;
    let next_evolution;
    let prev_evolutionLink;
    let next_evolutionLink;
    if (pokemonList) {
        pokemonObject = pokemonList.find(value => value.name === pokemon);
    }

    if (pokemonObject) {
        if (pokemonObject.prev_evolution) {
            prev_evolution = pokemonObject.id - 2;
            prev_evolutionLink = `/${pokemonList[prev_evolution].name}`
        }
        if (pokemonObject.next_evolution) {
            next_evolution = pokemonObject.id;
            next_evolutionLink = `/${pokemonList[next_evolution].name}`
        }
        return (
            <div>
                <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}><div className={styles.LeftArrow}></div></Link>
                <div className={styles.Title}>
                    <h1 className={styles.PokemonName}>{pokemonObject.num}: {pokemonObject.name}</h1>
                </div>
                <div className={styles.DetailsDiv}>
                    <div className={styles.PhotoDiv}>
                        <img src={pokemonObject.img} alt={pokemon.name + 'Image'} className={styles.PokemonImage} />
                    </div>
                    <div className={styles.InfoDiv}>
                        <p className={styles.InfoText}>Height: {pokemonObject.height}</p>
                        <p className={styles.InfoText}>Weight: {pokemonObject.weight}</p>
                        <p className={styles.InfoText}>Type: {getTypeString(pokemonObject.type)}</p>
                        <p className={styles.InfoText}>Weakness: {getTypeString(pokemonObject.weaknesses)}</p>
                    </div>
                </div>
                <div className={styles.NextPrevDiv}>
                    {pokemonObject.prev_evolution ? (
                        <div className={styles.NextPrev}>
                        <Link to={prev_evolutionLink} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <div>
                                <p>Previous Evolution</p>
                                <img src={pokemonList[prev_evolution].img} alt={pokemon.name + 'Image'} className={styles.PokemonImage} />
                                <p>{pokemonList[prev_evolution].name}</p>
                            </div>
                        </Link>
                        </div>
                    ) : null}
                    {pokemonObject.next_evolution ? (
                        <div className={styles.NextPrev}>
                        <Link to={next_evolutionLink} style={{ color: 'inherit', textDecoration: 'inherit' }}>
                            <div>
                                <p>Next Evolution</p>
                                <img src={pokemonList[next_evolution].img} alt={pokemon.name + 'Image'} className={styles.PokemonImage} />
                                <p>{pokemonList[next_evolution].name}</p>
                            </div>
                        </Link>
                        </div>
                    ) : null}
                </div>
            </div>
        );
    }
    return (
        <div>
            <Link to="/" style={{ color: 'inherit', textDecoration: 'inherit' }}><div className={styles.LeftArrow}></div></Link>
            <ErrorScreen errorMessage={`Oh No! No pokemon by the name ${pokemon}.`} />
        </div>
    );
}

export default DetailsPage