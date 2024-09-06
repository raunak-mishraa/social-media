/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 30,// 30 seconds, the client side cache will be invalidated after 30 seconds
        }
    }
};

export default nextConfig;
