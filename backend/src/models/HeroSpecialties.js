import mongoose from "mongoose";

const Schema = mongoose.Schema

const HeroSpecialtiesSchema = Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    status: { type: String, required: true }
}, {
    virtuals: {
        id: {
            get() {
                return this._id;
            }
        }
    },
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
})

export default mongoose.model('hero_specialties', HeroSpecialtiesSchema)