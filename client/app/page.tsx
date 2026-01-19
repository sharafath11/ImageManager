import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-6">
      <div className="max-w-2xl w-full space-y-8 text-center">
        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Image Management Dashboard
          </h1>
          <p className="text-muted-foreground text-sm md:text-base">
            Upload, organize, rearrange, edit, and manage your images efficiently
          </p>
        </div>
        <div className="text-left bg-muted/40 rounded-lg p-6 space-y-4">
          <h2 className="font-semibold text-foreground">
            Features
          </h2>
          <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2">
            <li>User authentication with email & phone number</li>
            <li>Bulk image upload with individual titles</li>
            <li>Edit image and title anytime</li>
            <li>Drag-and-drop image reordering</li>
            <li>Delete images securely</li>
            <li>Password reset support</li>
          </ul>
        </div>

        {}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-6 py-3 rounded-md bg-foreground text-background font-medium text-sm hover:opacity-90 text-center"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="px-6 py-3 rounded-md border border-border font-medium text-sm hover:bg-muted text-center"
          >
            Create Account
          </Link>
        </div>
      </div>
    </main>
  )
}
