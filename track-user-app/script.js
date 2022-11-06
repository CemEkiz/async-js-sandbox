/* ---------------------------------- SYNC ---------------------------------- */

const button = document.querySelector('.btn-country');

function trackUserHandler() {
	navigator.geolocation.getCurrentPosition(
		(posData) => {
			setTimeout(() => {
				console.log(posData);
			}, 2000);
		},
		(error) => {
			console.log(error);
		}
	);

	setTimeout(() => {
		console.log('Timer 0 done!');
	}, 0);

	console.log('Getting position...');
}

button.addEventListener('click', trackUserHandler);
