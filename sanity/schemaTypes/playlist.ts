import { defineField, defineType } from "sanity";
import { UserIcon } from "lucide-react";

export const playlist = defineType({
  name: 'playlist',
  title: 'Playlist',
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
      name: 'select',
      type:'array',
      of: [{ type: 'reference', to: [{ type: 'startup' }]}] // to define 'a reference to what?'
    })
  ] // uses default preview in order of precedence till first text field is encountered
})