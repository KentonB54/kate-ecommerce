const { client } = require('../../config/database');
const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
} = require('../../models');

xdescribe('DB user tests', () => {
  beforeAll(async () => {
    await client.connect();
  });

  afterAll(async () => {
    await client.end();
  });

  describe('createUser', () => {
    test('createUser successfully creates a new user and returns it', async () => {
      const fakeUserData = {
        fireBase_UID: 234,
        username: 'Horace',
        is_admin: false,
      };
      const newUser = await createUser({ ...fakeUserData });
      expect(newUser.username).toEqual(fakeUserData.username);
    });
  });

  describe('getAllUsers', () => {
    test('getAllUsers returns an array', async () => {
      const users = await getAllUsers();
      expect(users).toBeInstanceOf(Array);
    });

    test('users is not an empty array', async () => {
      const users = await getAllUsers();
      expect(users.length).toBeGreaterThan(0);
    });
  });

  describe('getUserById', () => {
    test('returns user by the correct id', async () => {
      const user = await getUserById(2);
      expect(user.id).toEqual(2);
    });
  });

  describe('updateUser', () => {
    test(`return back user object`, async () => {
      const fakeUserData = {
        userId: 2,
        username: 'Mark',
        is_admin: false,
      };
      const updatedUser = await updateUser({ ...fakeUserData });
      expect(updatedUser).toBeInstanceOf(Object);
    });
    test(`user with id of 2 should now have the name "Mark"`, async () => {
      const newUserName = await getUserById(2);
      expect(newUserName.username).toEqual('Mark');
    });
  });
});
