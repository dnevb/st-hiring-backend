import { Router } from 'express';
import { SettingDAL } from '../../dal/settings.dal';
import { createGetSettingHandler } from './get-setting';

export const createSettingController = (settingDAL: SettingDAL) =>
  Router()
    .use(createGetSettingHandler(settingDAL));
