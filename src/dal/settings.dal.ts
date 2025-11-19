import { type Db } from 'mongodb';
import { Setting } from '../entity/setting';

export interface SettingDAL {
  get(clientId: number): Promise<Setting | undefined>;
  update(body: Setting): Promise<Setting>;
  create(body: Setting): Promise<Setting>;
}

export const createSettingDAL = (db: Db): SettingDAL => {
  const setting = db.collection('setting');

  return {
    async get(clientId) {
      const result = await setting.findOne<Setting>({ clientId });
      if (!result) return this.create(defaultSetting(clientId));

      return result;
    },
    async update({ _id, ...body }) {
      if (!body.clientId) return undefined;
      const res = await setting.replaceOne({ clientId: body.clientId }, body);
      if (!res.matchedCount)
        return this.create({
          ...defaultSetting(body.clientId),
          ...body,
          clientId: body.clientId,
        });
      if (!res.modifiedCount) return undefined;

      return this.get(body.clientId);
    },
    async create({ _id, ...body }) {
      const res = await setting.insertOne(body);
      if (!res.acknowledged) return undefined;
      return body;
    },
  };
};
export function defaultSetting(clientId: number) {
  return {
    clientId,
    deliveryMethods: [],
    fulfillmentFormat: {
      rfid: false,
      print: false,
    },
    printingFormat: {
      formatA: false,
      formatB: false,
    },
    scanning: {
      scanManually: false,
      scanWhenComplete: false,
    },
    paymentMethods: {
      cash: false,
      creditCard: false,
      comp: false,
    },
    ticketDisplay: {
      leftInAllotment: false,
      soldOut: false,
    },
    customerInfo: {
      active: false,
      basicInfo: false,
      addressInfo: false,
    },
  } satisfies Partial<Setting>;
}
