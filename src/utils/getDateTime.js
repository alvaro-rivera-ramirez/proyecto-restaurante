const getDateTime=()=>{
    const d=new Date();
    const date=d.toISOString().slice(0,10);
    const hour=d.toLocaleTimeString();
    return date+' '+hour;
}

module.exports={
    getDateTime
}