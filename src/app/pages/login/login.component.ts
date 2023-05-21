import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	userModel: UserModel;
	keepUser: boolean;

	constructor(private _authService: AuthService, private _router: Router) {
		this.userModel = new UserModel();
		this.keepUser = false;
	}

	ngOnInit() {

		if (localStorage.getItem('email')) {
			this.userModel.eMailUser = localStorage.getItem('email');
			this.keepUser = true;
		}
	}

	login(loginForm: NgForm) {

		if (loginForm.invalid) { return; }

		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Wait please...'
		});
		Swal.showLoading();

		this._authService.login(this.userModel).subscribe({
			next: (response) => {

				console.log(response);
				Swal.close();

				if (this.keepUser) {
					localStorage.setItem('email', this.userModel.eMailUser);
				}

				this._router.navigateByUrl('/home');

			}, error: (err) => {

				console.log(err.error.error.message);
				Swal.fire({
					allowOutsideClick: false,
					icon: 'error',
					title: 'Error on login',
					text: err.error.error.message
				});
			}
		});


	}
}
