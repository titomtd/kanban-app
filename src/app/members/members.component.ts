import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { UsersService } from "../service/user/users.service";
import { User } from "../model/user.model";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {
  faTimes = faTimes;

  users: User[] = [];

  createFromShow: boolean = false;
  createForm = this.formBuilder.group({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(20)])
  })

  constructor(
    private usersService: UsersService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.usersService.sendGetRequest().subscribe((data: User[])=> {
      this.users = data;
    })
  }

  createUser() {
    if (this.createForm.valid) {
      this.usersService.sendPostRequest(this.createForm.value.firstName, this.createForm.value.lastName).subscribe(_ => {
        this.ngOnInit()
        this.createForm.reset()
        this.toggleCreateForm()
      })
    }
  }

  toggleCreateForm() {
    this.createFromShow = !this.createFromShow;
  }
}
