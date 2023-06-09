import clsx from 'clsx';
import {MediaFile} from '@shopify/hydrogen';
import {Heading, Text, Link} from '~/components';

/**
 * Hero component that renders metafields attached to collection resources
 **/
export function Hero1({
  byline,
  cta,
  handle,
  heading,
  height,
  loading,
  spread,
  spreadSecondary,
  top,
}) {
  return (
    <section
      className={clsx(
        'relative justify-end flex flex-col w-full max-h-half spreadRef1',
        top && '-mt-nav',
        height === 'full'
          ? 'max-h-half'
          : 'aspect-[4/5] sm:aspect-square md:aspect-[5/4] lg:aspect-[3/2] xl:aspect-[2/1]',
      )}
    >
      <div className="absolute inset-0 grid flex-grow pointer-events-none auto-cols-fr -z-10 content-stretch overflow-clip">
        {spread?.reference && (
          <div>
            <SpreadMedia
              scale={2}
              sizes={
                spreadSecondary?.reference
                  ? '(min-width: 80em) 700px, (min-width: 48em) 450px, 500px'
                  : '(min-width: 80em) 1400px, (min-width: 48em) 900px, 500px'
              }
              widths={
                spreadSecondary?.reference ? [500, 450, 700] : [500, 900, 1400]
              }
              width={spreadSecondary?.reference ? 1650 : 2300}
              data={spread.reference}
              loading={loading}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col items-baseline justify-between gap-4 px-6 py-8 sm:px-8 md:px-12 dark:from-contrast/60 dark:text-primary from-primary/60 text-contrast heroTextPos">
        {heading?.value && (
          <Heading format as="h1" size="display" className="max-w-md heroH1">
            {heading.value}
          </Heading>
        )}
        {byline?.value && (
          <Text format width="narrow" as="p" size="lead" className="heroP">
            {byline.value}
          </Text>
        )}
        <Link to={`/collections/${handle}`} className="btn-default">
          {cta?.value && <Text size="lead">{cta.value}</Text>}
        </Link>
      </div>
    </section>
  );
}

function SpreadMedia({data, loading, decoding, scale, sizes, width, widths}) {
  return (
    <MediaFile
      data={data}
      className="block object-cover w-full max-h-half"
      mediaOptions={{
        video: {
          controls: false,
          muted: true,
          loop: true,
          playsInline: true,
          autoPlay: true,
          width: (scale ?? 1) * width,
          previewImageOptions: {scale, src: data.previewImage?.url ?? ''},
        },
        image: {
          loading,
          decoding,
          loaderOptions: {scale, crop: 'center'},
          widths,
          sizes,
          width,
          alt: data.alt || '',
        },
      }}
    />
  );
}
