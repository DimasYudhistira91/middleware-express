const express = require('express');
const router = express.Router();

const inventory = [
  { id: 1, barang: 'Meja' },
  { id: 2, barang: 'Kursi' },
  { id: 3, barang: 'Whiteboard' },
  { id: 4, barang: 'Spidol' },
  { id: 5, barang: 'Penghapus' }
];

router.get('/', (req, res) => {
  res.send(inventory);
});

router.post('/', (req, res) => {
  const {error} = validasiData(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  
  const dataInventory = {
    id: inventory.length + 1,
    barang: req.body.barang
  };
  inventory.push(dataInventory);
  res.send(dataInventory);
});

router.put('/:id', (req, res) => {
  const dataInventory = inventory.find(i => i.id === parseInt(req.params.id));
  if(!dataInventory) return res.status(404).send('Data barang tidak ditemukan');

  const {error} = validasiData(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  dataInventory.barang = req.body.barang;
  res.send(dataInventory);
})

router.delete('/:id', (req, res) => {
  const dataInventory = inventory.find(i => i.id === parseInt(req.params.id));
  if(!dataInventory) return res.status(404).send('Data barang tidak ditemukan');

  const index = inventory.indexOf(dataInventory);
  inventory.splice(index, 1);
  res.send(inventory);
});

function validasiData(dataInventory) {
  const skema = {
    barang: Joi.string().min(3).required()
  };
  return Joi.validate(dataInventory, skema);
}

module.exports = router;