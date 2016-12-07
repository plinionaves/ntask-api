import bcryptjs from 'bcryptjs';

module.exports = (sequelize, DataType) => {

    const Users = sequelize.define('Users', {
        id: {
            type: DataType.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        email: {
            type: DataType.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        password: {
            type: DataType.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        }
    }, {
        hooks: {
            beforeCreate: user => {
                const salt = bcryptjs.genSaltSync();
                user.password = bcryptjs.hashSync(user.password, salt);
            }
        },
        classMethods: {
            associate: models => {
                Users.hasMany(models.Tasks);
            },
            isPassword: (encodedPassword, password) => {
                return bcryptjs.compareSync(password, encodedPassword);
            }
        }
    });

    return Users;

};