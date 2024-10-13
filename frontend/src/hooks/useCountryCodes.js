import { useState, useEffect } from "react";
import axios from "axios";

const useCountryCodes = () => {
  const [countryCodes, setCountryCodes] = useState([]);

  useEffect(() => {
    const fetchCountryCodes = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        const countries = response.data
          .map((country) => ({
            code: country.idd?.root ? country.idd.root + (country.idd.suffixes?.[0] || "") : "",
          }))
          .filter((country) => country.code)
          .sort((a, b) => a.code.localeCompare(b.code));

        setCountryCodes(countries);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCountryCodes();
  }, []);

  return { countryCodes };
};

export default useCountryCodes;
