import ProductCard from '../ProductCard/ProductCard.tsx';
import type { ProductType } from '../../types/types.ts';

type PropsType = {
  products: ProductType[];
};

function ProductList({ products }: PropsType) {
  return (
    <section className="flex flex-wrap justify-center gap-8 md:gap-12">
      {products.map((product) => (
        <ProductCard key={product.id} productObj={product} />
      ))}
    </section>
  );
}

export default ProductList;
