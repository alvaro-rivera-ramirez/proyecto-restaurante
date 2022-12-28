// const btnSave=document.querySelector('#btnSave');
// const lblMesas=document.querySelector('#lblMesas');
const socket=io();


// if(window.location.search){
//     const searchMesas=new URLSearchParams(window.location.search);
//     var mesas=searchMesas.getAll('mesa');
//     lblMesas.innerHTML=mesas.join(',');
// }else{
//     lblMesas.innerHTML='Para llevar'
// }


// btnSave.addEventListener('click',()=>{
//     socket.emit('confirmar-pedido',mesas)
// })