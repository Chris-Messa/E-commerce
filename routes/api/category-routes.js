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

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
