const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // be sure to include its associated Product data
  try {
    console.log('GET /api/tags');

    const tagData = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
        as: 'product_names'
      }]
    });

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
    const tagById = await Tag.findOne({
      where: {
        id: req.params.id
      }, include: [
        {
          model: Product,
          through: ProductTag,
          as: 'product_names'
        }
      ]
    })

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
  console.log('PUT /api/tags/:id');

  Tag.update(req.body, { where: { id: req.params.id } })
    .then((tag) => {
      return ProductTag.findAll({ where: { tag_id: req.params.id } })
    })
    .then((tagProducts) => {
      const productIds = tagProducts.map(({ product_id }) => product_id);

      const newTag = req.body.product_id
        .filter((product_id) => !productIds.includes(product_id))
        .map((product_id) => {
          return { tag_id: req.params.id, product_id }
        });

      const tagsToRemove = Tag
        .filter(({ product_id }) => !req.body.productsIds.includes(product_id))
        .map(({ id }) => id);

      return Promise.all([
        ProductTag.destroy({ where: { id: tagsToRemove } }),
        ProductTag.bulkCreate(newTag),
      ])
    })
    .then((updatedTags) => res.json(updatedTags))
    .catch((err) => {
      console.log(err)
      res.status(400).json(err)
    })
  // update a tag's name by its `id` value
  // try {
  //   console.log('PUT /api/tags/:id');

  //   const updateTag = await Tag.update(
  //     {
  //       tag_id: req.body.tag_name
  //     },
  //     {
  //       where: {
  //         id: req.params.id
  //       },
  //     }
  //   );

  //   res.status(200).json(updateTag);
  // } catch (err) {
  //   res.status(500).json(err);
  // }
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
