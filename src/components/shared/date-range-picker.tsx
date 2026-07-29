import type { AppDateRangePicker } from '@/components/app-ui';
import type { ComponentProps } from 'react';

export { AppDateRangePicker as DateRangePicker } from '@/components/app-ui';
export type { DateRange } from 'react-day-picker';
export type DateRangePickerProps = ComponentProps<typeof AppDateRangePicker>;
