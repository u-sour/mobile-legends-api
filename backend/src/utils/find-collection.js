import mongoose from "mongoose";

export const findCollection = (collectionName) => {
    const collections = mongoose.connection.collections;
    let collectionFound = false;

    for (let collection in collections) {
        if (collection === collectionName) {
            collectionFound = true;
        }
    }

    return collectionFound;
};
