
module.exports = (mongoose) => {
  const { ObjectId } = mongoose.Schema.Types;
    const Employees = mongoose.model(
      'employees',
      mongoose.Schema({
        _id: {type: ObjectId, auto: true},
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        email: {
          type: String
        },
        phoneNumber: {
          type: String
        },
        birthday: {
          type: String
        },
        jobPosition: {
          type: String  
        },
        salary: {
           type: Number 
        }, 
      })
    );
  
    return Employees;
  };