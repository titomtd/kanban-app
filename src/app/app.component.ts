import { Component, OnInit } from '@angular/core';
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Board } from "./model/board.model";
import { BoardsService } from "./service/board/boards.service";
import { TagService } from "./service/tag/tag.service";
import { Tag } from "./model/tag.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  faClipboardList = faClipboardList;
  faPlus = faPlus;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;

  boards: Board[] = [];
  tags: Tag[] = [];

  showTagModal: boolean = false;
  formTag!: FormGroup;

  constructor(
    private boardsService: BoardsService,
    private tagsService: TagService,
    private formBuilder: FormBuilder
  ) {
    this.formTag = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(3),  Validators.maxLength(16)]),
    });
  }

  ngOnInit(): void {
    this.loadAllBoards();
    this.loadAllTags();
  }

  submitFormTag(): void {
    if (this.formTag.valid) {
      this.tagsService.createTag(this.formTag.value).subscribe(_ => {
        this.loadAllTags();
        this.toggleTagModal();
      })
    }
  }

  deleteTag(id: any): void {
    this.tagsService.deleteTag(id).subscribe(_ => {
      this.loadAllTags();
    });
  }

  toggleTagModal(): void {
    this.showTagModal = !this.showTagModal;
  }

  loadAllBoards(): void {
    this.boardsService.sendGetRequest().subscribe((data: Board[])=> {
      this.boards = data;
    });
  }

  loadAllTags(): void {
    this.tagsService.getAllTags().subscribe((data: Tag[])=> {
      this.tags = data;
    });
  }
}
