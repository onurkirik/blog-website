import { Component } from '@angular/core';
import { PostService } from '../services/post.service';
import { MatDialog } from '@angular/material/dialog';
import { BlogDialogComponent } from './blog-dialog/blog-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  pageSize: number = 8;
  page: number = 13;


  blogData: Array<any> = [];

  constructor(
    private _postService: PostService,
    private _dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._postService.getPosts().subscribe((res) => {
      console.log(res);
      this.blogData = res;
    });
  }

  //PUBLICS
  public openDialog(element: any, viewOrUpdate: boolean) {
    const dialog = this._dialog.open(BlogDialogComponent, {
      data: { blog: element, isUpdate: viewOrUpdate }
    })
  }

}
