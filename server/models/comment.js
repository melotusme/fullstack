'use strict';
module.exports = (sequelize, DataTypes) => {
  var comment = sequelize.define('comment', {
    // id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    article_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    // createdAt: DataTypes.NOW,
    // updatedAt: DataTypes.DATE,
    createdAt: {
      type: DataTypes.DATE,
      field: 'createdAt',
      defaultValue: sequelize.literal('NOW()')
    },
    deleteAt: DataTypes.DATE
  }, {
    classMethods: {
      associate: function (models) {
        // associations can be defined here
      }
    }
  });
  return comment;
};
