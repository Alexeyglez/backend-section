const createUserToken = (user) => {
  return { name: user.name, username: user.username, userId: user._id };
};

export default createUserToken;
