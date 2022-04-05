import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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
  formCreateUser!: FormGroup;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.formCreateUser = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)])
    });
  }

  ngOnInit(): void {
    this.userService
      .getAllUsers()
      .subscribe(
        (data: User[])=> {
          this.users = data;
        }
      )
    ;
  }

  public submitCreateUser(): void {
    if (this.formCreateUser.valid) {
      this.userService
        .createUser(this.formCreateUser.value)
        .subscribe(data => this.users.push(data))
      ;
      this.formCreateUser.reset();
      this.toggleCreateForm();
    }
  }

  public toggleCreateForm(): void {
    this.createFromShow = !this.createFromShow;
  }

  public deleteUser($event: User): void {
    this.userService
      .deleteUser($event.id)
      .subscribe(
        _ => {
          let index = this.users.findIndex(user => user.id === $event.id);
          this.users.splice(index, 1);
        }
      )
    ;
  }
}
