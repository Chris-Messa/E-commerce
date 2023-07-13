const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    return res.json(await Tag.findAll({
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
  const product = res.json(await Product.findAll({
    where: {
      id: req.params.id,
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
  // create a new tag
  const { tag_name } = req.body
  try {
    res.json(await Tag.create({
       tag_name: tag_name
     }))
    
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', async (req, res) => {
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!tagData) {
      res.status(404).json({ message: 'No tag found with that id'})
      return;
    }

    res.status(200).json(tagData)
  } catch (error) {
    res.status(500).json(error)
  }
});

module.exports = router;
