const btn_login = document.getElementById('btn_login');

btn_login.addEventListener('click', async (e) => {
	e.preventDefault();
	const formData = new FormData(form);
	const data = {};

	// Transformar en objeto
	formData.forEach((value, key) => (data[key] = value));
	try {
		const response = await fetch('/api/auth/login', {
			method: "POST",
			mode: "cors",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data) // Se transforma en JSON
		})
		const res = await response.json();

		// Si el res. status es 200 o 201
		if (response.ok) {
			Swal.fire({
				title: 'Conexion Exitosa',
				icon: 'success',
				showConfirmButton: false,
				timer: 800,
			}).then(() => {
				window.location = '/home'
			})
		} else {
			Swal.fire({
				title: 'Error',
				text: 'Credenciales Incorrectas',
				icon: 'error',
				showConfirmButton: false,
				timer: 1000,
			})
			throw new Error(`HTTP error! status: ${response.status} message: ${res.error}`);
		}
	} catch (error) {
		console.log(error)
	}
})