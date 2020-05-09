import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-firma-ekle",
  templateUrl: "./firma-ekle.component.html",
  styleUrls: ["./firma-ekle.component.css"]
})
export class FirmaEkleComponent implements OnInit {
  firma: IMikroKargoFirma = { TicariUnvan: "adsasdad" };

  constructor() {}

  ngOnInit() {}
}

class IMikroKargoFirma {
  TicariUnvan: string;
}
