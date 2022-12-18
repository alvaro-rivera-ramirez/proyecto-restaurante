function validateForm(){
    const numMesaInput=document.querySelector('#numero_mesa');
    const numMesa=numMesaInput.value.trim();
    let ok=true;
    let regExp=/^[0-9]{2}$/;;
    if(numMesa===''){
        setErrorFor(numMesaInput, 'El número de mesa no puede estar vacío.');
        ok=false;
    }else if(!regExp.test(numMesa)){
        setErrorFor(numMesaInput, 'Debe contener 2 dígitos numéricos.');
        ok=false;
    }

    return ok;
}