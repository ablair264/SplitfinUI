import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => {
  const isLibraryMode = mode === 'library';
  
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
    css: {
      // Ensure css config object exists for plugins expecting it
      devSourcemap: true,
    },
    build: isLibraryMode ? {
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'Silkr',
        fileName: (format) => `index.${format}.js`,
        formats: ['es', 'umd']
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react-router-dom'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react-router-dom': 'ReactRouterDOM'
          }
        }
      },
      sourcemap: true,
      outDir: 'dist'
    } : {
      outDir: 'dist',
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            charts: ['recharts']
          }
        }
      }
    },
    server: {
      port: 3000,
      open: true
    }
  }
})
