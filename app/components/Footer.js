import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white">

      <div className="mx-auto max-w-6xl px-4 py-10">

        <div className="grid gap-8 md:grid-cols-3">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="text-2xl font-bold text-gray-900"
            >
              Textora
            </Link>

            <p className="mt-3 max-w-sm text-sm leading-6 text-gray-600">
              Simple AI-powered tools for summarizing,
              humanizing, and rewriting your text.
            </p>
          </div>

          {/* Tools */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Tools
            </h3>

            <div className="mt-3 flex flex-col gap-2">

              <Link
                href="/"
                className="text-sm text-gray-600 hover:text-blue-600"
              >
                AI Summarizer
              </Link>

              <Link
                href="/ai-humanizer"
                className="text-sm text-gray-600 hover:text-green-600"
              >
                AI Humanizer
              </Link>

              <Link
                href="/paraphrasing-tool"
                className="text-sm text-gray-600 hover:text-purple-600"
              >
                Paraphrasing Tool
              </Link>

            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-gray-900">
              Textora
            </h3>

            <div className="mt-3 flex flex-col gap-2">

              <Link
                href="/about"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Contact
              </Link>

              <Link
                href="/privacy"
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Privacy Policy
              </Link>

            </div>
          </div>

        </div>

        <div className="mt-10 border-t pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Textora. All rights reserved.
        </div>

      </div>

    </footer>
  );
}