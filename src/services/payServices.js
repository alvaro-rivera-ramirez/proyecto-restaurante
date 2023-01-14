const con = require("../config/bd");
    const getTotalPayToday = async () => {
        const totalPayToday = await con.query("SELECT SUM(total_pago) as total_pay FROM pago WHERE DATE_FORMAT(fecha_pago,'%Y-%m-%d')=curdate();");
        return totalPayToday[0];
    };

    const getCountPays = async () => {
        const countPays = await con.query("SELECT COUNT(*) AS count_pays FROM pago");
        return countPays[0];
    };
    
    const getPays = async () => {
        const pays = await con.query("SELECT * FROM pago");
        if (!pays) throw new Error();
        return pays;
    };
    
    const getPay = async (id_pago) => {
        const pay = await con.query("SELECT * FROM pago WHERE id_pago=?",[id_pago]);
        if (!pay) throw new Error();
        return pay;
    };

    const createPay = async (id_ped, id_mpago, date, total_pago) => {
        const pay = await con.query("INSERT INTO pago (`id_ped`, `id_mpago`, `fecha_pago`, `total_pago`) VALUES (?, ?, ?, ?)",[id_ped, id_mpago, date, total_pago]);
        if (!pay) throw new Error();
        return pay;
    };
      
module.exports = {
    getTotalPayToday,
    getCountPays,
    getPays,
    getPay,
    createPay
}