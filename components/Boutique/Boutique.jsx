

import { StyleSheet, View , Text } from 'react-native';
import MyCard from "../Card/Card";
const stylesBoutique = StyleSheet.create({
    shop: {
        display: "flex",
        backgroundColor: "red",
        height:"auto"


    }

})
function Boutique(props) {
    // if (!props.articles) {
    //     return <Text style={stylesBoutique.shop}>Aucun article disponible</Text>;
    // }

    return (
        <View
            style={stylesBoutique.shop}>
            {
                props.articles.map((value, index) => {
                    console.log(value);
                    return (
                        <>
                        
                        <MyCard
                            article={value}
                            key={index}>

                        </MyCard>

                        </>
                    )
                })

            }


        </View>
    )
}


export { Boutique }