class Forecast{
    constructor(){
        this.APIkey = "SoLuEQUYLZ8W9FHA6v6fAnFhX9c1MNfA";
        this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
        this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
    }

    async updateCity(city){
        const cityDetails = await this.getCity(city);
        const weather = await this.getWeather(cityDetails.Key);

        return{
            cityDetails: cityDetails,
            weather: weather
        };
        }

    async getCity(city){
        //? at the end of a url means you're adding query parameters. Thats why theres a ? at the start
        const query = `?apikey=${this.APIkey}&q=${city}`;
        const response = await fetch(this.cityURI + query);
        const data = await response.json();
            
        console.log("// city details //");
        console.log(data[0]);
        //first index of array is always the desired location. 
        return data[0];
    }

    async getWeather(Key){
        const query = `${Key}?apikey=${this.APIkey}`;

        const response = await fetch(this.weatherURI + query);
        const data = await response.json();

        //first index of array is always the desired weather detail. 
        return data[0];
    }

}







// const APIkey = "SoLuEQUYLZ8W9FHA6v6fAnFhX9c1MNfA";


// //get city information from api
// const getCity = async (city) => {

    
// };

// //get weather information from api
// const getWeather = async (Key) => {

//     const baseEndPoint = "http://dataservice.accuweather.com/currentconditions/v1/";
//     const query = `${Key}?apikey=${APIkey}`;

//     const response = await fetch(baseEndPoint + query);
//     const data = await response.json();

//     //first index of array is always the desired weather detail. 
//     return data[0];
// }

//need to fulfilled (.then()) promises so json data can be accessible.
// getCity("london").then(data => {
//        return getWeather(data.Key)
//     }).then(data => {
//         console.log("// weather details //");
//         console.log(data);
//     })
//     .catch( error => console.log(error) );
