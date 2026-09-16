import Link from "next/link";

export function Nav() {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-semibold text-slate-900">
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
