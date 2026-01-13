export default {
  async rewrites() {
    const backend = process.env.NEXT_PUBLIC_BACKEND_URL

    if (!backend) {
      throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined")
    }

    return [
      {
        source: "/api/:path*",
        destination: `${backend}/api/:path*`,
      },
    ]
  },
}

