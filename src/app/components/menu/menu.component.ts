import { Component, OnInit } from '@angular/core';
import { Board } from "../../model/board.model";
import { Tag } from "../../model/tag.model";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { BoardService} from "../../service/board/board.service";
import { TagService } from "../../service/tag/tag.service";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  faClipboardList = faClipboardList;
  faPlus = faPlus;
  faTimes = faTimes;
  faTrashAlt = faTrashAlt;

  boards: Board[] = [];
  tags: Tag[] = [];

  showTagModal: boolean = false;
  formTag!: FormGroup;

  constructor(
    private boardService: BoardService,
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
    this.boardService.getAllBoards().subscribe(data => this.boards = data);
  }

  loadAllTags(): void {
    this.tagsService.getAllTags().subscribe((data: Tag[])=> {
      this.tags = data;
    });
  }
}
