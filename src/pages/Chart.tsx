import React, { useEffect, useState } from 'react'
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet'
import Layout from '../components/Layout/Layout'

interface Country {
  updated: number;
  country: string;
  countryInfo: {
    _id: number;
    iso2: string;
    iso3: string;
    lat: number;
    long: number;
    flag: string;
  };
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

function Chart() {

  const [countriesData, setCountriesData] = useState<Country[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://disease.sh/v3/covid-19/countries');
        const data: Country[] = await response.json();
        setCountriesData(data);
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <Layout>
      <div className=''>
        <MapContainer  center={[18.786717, 72.359825]} zoom={13} className=''>
          <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {countriesData.map((country) => (
            <Marker key={country.countryInfo._id} position={[country.countryInfo.lat, country.countryInfo.long]}>
              <Popup>
                <h2>{country.country}</h2>
                <p>Cases: {country.cases}</p>
                <p>Deaths: {country.deaths}</p>
                <p>Recovered: {country.recovered}</p>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

      </div>
    </Layout>
  )
}

export default Chart
