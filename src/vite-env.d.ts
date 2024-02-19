/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_API_URL: string
    readonly VITE_UPLOADS_URL: string,
    readonly VITE_APP_BASE_PATH: string,
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}