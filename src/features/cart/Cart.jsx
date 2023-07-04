import { clearItem, getCart } from './cartSlice';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../../ui/Button';
import CartItem from './CartItem';
import EmptyCart from './EmptyCart';
import LinkButton from '../../ui/LinkButton';

function Cart() {
  const cart = useSelector(getCart);
  const username = useSelector((state) => state.user.username);
  const dispatch = useDispatch();

  function handleDelete() {
    dispatch(clearItem());
  }

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item, idx) => (
          <CartItem item={item} key={idx} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
        <Button to="/order/new" type="primary">
          Order pizzas
        </Button>

        <Button type="secondary" onClick={handleDelete}>
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
