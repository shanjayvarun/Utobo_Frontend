import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

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
  img: any;

  profileForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private api: ApiService, private router: Router, private changeDetector: ChangeDetectorRef) {}

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
          Swal.fire('OOPS!', 'Access Denied', 'error');
        }
      }
    );
  }

  deleteById(data: any) {
    this.api.deleteId(data._id).subscribe(() => {
      Swal.fire('Deleted Successfully');
      this.getAllImages();
      this.changeDetector.detectChanges()
    });

  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onFileChanged(event:any) {
    this.img = event.target.files[0];
    console.log("img", this.img.name)
  }

  onsubmit(){
         this.api.uploadImage(this.img.name).subscribe((res) => {
               console.log("success", res)
         })
  }
}
