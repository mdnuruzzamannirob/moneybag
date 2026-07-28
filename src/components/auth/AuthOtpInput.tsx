'use client'

import { useRef, type KeyboardEvent } from 'react'

import { cn } from '@/lib/utils'

const OTP_LENGTH = 6

type AuthOtpInputProps = {
  'aria-describedby'?: string
  'aria-invalid'?: boolean
  autoComplete?: string
  disabled?: boolean
  id?: string
  name?: string
  onBlur?: () => void
  onValueChange: (value: string) => void
  value: string
}

/** A keyboard- and paste-friendly six-digit authenticator-code input. */
export function AuthOtpInput({
  disabled,
  id,
  name,
  onBlur,
  onValueChange,
  value,
  ...aria
}: AuthOtpInputProps) {
  const inputs = useRef<Array<HTMLInputElement | null>>([])
  const digits = Array.from(
    { length: OTP_LENGTH },
    (_, index) => value[index] ?? '',
  )
  const focus = (index: number) => inputs.current[index]?.focus()
  const setDigits = (nextDigits: string[], nextFocus?: number) => {
    onValueChange(nextDigits.join('').slice(0, OTP_LENGTH))
    if (nextFocus !== undefined) requestAnimationFrame(() => focus(nextFocus))
  }
  const fillFrom = (rawValue: string, startIndex: number) => {
    const pastedDigits = rawValue
      .replace(/\D/g, '')
      .slice(0, OTP_LENGTH - startIndex)
    if (!pastedDigits) return
    const nextDigits = [...digits]
    pastedDigits.split('').forEach((digit, offset) => {
      nextDigits[startIndex + offset] = digit
    })
    setDigits(
      nextDigits,
      Math.min(startIndex + pastedDigits.length, OTP_LENGTH - 1),
    )
  }
  const handleKeyDown = (
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (event.key === 'Backspace' && !digits[index] && index > 0) {
      event.preventDefault()
      const nextDigits = [...digits]
      nextDigits[index - 1] = ''
      setDigits(nextDigits, index - 1)
    }
    if (event.key === 'ArrowLeft' && index > 0) {
      event.preventDefault()
      focus(index - 1)
    }
    if (event.key === 'ArrowRight' && index < OTP_LENGTH - 1) {
      event.preventDefault()
      focus(index + 1)
    }
  }
  return (
    <div
      className="flex w-full items-center justify-center gap-1.5 xs:gap-2 sm:gap-3"
      role="group"
    >
      {digits.map((digit, index) => (
        <input
          {...aria}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          className={cn(
            'size-10 shrink-0 rounded-md border border-border bg-card px-0 text-center text-lg font-medium tabular-nums text-foreground shadow-none outline-none transition-all hover:border-border focus:border-primary focus:ring-3 focus:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 sm:size-12 sm:rounded-lg sm:text-xl',
            aria['aria-invalid'] &&
              'border-destructive! hover:border-destructive! focus:border-destructive! focus:ring-destructive/20!',
          )}
          disabled={disabled}
          id={index === 0 ? id : undefined}
          inputMode="numeric"
          key={index}
          maxLength={OTP_LENGTH}
          name={index === 0 ? name : undefined}
          onBlur={onBlur}
          onChange={(event) => {
            const nextValue = event.target.value
            if (nextValue.length > 1) {
              fillFrom(nextValue, index)
              return
            }
            const nextDigits = [...digits]
            nextDigits[index] = nextValue.replace(/\D/g, '')
            setDigits(
              nextDigits,
              nextValue ? Math.min(index + 1, OTP_LENGTH - 1) : undefined,
            )
          }}
          onFocus={(event) => event.currentTarget.select()}
          onKeyDown={(event) => handleKeyDown(event, index)}
          onPaste={(event) => {
            event.preventDefault()
            fillFrom(event.clipboardData.getData('text'), index)
          }}
          pattern="[0-9]*"
          ref={(element) => {
            inputs.current[index] = element
          }}
          type="text"
          value={digit}
        />
      ))}
    </div>
  )
}
