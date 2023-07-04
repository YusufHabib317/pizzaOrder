import { getTotalItemsPrice, getTotalItemsQuantities } from './cartSlice';

import { Link } from 'react-router-dom';
import { formatCurrency } from '../../utils/helpers';
import { useSelector } from 'react-redux';

function CartOverview() {
  const totalQuantities = useSelector(getTotalItemsQuantities);
  const totlPrice = useSelector(getTotalItemsPrice);

  if (!totalQuantities) return null;

  return (
    <div className="flex items-center justify-between bg-stone-800 px-4 py-4 text-sm uppercase text-stone-200 sm:px-6 md:text-base">
      <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
        <span>{totalQuantities} pizzas</span>
        <span>{formatCurrency(totlPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
