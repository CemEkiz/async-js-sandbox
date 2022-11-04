const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
	const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(+data.population / 1000000).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
	countriesContainer.insertAdjacentText('beforeend', msg);
	countriesContainer.style.opacity = 1;
};

/* Write the async code here */

console.log('First');

const getCountryData = async function (country) {
	try {
		// Country 1
		const resCountry = await fetch(`https://restcountries.com/v2/name/${country}`);
		if (!resCountry.ok) throw new Error(`Country not found (${response.status})`);
		const dataCountry = await resCountry.json();
		renderCountry(dataCountry[0]);

		// Country 2
		const neighbour = await dataCountry[0].borders?.[0];
		if (!neighbour) return;
		const resNeighbour = await fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
		if (!resNeighbour.ok) throw new Error(`Neighbour not found (${response.status})`);
		const dataNeighbour = await resNeighbour.json();
		renderCountry(dataNeighbour, 'neighbour');
	} catch (err) {
		console.error(`💥ERROR : ${err}`);
		renderError(`💥ERROR : Something went wrong : ${err.message}`);
	}
};

// Saisir le pays à afficher dans l'UI (en anglais)
getCountryData('France');

console.log('Last');
