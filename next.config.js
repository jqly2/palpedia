/** @type {import('next').NextConfig} */
module.exports = {
    images: {
      formats: ["image/avif", "image/webp"],
      remotePatterns: [
        {
          protocol: "https",
          hostname: "palpedia-media.s3.us-west-1.amazonaws.com",
          port: "",
          pathname: "/work-food/**",
        },
        {
            protocol: "https",
            hostname: "palpedia-media.s3.us-west-1.amazonaws.com",
            port: "",
            pathname: "/Normal/**",
        },
        {
            protocol: "https",
            hostname: "palpedia-media.s3.us-west-1.amazonaws.com",
            port: "",
            pathname: "/elements/**",
        }
      ],
    },
  };;

