const { VITE_API_URL, MODE, VITE_UPLOADS_URL } = import.meta.env;

const MODE_ENV = MODE;

const ASSETS_URL =
	MODE == 'development' ? 'http://127.0.0.1:8000' : 'http://neweraconnect.org:81/apis/erp/api/';

const API_URL = VITE_API_URL;

export const env = {
	API_URL,
	ASSETS_URL,
	MODE_ENV,
	VITE_UPLOADS_URL
};
