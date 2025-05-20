const User = require('../models/user');

const home = async (req, res) => {
  try {
    res.status(200).send('welcome to backend server ');
  } catch (error) {
    console.log(error);
  }
};

const register = async (req, res) => {
  try {
    // console.log(req.body);
    const { username, email, password, phone } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).send({ msg: 'Email already exist' });
    }
    // const saltRound = 10;
    // const hash_password = await bcrypt.hash(password, saltRound);

    const userCreated = await User.create({
      username,
      email,
      password,
      phone,
    });

    res.status(201).send({
      msg: 'User created successfully',
      // token: await userCreated.generateToken(),
      // userId: userCreated._id.toString(),
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await User.findOne({ email });

  if (!userExist) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // const user = await bcrypt.compare(password, userExist.password);
  const user = await userExist.comparePassword(password);

  if (user) {
    res.status(200).send({
      msg: 'Login successfully',
      // token: await userExist.generateToken(),
      // userId: userExist._id.toString(),
    });
  } else {
    res.status(401).json({ msg: 'Invalid email and password' });
  }
};

module.exports = { home, register, login };
