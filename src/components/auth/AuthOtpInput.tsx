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
      className="flex items-center justify-between gap-2 sm:gap-3"
      role="group"
    >
      {digits.map((digit, index) => (
        <input
          {...aria}
          aria-label={`Digit ${index + 1} of ${OTP_LENGTH}`}
          className={cn(
            'h-12 min-w-0 flex-1 mt-2 rounded-lg border border-input bg-card text-center text-xl font-medium tabular-nums text-foreground shadow-xs outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 sm:h-12 sm:text-xl',
            aria['aria-invalid'] &&
              'border-destructive focus:border-destructive focus:ring-destructive/20',
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
