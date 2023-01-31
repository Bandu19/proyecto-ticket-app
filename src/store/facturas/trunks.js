import axios from "axios"
// import { pokemonApi } from "../../api/pokemonApi"
import { setFacturas, starLoadingFacturas } from "./facturasSlice"



export const getFacturas = () => {

    return async (dispatch, getState) => {
        dispatch(starLoadingFacturas())

        // TODO: realizar petición http
        // const resp = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${page * 10}`)
        // const data = await resp.json()
        const config = {
            headers: {
                'Accept': 'application/json'
                // 'Content-Type': 'multipart/form-data'

            }
        }
        const formData = new FormData()

        const key = "f9c54ed6-d851-4772-9e9d-7bd75da75467"
        formData.append('magic-key', key)
        
        await axios.get('https://dolphin-app-2p6gu.ondigitalocean.app/cfdi',formData,config)
            .then(response => {
                // setData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.log(error);
            });

        // dispatch(setFacturas({pokemons: data.results}))

    }

}