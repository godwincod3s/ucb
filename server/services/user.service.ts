import User from "@/server/models/User";

/* find by email */
export const findByEmail = async (email: string) => {

    try {
        const user = await User.findOne({ email });
    
        if (!user) {
          return 'User not found';
        }
    
        return user;
      } catch (err) {
        return 'Error finding user' + err;
      }
}

export const updateUser = async (email: string, data: object ) => {
    // console.log([email, data])
    // return email;
    try {
        const updatedUser = User.findOneAndUpdate({email: email}, data, { new: true, upsert: false });
    
        if (!updatedUser) {
          return 'User not found';
        }
    
        return updatedUser;
      } catch (err) {
        return 'Error updating user' + err;
      }
}