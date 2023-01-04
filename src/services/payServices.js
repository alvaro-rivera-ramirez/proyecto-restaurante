const con = require("../config/bd");

    const getCountOrders = async () => {
        const countOrders = await con.query("SELECT COUNT(*) AS count_orders FROM pedido");
        return countOrders[0];
    };

    const getOrderByTable = async (numero_mesa) => {
        const orders= await con.query("SELECT p.id_ped, p.id_usu, p.id_cli, p.id_epedido, p.id_mod FROM pedido p JOIN mesa_pedido mp ON mp.id_ped = p.id_ped JOIN mesa m ON m.id_mesa = mp.id_mesa WHERE numero_mesa = ?",[numero_mesa])
        return orders;
    };

module.exports = {
    getCountOrders,
    getOrderByTable
}