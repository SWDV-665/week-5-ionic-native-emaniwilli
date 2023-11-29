import { Component } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { GroceriesServiceService } from '../groceries-service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  title="Grocery";
  item: any;
  shareItemPrompt: any;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController, public dataService: GroceriesServiceService, private http:HttpClient) {}

  loadItem() {
    return this.dataService.getItem();
  }

  async removeItem(item: any, index: any) {
    console.log("Removing Item -", index);
    const toast = this.toastCtrl.create({
      message: "Removing Item - " + index + "....",
      duration: 3000
    });
    (await toast).present();
   
    this.dataService.removeItem(index);
  };

  async shareItem(item: any, index: any) {
    console.log("Sharing Item -", index);
    const toast = this.toastCtrl.create({
      message: "Sharing Item - " + index + "....",
      duration: 3000
    });

    navigator.share({
      'title': 'Grocery Item',
      'text': 'View my grocery item: ' + item.name + ', ' + item.quantity,
      'url': 'http://www.myurl.com'
    }).then(function() {
      console.log('Successful share');
    }).catch(function(error) {
      console.log('Error sharing:', error)
    });
    
    this.shareItem(item,index);
  };

  async editItem(item: any, index: any) {
    console.log("Updating Item -", index);
    const toast = this.toastCtrl.create({
      message: "Updating Item - " + index + "....",
      duration: 3000
    });
    (await toast).present();

    this.showEditItemPrompt(item,index);

  };

  addItem() {
    console.log("Adding Item");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const prompt = this.alertCtrl.create({
      message: "Enter the name and quantity of the grocery items you would like to add",
      inputs: [
        {
          name: "name",
          placeholder: "Item"
        },
        {
          name: "quantity",
          placeholder: "Quantity"
        },
      ],
      buttons: [
        {
          text: "Add",
          handler: (item: any) => {
            console.log("Item Added", item);
            this.dataService.addItem(item);
          }
        },
        {
          text: "Cancel",
          handler: (item: any) => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    (await prompt).present();
  }

  async showEditItemPrompt(item: any, index: any) {
    const prompt = this.alertCtrl.create({
      message: "Enter the name and quantity of the grocery items you would like to edit",
      inputs: [
        {
          name: "name",
          placeholder: "Item",
          value: item.name
        },
        {
          name: "quantity",
          placeholder: "Quantity",
          value: item.quantity
        },
      ],
      buttons: [
        {
          text: "Edit",
          handler: (item: any) => {
            console.log("Item Updated", item);
            this.dataService.editItem(item, index);
          }
        },
        {
          text: "Cancel",
          handler: (item: any) => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    (await prompt).present();
  }};


