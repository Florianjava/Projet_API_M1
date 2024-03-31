// Function to fetch country information based on country name
const fetchNewsInfos = async (countryCode) => {
    const response = await fetch(`/api/news?country=${countryCode}`);
    return response.json();
};

// Function to fetch currency conversion rates
const fetchCountryInfos = async (countryCode) => {
    const response = await fetch(`/alpha/${countryCode}`);
    return response.json();
};

document.addEventListener('DOMContentLoaded', async () => {
    const countryInput = document.getElementById('country-select');
    const listeNewsPanel = document.getElementById('list-news');
    const countryInfosTxtPanel = document.getElementById('infos-txt');
    const countryInfosMapPanel = document.getElementById('map');

   /* const submitButton = document.getElementById('submit-btn');
    const amountInput = document.getElementById('amount');  */

    // Update the projects panel
    const updateNewsList = async () => {
        const countryCode = countryInput.value;
        const countryInfo = await fetchNewsInfos(countryCode);

        listeNewsPanel.innerHTML = ''; // Clear previous content from the projects panel

        // Display principal country information
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Country Information';

        const projectDescription = document.createElement('p');
        projectDescription.innerHTML = `
            <strong>Common Name:</strong> ${countryInfo.common_name}<br>
            <strong>Official Name:</strong> ${countryInfo.official_name}<br>
            <strong>Language:</strong> ${countryInfo.language}<br>
            <strong>Region:</strong> ${countryInfo.region}<br>
            <strong>Capital:</strong> ${countryInfo.capital}<br>
            <strong>Latitude:</strong> ${countryInfo.latlng[0]}<br>
            <strong>Longitude:</strong> ${countryInfo.latlng[1]}<br>
        `;

        projectPanelElement.appendChild(projectTitle);
        projectPanelElement.appendChild(projectDescription);

        // Display the currency from countryInfo along with its rate
        const Rate = currencyInfo.rates[countryInfo.currency];

        const ratesTitle = document.createElement('h2');
        ratesTitle.textContent = 'Exchange Rate';

        const ratesDescription = document.createElement('p');
        ratesDescription.innerHTML = `
            <strong>Currency:</strong> ${countryInfo.currency}<br>
            <strong>Rate:</strong> ${Rate}<br>
        `;

        projectPanelElement.appendChild(ratesTitle);
        projectPanelElement.appendChild(ratesDescription);

        // Update conversion result
        const amount = amountInput.value;
        const convertedAmount = amount * Rate;
        updateConversionResult(convertedAmount.toFixed(2));
    };


    const updateInfos = async () => {
        const countryCode = countryInput.value;
        const countryInfo = await fetchCountryInfos(countryCode);

        countryInfosTxtPanel.innerHTML = ''; // Clear previous content from the projects panel

        // Display principal country information
        const infosTitle = document.createElement('h2');
        projectTitle.textContent = 'Informations :';

        const countryDescription = document.createElement('p');
        countryDescription.innerHTML = `<ul>
            <li>Nom du pays : ${countryInfo.name.common}<li>
            <li>Capitale : ${countryInfo.capital}<li>
            <li>Région: ${countryInfo.region}<li>
            <li>Superficie : ${countryInfo.area}<li>
            <li>Population : ${countryInfo.population}<li>
            <li>Monnaie : ${countryInfo.currencies.GBP.name} (${countryInfo.currencies.GBP.symbol}<li>
        </ul>`;

        countryInfosTxtPanel.appendChild(infosTitle);
        countryInfosTxtPanel.appendChild(countryDescription);

        countryInfosMapPanel.setView(countryInfo.latlng)

    };

    // Event listener pour surveiller changement de pays sélectionné
    
    countryInput.addEventListener('change', async () => {
        await updateNewsList();
        await updateInfos();
    });
});