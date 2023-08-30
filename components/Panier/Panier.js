import { useContext } from "react";
import "./Panier.css";
import { BoutiqueContext } from "../../BoutiqueContext";
import { MenuContext } from "../../MenuContext";
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
        <div className="backPanier">
            <div className="panier">
                <h2>Votre panier</h2>
                <div className="close" onClick={
                    () => {
                        menuContext.fonctDisplayPanier(menuContext.displayPanier)
                    }
                }>X</div>

                <div>
                    <ul>
                        {
                            //je boucle sur le tableauy tabPanier qui contient les id de mes articles achetés
                            boutiqueContext.tabPanier.length > 0 ?

                                paniertmp.map((valeur, index) => {
                                    let name = boutiqueContext.articles[valeur[0]].name;
                                    let priceU = boutiqueContext.articles[valeur[0]].price
                                    let priceT = boutiqueContext.articles[valeur[0]].price * valeur[1];
                                    let qteA = valeur[1]
                                    let url = boutiqueContext.articles[valeur[0]].url
                                    let isActiveplus = boutiqueContext.articles[valeur[0]].qte === 0 ? true : false


                                    return (
                                        <div key={index} className="cart">
                                            <img src={url} alt={name} width="100px"></img>
                                            <div className="placecartname">
                                                <span className="name">{name}</span>
                                                <span className="prixU">{priceU}€/unité</span>
                                            </div >
                                            <div className="placecartbuy">
                                                <button
                                                    className="boutonCart"
                                                    disabled={isActiveplus}
                                                    onClick={() => { boutiqueContext.decrementQte(valeur[0]) }} >+</button>
                                                <span className="qteAchat">{qteA}</span>
                                                <button
                                                    className="boutonCart moins"
                                                    onClick={() => {
                                                        boutiqueContext.incrementQte(valeur[0])
                                                    }}
                                                >-</button>
                                                <span className="prixT">{priceT}€</span>
                                            </div>

                                        </div>
                                    )
                                })
                                :
                                <div>Votre panier est actuellement vide</div>
                        }
                    </ul>

                </div>
                {
                    boutiqueContext.tabPanier.length > 0 ?
                        <div className="totalCart"> Votre totale : {boutiqueContext.totalPanier} €</div>
                        :
                        <></>
                }
            </div>

        </div>
    )
}
export { Panier }