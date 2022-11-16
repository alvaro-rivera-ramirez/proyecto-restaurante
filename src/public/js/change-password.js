const btn_changePassword = document.getElementById('btn_change-password');

btn_changePassword.addEventListener('click', async(e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = {};

    formData.forEach((value, key) => (data[key] = value));
    try {
        const response = await fetch('/api/user/change-psd',{
            method: "POST",
            mode:"cors",
            headers: {
              "Content-Type": "application/json",
            },
            body:JSON.stringify(data)
        })
        const res = await response.json();

        // Si el res. status es 200 o 201
        if (response.ok) {
            Swal.fire({
                title: 'Cambio Exitoso',
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