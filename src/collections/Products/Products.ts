import { PRODUCT_CATEGORIES } from "../../config";
import { CollectionConfig } from "payload/types";

export const Products: CollectionConfig = {
  slug: "products",
  admin: {
    useAsTitle: "name",
  },
  access: {},
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      hasMany: false,
      admin: {
        condition: () => false,
      },
    },
    {
      name: "name",
      type: "text",
      required: true,
      label: "Name",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Product Details",
    },
    {
      name: "price",
      type: "number",
      min: 0,
      max: 1000,
      required: true,
      label: "Price in USD",
    },
    {
      name: "category",
      type: "select",
      required: true,
      label: "Category",
      options: PRODUCT_CATEGORIES?.map(({label,value})=>({label,value}))
    },
    {
      name: 'product_files',
      label: 'Product file(s)',
      type: 'relationship',
      required: true,
      relationTo: 'product_files',
      hasMany: false,
    },
    {
      name: "approvedForSale",
      label: "Product Status",
      type: "select",
      defaultValue: "pending",
      access: {
        update: ({ req }) => {
          return req.user.role === "admin"; // Only admins can update the status
          },
        create: ({ req }) => {
          return req.user.role === "admin"; // Only admins can update the status
        },
        read:({req})=>{
          return req.user.role === "admin"
        }

      },
      options: [
        {
          label:"Pending verification",
          value:"pending"
        },
        {
          label:"Approved",
          value:"approved"
        },
        {
          label:"Denied",
          value:"denied"
        }
      ]
    },
    {
      name: 'priceId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'stripeId',
      access: {
        create: () => false,
        read: () => false,
        update: () => false,
      },
      type: 'text',
      admin: {
        hidden: true,
      },
    },
    {
      name: 'images',
      type: 'array',
      label: 'Product images',
      minRows: 1,
      maxRows: 4,
      required: true,
      labels: {
        singular: 'Image',
        plural: 'Images',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
};
