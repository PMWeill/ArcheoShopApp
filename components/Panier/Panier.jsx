import React,{ useContext } from "react";

import { BoutiqueContext } from "../../BoutiqueContext";
import { MenuContext } from "../../MenuContext";
import {Button} from "react-native-paper";
import { Text, View, Image  } from "react-native";
const Panier = () => {
    const boutiqueContext = useContext(BoutiqueContext);
    const menuContext = useContext(MenuContext);
    const paniertmp = [];
    if (boutiqueContext.tabPanier.length > 0) {
        // sort permet de trier mon panier
        const tabPanier = boutiqueContext.tabPanier.sort();

        let i = 0;
        tabPanier.map((valeur, index) => {
            i++;
            if (valeur !== tabPanier[index + 1]) {
                paniertmp.push([valeur, i]);
                i = 0
            }

        })
      
    }

    return (
        <View>
                <Text>Votre panier</Text>


                <View>

                    {
                        boutiqueContext.tabPanier.length > 0 ?

                            paniertmp.map((valeur, index) => {
                                let name = boutiqueContext.articles[valeur[0]].name;
                                let priceU = boutiqueContext.articles[valeur[0]].price
                                let priceT = boutiqueContext.articles[valeur[0]].price * valeur[1];
                                let qteA = valeur[1]
                                let url = boutiqueContext.articles[valeur[0]].url
                                let isActiveplus = boutiqueContext.articles[valeur[0]].qte === 0 ? true : false

                                return (
                                    <View key={index} >
                                        <Image source={url} ></Image>
                                        <View >
                                            <Text>{name}</Text>
                                            <Text >{priceU}€/unité</Text>
                                        </View >
                                        <View>
                                            <Button
                                                disabled={isActiveplus}
                                                onPress={() => { boutiqueContext.decrementQte(valeur[0]) }} >+</Button>
                                            <Text>{qteA}</Text>
                                            <Button
                                                onPress={() => {
                                                    boutiqueContext.incrementQte(valeur[0])
                                                }}
                                            >-</Button>
                                            <Text >{priceT}€</Text>
                                        </View>

                                    </View>
                                )
                            })
                            :
                            <Text>Votre panier est actuellement vide</Text>
                    }


                </View>
                {
                    boutiqueContext.tabPanier.length > 0 ?
                        <Text> Votre totale : {boutiqueContext.totalPanier} €</Text>
                        :
                        <></>
                }
           
        </View>
    )
}
export { Panier }