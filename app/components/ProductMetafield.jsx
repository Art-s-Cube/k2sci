import React from 'react';
import {useQuery} from 'graphql-hooks';

const ProductMetafield = ({handle}) => {
  const {loading, error, data} = useQuery({
    variables: {handle, country: 'US', language: 'en', selectedOptions: []},
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const product = data.product;
  const specs =
    product.specs && product.specs.reference && product.specs.reference.value;

  return (
    <div>
      {specs && (
        <div>
          <h2>Specifications</h2>
          <p>{specs}</p>
        </div>
      )}
    </div>
  );
};

export default ProductMetafield;
