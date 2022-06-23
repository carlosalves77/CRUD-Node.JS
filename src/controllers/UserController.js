import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default {
  // Cria um novo usuário
  async CreateUser(req, res) {
    try {
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { email } });

      if (user) {
        return res.json({ error: "já existe um usuario com este email" });
      }

      user = await prisma.user.create({
        data: {
          name,
          email,
        },
      });
      return res.json(user);
    } catch (e) {
      return res.json({ error });
    }
  },
  // Encontra todos os usuários
  async findAllUser(req, res) {
    try {
      const user = await prisma.user.findMany();
      return res.json(user);
    } catch (e) {
      return res.json(error);
    }
  },
  // Encontra um usuário
  async findUser(req, res) {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "usuario não encontrado" });

      return res.json(user);
    } catch (e) {
      return res.json(error);
    }
  },
  // Atualiza um usuário
  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { name, email } = req.body;

      let user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "usuario não encontrado" });

      user = await prisma.user.update({
        where: { id: Number(id) },
        data: { name, email },
      });
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  },
  // Deleta um usuário
  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({ where: { id: Number(id) } });

      if (!user) return res.json({ error: "usuario não encontrado" });

      await prisma.user.delete({ where: { id: Number(id) } });

      return res.json(user);
    } catch (e) {
      return res.json(error);
    }
  },
};
