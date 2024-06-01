import Image from "next/image";
import Link from "next/link";
import Navbar from "~/components/navbar";

export default async function Home() {
  return (
    <div className="h-screen w-full px-4 py-4 text-center">
      <Navbar />
      <div className="mx-auto flex flex-col items-center pt-28 font-extrabold tracking-tighter">
        <h1 className="mb-4 text-4xl text-white">
          Welcome to Our Project Management Platform
        </h1>
        <p className="mb-6 text-lg text-gray-300">
          Manage your projects efficiently and effectively in a multi-tenant
          environment.
        </p>
        <div className="my-4 grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 text-2xl text-white"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
            </svg>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Task Management
            </h2>
            <p className="text-base text-gray-300">
              Organize and prioritize your tasks.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 text-2xl text-white"
            >
              <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
              <line x1="16" x2="16" y1="2" y2="6"></line>
              <line x1="8" x2="8" y1="2" y2="6"></line>
              <line x1="3" x2="21" y1="10" y2="10"></line>
            </svg>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Scheduling
            </h2>
            <p className="text-base text-gray-300">
              Plan your projects with our built-in calendar.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mb-2 text-2xl text-white"
            >
              <line x1="12" x2="12" y1="20" y2="10"></line>
              <line x1="18" x2="18" y1="20" y2="4"></line>
              <line x1="6" x2="6" y1="20" y2="16"></line>
            </svg>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Performance Tracking
            </h2>
            <p className="text-base text-gray-300">
              Monitor the progress and performance of your projects.
            </p>
          </div>
        </div>
        <div className="my-8">
          <Link
            href="/m"
            className="inline-flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-base font-medium text-white ring-offset-background transition-colors hover:bg-indigo-600/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
          >
            Get started
          </Link>
        </div>
        <Image
          src="/demo.png"
          alt="demo"
          sizes="100vw"
          width={800}
          height={600}
          priority={true}
          className="mx-auto rounded-2xl border-8 border-white/20 shadow-2xl"
        />
      </div>
    </div>
  );
}
