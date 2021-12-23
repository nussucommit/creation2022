const inputPatterns = {
  username: /^[A-Za-z\d_.]{5,20}$/,
  email: /^([A-Za-z0-9_.]+)@u.nus.edu$/,
  password: /^[A-Za-z\d@$!%*#?&]{8,}$/,
};

export default inputPatterns;