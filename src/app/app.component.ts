import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MallService } from './mall.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  mallDetails: any[] = [];
  mallToUpdate = {
    id: null,
    name: '',
    location: '',
    numberOfShops: 0
  };

  constructor(private mallService: MallService) {}

  ngOnInit(): void {
    this.getMallDetails();
  }

  // Fetch all malls from the backend
  getMallDetails() {
    this.mallService.getAllMalls().subscribe(
      (data) => {
        console.log('Fetched malls:', data);
        this.mallDetails = data;
      },
      (error) => console.error('Error fetching malls:', error)
    );
  }

  // Register a new mall
  register(registerForm: NgForm) {
    if (registerForm.valid) {
      this.mallService.saveMall(registerForm.value).subscribe(
        (response) => {
          console.log('Mall registered:', response);
          this.getMallDetails();
          registerForm.reset();
        },
        (error) => console.error('Error registering mall:', error)
      );
    }
  }

  // Populate the edit form with the selected mall's details
  edit(mall: any) {
    this.mallToUpdate = { ...mall };
  }

  // Update mall details
  updateMall() {
    this.mallService.saveMall(this.mallToUpdate).subscribe(
      (response) => {
        console.log('Mall updated:', response);
        this.getMallDetails();
        // Optionally close the modal after updating
        const modal = document.getElementById('updateModal');
        if (modal) (modal as any).modal('hide'); // Ensure proper modal handling
      },
      (error) => console.error('Error updating mall:', error)
    );
  }

  // Delete a mall
  deleteMall(mall: any) {
    this.mallService.deleteMall(mall.id).subscribe(
      (response) => {
        console.log('Mall deleted:', response);
        this.getMallDetails();
      },
      (error) => console.error('Error deleting mall:', error)
    );
  }
}