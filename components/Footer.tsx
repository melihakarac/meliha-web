import { FOOTER } from '@/content'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 bg-bg">
      <div className="max-w-6xl mx-auto px-6 md:px-10 lg:px-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <p className="font-body text-xs text-text-lo">
          © {year} {FOOTER.copyrightName}
        </p>
        <p className="font-body text-xs text-text-lo">
          {FOOTER.builtWith}
        </p>
      </div>
    </footer>
  )
}
