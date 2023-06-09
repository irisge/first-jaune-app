const { dataSource } = require('../utils');
const Wilder = require('../entity/Wilder');
const Skill = require('../entity/Skill');

module.exports = {
  create: async (req, res) => {
    try {
      await dataSource.getRepository(Wilder).save(req.body);
      res.send('Create Wilder');
    } catch (e) {
      res.send('Error while creating wilder');
    }
  },

  read: async (req, res) => {
    const wilders = await dataSource.getRepository(Wilder).find(Wilder);
    res.send(wilders);
  },

  update: async (req, res) => {
    try {
      const { id } = req.params;
      const updates = req.body;
      await dataSource.getRepository(Wilder).update(id, updates);
      res.status(200).send('Wilder updated');
    } catch (e) {
      res.status(500).send('Error while updating wilder');
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      await dataSource.getRepository(Wilder).delete(id);
      res.status(200).send('Wilder deleted');
    } catch (e) {
      res.send(500).send('Error while deleting wilder');
    }
  },

  addSkill: async (req, res) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneBy({ name: req.body.wilderName });
      const skillsToAdd = await dataSource
        .getRepository(Skill)
        .findOneBy({ name: req.body.skillName });
      wilderToUpdate.skills = [...wilderToUpdate.skills, skillsToAdd];
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.status(200).send('Skill added to Wilder');
    } catch (e) {
      console.log(e);
      res.status(500).send('Error while addings skill to wilder');
    }
  },
};
