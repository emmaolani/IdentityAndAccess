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





/*
let fullName: FullName= new FullName('John', 'Doe');

let birthDate: BirthDate = new BirthDate('1990-01-01');

let address: Address = new Address('countryId', 'stateId');

let validVerificationCode: VerificationCode = new VerificationCode('1234567', Date.now());
let expiredVerificationCode: VerificationCode = new VerificationCode('1234567', Date.now() - 50000);

let activatedEmailAddress: EmailAddress = new EmailAddress('admin@coral.com', true, null);
let emailAddressWithValidCode: EmailAddress = new EmailAddress('admin@coral.com', false, validVerificationCode);
let emailAddressWithInValidCode: EmailAddress = new EmailAddress('admin@coral.com', false, expiredVerificationCode);

let activatedPhoneNumber: PhoneNumber = new PhoneNumber('123456789', 'specId', true, null);
let phoneNumberWithValidCode: PhoneNumber = new PhoneNumber('123456789', 'specId', false, validVerificationCode);
let phoneNumberWithInValidCode: PhoneNumber = new PhoneNumber('123456789', 'specId', false, expiredVerificationCode);

let personalInfo: PersonalInfo = new PersonalInfo(fullName, birthDate, address, activatedEmailAddress, activatedPhoneNumber);
let personalInfoWithEmailAndPhoneNumberWithInvalidCode = new PersonalInfo(fullName, birthDate, address, emailAddressWithInValidCode, phoneNumberWithInValidCode);
let personalInfoWithEmailAndPhoneNumberWithValidCode = new PersonalInfo(fullName, birthDate, address, emailAddressWithValidCode, phoneNumberWithValidCode);   
*/