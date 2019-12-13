import { Injectable } from "@angular/core";
import { Wound } from './wound.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';

const BACKEND_URL = environment.apiURL + "api/wounds/";

@Injectable({providedIn: 'root'})
export class WoundService {
    private wounds: Wound[] = [];
    private woundsUpdated = new Subject<Wound[]>();

    constructor(private http: HttpClient) {}

    getWounds(){
        this.http
            .get<{message: string, wounds: any}>(BACKEND_URL)
            .pipe(map( (woundData) => {
                return woundData.wounds.map(wound => {
                    return {
                        type: wound.type,
                        description: wound.description,
                        imagePath: wound.imagePath,
                        id: wound._id,
                        // creator: wound.creator
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

    getWound(id: string){
        return this.http.get<{_id: string, type: string, description: string, imagePath: string}>(
            BACKEND_URL + id
        );
    }

    addWound(type: string, description: string, image: File) {
        const woundData = new FormData();
        woundData.append("type", type);
        woundData.append("description", description);
        woundData.append("image", image, type);
        this.http
            .post<{message: string, wound: Wound}>(BACKEND_URL, woundData)
            .subscribe(responseData => {
                const wound: Wound = {
                    id: responseData.wound.id,
                    type: type,
                    description: description,
                    imagePath: responseData.wound.imagePath
                };
                this.wounds.push(wound);
                this.woundsUpdated.next([...this.wounds]);
            });
    }

    updateWound(id: string, type: string, description: string, image: File | string) {
        let woundData: Wound | FormData;
        if (typeof image === "object") {
            woundData = new FormData();
            woundData.append("id", id);
            woundData.append("type", type);
            woundData.append("description", description);
            woundData.append("image", image, type);
        } else {
            woundData = {
                id: id, 
                type: type,
                description: description,
                imagePath: image
            };
        }
        this.http
            .put<{message: string, wound: Wound}>(BACKEND_URL + id, woundData)
            .subscribe( responseData => {
                const updatedWounds = [...this.wounds];
                const oldWoundIndex = updatedWounds.findIndex(p => p.id === id);
                const wound: Wound = {
                    id: id,
                    type: type, 
                    description: description,
                    imagePath: responseData.wound.imagePath
                };
                updatedWounds[oldWoundIndex] = wound;
                this.wounds = updatedWounds;
                this.woundsUpdated.next([...this.wounds]);
            });
    }

    deleteWound(id: string) {
        this.http.delete(BACKEND_URL + id)
            .subscribe(() => {
                const updatedWounds = this.wounds.filter(wound => wound.id !== id);
                this.wounds = updatedWounds;
                this.woundsUpdated.next([...this.wounds]);
            })
    }
}