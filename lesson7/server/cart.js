const add = (cart, req) => {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};
const change = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};
const remove = (cart, req) => {
  const find = cart.contents.find(el => el.id_product === +req.params.id);
  if (find.quantity > 1) {
    find.quantity--
  } else {
    cart.contents.splice(cart.contents.indexOf(find))
  }
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add,
  change,
  remove,
};
