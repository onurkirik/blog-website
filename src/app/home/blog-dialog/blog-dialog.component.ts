import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-blog-dialog',
  templateUrl: './blog-dialog.component.html',
  styleUrls: ['./blog-dialog.component.scss']
})
export class BlogDialogComponent {

  public isUpdate: boolean = false;
  public body: string = '';
  public imageId: string = '';
  public title: string = '';
  public commentDatas: any = [];


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<BlogDialogComponent>,
    private _commentService: CommentService
  ) {
    if (data.isUpdate) {
      this.isUpdate = data.isUpdate;
      console.log(this.isUpdate);
    } else {
      this.imageId = data.blog.imageId.toString();
      this.title = data.blog.title;
      this.body = data.blog.body;
    }
  }

  ngOnInit(): void {
    this.getComments();
  }

  public closeDialog() {
    this._dialogRef.close();
  }

  public getComments() {
    this._commentService.getComments().subscribe((res) => {
      this.commentDatas = res.filter((c: { postId: any; }) => c.postId == this.data.blog.id);
    })
  }
}
