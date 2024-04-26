import { useState, useEffect } from "react";

const useSearchCity = () => {
    const [cityResult, setCityResult] = useState(null)
    const [city, setCity] = useState(null)
    const [error, setError] = useState(null)

    // Fetch data to search the city latitude y longitude
    const searchCity = async () => {
        try {
            if (city === null) return

            const API_KEY = "1f0194f475d6dd822d0979ba522cfe34"
            const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
                 
            const response = await fetch(url);
            const result = await response.json();
            setCityResult(result)
        }
        catch (error) {
            console.error(error);
        }        
    }

    // Valid the city name to ftech data 
    const validCity = (e) => {
        e.preventDefault()
        const input = e.target.city.value
        const regex = new RegExp(/^[a-zA-Z\s]+$/)
        if (input.startsWith(" ")) {
            setError("City name cannot start with a blank space")
            return
        }
        if (!regex.test(input)) {
            setError("Invalid city name")
            return
        }
        if (input.length >= 25) {
            setError("City name has to be less than 25 characters")
            return
        }
        if (input.length < 3) {
            setError("City name has to be more than 3 characters")
            return
        }

        setError(null)
        setCity(input.trim())
    }

    const success = (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setCityResult([{lat: latitude, lon: longitude}])
    }


    // Get the current position of the navigator
    const getCurrentLocation = () => {
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser")
            return
        }

        navigator.geolocation.getCurrentPosition(success, () => {
            alert("Unable to retrieve your location")
        });
    }


    useEffect(() => {
        if (city === null) return

        searchCity()
    }, [city])

    return {
        validCity,
        error,
        cityResult,
        getCurrentLocation
    }
}


export default useSearchCity