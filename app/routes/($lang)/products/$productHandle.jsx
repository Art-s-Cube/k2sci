import {useMemo, useTransition} from 'react';
import {Disclosure} from '@headlessui/react';
import {defer} from '@shopify/remix-oxygen';
import {useLoaderData, useSearchParams} from '@remix-run/react';
import {AnalyticsPageType, Money} from '@shopify/hydrogen';
import {
  Heading,
  IconClose,
  ProductGallery,
  ProductSwimlane,
  Section,
  Text,
  Link,
  AddToCartButton,
  Button,
} from '~/components';
import {getExcerpt} from '~/lib/utils';
import {seoPayload} from '~/lib/seo.server';
import invariant from 'tiny-invariant';
import clsx from 'clsx';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {routeHeaders, CACHE_SHORT} from '~/data/cache';
export const headers = routeHeaders;
export async function loader({params, request, context}) {
  const {productHandle} = params;
  invariant(productHandle, 'Missing productHandle param, check route filename');

  const searchParams = new URL(request.url).searchParams;

  const selectedOptions = [];
  searchParams.forEach((value, name) => {
    selectedOptions.push({name, value});
  });

  const {shop, product} = await context.storefront.query(PRODUCT_QUERY, {
    variables: {
      handle: productHandle,
      selectedOptions,
      country: context.storefront.i18n.country,
      language: context.storefront.i18n.language,
    },
  });

  if (!product?.id) {
    throw new Response(null, {status: 404});
  }

  const firstVariant = product.variants.nodes[0];
  const selectedVariant = product.selectedVariant ?? firstVariant;

  const productAnalytics = {
    productGid: product.id,
    variantGid: selectedVariant.id,
    name: product.title,
    variantName: selectedVariant.title,
    brand: product.vendor,
    price: selectedVariant.price.amount,
  };

  const seo = seoPayload.product({
    product,
    selectedVariant,
    url: request.url,
  });
  const recommended = getRecommendedProducts(context.storefront, product.id);
  return defer(
    {
      product,
      shop,
      storeDomain: shop.primaryDomain.url,
      recommended,
      analytics: {
        pageType: AnalyticsPageType.product,
        resourceId: product.id,
        products: [productAnalytics],
        totalValue: parseFloat(selectedVariant.price.amount),
      },
      seo,
    },
    {
      headers: {
        'Cache-Control': CACHE_SHORT,
      },
    },
  );
}
export default function Product() {
  const {product, shop, recommended} = useLoaderData();
  const {media, title, metafield, descriptionHtml} = product;
  const {shippingPolicy, refundPolicy} = shop;
  return (
    <>
      <Section className="px-6 justCent">
        <div className="grid container gridFix items-start md:gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-2">
          <ProductGallery
            media={media.nodes}
            className="w-screen md:w-full lg:col-span-2"
          />
          <div className="sticky md:-mb-nav md:top-nav md:-translate-y-nav md:h-screen md:pt-nav hiddenScroll md:overflow-y-scroll">
            <section className="flex flex-col w-full gap-10 p-8 md:mx-auto md:px-0">
              <div className="grid gap-2">
                <Heading as="h1" className="whitespace-normal productName">
                  {title}
                </Heading>
              </div>
              <ProductForm />
              <div className="grid gap-4 py-4">
                {descriptionHtml && (
                  <ProductDetails
                    title="Product Details"
                    className="prodDetails"
                    content={descriptionHtml}
                  />
                )}
                {shippingPolicy?.body && (
                  <ProductDetail
                    title="Shipping"
                    content={getExcerpt(shippingPolicy.body)}
                    learnMore={`/policies/${shippingPolicy.handle}`}
                  />
                )}
                {refundPolicy?.body && (
                  <ProductDetail
                    title="Returns"
                    content={getExcerpt(refundPolicy.body)}
                    learnMore={`/policies/${refundPolicy.handle}`}
                  />
                )}
              </div>
            </section>
          </div>
          <div className="grid items-start md:gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-1 floatingspec">
            <div className="specifications">
              <ProductSpecs
                title="Specifications"
                content={metafield.value}
                className="specs"
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}

export function ProductForm() {
  const {product, analytics} = useLoaderData();

  const [currentSearchParams] = useSearchParams();
  const transition = useTransition();
  const searchParams = useMemo(() => {
    return transition.location
      ? new URLSearchParams(transition.location.search)
      : currentSearchParams;
  }, [currentSearchParams, transition]);

  const firstVariant = product.variants.nodes[0];
  const searchParamsWithDefaults = useMemo(() => {
    const clonedParams = new URLSearchParams(searchParams);

    for (const {name, value} of firstVariant.selectedOptions) {
      if (!searchParams.has(name)) {
        clonedParams.set(name, value);
      }
    }

    return clonedParams;
  }, [searchParams, firstVariant.selectedOptions]);
  const selectedVariant = product.selectedVariant ?? firstVariant;
  const isOutOfStock = !selectedVariant?.availableForSale;
  const isOnSale =
    selectedVariant?.price?.amount &&
    selectedVariant?.compareAtPrice?.amount &&
    selectedVariant?.price?.amount < selectedVariant?.compareAtPrice?.amount;
  const productAnalytics = {
    ...analytics.products[0],
    quantity: 1,
  };
  return (
    <div className="grid gap-10">
      <div className="grid gap-4">
        {selectedVariant && (
          <div className="grid items-stretch gap-4 varPrice">
            <Money
              withoutTrailingZeros
              data={selectedVariant?.price}
              as="span"
            />
            {isOnSale && (
              <Money
                withoutTrailingZeros
                data={selectedVariant?.compareAtPrice}
                as="span"
                className="opacity-50 strike"
              />
            )}
            {isOutOfStock ? (
              <Button variant="secondary" disabled>
                <Text>Sold out</Text>
              </Button>
            ) : (
              <AddToCartButton
                lines={[
                  {
                    merchandiseId: selectedVariant.id,
                    quantity: 1,
                  },
                ]}
                variant="primary"
                data-test="add-to-cart"
                analytics={{
                  products: [productAnalytics],
                  totalValue: parseFloat(productAnalytics.price),
                }}
              >
                <Text
                  as="span"
                  className="flex items-center justify-center gap-2"
                >
                  Add to Cart
                </Text>
              </AddToCartButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
function ProductDetail({title, content, learnMore}) {
  return (
    <Disclosure key={title} as="div" className="grid w-full gap-2">
      {({open}) => (
        <>
          <Disclosure.Button className="text-left">
            <div className="flex justify-between">
              <Text size="lead" as="h4">
                {title}
              </Text>
              <IconClose
                className={clsx(
                  'transition-transform transform-gpu duration-100',
                  !open && 'rotate-[45deg]',
                )}
              />
            </div>
          </Disclosure.Button>

          <Disclosure.Panel className={'pb-4 pt-2 grid gap-2'}>
            <div
              className="prose"
              dangerouslySetInnerHTML={{__html: content}}
            />
            {learnMore && (
              <div className="">
                <Link
                  className="pb-px border-b border-primary/30 text-primary/50"
                  to={learnMore}
                >
                  Learn more
                </Link>
              </div>
            )}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
function ProductDetails({title, content}) {
  return (
    <div key={title} className="grid w-full gap-2">
      <div className="text-left">
        <div className="flex justify-between">
          <Text size="lead" as="h4">
            {title}
          </Text>
        </div>
      </div>

      <div className={'pb-4 pt-2 grid gap-2'}>
        <div className="prose" dangerouslySetInnerHTML={{__html: content}} />
      </div>
    </div>
  );
}
function ProductSpecs({title, content}) {
  return (
    <div className="specBox">
      <Text size="lead" as="h4">
        {title}
      </Text>

      <div
        className="prose SpecBg"
        dangerouslySetInnerHTML={{__html: content}}
      />
    </div>
  );
}
const PRODUCT_VARIANT_FRAGMENT = `
  fragment ProductVariantFragment on ProductVariant {
    id
    availableForSale
    selectedOptions {
      name
      value
    }
    image {
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    compareAtPrice {
      amount
      currencyCode
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
  }
`;

const PRODUCT_QUERY = `
  ${MEDIA_FRAGMENT}
  ${PRODUCT_VARIANT_FRAGMENT}
  query Product(
    $country: CountryCode
    $language: LanguageCode
    $handle: String!
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      vendor
      handle
      descriptionHtml
      description
      options {
        name
        values
      }
      selectedVariant: variantBySelectedOptions(selectedOptions: $selectedOptions) {
        ...ProductVariantFragment
      }
      media(first: 7) {
        nodes {
          ...Media
        }
      }
      variants(first: 3) {
        nodes {
          ...ProductVariantFragment
        }
      }
      seo {
        description
        title
      }
      metafield(key: "specifications", namespace: "product") {
        value
    }
    }
    shop {
      name
      primaryDomain {
        url
      }
      shippingPolicy {
        body
        handle
      }
      refundPolicy {
        body
        handle
      }
    }
  }
`;

const RECOMMENDED_PRODUCTS_QUERY = `
  ${PRODUCT_CARD_FRAGMENT}
  query productRecommendations(
    $productId: ID!
    $count: Int
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    recommended: productRecommendations(productId: $productId) {
      ...ProductCard
    }
    additional: products(first: $count, sortKey: BEST_SELLING) {
      nodes {
        ...ProductCard
      }
    }
  }
`;

async function getRecommendedProducts(storefront, productId) {
  const products = await storefront.query(RECOMMENDED_PRODUCTS_QUERY, {
    variables: {productId, count: 6},
  });

  invariant(products, 'No data returned from Shopify API');

  const mergedProducts = products.recommended
    .concat(products.additional.nodes)
    .filter(
      (value, index, array) =>
        array.findIndex((value2) => value2.id === value.id) === index,
    );

  const originalProduct = mergedProducts
    .map((item) => item.id)
    .indexOf(productId);

  mergedProducts.splice(originalProduct, 1);

  return mergedProducts;
}
