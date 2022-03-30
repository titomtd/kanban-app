import {Component, OnInit} from '@angular/core';
import { BoardsService } from '../service/board/boards.service';
import { Board } from "../model/board.model";
import {FormBuilder, FormControl, Validators} from '@angular/forms';
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
  createForm = this.formBuilder.group({
    label: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(16)])
  })

  constructor(
    private boardsService: BoardsService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.boardsService.sendGetRequest().subscribe((data: Board[])=> {
      this.boards = data;
    })
  }

  createBoard() {
    if (this.createForm.valid) {
      this.boardsService.sendPostRequest(this.createForm.value.label).subscribe(_ => {
        this.ngOnInit()
        this.createForm.reset()
        this.toggleCreateForm()
      })
    }
  }

  toggleCreateForm() {
    this.createFormShow = !this.createFormShow
  }

  reload() {
    this.boardsService.sendGetRequest().subscribe((data: Board[])=> {
      this.boards = data;
    })
  }
}
