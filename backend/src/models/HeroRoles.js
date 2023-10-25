import mongoose from "mongoose";

const Schema = mongoose.Schema

const HeroRolesSchema = Schema({
    icon_public_id: { type: String, required: true },
    icon_url: { type: String, required: true },
    icon_file_name: { type: String, required: true },
    name: { type: String, required: true },
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

export default mongoose.model('hero_roles', HeroRolesSchema)