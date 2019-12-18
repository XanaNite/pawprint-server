const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/
const xss = require('xss')
const bcrypt = require('bcryptjs')

const UsersService = {
    validatePassword(password) {
      if (password.length < 8) {
        return 'Password must be longer than 8 characters'
      }
      if (password.length > 72) {
        return 'Password must be less than 72 characters'
      }
      if(password.startsWith(' ') || password.endsWith(' ')){
        return 'Password must not start or end with empty spaces'
      }
      if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)){
          return 'Password must contain 1 upper case, lower case, number and special character'
      }
    },
    serializeUser(user) {
        return {
          id: user.id,
          name: xss(user.name),
          email: xss(user.email),
          date_created: new Date(user.date_created),
        }
    },
    hashPassword(password){
        return bcrypt.hash(password, 12)
    },
    hasUserWithEmail(db, email){
        return db('users')
            .where({email})
            .first()
            .then(user => !!user)
    },
    insertUser(db, newUser){
        return db
            .insert(newUser)
            .into('users')
            .returning('*')
            .then(([user]) => user)
    }
  }
  
  module.exports = UsersService