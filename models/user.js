const passportLocalSequelize = require("passport-local-sequelize");

module.exports = (sequelize, Sequelize) => {
    class User extends Sequelize.Model {
        static async findByPkAndUpdate(id, params) {
            try {
            let user = await User.findByPk(id);
            if (user) {
                user = await User.update(params, {
                where: { user_id: id },
                });
            }
            return user;
            } catch (err) {
                console.log(err);
            }
        }
        static async findByPkAndRemove(id) {
            try {
            let user = await User.findByPk(id);
            if (user) {
                user = await User.destroy({
                where: { user_id: id },
                });
            }
            return user;
    
            } catch (err) {
                console.log(err);
            }
        }
    };
  
    User.init(
    {
        id: {
            type: Sequelize.STRING,
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        password: {
            type: Sequelize.STRING(1024),
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        nickname: {

            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        gender: {
            type: Sequelize.STRING(1),
            allowNull: false
        }
    },
    {
        sequelize,
        timestamps: false,
        modelName: "User",
        tableName: "user",
      }
    );
  
    passportLocalSequelize.attachToUser(User, {
      usernameField: "user_id",
      hashField: "password",
      saltField: "mysalt"
    });

    return User;
    
};