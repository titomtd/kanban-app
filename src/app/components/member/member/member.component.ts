import { Component, Host, Input, OnInit } from '@angular/core';
import { User } from "../../../model/user.model";
import { UserService } from "../../../service/user/user.service";
import { MembersComponent } from "../../../members/members.component";
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
  updateForm!: FormGroup;

  constructor(
    private userService: UserService,
    @Host() private membersComponent: MembersComponent,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      firstName: new FormControl(this._user.firstName, [Validators.required,  Validators.maxLength(20)]),
      lastName: new FormControl(this._user.lastName, [Validators.required,  Validators.maxLength(20)]),
      street: new FormControl(this._user.address ? this._user.address.street : ''),
      city: new FormControl(this._user.address ? this._user.address.city : ''),
      zipCode: new FormControl(this._user.address ? this._user.address.zipCode : '')
    });
  }

  public deleteUser(): void {
    this.userService.deleteUser(this._user.id)
      .subscribe(
        _ => this.membersComponent.ngOnInit()
      )
  }

  public toggleModal(): void {
    this.updateModalShow = !this.updateModalShow;
  }

  public updateUser(): void {
    if (this.updateForm.valid) {
      this.userService.updateUser(this._user.id, this.updateForm.value).subscribe( data =>
        this.updateAddress(data)
      );
      this.toggleModal();
    }
  }

  public updateAddress(data: any): void {
    this._user = new User(data)
    if ('' != this.updateForm.value.street
      && '' != this.updateForm.value.city
      && '' != this.updateForm.value.zipCode) {
      if (null != this._user.address &&
        (this._user.address.street != this.updateForm.value.street
          || this._user.address.city != this.updateForm.value.city
          || this._user.address.zipCode != this.updateForm.value.zipCode)) {
        this.userService.setAddressToUser(this._user.id, this.updateForm.value).subscribe(data =>
          this._user = new User(data)
        );
      } else {
        this.userService.setAddressToUser(this._user.id, this.updateForm.value).subscribe(data =>
          this._user = new User(data)
        );
      }
    }
  }

  public toggleDropdown(): void {
    this.dropdownShow = !this.dropdownShow;
  }
}
