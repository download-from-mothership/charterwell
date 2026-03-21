import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-navy-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-horizontal.svg" alt="Charterwell" className="mb-4 h-7" />
            <p className="text-sm leading-relaxed text-muted">
              The AI-native claims intelligence workspace. Every document understood. Every decision informed.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-navy-500">Product</h3>
            <ul className="space-y-2">
              <li><Link href="/#product" className="text-sm text-muted hover:text-teal-500 transition-colors">How It Works</Link></li>
              <li><Link href="/#features" className="text-sm text-muted hover:text-teal-500 transition-colors">Features</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-teal-500 transition-colors">Request a Demo</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-navy-500">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/#why" className="text-sm text-muted hover:text-teal-500 transition-colors">Why Charterwell</Link></li>
              <li><Link href="/contact" className="text-sm text-muted hover:text-teal-500 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-3 text-sm font-semibold text-navy-500">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted hover:text-teal-500 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted hover:text-teal-500 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-navy-100 pt-6">
          <p className="text-center text-xs text-muted">
            &copy; {new Date().getFullYear()} Charterwell, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
