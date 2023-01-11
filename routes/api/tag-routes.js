const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    console.log('GET /api/tags');

    const tagData = await Tag.findAll();

    res.status(200).json(tagData);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    console.log('GET /api/tags/:id');

    const tagById = await Tag.findByPk(req.params.id);

    res.status(200).json(tagById);

  } catch (err) {
    res.status(500).json(err)
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    console.log('POST /api/tag');

    const tagPost = await Tag.create(req.body);

    res.status(200).json(tagPost);
  } catch (err) {
    res.status(500).json(err)
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    console.log('PUT /api/tags/:id');

    const updateTag = await Tag.update(
      {
        tag_id: req.body.tag_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    );

    res.status(200).json(updateTag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  try {
    console.log('DEL /api/tag/:id');

    const deleteTag = await Tag.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteTag);
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
