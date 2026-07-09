import { LocalizationParam } from '@abp/ng.core';
import { DEFAULT_ERROR_LOCALIZATIONS, DEFAULT_ERROR_MESSAGES } from '../constants/default-errors';

export function getErrorFromRequestBody(body: { details?: string; message?: string } | undefined) {
  const defaultTitle: LocalizationParam = {
    key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.title,
    defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.title,
  };

  const defaultDetails: LocalizationParam = {
    key: DEFAULT_ERROR_LOCALIZATIONS.defaultError.details,
    defaultValue: DEFAULT_ERROR_MESSAGES.defaultError.details,
  };

  let message: LocalizationParam = defaultDetails;
  let title: LocalizationParam = defaultTitle;

  if (body?.details) {
    message = body.details;
    title = body.message ?? defaultTitle;
  } else if (body?.message) {
    message = body.message;
  }

  return { message, title };
}
