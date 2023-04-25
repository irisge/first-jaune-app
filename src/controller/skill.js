const { dataSource } = require('../utils');
const Skill = require('../entity/Skill');

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Skill).save(req.body);
      res.send('Create skill');
    } catch (e) {
      res.send('Error while creating skill');
    }
  },

  read: async (req, res) => {
    const skills = await dataSource.getRepository(Skill).find(skills);
    res.send(skills);
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      await dataSource.getRepository(Skill).update(id, updates);
      res.status(200).send('Skill updated');
    } catch (e) {
      res.status(500).send('Error while updating skill');
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await dataSource.getRepository(Skill).delete(id);
      res.status(200).send('Skill deleted');
    } catch (e) {
      res.send(500).send('Error while deleting skill');
    }
  },
};
