import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Board } from "../../model/board.model";
import { BoardService } from "../../service/board/board.service";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;
  faArrowRight = faArrowRight;

  @Input() _board!: Board;
  @Output() deleteBoardEvent = new EventEmitter<Board>();

  updateFormShow: boolean = false;
  updateForm!: FormGroup;

  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      label: new FormControl(this._board.label, [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
    });
  }

  public updateBoard(): void {
    if (this.updateForm.valid) {
      this.boardService
        .updateBoard(this._board.id, this.updateForm.value)
        .subscribe(data => this._board = data)
      ;
      this.toggleUpdateForm();
    }
  }

  public deleteBoard(): void {
    this.deleteBoardEvent.emit(this._board);
  }

  public toggleUpdateForm(): void {
    this.updateFormShow = !this.updateFormShow;
  }
}
