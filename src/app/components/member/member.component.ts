import { Component, EventEmitter, Host, Input, OnInit, Output } from '@angular/core';
import { User } from "../../model/user.model";
import { UserService } from "../../service/user/user.service";
import { MembersComponent } from "../../members/members.component";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {
  faTimes = faTimes;
  faEllipsisV = faEllipsisV;

  updateModalShow: boolean = false;
  dropdownShow: boolean = false;

  @Input() _user!: User;
  @Output() deleteUserEvent = new EventEmitter<User>();

  updateForm!: FormGroup;
  addressForm!: FormGroup;

  constructor(
    private userService: UserService,
    @Host() private membersComponent: MembersComponent,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      street: new FormControl(this._user.address ? this._user.address.street : ''),
      city: new FormControl(this._user.address ? this._user.address.city : ''),
      zipCode: new FormControl(this._user.address ? this._user.address.zipCode : '')
    });

    this.updateForm = this.formBuilder.group({
      firstName: new FormControl(this._user.firstName, [Validators.required,  Validators.maxLength(20)]),
      lastName: new FormControl(this._user.lastName, [Validators.required,  Validators.maxLength(20)]),
      address: this.addressForm
    });
    console.log(this._user.address.street)
    console.log(this._user.address.city)
    console.log(this._user.address.zipCode)
  }

  public toggleModal(): void {
    this.updateModalShow = !this.updateModalShow;
  }

  public updateUser(): void {
    if (this.updateForm.valid) {
      this.userService
        .updateUser(this._user.id, this.updateForm.value)
        .subscribe( data => this._user = data)
      ;
      this.toggleModal();
      this.toggleDropdown();
    }
  }

  public toggleDropdown(): void {
    this.dropdownShow = !this.dropdownShow;
  }

  public deleteUser(): void {
    this.deleteUserEvent.emit(this._user);
  }
}
