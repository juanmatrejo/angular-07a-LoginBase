import { Component, OnInit } from '@angular/core';
import { UserModel } from '../../models/user.model';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
	selector: 'app-registro',
	templateUrl: './registro.component.html',
	styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

	userModel: UserModel;
	keepUser: boolean;

	constructor(private _authService: AuthService, private _router: Router) { }

	ngOnInit() {

		this.userModel = new UserModel();
		// this.userModel.fullName = 'Juan Manuel Trejo';
		// this.userModel.eMailUser = 'juanma_1996@hotmail.com';
		// this.userModel.password = 'galder';
	}

	onSubmit(userForm: NgForm) {

		if (userForm.invalid) { return; }

		Swal.fire({
			allowOutsideClick: false,
			icon: 'info',
			text: 'Wait please...'
		});
		Swal.showLoading();

		this._authService.signUp(this.userModel).subscribe({
			next: (response) => {

				console.log(response);
				Swal.close();

				if (this.keepUser) {
					localStorage.setItem('email', this.userModel.eMailUser);
				}

				this._router.navigateByUrl('/home');

			}, error: (err) => {

				Swal.fire({
					allowOutsideClick: false,
					icon: 'error',
					title: 'Error on sign up',
					text: err.error.error.message
				});
				console.log(err.error.error.message);
			}
		});
	}
}
