const socket=io();

socket.on('connect',()=>{
    console.log('conectado')
})

socket.on('mesas-ocupadas',(mesasOcupadas)=>{
    for (const mesa of panelMesas.children) {
        if(mesasOcupadas.includes(mesa.innerHTML)){
            mesa.classList.remove("mesa-disponible")
            mesa.classList.add("mesa-ocupada")
        }
    }
})