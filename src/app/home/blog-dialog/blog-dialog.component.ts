import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';

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

  public _form = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    body: new FormControl(null, [Validators.required]),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<BlogDialogComponent>,
    private _commentService: CommentService,
    private _postService: PostService
  ) {
    if (data.isUpdate) {
      this.isUpdate = data.isUpdate;
      this._form.patchValue({
        title: data.blog.title,
        body: data.blog.body
      })

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

  public onSubmit() {
    const request = {
      title: this._form.get("title")?.value,
      body: this._form.get("body")?.value,
      imageId: this.data.blog.imageId,
      userId: this.data.blog.userId,
    }

    this._postService.updatePost(this.data.blog.id, request).subscribe(res => {
      this._dialogRef.close();
    });
  }

}
