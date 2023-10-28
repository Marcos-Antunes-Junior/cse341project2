module.exports = (mongoose) => {
    const { ObjectId } = mongoose.Schema.Types;
      const User = mongoose.model(
        'users',
        mongoose.Schema({
          _id: {type: ObjectId, auto: true},
          username: {
            type: String
          },
          googleId: {
            type: String
          }, 
        })
      );
    
      return User;
    };