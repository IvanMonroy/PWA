import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { GlobalThingsService } from '../../../services/global/global-things.service';
import { MessageResponse } from 'src/app/navigator/nav-dashboard/nav-menu/sub-menu';
import { reduce, map } from 'rxjs/operators';
import { Observable, SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-pages-forms',
  templateUrl: './pages-forms.component.html',
  styleUrls: ['./pages-forms.component.scss']
})
export class PagesFormsComponent implements OnInit {
  template: any;
  form: FormGroup;
  entries: Observable<any[]>;
  dataEntries: Observable<any[]>;
  rates: Observable<any[]>;
  dataRates: Observable<any[]>;
  subscription: SubscriptionLike[] = [];
  constructor(
    public dialogRef: MatDialogRef<PagesFormsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    private http: HttpClient,
    public globalThingsService: GlobalThingsService,
    public dialog: MatDialog
  ) {
    console.log(this.data)
    this.template = this.data.template

    switch (this.template) {
      case 'vehicles':
        this.form = this.formBuilder.group({
          plate: [''],
          brand: [''],
          year: ['']
        });
        break;
      case 'entries':
        this.form = this.formBuilder.group({
          plate: [''],
          hour_arrival: [''],
          place: ['']
        });
        break;
      case 'exits':
        this.entries = this.globalThingsService.GetAllModel('entries')
        this.subscription.push(this.entries.subscribe());
        this.dataEntries = this.entries.pipe(
          map((entries) => entries['data'])
        )
        this.rates = this.globalThingsService.GetAllModel('rates')
        this.subscription.push(this.rates.subscribe());
        this.dataRates = this.rates.pipe(
          map((rates) => rates['data'])
        )
        this.form = this.formBuilder.group({
          entry_id: [''],
          date_departure: [''],
          hour_departure: [''],
          rate_id: ['']
        });
        break;
      case 'rates':
        this.form = this.formBuilder.group({
          value: [''],
          name: [''],
          description: [''],
          date_begin: [''],
          date_end: ['']
        });
        break;
    }


  }

  submitForm() {
    var formData: any = new FormData();
    switch (this.template) {
      case 'vehicles':
        formData.append("plate", this.form.get('plate').value);
        formData.append("brand", this.form.get('brand').value);
        formData.append("year", this.form.get('year').value);
        this.postData('vehicles', formData)
        this.closeDialog();
        break;
      case 'entries':
        formData.append("plate", this.form.get('plate').value);
        formData.append("hour_arrival", this.form.get('hour_arrival').value);
        formData.append("place", this.form.get('place').value);
        this.postData('entries', formData)
        this.closeDialog();
        break;
      case 'exits':
        formData.append("entry_id", this.form.get('entry_id').value);
        formData.append("date_departure", this.form.get('date_departure').value);
        formData.append("hour_departure", this.form.get('hour_departure').value);
        formData.append("rate_id", this.form.get('rate_id').value);
        this.postData('exits', formData)
        this.closeDialog();
        break;
      case 'rates':
        formData.append("value", this.form.get('value').value);
        formData.append("name", this.form.get('name').value);
        formData.append("description", this.form.get('description').value);
        formData.append("date_begin", this.form.get('date_begin').value);
        formData.append("date_end", this.form.get('date_end').value);
        this.postData('rates', formData)
        this.closeDialog();
        break;
    }

  }

  closeDialog() {
    this.dialogRef.close();
  }

  openResponse(message): void {
    const dialogRef = this.dialog.open(MessageResponse, {
      width: '250px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  postData(model, data){
    this.http.post('https://powerful-brushlands-67246.herokuapp.com/api/' + model, data).subscribe(
      (response) => this.openResponse(response['message']))
      }
  

  ngOnInit() {
  }
  ngOnDestroy() {
    for (const subscriptions of this.subscription) {
      subscriptions.unsubscribe();
      console.log(subscriptions.closed)
    }
  }
}
