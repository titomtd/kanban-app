import {Component, Host, Input} from '@angular/core';
import {Board} from "../../model/board.model";
import {BoardService} from "../../service/board/board.service";
import {HomeComponent} from "../../home/home.component";
import { FormBuilder } from '@angular/forms';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  faPencilAlt = faPencilAlt;
  faTrashAlt = faTrashAlt;

  showOption: boolean = false;
  @Input() _board!: Board;

  updateFormShow: boolean = false;
  updateForm = this.formBuilder.group({
    label: ''
  })

  constructor(
    private boardService: BoardService,
    private formBuilder: FormBuilder,
    @Host() private homeComponent: HomeComponent
  ) {
    this.updateForm.controls['label'].setValue("Test")
  }

  updateBoard() {
    console.log(this.updateForm.value.label)
    this.boardService.sendPostRequest(this._board.id, this.updateForm.value.label).subscribe(_ => {
      this.homeComponent.ngOnInit()
      this.toggleUpdateForm()
    })
  }

  deleteBoard() {
    this.boardService.sendDeleteRequest(this._board.id).subscribe(_ => {
      this.homeComponent.ngOnInit()
    })
  }

  toggleOption() {
    this.showOption = !this.showOption;
  }

  toggleUpdateForm() {
    this.updateFormShow = !this.updateFormShow;
  }
}
