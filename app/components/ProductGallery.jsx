import {ATTR_LOADING_EAGER} from '~/lib/const';
import {Carousel} from 'react-responsive-carousel';

/**
 * A client component that defines a media gallery for hosting images, 3D models, and videos of products
 */
export function ProductGallery({media}) {
  if (!media.length) {
    return null;
  }

  return (
    <Carousel>
      {media.map((med, i) => {
        let mediaProps = {};
        switch (med.mediaContentType) {
          case 'IMAGE':
            mediaProps = {
              src: med.image.url,
              alt: med.alt || 'Product image',
              width: 800,
              height: 800,
              sizes: '(min-width: 640px) 50vw, 100vw',
              srcSet: `${med.image.url}?w=400 400w,
                        ${med.image.url}?w=800 800w,
                        ${med.image.url}?w=1200 1200w,
                        ${med.image.url}?w=1600 1600w,
                        ${med.image.url}?w=2000 2000w,
                        ${med.image.url}?w=2400 2400w`,
            };
            break;
        }

        if (i === 0 && med.mediaContentType === 'IMAGE') {
          mediaProps.loading = ATTR_LOADING_EAGER;
        }

        return (
          <div
            className="imageDiv"
            // @ts-ignore
            key={med.id || med.image.id}
          >
            {/* TODO: Replace with MediaFile when it's available */}
            {med.image && med.mediaContentType === 'IMAGE' && (
              <img
                {...mediaProps}
                alt={med.alt || 'Product image'}
                className="w-full h-full aspect-square fadeIn object-contain"
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
}
