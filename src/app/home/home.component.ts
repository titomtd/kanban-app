import { Component, OnInit } from '@angular/core';
import { BoardService } from '../service/board/board.service';
import { Board } from "../model/board.model";
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { faTimes } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  faTimes = faTimes;

  boards: Board[] = [];

  createFormShow: boolean = false;
  createForm!: FormGroup;

  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder
  ) {
    this.createForm = this.formBuilder.group({
      label: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
    });
  }

  ngOnInit(): void {
    this.loadAllBoards();
  }

  public createBoard(): void {
    if (this.createForm.valid) {
      this.boardService
        .createBoard(this.createForm.value)
        .subscribe(data => this.boards.push(data))
      ;
      this.createForm.reset();
      this.toggleCreateForm();
    }
  }

  public toggleCreateForm(): void {
    this.createFormShow = !this.createFormShow
  }

  public loadAllBoards(): void {
    this.boardService
      .getAllBoards()
      .subscribe(data => this.boards = data)
    ;
  }

  public deleteBoard($event: Board): void {
    this.boardService
      .deleteBoard($event.id)
      .subscribe(
        _ => {
          let index = this.boards.findIndex(board => board.id === $event.id);
          this.boards.splice(index, 1);
        }
      )
    ;
  }
}
