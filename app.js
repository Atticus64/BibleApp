
$: {
	console.log('called');
	(async () => {
		if (book !== '' || chapter !== 0 || version.name !== '') {
			data = await handleChange();
		}
	})();
}


