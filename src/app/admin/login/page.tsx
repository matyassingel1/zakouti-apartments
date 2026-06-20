"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "../actions";

const initial: LoginState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <div className="flex min-h-screen items-center justify-center bg-ivory px-6">
      <div className="w-full max-w-sm border border-line bg-pure p-8 shadow-[0_30px_80px_-40px_rgba(124,98,40,0.4)]">
        <p className="font-display text-3xl font-medium text-ink">ZÁKOUTÍ</p>
        <p className="mono mt-1 text-[0.6rem] tracking-[0.22em] text-stone">
          ADMINISTRACE
        </p>
        <div className="hairline-gold my-6" />
        <form action={formAction} className="space-y-4">
          <div>
            <label htmlFor="password" className="eyebrow mb-2 block">
              Heslo
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoFocus
              autoComplete="current-password"
              className="w-full border border-line bg-paper px-4 py-3 text-ink outline-none focus:border-gold-500"
            />
          </div>
          {state.error && <p className="text-sm text-gold-900">{state.error}</p>}
          <button type="submit" disabled={pending} className="btn-gold btn-gold--solid w-full justify-center">
            {pending ? "Přihlašuji…" : "Přihlásit se"}
          </button>
        </form>
      </div>
    </div>
  );
}
