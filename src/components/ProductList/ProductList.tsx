import ProductCard from '../ProductCard/ProductCard.tsx';
import type { ProductType } from '../../types/types.ts';

type PropsType = {
  products: ProductType[];
};

function ProductList({ products }: PropsType) {
  return (
    <section className="w-full flex flex-wrap items-center justify-center gap-6 py-6">
      {products.map((product) => (
        <div key={product.id} className="h-full">
          <ProductCard productObj={product} />
        </div>
      ))}
    </section>
  );
}

export default ProductList;
