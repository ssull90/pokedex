import React from 'react';
import { connect } from 'react-redux'
//css
import styles from './App.module.css';
//Images
import title from './img/pokedexTitle.png';
//Pages
import PokeList from './pages/PokeList';
import DetailsPage from './pages/PokemonDetails';
//Redux
import { putPokemonList } from './redux/Actions';
//Router
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
//components
import ErrorScreen from './components/ErrorScreen'

const mapDispatchToProps = dispatch => ({
  putPokemonList: (pokemonList) => dispatch(putPokemonList(pokemonList))
})

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      error: false
    }
  }
  componentDidMount() {
    fetch('https://raw.githubusercontent.com/Biuni/PokemonGO-Pokedex/master/pokedex.json')
      .then(response => response.json()
      )
      .then((data) => {
        if (data.pokemon) {
          this.props.putPokemonList(data.pokemon);
          this.setState({
            pokemonList: data.pokemon,
          });
        }
      }).catch(() => {
        this.setState({
          error: true
        })
      })
  }

  render() {
    return (
      <div className={styles.App}>
        <div className={styles.PokedexTop}>
          <span className={styles.Dots}>
            <div className={styles.WhiteDot}>
              <div className={styles.BlueDot} />
            </div>
            <div className={styles.RedDot} />
            <div className={styles.YellowDot} />
            <div className={styles.GreenDot} />
          </span>
          <span>
            <img src={title} alt='Pokédex' className={styles.TitleImage} />
          </span>
        </div>
        <div className={styles.ScreenBorder}>
          <div className={styles.ScreenBorderHeader}>
            <div className={styles.RedDotSmall} />
            <div className={styles.RedDotSmall} />
          </div>
          <div className={styles.ListContainer} >
            {this.state.error ? <ErrorScreen errorMessage="Oh no! Something went wrong!" /> :
              <Router>
                <Switch>
                  <Route path="/:pokemon">
                    <DetailsPage />
                  </Route>
                  <Route path="/">
                    <PokeList />
                  </Route>
                </Switch>
              </Router>
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  null,
  mapDispatchToProps
)(App);
