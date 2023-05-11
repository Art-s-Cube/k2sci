import {ProductCard, Section} from '~/components';

const mockProducts = new Array(2).fill('');

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 2,
  ...props
}) {
  return (
    <Section heading={title} padding="y" className="justCent container featProd" {...props}>
      <div className="swimlane hiddenScroll md:pb-8 md:scroll-px-8 lg:scroll-px-12 md:px-8 lg:px-12 justCent">
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            count={count}
            className="snap-start w-80"
          />
        ))}
      </div>
    </Section>
  );
}
