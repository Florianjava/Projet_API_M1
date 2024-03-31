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
        const newsInfos = await fetchNewsInfos(countryCode);

        listeNewsPanel.innerHTML = ''; // Clear previous content from the projects panel

        // Display principal country information
        const projectTitle = document.createElement('h2');
        projectTitle.textContent = 'Dernières News concernant le pays :';

        let texteGlobal = "<div class='col-lg-12'>";
        for(var i=0; i<newsInfos.articles.length; i++){
            if(i % 4 == 0 && i != 0){
                texteGlobal += "</div><div class='col-lg-12'>"
            }
            texteGlobal += `<div class='row'>
                                <p> <u> ${newsInfos.articles[i].author} </u> a publié à ${newsInfos.articles[i].publishedAt} : </br>
                                ${newsInfos.articles[i].title}, <a href='${newsInfos.articles[i].url}'>(Voir le détail) </a></p></div><br><br>`
        }
        texteGlobal += "</div>"

        listeNewsPanel.appendChild(projectTitle);
        listeNewsPanel.innerHTML = texteGlobal

    };

/*
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
    */

    // Event listener pour surveiller changement de pays sélectionné
    
    countryInput.addEventListener('change', async () => {
        await updateNewsList();
       // await updateInfos();
    });
});