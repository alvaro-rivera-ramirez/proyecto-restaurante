function validateForm(){
    const categoriaInput=document.querySelector('#nom_categoria');
    const categoria=categoriaInput.value.trim();
    let ok=true;
    let regExp=/^[A-Za-zÀ-ÿ\u00f1\u00d1 ]+$/;
    if(categoria===''){
        setErrorFor(categoriaInput, 'La categoría no puede estar vacío');
        ok=false;
    }else if(!regExp.test(categoria)){
        setErrorFor(categoriaInput, 'La categoría no puede contener números');
        ok=false;
    }

    return ok;
}
