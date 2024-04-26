const useSearchWeather = () => {

    const searchWeather = async (lat, long) => {
        try {
            const API_KEY = "1f0194f475d6dd822d0979ba522cfe34"
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;
            const response = await fetch(url);
            const result = await response.json();
            return result
        } catch (error) {
            console.log(error);
        }
    }

    return {
        searchWeather
    }
}

export default useSearchWeather