import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  productList:any;
  filterCategory:any;
  searchKey:string=''
  constructor(
    private service:ApiService,
    private cartService:CartService
    ) { }

  ngOnInit(): void {
    this.get()
  }


  get(){
    this.service.getProducts().subscribe((res:any)=>{
      this.productList=res;
      this.filterCategory=res;
      this.productList.forEach((a:any) => {
        if(a.category === "women's clothing" || a.category === "men's clothing"){
          a.category="fashion"
        }
        Object.assign(a,{quantity:1,total:a.price})
      });
    })
    this.cartService.search.subscribe((val:any)=>{
      this.searchKey=val;
    })
  }

  addToCart(item:any){
    this.cartService.addToCart(item);
  }
  filter(category:any){
    this.filterCategory=this.productList
    .filter((a:any)=>{
      if(a.category == category || category==''){
        return a;
      }

    })
  }
  
}
