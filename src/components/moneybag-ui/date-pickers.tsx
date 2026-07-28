"use client"

import * as React from "react"
import { format, setHours, setMinutes } from "date-fns"
import type { DateRange } from "react-day-picker"
import { CalendarIcon, Clock3Icon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

type CalendarProps = React.ComponentProps<typeof Calendar>
type CalendarOptions = Omit<CalendarProps, "mode" | "onSelect" | "selected">

type BaseDatePickerProps = {
  buttonClassName?: string
  calendarClassName?: string
  calendarProps?: CalendarOptions
  className?: string
  placeholder?: string
}

function useControllableValue<T>(
  value: T | undefined,
  defaultValue: T | undefined,
  onValueChange: ((value: T | undefined) => void) | undefined,
) {
  const [internalValue, setInternalValue] = React.useState<T | undefined>(defaultValue)
  const isControlled = value !== undefined
  const selectedValue = isControlled ? value : internalValue

  const setSelectedValue = React.useCallback(
    (nextValue: T | undefined) => {
      if (!isControlled) setInternalValue(nextValue)
      onValueChange?.(nextValue)
    },
    [isControlled, onValueChange],
  )

  return [selectedValue, setSelectedValue] as const
}

/**
 * Project-standard single-date picker. It uses a calendar popover instead of
 * browser-specific date inputs and can be used as a controlled RHF field.
 */
export type MoneybagDatePickerProps = BaseDatePickerProps & {
  defaultValue?: Date
  onValueChange?: (value: Date | undefined) => void
  value?: Date
}

export function MoneybagDatePicker({
  buttonClassName,
  calendarClassName,
  calendarProps,
  className,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date",
  value,
}: MoneybagDatePickerProps) {
  const [selectedDate, setSelectedDate] = useControllableValue(value, defaultValue, onValueChange)

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={cn(
              "h-10 w-full justify-start rounded-md bg-card px-3 text-left font-normal",
              !selectedDate && "text-muted-foreground",
              buttonClassName,
            )}
            type="button"
            variant="outline"
          />
        }
      >
        <CalendarIcon className="size-4" />
        {selectedDate ? format(selectedDate, "dd MMM yyyy") : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-auto p-0", className)}>
        <Calendar
          {...calendarProps}
          className={calendarClassName}
          mode="single"
          onSelect={setSelectedDate}
          selected={selectedDate}
        />
      </PopoverContent>
    </Popover>
  )
}

/** A date range picker for reports, exports, and transaction filters. */
export type MoneybagDateRangePickerProps = BaseDatePickerProps & {
  defaultValue?: DateRange
  onValueChange?: (value: DateRange | undefined) => void
  value?: DateRange
}

export function MoneybagDateRangePicker({
  buttonClassName,
  calendarClassName,
  calendarProps,
  className,
  defaultValue,
  onValueChange,
  placeholder = "Pick a date range",
  value,
}: MoneybagDateRangePickerProps) {
  const [selectedRange, setSelectedRange] = useControllableValue(value, defaultValue, onValueChange)
  const label = selectedRange?.from
    ? selectedRange.to
      ? `${format(selectedRange.from, "dd MMM yyyy")} – ${format(selectedRange.to, "dd MMM yyyy")}`
      : format(selectedRange.from, "dd MMM yyyy")
    : placeholder

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={cn(
              "h-10 w-full justify-start rounded-md bg-card px-3 text-left font-normal",
              !selectedRange?.from && "text-muted-foreground",
              buttonClassName,
            )}
            type="button"
            variant="outline"
          />
        }
      >
        <CalendarIcon className="size-4" />
        <span className="truncate">{label}</span>
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-auto p-0", className)}>
        <Calendar
          {...calendarProps}
          className={calendarClassName}
          mode="range"
          numberOfMonths={calendarProps?.numberOfMonths ?? 2}
          onSelect={setSelectedRange}
          selected={selectedRange}
        />
      </PopoverContent>
    </Popover>
  )
}

function buildTimeValue(date: Date, time: string) {
  const [hours, minutes] = time.split(":").map(Number)
  return setMinutes(setHours(date, hours), minutes)
}

function timeOptions(minuteStep: number) {
  const options: string[] = []

  for (let hours = 0; hours < 24; hours += 1) {
    for (let minutes = 0; minutes < 60; minutes += minuteStep) {
      options.push(`${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`)
    }
  }

  return options
}

/**
 * Combined date and time picker for reminders, scheduled transactions, and
 * future recurring-payment flows. Values remain ordinary JavaScript Dates.
 */
export type MoneybagDateTimePickerProps = BaseDatePickerProps & {
  defaultValue?: Date
  minuteStep?: 5 | 10 | 15 | 20 | 30
  onValueChange?: (value: Date | undefined) => void
  value?: Date
}

export function MoneybagDateTimePicker({
  buttonClassName,
  calendarClassName,
  calendarProps,
  className,
  defaultValue,
  minuteStep = 15,
  onValueChange,
  placeholder = "Pick date and time",
  value,
}: MoneybagDateTimePickerProps) {
  const [selectedDateTime, setSelectedDateTime] = useControllableValue(value, defaultValue, onValueChange)
  const options = React.useMemo(() => timeOptions(minuteStep), [minuteStep])
  const selectedTime = selectedDateTime ? format(selectedDateTime, "HH:mm") : undefined

  const updateDate = (nextDate: Date | undefined) => {
    if (!nextDate) {
      setSelectedDateTime(undefined)
      return
    }

    const source = selectedDateTime ?? new Date()
    setSelectedDateTime(
      setMinutes(setHours(nextDate, source.getHours()), source.getMinutes()),
    )
  }

  const updateTime = (nextTime: string | null) => {
    if (!nextTime) return
    setSelectedDateTime(buildTimeValue(selectedDateTime ?? new Date(), nextTime))
  }

  return (
    <Popover>
      <PopoverTrigger
        render={
          <Button
            className={cn(
              "h-10 w-full justify-start rounded-md bg-card px-3 text-left font-normal",
              !selectedDateTime && "text-muted-foreground",
              buttonClassName,
            )}
            type="button"
            variant="outline"
          />
        }
      >
        <Clock3Icon className="size-4" />
        {selectedDateTime ? format(selectedDateTime, "dd MMM yyyy, hh:mm a") : placeholder}
      </PopoverTrigger>
      <PopoverContent align="start" className={cn("w-auto p-0", className)}>
        <Calendar
          {...calendarProps}
          className={calendarClassName}
          mode="single"
          onSelect={updateDate}
          selected={selectedDateTime}
        />
        <div className="border-t border-border p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Time</p>
          <Select onValueChange={updateTime} value={selectedTime}>
            <SelectTrigger className="h-9 w-full rounded-md bg-card">
              <SelectValue placeholder="Select time" />
            </SelectTrigger>
            <SelectContent className="max-h-64">
              {options.map((option) => (
                <SelectItem key={option} value={option}>
                  {format(buildTimeValue(new Date(2000, 0, 1), option), "hh:mm a")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </PopoverContent>
    </Popover>
  )
}
