const libphonenumber =require("google-libphonenumber");
const fs = require('fs');
const csvjson = require("csvjson");

const phoneUtil =  libphonenumber.PhoneNumberUtil.getInstance()



const countries = [];
const regions = phoneUtil.getSupportedRegions()

for (const regionCode of regions) {
    const countryCallingCode = phoneUtil.getCountryCodeForRegion(regionCode);
    // You'll need to map regionCode to country name using an external source
    countries.push({
    callingCode: countryCallingCode,
    countryCode: regionCode // Assuming region code is the country code
    });

}

const jsonCountries = JSON.stringify(countries, null, 2);

const csvData = csvjson.toCSV(jsonCountries, {
    headers: 'key'
});

// Write CSV data to file
// fs.writeFile('countries.csv', csvData, 'utf-8', (err) => {
//     if (err) {
//         console.error(err);
//         return;
//     }
//     console.log('Conversion successful. CSV file created.');
// });


console.log(jsonCountries);