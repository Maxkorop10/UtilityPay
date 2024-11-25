/** @type {import('next').NextConfig} */
const nextConfig = {
    headers: () => [
        {
            source: '/transaction-history',
            headers: [
                {
                    key: 'Cache-Control',
                    value: 'no-store',
                },
            ],
        },
    ],
};

export default nextConfig;
