import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const startup = defineType({
  name: 'startup',
  title: 'Startup',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type:'string'
    }),
    defineField({
      name: 'slug',
      type:'slug',
      options: {
        source: 'title' //will be auto gen using the title
      }
    }),
    defineField({
      name: 'author',
      type:'reference',
      to: { type: 'author'} // to define 'a reference to what?'
    }),
    defineField({
      name: 'views',
      type:'number'
    }),
    defineField({
      name: 'description',
      type:'text'
    }),
    defineField({
      name: 'category',
      type:'string',
      validation: (Rule) => Rule.min(1).max(20).required().error('Please enter a category'),
    }),
    defineField({
      name: 'image',
      type:'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'pitch',
      type:'markdown' // custom type/plugin
    })
  ] // uses default preview in order of precedence till first text field is encountered
})