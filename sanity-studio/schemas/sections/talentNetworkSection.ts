import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'talentNetworkSection',
  title: 'Talent Network Section',
  type: 'object',
  fields: [
    defineField({
      name: 'headline',
      type: 'string',
      initialValue: 'Join Our Talent Network',
    }),
    defineField({
      name: 'intro',
      type: 'text',
      rows: 3,
      initialValue:
        "Interested in working with Second Life but don’t see a suitable role? Submit your profile to our Talent Network. We review all submissions and reach out when relevant opportunities arise.",
    }),
  ],
})