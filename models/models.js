const sequelize = require('../db');
const { DataTypes } = require('sequelize');// Импорт класса, с помощью которого описываются типы поля


//Модели
const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    password: {
        type: DataTypes.STRING
    },
    role: {
        type: DataTypes.STRING,
        defaultValue: "USER"
    }
});

const Cart = sequelize.define('cart', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const CartGadget = sequelize.define('cart_gadget', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

const Gadget = sequelize.define('gadget', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    price: {
        type: DataTypes.STRING,
        allowNull: false
    },
    img: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const Brand = sequelize.define('brand', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    }
});

const GadgetProperty = sequelize.define('gadget_property', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const CategoryBrand = sequelize.define('category_brand', { //Промежуточная таблица при связи многие ко многим
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
});

//Связь моделей
User.hasOne(Cart);
Cart.belongsTo(User);

Cart.hasMany(CartGadget);
CartGadget.belongsTo(Cart);

Category.hasMany(Gadget);
Gadget.belongsTo(Category);

Brand.hasMany(Gadget);
Gadget.belongsTo(Brand);

Gadget.hasMany(CartGadget);
CartGadget.belongsTo(Gadget);

Gadget.hasMany(GadgetProperty, {
    as: 'property'
});
GadgetProperty.belongsTo(Gadget);

Category.belongsToMany(Brand, {
    through: CategoryBrand
});
Brand.belongsToMany(Category, {
    through: CategoryBrand
});

module.exports = {
    User,
    Cart,
    CartGadget,
    Gadget,
    GadgetProperty,
    Category,
    Brand,
    CategoryBrand
};