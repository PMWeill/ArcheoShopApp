
import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View
} from 'react-native';
import { articles } from './articles';
import { MenuContext } from './MenuContext';
import  {BoutiqueContext}  from './BoutiqueContext';
import { NavMenu } from './components/NavMenu/NavMenu';
import  { Boutique }  from './components/Boutique/Boutique';
import { Panier } from './components/Panier/Panier';

function App(): JSX.Element {
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

    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.push(id)
    setStateArticles({
      ...stateArticles,
      "articles": articlesTmp,
      "tabPanier": tmpTabPanier
    });
    calculTotal()
  }


  function incrementQte(id: number) {
    let supprIndex: Number;
    stateArticles.tabPanier.find((value, index) => {
      if (value === id) {

      }
    })

    const tmpTabPanier = stateArticles.tabPanier;
    tmpTabPanier.splice(supprIndex, 1);

    let articlesTmp = stateArticles.articles;
    articlesTmp.map((valeur, index) => {

      if (index === id) {
        valeur.qte > 0 && ++valeur.qte;

      }
    })



    setStateArticles(
      {
        ...stateArticles,
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
            <View style={styles.bgScrollView}>
            <NavMenu></NavMenu>
             <Panier></Panier>
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

export { App };
