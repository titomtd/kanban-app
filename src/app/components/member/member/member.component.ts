import {Component, Host, Input, OnInit} from '@angular/core';
import {User} from "../../../model/user.model";
import {UserService} from "../../../service/user/user.service";
import {MembersComponent} from "../../../members/members.component";
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
  form!: FormGroup;

  constructor(
    private userService: UserService,
    @Host() private membersComponent: MembersComponent,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: new FormControl(this._user.firstName, [Validators.required,  Validators.maxLength(20)]),
      lastName: new FormControl(this._user.lastName, [Validators.required,  Validators.maxLength(20)]),
      street: new FormControl(this._user.address ? this._user.address.street : ''),
      city: new FormControl(this._user.address ? this._user.address.city : ''),
      zipCode: new FormControl(this._user.address ? this._user.address.zipCode : '')
    });
  }

  deleteUser() {
    this.userService.sendDeleteRequest(this._user.id)
      .subscribe(
        _ => this.membersComponent.ngOnInit()
      )
  }

  toggleModal() {
    this.updateModalShow = !this.updateModalShow;
  }

  submit() {
    if (this.form.valid) {
      this.userService.sendPostRequestUpdate(this._user.id, this.form.value).subscribe( data =>
        this.updateAddress(data)
      );
      this.toggleModal()
    }
  }

  updateAddress(data: any) {
    this._user = new User(data)
    if ('' != this.form.value.street
      && '' != this.form.value.city
      && '' != this.form.value.zipCode) {
      if (null != this._user.address &&
        (this._user.address.street != this.form.value.street
          || this._user.address.city != this.form.value.city
          || this._user.address.zipCode != this.form.value.zipCode)) {
        this.userService.sendPostRequestSetAddress(this._user.id, this.form.value).subscribe(data =>
          this._user = new User(data)
        );
      } else {
        this.userService.sendPostRequestSetAddress(this._user.id, this.form.value).subscribe(data =>
          this._user = new User(data)
        );
      }
    }
  }

  toggleDropdown(): void {
    this.dropdownShow = !this.dropdownShow;
  }
}
