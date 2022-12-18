function setErrorFor(input, message) {
	const formControl = input.parentElement;
	const small = formControl.querySelector('small');
	formControl.className = 'form_control error';
	small.innerText = message;
}

function clearErrors(){
    const formsControls=document.querySelectorAll('.form_control');

    formsControls.forEach(formControl => {
        formControl.classList.remove('error');
    });
}