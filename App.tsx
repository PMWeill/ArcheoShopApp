/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { articles } from './articles.js';
import { MenuContext } from './MenuContext.js';
import { BoutiqueContext } from './BoutiqueContext.js';
import NavMenu from './components/NavMenu/NavMenu.js';
import { Boutique } from './components/Boutique/Boutique.jsx';


function App(): JSX.Element {
  // declaration de mes states
  const [stateArticles, setStateArticles] = useState(
    {
      "articles": articles,
      "tabPanier": [],
      "totalPanier": 0,
      "decrementQte": decrementQte,
      "incrementQte": incrementQte
    }
  );
  const [stateMenu, setStateMenu] = useState(
    {
      "displayPanier": false,
      "displayUl": false,
      "tabMenuNav": [
        {
          text: "Magasin",
          url: "#",
          isActive: false,
        },
        {
          text: "Panier",
          url: "#",
          isActive: false,
        },
        {
          text: "Contact",
          url: "#",
          isActive: false,
        },
      ],
      "burgerButton": burgerButton,
      "fonctDisplayPanier": fonctDisplayPanier

    }
  )
  // function responsive() {
  //   let orientation; //true =>portrait mobile
  //   if (window.innerWidth > window.innerHeight) {
  //     orientation = false;
  //     // ou utiliser l'event deviceOrientation
  //   } else {
  //     orientation = true;
  //   }
  //   return orientation;
  // }
  function burgerButton(disp: boolean) {
    setStateMenu({
      ...stateMenu,
      "displayUl": !disp
    })

  }
  function fonctDisplayPanier(disp: boolean) {
    // if (disp) {
    //   document.body.style.height = "auto";
    //   document.body.style.overflow = "visible";
    // } else {
    //   document.body.style.height = "100vh";
    //   document.body.style.overflow = "hidden";
    // }
    setStateMenu({
      ...stateMenu,
      "displayPanier": !disp
    })

  }
  function decrementQte(id: number) {
    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {

      if (index === id) {
        valeur.qte > 0 && --valeur.qte;

      }
    })

    //je ajoute l'id de l'article acheté au tableau stateArticles.tabPanier
    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    // je réasigne le nvx tableau article modifié à mon stateArticles grâce à sa fonction setStateArticles
    setStateArticles({
      ...stateArticles,//le ...objet, rappelle toutes les propriétées de l'objet
      "articles": articlesTmp,
      "tabPanier": tmpTabPanier
    });
    calculTotal()
  }


  function incrementQte(id: number) {
    let supprIndex: Number;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {
        //je recupére dans mon tableau stateArticles.tabPanier l'indec de l'article à supprimer
        supprIndex = index;

      }
    })

    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);

    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {

      if (index === id) {
        valeur.qte > 0 && ++valeur.qte;
        // ou  valeur.qte === 0 ? valeur.qte = 0 : valeur.qte -= 1;

      }
    })



    setStateArticles(
      {
        ...stateArticles,//le ...objet, rappelle toutes les propriétées de l'objet
        "articles": articlesTmp,
        "tabPanier": tmpTabPanier
      }
    );
    calculTotal()
  }
  function calculTotal() {
    let totalTmp = 0;
    stateArticles.tabPanier.map((valeur,) => {
      totalTmp += stateArticles.articles[valeur].price
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
        <SafeAreaView >
          <StatusBar />

          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.bgScrollView}
          >
            <NavMenu></NavMenu>
            <View style={styles.bgScrollView}>
              
              <Boutique articles={stateArticles.articles}></Boutique>
            </View >
          </ScrollView>

        </SafeAreaView>
      </BoutiqueContext.Provider>
    </MenuContext.Provider>
  );
}

const styles = StyleSheet.create({
  bgScrollView: {
    height: "auto",
    backgroundColor: "yellow"
  },
  monMenu: {
    backgroundColor: "green",
    height: 250,
  }
});

export default App;
