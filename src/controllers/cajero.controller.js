const { connectToDatabase } = require('../config/database');
const { ObjectId } = require('mongodb');

const getCajeros = async (req, res) => {
    try {
        const db = await connectToDatabase();

        const cajeros = await 
        db.collection('cajeros').find().toArray();
        res.json(cajeros);

    } catch (error) {
        console.error('Error fetching cajeros:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getCajeroById = async (req, res) => {
    try{

        const db = await connectToDatabase();
        const { id } = req.params;

        //SINTAXIS PARA OBTENER UNA CATEGORIA POR SU ID(MONGO)
        const cajero = await 
            db.collection('cajeros').findOne({ _id: new ObjectId(id) });

        //RETORNAMOS LA CATEGORIA EN FORMATO JSON(JS)
        if (!cajero) return res.status(404).json({ error: 'Cajero not found' });
        res.json(cajero);

    } catch (error) {
        console.error('Error fetching cajero by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCajero = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const newCajero = req.body; //{nombre: 'cajero 1', descripcion: 100, estado=true }

        //SINTAXIS PARA INSERTAR UN NUEVO PRODUCTO EN LA COLECCIÓN "productos"(Mongo)
        const result = await 
        db.collection('cajeros').insertOne(newCajero);

        //RETORNAMOS UN MENSAJE DE ÉXITO Y EL ID DEL NUEVO PRODUCTO CREADO
        res.status(201).json({ message: 'Cajero created', id: result.insertedId });
    }catch (error) {
        console.error('Error creating cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const createCajeros = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const newCajeros = req.body; //[{nombre: 'Cajero 1', descripcion: 100, estado: true}, {nombre: 'Cajero 2', descripcion: 200, estado: false}]

        if (!Array.isArray(newCajeros) || newCajeros.length === 0) {
            return res.status(400).json({ error: 'Invalid input. Expected an array of cajeros.' });
        }

        //SINTAXIS PARA INSERTAR VARIOS CAJEROS EN LA COLECCIÓN "cajeros"(Mongo)
        const result = await 
            db.collection('cajeros').insertMany(newCajeros);
        res.status(201).json({ message: 'Cajeros created', ids: result.insertedIds });

    }catch (error) {
        console.error('Error creating cajeros:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const updateCajero = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        //SINTAXIS PARA ACTUALIZAR UNA CATEGORIA POR SU ID(MONGO)
        const result = await 
            db.collection('cajeros').updateOne(
                { _id: new ObjectId(id) },
                { $set: req.body }
            );
        
        if (result.matchedCount === 0) return res.status(404).json({ error: 'Cajero not found' });
        
        res.json({ message: 'Cajero updated' });

    }catch (error) {
        console.error('Error updating cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const deleteCajero = async (req, res) => {
    try{
        const db = await connectToDatabase();
        const { id } = req.params;
        
        //SINTAXIS PARA ELIMINAR UNA CATEGORIA POR SU ID(MONGO)
        const result = await 
            db.collection('cajeros').deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) return res.status(404).json({ error: 'Cajero not found' });

        res.json({ message: 'Cajero deleted' });

    }catch (error) {
        console.error('Error deleting cajero:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { 
    getCajeros, 
    getCajeroById, 
    createCajero, 
    createCajeros, 
    updateCajero, 
    deleteCajero,
};