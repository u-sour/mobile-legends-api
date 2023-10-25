import mongoose from "mongoose";

const Schema = mongoose.Schema;

const HeroAttribute = Schema({
    movement_speed: String,
    physical_attack: String,
    physical_defense: String,
    physical_lifesteal: String,
    physical_penetration: String,
    magic_attack: String,
    magic_power: String,
    magic_penetration: String,
    magic_lifesteal: String,
    spell_vamp: String,
    magic_resistance: String,
    hp: String,
    mana: String,
    attack_speed: String,
    hp_regen_rate: String,
    mana_regen_rate: String,
    critical_strike_chance: String,
    critical_damage: String,
    cd_reduction: String,
    bs_cd_reduction: String,
    healing_effect: String,
    monster_damage_reduction: String,
    monster_damage: String
})

const HeroSkill = Schema({
    skill_name: String,
    skill_icon: String,
    type: String,
    cooldown: String,
    manacost: String,
    description: String
})

const HeroSkin = Schema({
    name: { type: String, required: true },
    icon_public_id: { type: String, required: true },
    icon_url: { type: String, required: true },
    icon_file_name: { type: String, required: true },
    splash_art_public_id: { type: String, required: true },
    splash_art_url: { type: String, required: true },
    splash_art_file_name: { type: String, required: true },
    status: { type: String, required: true },
})

const HeroesSchema = Schema({
    code: { type: String, unique: true, required: true },
    name: { type: String, unique: true, required: true },
    roleIds: { type: [Schema.Types.ObjectId], required: true },
    specialtyIds: { type: [Schema.Types.ObjectId], required: true },
    lane: { type: String, required: true },
    release_year: { type: String, required: true },
    battle_points: String,
    ticket: String,
    diamond: String,
    lucky_gem: String,
    skins: [HeroSkin],
    skills: [HeroSkill],
    base_attributes: [HeroAttribute],
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

export default mongoose.model("heroes", HeroesSchema)