import { Router } from 'express';
import { SettingDAL } from '../../dal/settings.dal';
import { Setting } from '../../entity/setting';
import validateSchema from '../../middleware/validator';
import { settingSchema } from './domain';

export const createUpdateSettingHandler = (settingDAL: SettingDAL) =>
  Router().put('/', validateSchema(settingSchema), async (req, res) => {
    const data: Setting = req.body;

    const result = await settingDAL.update(data);
    if (!result) return res.status(400).end();

    return res.send(result);
  });
