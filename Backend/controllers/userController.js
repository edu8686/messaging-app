const prisma = require("../prisma");
const bcrypt = require("bcrypt");

async function createUser(req, res) {
  const { name, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        password: hashedPassword,
      },
    });
    console.log("New user: ", newUser);
    return res.status(200).json({ message: "User created", newUser });
  } catch (err) {
    return res.status(500).json(err);
  }
}

async function findUsers(req, res) {
  const { query } = req.params;
  console.log("Query: ", query);

  try {
    const results = await prisma.user.findMany({
      where: {
        username: {
          startsWith: query,
        },
      },
    });
    res.status(200).json({
      results,
    });
  } catch (err) {
    console.log(err);
  }
}


module.exports = {
  createUser,
  findUsers,
};
