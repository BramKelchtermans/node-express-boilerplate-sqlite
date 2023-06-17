'use strict';
const {
    Model, Op
} = require('sequelize');
const bcrypt = require('bcryptjs');
const sequelizePaginate = require('sequelize-paginate')

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }

        static async isEmailTaken(email) {
            const users = await User.findAll({
                where: {
                    email: {
                        [Op.eq]: email
                    }
                }
            });

            return users.length > 0;
        }

        isPasswordMatch(password) {
            const isMatch = bcrypt.compare(password, this.password);
            return isMatch;
        }
    }
    User.init({
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        verified: DataTypes.BOOLEAN
    }, {
        sequelize,
        modelName: 'User',
    });

    sequelizePaginate.paginate(User)

    return User;
};