import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Card } from "../../model/card.model";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { TagService } from "../../service/tag/tag.service";
import { Tag } from "../../model/tag.model";
import { CardService } from "../../service/card/card.service";
import { UserService } from "../../service/user/user.service";
import { User } from "../../model/user.model";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  faCalendar = faCalendar;
  faEllipsisV = faEllipsisV;
  faTimes = faTimes;
  faGlobe = faGlobe;

  dropdownShow: boolean = false;

  showFormUpdateCard: boolean = false;
  formUpdateCard!: FormGroup;
  addressForm!: FormGroup;

  @Input() _card!: Card;
  @Output() deleteCardEvent = new EventEmitter<Card>();

  tags: Tag[] = [];
  users: User[] = [];

  constructor(
    private cardService: CardService,
    private tagService: TagService,
    private userService: UserService,
    private formBuilder: FormBuilder
  ) {
    this.loadAllTags();
    this.loadAllUsers();
  }

  ngOnInit(): void {
    this.addressForm = this.formBuilder.group({
      street: new FormControl(this._card.address ? this._card.address.street : ''),
      city: new FormControl(this._card.address ? this._card.address.city : ''),
      zipCode: new FormControl(this._card.address ? this._card.address.zipCode : '')
    });

    let tempTags = [];
    for (let tag of this._card.tags) {
      tempTags.push(tag.id);
    }
    this.formUpdateCard = this.formBuilder.group({
      label: new FormControl(this._card.label, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      endDate: new FormControl(this._card.endDate),
      user: new FormControl(null != this._card.user ? this._card.user.id : ''),
      estimatedTime: new FormControl(this._card.estimatedTime),
      address: this.addressForm,
      url: new FormControl(this._card.url),
      note: new FormControl(this._card.note),
      tags: new FormControl(tempTags)
    });
  }

  public submitUpdateCard(): void {
    if (this.formUpdateCard.valid) {
      let tagsJson = [];
      for (let value of this.formUpdateCard.value.tags) {
        tagsJson.push({'id' : value});
      }
      if ("null" == this.formUpdateCard.value.user) {
        this.formUpdateCard.value.user = null;
      } else {
        this.formUpdateCard.value.user = {'id' : this.formUpdateCard.value.user};
      }
      this.formUpdateCard.value.tags = tagsJson;
      this.cardService
        .updateCard(this._card.id, this.formUpdateCard.value)
        .subscribe(data => this._card = data)
      ;
    }
    this.toggleFormUpdateCard();
    this.toggleDropdown();
  }

  public toggleDropdown(): void {
    this.dropdownShow = !this.dropdownShow;
  }

  public toggleFormUpdateCard(): void {
    this.showFormUpdateCard = !this.showFormUpdateCard;
  }

  private loadAllTags(): void {
    this.tagService
      .getAllTags()
      .subscribe( data => this.tags = data)
    ;
  }

  private loadAllUsers(): void {
    this.userService
      .getAllUsers()
      .subscribe( data => this.users = data)
    ;
  }

  public deleteCard(): void {
    this.deleteCardEvent.emit(this._card);
  }
}
