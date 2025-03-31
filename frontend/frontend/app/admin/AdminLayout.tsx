import React from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-xl font-bold">Admin Dashboard</h1>
      </header>

      {/* Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-gray-100 p-4">
          <nav>
            <ul>
              <li className="mb-2">
                <Link href="/admin/user" className="text-blue-600 hover:underline">
                  Quản lý người dùng
                </Link>
              </li>
              <li className="mb-2">
                <Link href="/admin/other" className="text-blue-600 hover:underline">
                  Trang khác
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8 bg-white">{children}</main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-200 text-center p-4">
        <p>© 2025 Admin Dashboard</p>
      </footer>
    </div>
  );
}