import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItems:number=0;
 public searchTerm:any;
  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.getProducts().subscribe((res:any)=>{
      this.totalItems=res.length;
    })
  }

search(event:any){
  this.searchTerm=(event.target as HTMLInputElement).value;
  this.cartService.search.next(this.searchTerm)

}

}
