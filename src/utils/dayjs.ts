import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import localeData from 'dayjs/plugin/localeData';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/es-us';

dayjs.extend(duration);
dayjs.extend(localeData);
dayjs.extend(localizedFormat);
dayjs.extend(timezone);
