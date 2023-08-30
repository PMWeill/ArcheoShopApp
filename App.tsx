/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {articles} from './articles';
import { MenuContext } from './MenuContext';
import { BoutiqueContext } from './BoutiqueContext';
import { NavMenu } from './components/Menu/NavMenu';
import {Boutique }from './components/Boutique/Boutique';
// import { Footer } from './components/Footer/Footer';
import { Panier } from './components/Panier/Panier';

function App(): JSX.Element {


  // declaration des mes states
  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
      "displayBoutique": true,
      "displayContact": false,
      "displayUl": false,
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false
        },
        {
          text: "Panier",
          url: "#",
          isActive: false
        },
        {
          text: "Contact",
          url: "#",
          isActive: false
        }
      ],
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier,
      "fonctDisplayBoutique": fonctDisplayBoutique,
      "updateOrientation": false,

      /* ajouter les deux fonction display pour Boutique et Contact */
    }
  )
  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "tabPanier": [],
      "totalPanier": 0,
      "decrementQte": decrementQte,
      "incrementQte": incrementQte
    }
  );
  // detection mobile
  function burgerButton(disp: Boolean) {
    //let displayUlTmp = !stateMenu.displayUl
    /* if (disp) {

      document.body.style.height = 'auto';
      document.body.style.overflowY = 'visible';

    } else {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    }
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    }) */
  }

  function fonctDisplayPanier(disp: Boolean) {
    /* if (disp) {
      document.body.style.height = 'auto';
      document.body.style.overflowY = 'visible';

    } else {
      document.body.style.height = '100vh';
      document.body.style.overflowY = 'hidden';
    }
    setStateMenu({
      ...stateMenu,
      "displayUl": disp,
      "displayPanier": !disp
    }) */

  }
  /* creer une fonction pour l'affichage de boutique en fonction de displayBoutique ... */
  /* creer une fonction pour l'affichage de boutique en fonction de displayContact ... */
  function fonctDisplayBoutique() {
    setStateMenu({
      ...stateMenu,
      "displayBoutique": !stateMenu.displayBoutique,
      "displayContact": !stateMenu.displayContact,
    })
  }
  function decrementQte(id: Number) {
    console.log(id);
    // je fais une copie de mon tableau stateArticles car il est en lecture seule
    // et je ne peux pas le modfifier directement.
    let articlesTmp = stateArticles.articles;
    // je modifie la qte de l'article correspondant à l'id transmis par mon component Bouton
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        valeur.qte > 0 && --valeur.qte;
        //valeur.qte === 0 ? valeur.qte = 0 : valeur.qte -= 1;
        // if (valeur.qte === 0) {
        //   valeur.qte = 0;
        // } else {
        //   valeur.qte -= 1;
        // }
      }
    })
    // j'ajoute l'id de l'article acheté au tableau stateArticles.tabPanier
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    console.dir(tmpTabPanier);
    // je réassigne le nouveau tableau article modifié à mon stateArticles
    // grace à sa fonction setStateArticles
    setStateArticles(
      {
        ...stateArticles,// le ...objet, rappelle toutes les propriétées:valeur de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    //mise a jour du total du panier dans le state
    calculTotal()
  }
  function incrementQte(id: Number) {
    // je crée une variable pour l'index du tableau tabPanier
    // que je vais supprimer
    let supprIndex: Number;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        // je récupere dans mon tableau stateArticles.tabPanier l'index de
        // l'article à supprimer
        supprIndex = index;
      }
    })
    // array.splice(index,nb_elements) me permet de supprimer l'index supprIndex
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);
    // Comme dans la fonction précédente je doit maintenant gérer la quantité 
    // d'article disponible et y ajouter une unité
    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {
      if (index === id) {
        ++valeur.qte;
      }
    })
    // une fois toutes les modifications effectuées sur mes tableaux temporaires
    // je peux les affecter à mes state (set)
    setStateArticles(
      {
        ...stateArticles,
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    //mise a jour du total du panier dans le state
    calculTotal();
  }
  function calculTotal() {
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur) => {
      totalTmp += stateArticles.articles[valeur].price;
    })
    setStateArticles(
      {
        ...stateArticles,
        "totalPanier": totalTmp
      }
    )
  }

  return (
    <MenuContext.Provider value={stateMenu}>
      <BoutiqueContext.Provider value={stateArticles}>
        <SafeAreaView>
          <StatusBar />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.background}
          >
            <View>
              <NavMenu></NavMenu>
              <Boutique articles={stateArticles.articles}></Boutique>
              <Panier></Panier>
              {/* <Footer></Footer> */}
            </View>
          </ScrollView>
        </SafeAreaView>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: "#bdd6fc",
    height: "auto",
  },
});

export default App;
