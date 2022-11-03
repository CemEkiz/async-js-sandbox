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

const getCountryData = function (country) {
	// Country 1
	fetch(`https://restcountries.com/v2/name/${country}`)
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Country not found (${response.status})`);
			}

			return response.json();
		})
		.then((data) => {
			renderCountry(data[0]);

			// Country 2
			const neighbour = data[0].borders?.[0];
			if (!neighbour) return;
			return fetch(`https://restcountries.com/v2/alpha/${neighbour}`);
		})
		.then((response) => {
			if (!response.ok) {
				throw new Error(`Country not found (${response.status})`);
			}

			return response.json();
		})
		.then((data) => renderCountry(data, 'neighbour'))
		.catch((error) => {
			console.error(`${error}`);
			renderError(`Something went wrong : ${error.message}`);
		})
		.finally(() => {
			countriesContainer.style.opacity = 1;
		});
};

// Saisir le pays à afficher dans l'UI (en anglais)
getCountryData('France');
