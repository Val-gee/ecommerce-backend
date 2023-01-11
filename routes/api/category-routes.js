const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    console.log('GET /api/categories');

    const categoryData = await Category.findAll({
      include: [{ model : Product }]
    });

    res.status(200).json(categoryData);

  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try{
  console.log('GET /api/categories/:id');

  const categoryById = await Category.findByPk(req.params.id, {
    include: [{ model : Product }]
  });

  if (!categoryById) {
    res.status(200).json({ message : 'No category found with this id!'})
  }

  res.status(200).json(categoryById);

} catch (err) {
  req.status(500).json(err);
}
});

router.post('/', async (req, res) => {
  try {
    console.log('POST /api/categories');

    const categoryPost = await Category.create(req.body);

    res.status(200).json(categoryPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    console.log('PUT /api/categories/id');

    const updateCategory = await Category.update(
      {
        category_name: req.body.category_name
      },
      {
        where: {
          id: req.params.id
        },
      }
    );

    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

router.delete('/:id', async (req, res) => {
  try {
    console.log('DELETE /api/categories/:id');

    const deleteCategory = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    res.status(200).json(deleteCategory);
  } catch (err) {
    res.status(400).json(err)
  }
});

module.exports = router;
