const con = require("../config/bd");

const getCategories = async() => {
    const categories=await con.query("SELECT * FROM categoria");
    if(!categories) throw new Error();
    
    return categories;
};
const getOneCategory = async(id) => {
    const category=await con.query("SELECT * FROM categoria WHERE id_categoria=?",[id]);

    if(!category) throw new Error();
    
    return category;
};
const createCategory = async(category) => {
    try {
        const newCategory=await con.query("INSERT INTO categoria SET ",[category]);
        return newCategory;
    } catch (error) {
        console.log(error)
        throw new Error();
    }

};
const updateCategory = async(id,category) => {
    try {
        const newCategory=await con.query("UPDATE categoria SET category=? WHERE id_categoria=? ",[category,id]);
        return newCategory;
    } catch (error) {
        console.log(error)
        throw new Error();
    }

};
const deleteCategory = async(id) => {
    try {
        const category=await con.query("DELETE FROM categoria WHERE id_categoria=?",[id]);
        return category;
    } catch (error) {
        console.log(error)
        throw new Error();
    }
};

module.exports={
    getCategories,
    getOneCategory,
    createCategory,
    updateCategory,
    deleteCategory
};
