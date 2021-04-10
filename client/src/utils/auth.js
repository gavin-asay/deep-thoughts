import decode from 'jwt-decode';

class AuthService {
	// retrieve data saved in token
	getProfile() {
		return decode(this.getToken());
	}

	// check if user is still logged in
	loggedIn() {
		// checks if these is a saved token
		const token = this.getToken();

		// use type coersion to check if token is NOT undefined and the token is NOT expired
		return !!token && !this.isTokenExpired(token);
	}

	isTokenExpired(token) {
		try {
			const decoded = decode(token);
			if (decoded.exp < Date.now() / 1000) {
				return true;
			} else return false;
		} catch (err) {
			return false;
		}
	}

	getToken() {
		return localStorage.getItem('id_token');
	}

	login(idToken) {
		localStorage.setItem('id_token', idToken);

		window.location.assign('/');
	}

	logout() {
		localStorage.removeItem('id_token');
		window.location.assign('/');
	}
}

export default new AuthService();
