import {Image} from '@shopify/hydrogen';
import {Heading, Section, Grid, Link} from '~/components';

export function FeaturedCollections({
  collections,
  title = 'Collections',
  ...props
}) {
  const haveCollections = collections && collections.length > 0;
  if (!haveCollections) return null;

  const items = collections.filter((item) => item.image).length;

  return (
    <Section {...props} heading={title} className="featProd container">
      <Grid items={items}>
        {collections.map((collection) => {
          if (!collection?.image) {
            return null;
          }
          return (
            <Link key={collection.id} to={`/collections/${collection.handle}`}>
              <div className="grid gap-4">
                <div className="card-image bg-primary/5 bgWhite simSize">
                  {collection?.image && (
                    <Image
                      alt={`Image of ${collection.title}`}
                      data={collection.image}
                      className="featCollections"
                      sizes="(max-width: 32em) 100vw, 33vw"
                    />
                  )}
                </div>
                <Heading className="collectionTitle" size="copy">{collection.title}</Heading>
              </div>
            </Link>
          );
        })}
      </Grid>
    </Section>
  );
}
