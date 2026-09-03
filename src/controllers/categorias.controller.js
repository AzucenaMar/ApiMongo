const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const getCategorias = async (req, res) => {
    try {
        const db = await connectToDatabase();

        const categorias = await 
        db.collection('categorias').find().toArray();
        res.json(categorias);

    } catch (error) {
        console.error('Error fetching categorias:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCategoriaById = async (req, res) => {
    try{

        const db = await connectToDatabase();
        const { id } = req.params;

        //SINTAXIS PARA OBTENER UNA CATEGORIA POR SU ID(MONGO)
        const categoria = await 
            db.collection('categorias').findOne({ _id: new ObjectId(id) });

        //RETORNAMOS LA CATEGORIA EN FORMATO JSON(JS)
        if (!categoria) return res.status(404).json({ error: 'Categoria not found' });
        res.json(categoria);

    } catch (error) {
        console.error('Error fetching categoria by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCategoria = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCategoria = req.body; //{nombre: 'categoria 1', descripcion: 100, estado=true }

        //SINTAXIS PARA INSERTAR UN NUEVO PRODUCTO EN LA COLECCIÓN "productos"(Mongo)
        const result = await 
        db.collection('categorias').insertOne(newCategoria);

        //RETORNAMOS UN MENSAJE DE ÉXITO Y EL ID DEL NUEVO PRODUCTO CREADO
        res.status(201).json({ message: 'Categoria created', id: result.insertedId });
    }catch (error) {
        console.error('Error creating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCategorias = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const newCategorias = req.body; //[{nombre: 'Categoria 1', descripcion: 100, estado: true}, {nombre: 'Categoria 2', descripcion: 200, estado: false}]

        if (!Array.isArray(newCategorias) || newCategorias.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of categorias.' });
        }

        //SINTAXIS PARA INSERTAR VARIAS CATEGORIAS EN LA COLECCIÓN "categorias"(Mongo)
        const result = await 
            db.collection('categorias').insertMany(newCategorias);
        res.status(201).json({ message: 'Categorias created', ids: result.insertedIds });

    }catch (error) {
        console.error('Error creating categorias:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCategoria = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        //SINTAXIS PARA ACTUALIZAR UNA CATEGORIA POR SU ID(MONGO)
        const result = await 
            db.collection('categorias').updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body }
            );
        
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Categoria not found' });
        
        res.json({ message: 'Categoria updated' });

    }catch (error) {
        console.error('Error updating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCategoria = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        //SINTAXIS PARA ELIMINAR UNA CATEGORIA POR SU ID(MONGO)
        const result = await 
            db.collection('categorias').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) return res.status(404).json({ error: 'Categoria not found' });

        res.json({ message: 'Categoria deleted' });

    }catch (error) {
        console.error('Error deleting categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { 
    getCategorias, 
    getCategoriaById, 
    createCategoria, 
    createCategorias, 
    updateCategoria, 
    deleteCategoria,
};