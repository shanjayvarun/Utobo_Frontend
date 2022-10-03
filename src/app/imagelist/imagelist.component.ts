import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-imagelist',
  templateUrl: './imagelist.component.html',
  styleUrls: ['./imagelist.component.scss'],
})
export class ImagelistComponent implements OnInit {
  displayedColumns: string[] = [
    'userId',
    'db',
    'createdDate',
    'imageUrl',
    'version',
    'actions',
  ];
  dataSource: any;

  imageList: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.getAllImages();
  }

  getAllImages() {
    this.api.getAll().subscribe(
      (res) => {
        this.dataSource = res;
      },
      (err) => {
        if (
          (err.message =
            'You provided an invalid object where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable')
        ) {
          this.router.navigate(['/login']);
          Swal.fire('OOPS!', 'User Already Taken', 'error');
        }
      }
    );
  }

  deleteById(data: any) {
    //console.log('req.body', data._id)
    this.api.deleteId(data._id).subscribe((res: any) => {
      // console.log('deleteId --> ', res);
    });
  }
}
