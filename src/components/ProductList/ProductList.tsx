import ProductCard from '../ProductCard/ProductCard.tsx';
import type { ProductType } from '../../types/types.ts';

type PropsType = {
  products: ProductType[];
};

function ProductList({ products }: PropsType) {
  return (
    <section className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} productObj={product} />
      ))}
    </section>
  );
}

export default ProductList;
