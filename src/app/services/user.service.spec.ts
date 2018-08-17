import {User} from '../user.data-model';
import {UserService} from './user.service';

describe('UserService', () => {
  let userService;
  const user = {
    name: 'lokesh',
    address: {
      city: 'Pune'
    }
  };
  beforeEach(() => {
    userService = new UserService();
  });

  it('should set user details', () => {
    userService.User = user;
    const userDatafromService = userService.User;
    expect(userDatafromService.name).toEqual(user.name);
  });
});

