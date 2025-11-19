import { type Db } from 'mongodb';
import { type Setting } from '../entity/setting';
import { settingSchema } from '../controllers/settings/domain';
import merge from 'lodash.merge';

export interface SettingDAL {
  get(clientId: number): Promise<Setting>;
  update( body: Partial<Setting>): Promise<Setting>;
}

export const createSettingDAL = (db: Db): SettingDAL => {
  const settings = db.collection<Setting>('setting');

  return {
    async get(clientId) {
      const result = await settings.findOneAndUpdate(
        { clientId },
        { $setOnInsert: defaultSetting(clientId) },
        { upsert: true, returnDocument: 'after' }
      );
      return result;
    },

    async update( body) {
      const clientId = body.clientId;
      const defaultData = defaultSetting(clientId);

      const data = merge(defaultData, body);
      delete data._id

      const result= await settings.findOneAndUpdate(
        { clientId },
        { $set: data },
        { upsert: true, returnDocument: 'after' }
      );

      return result;
    },
  };
};

export function defaultSetting(clientId: number):Setting {
  return {...settingSchema.getDefault(),clientId};
}
