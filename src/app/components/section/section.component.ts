import {Component, EventEmitter, Host, Input, OnInit, Output} from '@angular/core';
import { Section } from "../../model/section.model";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { SectionService } from "../../service/section/section.service";
import {BoardDetailComponent} from "../../board-detail/board-detail.component";

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss']
})
export class SectionComponent implements OnInit {
  faPlus = faPlus;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;
  faPencilAlt = faPencilAlt;

  @Input() _section!: Section;
  @Output() deleteSectionEvent = new EventEmitter<any>();

  showFormCreateCard: boolean = false;
  formCreateCard!: FormGroup;

  showFormUpdateSection: boolean = false;
  formUpdateSection!: FormGroup;

  constructor(
    private sectionService: SectionService,
    private formBuilder: FormBuilder,
    @Host() private boardDetailComponent: BoardDetailComponent
  ) {
    this.formCreateCard = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      endDate: new FormControl(''),
      estimatedTime: new FormControl(''),
      url: new FormControl(''),
      note: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.formUpdateSection = this.formBuilder.group({
      label: new FormControl(this._section.label, [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      position: new FormControl(this._section.position, [Validators.required])
    });
  }

  submitCreateCard(): void {
    if (this.formCreateCard.valid) {
      this.sectionService
        .addNewCard(this._section.id, this.formCreateCard.value)
        .subscribe(data => this._section = data)
      ;
      this.toggleFormCreateCard();
    }
  }

  toggleFormCreateCard(): void {
    this.showFormCreateCard = !this.showFormCreateCard;
  }

  public deleteSection(): void {
    this.deleteSectionEvent.emit(this._section.id);
  }

  toggleFormUpdateSection(): void {
    this.showFormUpdateSection = !this.showFormUpdateSection;
  }

  submitUpdateSection(): void {
    if (this.formUpdateSection.valid) {
      this.sectionService
        .updateSection(this._section.id, this.formUpdateSection.value)
        .subscribe(data => {
          this._section = data
        })
      ;
      this.boardDetailComponent.loadBoard();
      this.toggleFormUpdateSection();
    }
  }
}
