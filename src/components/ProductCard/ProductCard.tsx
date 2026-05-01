import { Component } from 'react';
import type { ProductType } from '../../types/types.ts';
import { Star } from 'lucide-react';

type Props = {
  productObj: ProductType;
};

class ProductCard extends Component<Props> {
  render() {
    const { productObj } = this.props;

    return (
      <div className="relative min-w-56 group">
        <div
          className="absolute inset-0 rounded-xs bg-primary/10 z-0
          group-hover:translate-y-1 group-hover:-translate-x-1 transition-all duration-200"
        ></div>

        <div
          className="relative z-10 flex h-full top-0 left-0 flex-col gap-2 justify-between items-center 
            w-full border border-gray-300 p-4 rounded-xs bg-white        
            group-hover:-translate-y-1 group-hover:translate-x-1
            group-hover:shadow-xl transition-all 
            duration-200 cursor-pointer group"
        >
          <img
            src={productObj.image}
            alt={productObj.name}
            className="w-24 h-auto object-cover group-hover:scale-110 transition-all duration-200"
          />
          <h2 className="text-sm md:text-base font-medium">
            {productObj.name}
          </h2>
          <p
            title={productObj.description}
            className="text-xs md:text-sm text-gray-600 line-clamp-4"
          >
            {productObj.description}
          </p>

          <p className="text-sm md:text-base font-medium">
            ${Math.round(productObj.price)}
          </p>

          <div className="flex">
            {Array.from({ length: Math.round(productObj?.rating) }, (_, i) => (
              <Star
                className="size-4 stroke-yellow-600 fill-yellow-600"
                key={i}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ProductCard;
