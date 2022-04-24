import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Board } from "../model/board.model";
import { BoardService } from "../service/board/board.service";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { Section } from "../model/section.model";
import { SectionService } from "../service/section/section.service";

@Component({
  selector: 'app-board-detail',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.scss']
})
export class BoardDetailComponent implements OnInit {
  faTimes = faTimes;

  _board!: Board;

  formNewSectionShow: boolean = false;
  formNewSection!: FormGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private boardService: BoardService,
    private formBuilder: FormBuilder,
    private sectionService: SectionService
  ) {
    this.formNewSection = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)]),
      position: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.loadBoard();
  }

  public loadBoard(): void {
    this.activatedRoute
      .paramMap
      .subscribe(
        params => {
          this.boardService
            .getBoard(params.get('boardId'))
            .subscribe(item => this._board = item)
          ;
        }
      )
    ;
  }

  public createNewSection(): void {
    if (this.formNewSection.valid) {
      this.boardService
        .addNewSection(this._board.id, this.formNewSection.value)
        .subscribe(item => this._board = item)
      ;
      this.toggleFormNewSection();
    }
  }

  public toggleFormNewSection(): void {
    this.formNewSectionShow = !this.formNewSectionShow;
  }

  public deleteSection($event: Section): void {
    this.sectionService
      .deleteSection($event.id)
      .subscribe(_ => this.loadBoard())
    ;
  }

  public updateSectionPosition(): void {
    this.loadBoard();
  }
}
