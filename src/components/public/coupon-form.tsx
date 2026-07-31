'use client';

import { AppButton, AppInput } from '@/components/app-ui';
import { CheckCircle2, TicketPercent } from 'lucide-react';
import { useState } from 'react';

export function CouponForm() {
  const [applied, setApplied] = useState(false);

  return (
    <form
      className="flex w-full max-w-sm items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        setApplied(true);
      }}
    >
      <AppInput
        aria-label="Coupon code"
        className="font-mono uppercase"
        leading={<TicketPercent />}
        name="coupon"
        placeholder="WELCOME20"
        required
      />
      <AppButton type="submit">
        {applied ? <CheckCircle2 className="size-4" /> : null}
        {applied ? 'Applied' : 'Apply'}
      </AppButton>
    </form>
  );
}
