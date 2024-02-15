const isActiveRoute = (to: string, path: string): string | undefined => {
	if (path === to) {
		return 'active';
	}
};


const togglePassword = (value: string[]): string[] => {
	return value[0] === 'ti-eye'
		? ['ti-eye-off', 'text']
		: ['ti-eye', 'password'];
};

export const helpers = {
	isActiveRoute,
	togglePassword
};