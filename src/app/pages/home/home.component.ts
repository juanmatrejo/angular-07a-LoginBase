import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private _auth: AuthService, private _router: Router) {
	}

	ngOnInit() {
	}

	exit() {

		this._auth.logout();
		this._router.navigateByUrl('/login');
	}

}
