import { axiosBase } from '../helpers/fetchApi';

class UserRepository {
  static fetchUserList = async () => {
    try {
      return await axiosBase.get('/user/get-all-users');
    } catch (error) {
      throw error;
    }
  };
}

export default UserRepository;
