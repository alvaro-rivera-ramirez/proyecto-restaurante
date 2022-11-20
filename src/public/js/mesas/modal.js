const createModal=()=>{
    return `<label for="numero_mesa" class="col-form-label">Número:</label>
    <input
      type="text"
      class="form-control"
      id="numero_mesa"
      name="numero_mesa"
    />
    <label for="id_piso" class="col-form-label">Piso</label>
    <select name="id_piso" id="id_piso" class="form-select">
      <option value="1">Piso 1</option>
      <option value="2">Piso 2</option>
      <option value="3">Piso 3</option>
    </select>`;
}

const closeModal=()=>{
    document.getElementById("modal-body").innerHTML='';
}