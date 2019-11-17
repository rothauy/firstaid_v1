import { Injectable } from "@angular/core";
import { Wound } from './wound.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class WoundService {
    private wounds: Wound[] = [];
    private woundsUpdated = new Subject<Wound[]>();

    constructor(private http: HttpClient) {}

    getWounds(){
        this.http
            .get<{message: string, wounds: any}>("http://localhost:3000/api/wounds")
            .pipe(map( (woundData) => {
                return woundData.wounds.map(wound => {
                    return {
                        type: wound.type,
                        description: wound.description,
                        imagePath: wound.imagePath,
                        id: wound._id,
                        creator: wound.creator
                    };
                });
            }))
            .subscribe(transformedWounds => {
                this.wounds = transformedWounds;
                this.woundsUpdated.next([...this.wounds]);
            });
    }

    getWoundUpdateListener() {
        return this.woundsUpdated.asObservable();
    }

    getWound(type: string){
        return {...this.wounds.find(p => p.type = type)};
    }

    addWound(type: string, desc: string, imagePath: string) {
        const wound: Wound = {id: null, type: type, description: desc, imagePath: imagePath};
        this.http
            .post<{message: string, woundId: string}>("http://localhost:3000/api/wounds", wound)
            .subscribe(responseData => {
                const id = responseData.woundId;
                wound.id = id;
                this.wounds.push(wound);
                this.woundsUpdated.next([...this.wounds]);
            });
    }

    deleteWound(id: string) {
        this.http.delete("http://localhost:3000/api/wounds" + id)
            .subscribe(() => {
                const updatedWounds = this.wounds.filter(wound => wound.id !== id);
                this.wounds = updatedWounds;
                this.woundsUpdated.next([...this.wounds]);
            })
    }
}