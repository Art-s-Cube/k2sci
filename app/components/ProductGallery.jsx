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

        const data = {
          ...med,
          image: {
            // @ts-ignore
            ...med.image,
            altText: med.alt || 'Product image',
          },
        };

        switch (med.mediaContentType) {
          case 'IMAGE':
            mediaProps = {
              width: 800,
              widths: [400, 800, 1200, 1600, 2000, 2400],
            };
            break;
          case 'VIDEO':
            mediaProps = {
              width: '100%',
              autoPlay: true,
              controls: false,
              muted: true,
              loop: true,
              preload: 'auto',
            };
            break;
          case 'EXTERNAL_VIDEO':
            mediaProps = {width: '100%'};
            break;
          case 'MODEL_3D':
            mediaProps = {
              width: '100%',
              interactionPromptThreshold: '0',
              ar: true,
              loading: ATTR_LOADING_EAGER,
              disableZoom: true,
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
            {med.image && (
              <img
                src={data.image.url}
                alt={data.image.altText}
                className="w-full h-full aspect-square fadeIn object-contain"
              />
            )}
          </div>
        );
      })}
    </Carousel>
  );
}
