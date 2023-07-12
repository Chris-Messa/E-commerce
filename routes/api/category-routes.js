const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    return res.json(await Category.findAll({
      include: [
        {
          model: Product,
          attributes: ['id', 'product_name']
        }
      ]
    }))
  } catch (error) {
   console.error(error)
   res.status(500).json(error) 
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const category = res.json(await Category.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Product,
        attributes: ['id', 'product_name']
      }
    ]
  }))
});

router.post('/', async (req, res) => {
  // create a new category
  const { category_name } = req.body
try {
  res.json(await Category.create({
     category_name: category_name
   }))
  
} catch (error) {
  console.error(error)
  res.status(500).json(error)
}
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with that id'})
      return;
    }

    res.status(200).json(categoryData)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
