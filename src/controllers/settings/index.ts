import { Router } from 'express';
import { SettingDAL } from '../../dal/settings.dal';
import { createGetSettingHandler } from './get-setting';
import { createUpdateSettingHandler } from './update-setting';

export const createSettingController = (settingDAL: SettingDAL) =>
  Router().use(createGetSettingHandler(settingDAL)).use(createUpdateSettingHandler(settingDAL));
