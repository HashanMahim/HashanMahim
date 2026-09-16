import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-2 px-4 py-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold text-slate-900 sm:text-base">
          LinkedIn Brand Builder
        </Link>
        <nav className="flex gap-4 text-sm">
          <Link href="/" className="text-slate-600 hover:text-slate-900">
            Dashboard
          </Link>
          <Link href="/portfolio" className="text-slate-600 hover:text-slate-900">
            Public Portfolio ↗
          </Link>
        </nav>
      </div>
    </header>
  );
}
