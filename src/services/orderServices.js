const conn = require("../config/bd");

  const getCountOrders = async () => {
    const countOrders = await conn.query("SELECT COUNT(*) AS count_orders FROM pedido");
  
    return countOrders[0];
  };

module.exports={
    getCountOrders
}