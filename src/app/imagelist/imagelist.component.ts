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

  isImageSaved: boolean = false;
  cardImageBase64: string = '';
  fileName: any;

  constructor(
    private api: ApiService,
    private router: Router,
    private changeDetector: ChangeDetectorRef
  ) {}

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
      this.changeDetector.detectChanges();
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  onFileChanged(event: any) {
    this.img = event.target.files[0];
    console.log('img', this.img.name);
  }

  // encodeImageFileAsURL(element:any) {
  //   var file = element.files[0];
  //   var reader = new FileReader();
  //   reader.onloadend = function() {
  //     console.log('RESULT', reader.result)
  //   }
  //   reader.readAsDataURL(file);
  // }


  //METHOD -2 sending a BASE64 encrypted url to api
  CreateBase64String(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = (rs) => {
          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
          this.isImageSaved = true;
          console.log('this is my path', this.cardImageBase64);
        };
      };
      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onsubmit() {
    this.api.uploadImage(this.cardImageBase64).subscribe((res) => {
      console.log('success', res);
    });
  }

  //METHOD -1 sending a name of code and encrypting in backend
  loadImageFromDevice(event: any) {

      let file: any
      file = event.target.files[0]
      console.log("this is my Path", file.name);

      this.api.uploadImage(file.name).subscribe((res) => {
        this.fileName = res.data.url;
        console.log("filepath", this.fileName)
        Swal.fire('File Uploaded Successfully', '', 'success')
      })

  }

}
