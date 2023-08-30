import { useContext } from "react";
import "./Panier.css";
import { BoutiqueContext } from "../../BoutiqueContext";
import { MenuContext } from "../../MenuContext";
import { Text, View } from "react-native";
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
        console.dir(paniertmp);
    }

    return (
        <View className="backPanier">
            <View className="panier">
                <Text>Votre panier</Text>
                <View className="close" onClick={
                    () => {
                        menuContext.fonctDisplayPanier(menuContext.displayPanier)
                    }
                }>X</View>

                <View>
                    <Text>
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
                                        <View key={index} className="cart">
                                            <Imgage source={url} alt={name} width="100px"></Imgage>
                                            <View className="placecartname">
                                                <Text className="name">{name}</Text>
                                                <Text className="prixU">{priceU}€/unité</Text>
                                            </View >
                                            <View className="placecartbuy">
                                                <Button
                                                    className="boutonCart"
                                                    disabled={isActiveplus}
                                                    onClick={() => { boutiqueContext.decrementQte(valeur[0]) }} >+</Button>
                                                <Text className="qteAchat">{qteA}</Text>
                                                <Button
                                                    className="boutonCart moins"
                                                    onClick={() => {
                                                        boutiqueContext.incrementQte(valeur[0])
                                                    }}
                                                >-</Button>
                                                <Text className="prixT">{priceT}€</Text>
                                            </View>

                                        </View>
                                    )
                                })
                                :
                                <Text>Votre panier est actuellement vide</Text>
                        }
                    </Text>

                </View>
                {
                    boutiqueContext.tabPanier.length > 0 ?
                        <Text className="totalCart"> Votre totale : {boutiqueContext.totalPanier} €</Text>
                        :
                        <></>
                }
            </View>

        </View>
    )
}
export { Panier }