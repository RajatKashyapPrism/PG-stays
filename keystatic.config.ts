import { config, collection, fields } from '@keystatic/core';

export default config({
  storage: {
    kind: 'local',
  },
  collections: {
    properties: collection({
      label: 'Bangalore Properties',
      slugField: 'name',
      path: 'src/content/bangaloreProperties/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Property Name',
            validation: { isRequired: true },
          },
        }),
        address: fields.text({
          label: 'Address',
          validation: { isRequired: true },
        }),
        gender: fields.text({
          label: 'Gender Label',
          description: 'Display text e.g. "Girls only" or "Boys only"',
          validation: { isRequired: true },
        }),
        genderType: fields.select({
          label: 'Gender Type',
          options: [
            { label: 'Female', value: 'female' },
            { label: 'Male', value: 'male' },
          ],
          defaultValue: 'male',
        }),
        price: fields.text({
          label: 'Starting Price',
          description: 'e.g. ₹5,500',
          validation: { isRequired: true },
        }),
        images: fields.array(
          fields.text({
            label: 'Image URL',
            description: 'S3 or CDN URL for the image',
          }),
          {
            label: 'Images',
            description: 'Up to 5 images. Add S3/CDN URLs.',
            itemLabel: (props) => props.value || 'Image URL',
          }
        ),
        order: fields.number({
          label: 'Display Order',
          description: 'Lower numbers appear first',
          defaultValue: 0,
        }),
      },
    }),
    gurugramProperties: collection({
      label: 'Gurugram properties',
      slugField: 'name',
      path: 'src/content/gurugramProperties/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Property Name',
            validation: { isRequired: true },
          },
        }),
        address: fields.text({
          label: 'Address',
          validation: { isRequired: true },
        }),
        gender: fields.text({
          label: 'Gender Label',
          description: 'Display text e.g. "Girls only" or "Boys only"',
          validation: { isRequired: true },
        }),
        genderType: fields.select({
          label: 'Gender Type',
          options: [
            { label: 'Female', value: 'female' },
            { label: 'Male', value: 'male' },
          ],
          defaultValue: 'male',
        }),
        price: fields.text({
          label: 'Starting Price',
          description: 'e.g. ₹5,500',
          validation: { isRequired: true },
        }),
        images: fields.array(
          fields.text({
            label: 'Image URL',
            description: 'S3 or CDN URL for the image',
          }),
          {
            label: 'Images',
            description: 'Up to 5 images. Add S3/CDN URLs.',
            itemLabel: (props) => props.value || 'Image URL',
          }
        ),
        order: fields.number({
          label: 'Display Order',
          description: 'Lower numbers appear first',
          defaultValue: 0,
        }),
      },
    }),
    testimonials: collection({
      label: 'Testimonials',
      slugField: 'name',
      path: 'src/content/testimonials/*',
      format: { data: 'json' },
      schema: {
        name: fields.slug({
          name: {
            label: 'Reviewer Name',
            validation: { isRequired: true },
          },
        }),
        quote: fields.text({
          label: 'Quote',
          description: 'The testimonial text from the resident.',
          multiline: true,
          validation: { isRequired: true },
        }),
        location: fields.text({
          label: 'Location',
          description: 'e.g. "Bangalore" or "Koramangala, Bangalore"',
        }),
        timeAgo: fields.text({
          label: 'Time Ago',
          description: 'e.g. "3 months ago" or "2 weeks ago"',
        }),
        rating: fields.number({
          label: 'Star Rating',
          description: 'Number of stars (1–5)',
          defaultValue: 5,
          validation: { min: 1, max: 5 },
        }),
        order: fields.number({
          label: 'Display Order',
          description: 'Lower numbers appear first',
          defaultValue: 0,
        }),
      },
    }),
  },
});
