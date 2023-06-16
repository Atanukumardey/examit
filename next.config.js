/** @type {import('next').NextConfig} */
// const path = require('path');
const nextConfig = {
	// webpack5: true,
	// webpack: (config) => {
	//   config.resolve.fallback = { fs: false };

	//   return config;
	// },
    // webpack: (config) => {
    //     config.module.rules.push({
    //       test: /\.(mp3)$/,
    //       use: {
    //         loader: 'file-loader',
    //         options: {
    //           name: '[name].[ext]',
    //           outputPath: 'assets/audio/', // Specify the output path for the audio files
    //           publicPath: '/_next/', // Specify the public path for the audio files
    //         },
    //       },
    //     });
    
    //     return config;
    //   },
};

module.exports = nextConfig;
