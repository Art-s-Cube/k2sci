import {ProductCard, Section} from '~/components';

const mockProducts = new Array(2).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 2,
  ...props
}) {
  return (
    <Section heading={title} padding="y" className="featProd container" {...props}>
      <div className="grid-flow-row grid gap-2 gap-y-6 md:gap-4 lg:gap-6 grid-cols-1 false  false md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            count={count}
            className=""
          />
        ))}
      </div>
    </Section>
  );
}
