import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import { UserService } from "../service/user/user.service";
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
    private userService: UserService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe((data: User[])=> {
      this.users = data;
    })
  }

  public createUser(): void {
    if (this.createForm.valid) {
      this.userService.createUser(this.createForm.value.firstName, this.createForm.value.lastName).subscribe(_ => {
        this.ngOnInit()
        this.createForm.reset()
        this.toggleCreateForm()
      })
    }
  }

  public toggleCreateForm(): void {
    this.createFromShow = !this.createFromShow;
  }
}
