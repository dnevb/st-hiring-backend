import * as yup from 'yup';

export const settingSchema = yup.object({
  clientId: yup.number().required(),
  deliveryMethods: yup
    .array(
      yup
        .object({
          name: yup.string().required(),
          enum: yup.string().required(),
          order: yup.number().required(),
          isDefault: yup.boolean().required(),
          selected: yup.boolean().required(),
        })
        .required(),
    )
    .required().default([]),
  fulfillmentFormat: yup
    .object({
      rfid: yup.boolean().required().default(false),
      print: yup.boolean().required().default(false),
    })
    .required(),
  printingFormat: yup
    .object({
      formatA: yup.boolean().required().default(false),
      formatB: yup.boolean().required().default(false),
    })
    .required(),
  scanning: yup
    .object({
      scanManually: yup.boolean().required().default(false),
      scanWhenComplete: yup.boolean().required().default(false),
    })
    .required(),
  paymentMethods: yup
    .object({
      cash: yup.boolean().required().default(false),
      creditCard: yup.boolean().required().default(false),
      comp: yup.boolean().required().default(false),
    })
    .required(),
  ticketDisplay: yup
    .object({
      leftInAllotment: yup.boolean().required().default(false),
      soldOut: yup.boolean().required().default(false),
    })
    .required(),
  customerInfo: yup
    .object({
      active: yup.boolean().required().default(false),
      basicInfo: yup.boolean().required().default(false),
      addressInfo: yup.boolean().required().default(false),
    })
    .required(),
  printer: yup
    .object({
      id: yup.mixed().nullable().default(null),
    })
    .partial(),
});
