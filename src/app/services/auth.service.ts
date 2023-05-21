import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
	// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

	url: string;
	apiKey: string;
	idToken: string;

	constructor(private _httpClient: HttpClient) {

		this.url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
		this.apiKey = 'AIzaSyAq0zi5O_2bQbqF-h9dTQOaEd863upgIIA';
		this.getToken();
	}

	signUp(userModel: UserModel) {

		const auth = {
			email: userModel.eMailUser,
			password: userModel.password,
			returnSecureToken: true
		};

		return this._httpClient.post(`${this.url}signUp?key=${this.apiKey}`, auth).pipe(map(response => {
			this.saveToken(response['idToken']);
			return response;
		}));
	}

	login(userModel: UserModel) {

		const auth = {
			email: userModel.eMailUser,
			password: userModel.password,
			returnSecureToken: true
		};

		console.log(auth);
		return this._httpClient.post(`${this.url}signInWithPassword?key=${this.apiKey}`, auth).pipe(map(response => {
			this.saveToken(response['idToken']);
			return response;
		}));
	}

	logout() {

		localStorage.removeItem('authToken');
	}

	private saveToken(token: string) {

		this.idToken = token;
		localStorage.setItem('authToken', this.idToken);

		let today = new Date();
		today.setSeconds(120); //3600 token value
		console.log(today.getTime());

		localStorage.setItem('expiresIn', today.getTime().toString());
		console.log(today);
	}

	getToken() {

		if (localStorage.getItem('authToken')) {

			this.idToken = localStorage.getItem('authToken');
		}
		else {

			this.idToken = '';
		}

		return this.idToken;
	}

	isAuthenticated(): boolean {

		if (this.idToken.length < 2) {
			return false;
		}

		const expiresIn = localStorage.getItem('expiresIn');
		const expiration = new Date();
		expiration.setTime(Number(expiresIn));

		console.log(expiration.getTime());
		console.log(expiration);

		console.log(new Date().getTime());
		console.log(new Date());

		if (expiration > new Date()) {
			return true;
		}
		else {
			return false;
		}

	}

}
