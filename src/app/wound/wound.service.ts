import { Injectable } from "@angular/core";
import { Wound } from './wound.model';
import { Subject } from 'rxjs';


@Injectable({providedIn: 'root'})
export class WoundService {
    private wounds: Wound[] = [];
    private woundsUpdated = new Subject<Wound[]>();


}