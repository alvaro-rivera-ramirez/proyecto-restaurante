const toJSONLocal=(date)=> {
    let local = new Date(date);
    local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
}
const getDateTime=()=>{
    const d=new Date();
    const date=toJSONLocal(d);
    const hour=d.toLocaleTimeString('es-PE');
    return date+' '+hour;
}

module.exports={
    getDateTime
}
