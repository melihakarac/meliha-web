export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-8 bg-bg">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p className="font-body text-xs text-text-lo">
          © {year} Meliha Karac
        </p>
        <p className="font-body text-xs text-text-lo">
          Built with Next.js, TypeScript, Tailwind, Three.js
        </p>
      </div>
    </footer>
  )
}
