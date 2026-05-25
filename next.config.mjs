const isGithubActions = process.env.GITHUB_ACTIONS === 'true';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: isGithubActions ? '/sai-vikas-portfolio' : '',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
